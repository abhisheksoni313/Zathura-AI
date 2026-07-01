import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import seedInvoices from './data/sampleInvoices.json' with { type: 'json' };
import aribaQueueSeed from './data/aribaQueue.json' with { type: 'json' };
import { validateInvoice, createInvoiceFromPayload, sop, vendors, departments } from './src/validationEngine.js';
import { getZathuraAdvisory } from './src/zathuraReasoner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, 'public');
const TEN_MINUTES = 10 * 60 * 1000;

let invoices = seedInvoices.map(markPending);
let aribaQueue = aribaQueueSeed.map(markPending);
let demoRequests = [];
let lastAribaScan = null;
let nextAribaScanAt = new Date(Date.now() + TEN_MINUTES).toISOString();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    addCommonHeaders(res);
    if (req.method === 'OPTIONS') return send(res, 204, '');

    if (url.pathname === '/health' && req.method === 'GET') {
      return json(res, 200, {
        ok: true,
        app: 'Zathura.AI Procurement Analyst MVP',
        zathuraAdvisoryConfigured: Boolean(process.env.ZATHURA_AI_API_KEY || process.env.OPENAI_API_KEY),
        sampleInvoices: seedInvoices.length,
        aribaScan: aribaStatus()
      });
    }

    if (url.pathname === '/api/config' && req.method === 'GET') {
      return json(res, 200, {
        appName: 'Zathura.AI Procurement Analyst',
        zathuraAdvisoryConfigured: Boolean(process.env.ZATHURA_AI_API_KEY || process.env.OPENAI_API_KEY),
        advisoryModel: process.env.ZATHURA_AI_MODEL || process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        deterministicWeight: sop.deterministicWeight,
        advisoryWeight: sop.llmWeight,
        decisionPolicy: sop.decisionPolicy,
        aribaScan: aribaStatus()
      });
    }

    if (url.pathname === '/api/sop' && req.method === 'GET') return json(res, 200, sop);
    if (url.pathname === '/api/departments' && req.method === 'GET') return json(res, 200, departments);
    if (url.pathname === '/api/vendors' && req.method === 'GET') return json(res, 200, vendors);

    if (url.pathname === '/api/invoices' && req.method === 'GET') {
      const department = url.searchParams.get('department');
      const status = url.searchParams.get('status');
      let rows = invoices;
      if (department) rows = rows.filter((invoice) => invoice.departmentId === department);
      if (status) rows = rows.filter((invoice) => invoice.status === status);
      return json(res, 200, rows.map(summarizeInvoice));
    }

    if (url.pathname === '/api/invoices' && req.method === 'POST') {
      const body = await readJson(req);
      const created = createInvoiceFromPayload(body, invoices);
      created.pdfUrl = created.pdfUrl || null;
      invoices.unshift(markPending({ ...created, aribaSource: 'SAP Ariba manual create' }));
      return json(res, 201, enrichInvoice(invoices[0]));
    }

    if (url.pathname === '/api/invoices/validate-all' && req.method === 'POST') {
      const startedAt = new Date().toISOString();
      const results = [];
      for (const invoice of invoices) {
        results.push(await validateAndStore(invoice));
      }
      const counts = countStatuses(invoices);
      return json(res, 200, { ok: true, startedAt, completedAt: new Date().toISOString(), counts, results: results.map(summarizeInvoice) });
    }

    if (url.pathname === '/api/ariba/status' && req.method === 'GET') {
      return json(res, 200, aribaStatus());
    }

    if (url.pathname === '/api/ariba/scan' && req.method === 'POST') {
      const result = scanSapAriba();
      return json(res, 200, result);
    }

    const pdfMatch = url.pathname.match(/^\/api\/invoices\/([^/]+)\/pdf$/);
    if (pdfMatch && req.method === 'GET') {
      const invoice = invoices.find((item) => item.id === pdfMatch[1]);
      if (!invoice || !invoice.pdfUrl) return json(res, 404, { error: 'Invoice PDF not found' });
      res.writeHead(302, { Location: invoice.pdfUrl });
      return res.end();
    }

    const invoiceMatch = url.pathname.match(/^\/api\/invoices\/([^/]+)$/);
    if (invoiceMatch && req.method === 'GET') {
      const invoice = invoices.find((item) => item.id === invoiceMatch[1]);
      if (!invoice) return json(res, 404, { error: 'Invoice not found' });
      return json(res, 200, enrichInvoice(invoice));
    }

    const validateMatch = url.pathname.match(/^\/api\/invoices\/([^/]+)\/validate$/);
    if (validateMatch && req.method === 'POST') {
      const invoice = invoices.find((item) => item.id === validateMatch[1]);
      if (!invoice) return json(res, 404, { error: 'Invoice not found' });
      const updated = await validateAndStore(invoice);
      return json(res, 200, enrichInvoice(updated));
    }

    const manualMatch = url.pathname.match(/^\/api\/invoices\/([^/]+)\/manual-review$/);
    if (manualMatch && req.method === 'POST') {
      const invoice = invoices.find((item) => item.id === manualMatch[1]);
      if (!invoice) return json(res, 404, { error: 'Invoice not found' });
      const body = await readJson(req);
      const { decision, reviewer = 'Procurement Reviewer', comment = '' } = body || {};
      if (!['approved', 'rejected'].includes(decision)) return json(res, 400, { error: 'decision must be approved or rejected' });
      invoice.status = decision;
      invoice.manualReview = { decision, reviewer, comment, reviewedAt: new Date().toISOString() };
      return json(res, 200, enrichInvoice(invoice));
    }

    if (url.pathname === '/api/demo-requests' && req.method === 'POST') {
      const body = await readJson(req);
      const requiredFields = ['first_name', 'last_name', 'email', 'company', 'interest'];
      const missing = requiredFields.filter((field) => !String(body?.[field] || '').trim());
      if (missing.length) return json(res, 400, { error: 'Missing required fields', missing });
      const request = {
        id: `DEMO-${String(demoRequests.length + 1).padStart(4, '0')}`,
        ...body,
        source: body.source || 'website',
        receivedAt: new Date().toISOString(),
        nextStep: body.interest === 'procurement' ? 'Open the Procurement Analyst workspace and validate sample invoices.' : 'Route to Zathura.AI sales/demo team.'
      };
      demoRequests.unshift(request);
      return json(res, 201, request);
    }
    if (url.pathname === '/api/demo-requests' && req.method === 'GET') return json(res, 200, demoRequests);

    if (url.pathname === '/api/reset' && req.method === 'POST') {
      invoices = seedInvoices.map(markPending);
      aribaQueue = aribaQueueSeed.map(markPending);
      demoRequests = [];
      lastAribaScan = null;
      nextAribaScanAt = new Date(Date.now() + TEN_MINUTES).toISOString();
      return json(res, 200, { ok: true, invoices: invoices.length, aribaScan: aribaStatus() });
    }

    if (url.pathname.startsWith('/api')) return json(res, 404, { error: 'API route not found' });
    return serveStatic(res, normalizePath(url.pathname));
  } catch (error) {
    return json(res, 500, { error: 'Server error', message: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Zathura.AI Procurement Analyst running at http://localhost:${PORT}`);
  console.log(`Zathura.AI advisory configured: ${Boolean(process.env.ZATHURA_AI_API_KEY || process.env.OPENAI_API_KEY)}`);
  console.log('Zero-dependency server: npm install is not required.');
});

setInterval(() => {
  scanSapAriba(true);
}, TEN_MINUTES);

function markPending(invoice) {
  return { ...invoice, status: 'unvalidated', validation: null, manualReview: null };
}

async function validateAndStore(invoice) {
  const deterministic = validateInvoice(invoice, invoices);
  const advisory = await getZathuraAdvisory(invoice, deterministic);
  const final = combineDecision(deterministic, advisory);
  invoice.validation = { deterministic, advisory, final, validatedAt: new Date().toISOString() };
  invoice.status = final.decision;
  invoice.manualReview = null;
  return invoice;
}

function scanSapAriba(isAutomatic = false) {
  const scannedAt = new Date().toISOString();
  const added = [];
  if (aribaQueue.length > 0) {
    const next = markPending(aribaQueue.shift());
    next.scannedFromAribaAt = scannedAt;
    invoices.unshift(next);
    added.push(summarizeInvoice(next));
  }
  lastAribaScan = scannedAt;
  nextAribaScanAt = new Date(Date.now() + TEN_MINUTES).toISOString();
  return { ok: true, automatic: isAutomatic, scannedAt, addedCount: added.length, added, pendingInQueue: aribaQueue.length, nextScanAt: nextAribaScanAt };
}

function aribaStatus() {
  return { lastScanAt: lastAribaScan, nextScanAt: nextAribaScanAt, pendingInAribaQueue: aribaQueue.length, autoScanEveryMinutes: 10 };
}

function normalizePath(urlPath) {
  if (urlPath === '/' || urlPath === '') return '/index.html';
  if (urlPath === '/procurement') return '/procurement.html';
  return urlPath;
}

function serveStatic(res, urlPath) {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^([.][.][\/\\])+/, '');
  let filePath = path.join(publicDir, safePath);
  if (!filePath.startsWith(publicDir)) filePath = path.join(publicDir, 'index.html');
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) filePath = path.join(publicDir, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

function addCommonHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}
function send(res, status, body) { res.writeHead(status); res.end(body); }
function json(res, status, payload) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(payload, null, 2)); }
function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; if (data.length > 1_000_000) { req.destroy(); reject(new Error('Request body too large')); } });
    req.on('end', () => { if (!data) return resolve({}); try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON body')); } });
    req.on('error', reject);
  });
}

function combineDecision(deterministic, advisory) {
  const canAutoApprove = deterministic.decision === 'approved';
  const mustReject = deterministic.decision === 'rejected';
  const finalDecision = mustReject ? 'rejected' : canAutoApprove ? 'approved' : 'manual_review';
  const simple = simpleExplanation(finalDecision, deterministic, advisory);
  return {
    decision: finalDecision,
    deterministicScore: deterministic.deterministicScore,
    blendedConfidence: Math.round((deterministic.deterministicScore * sop.deterministicWeight) + (advisorySignalScore(advisory, deterministic.decision) * sop.llmWeight)),
    reason: simple.headline,
    action: deterministic.action,
    summary: simple.summary,
    simpleExplanation: simple.summary,
    simpleReasons: simple.reasons,
    suggestions: advisory?.suggestions?.length ? advisory.suggestions : deterministic.suggestions,
    guardrail: advisory?.guardrail || sop.decisionPolicy.advisoryGuardrail
  };
}

function advisorySignalScore(advisory, deterministicDecision) {
  if (!advisory?.enabled) return 70;
  return advisory.advisoryDecision === deterministicDecision ? 95 : 65;
}

function simpleExplanation(decision, deterministic, advisory) {
  const issues = deterministic.results.filter((item) => item.status !== 'pass');
  const critical = issues.filter((item) => item.critical && item.status === 'fail');
  const warnings = issues.filter((item) => item.status === 'warning' || (!item.critical && item.status === 'fail'));
  if (decision === 'approved') {
    return {
      headline: 'Approved: the invoice passed the required SOP checks.',
      summary: 'Approved because the vendor is allowed, the PO and invoice match, the amount is within budget and authority, documents are complete, and there is no critical compliance issue.',
      reasons: ['Vendor is pre-approved and compliant.', 'PO, goods receipt/service confirmation, invoice quantity, unit price, tax, and vendor match.', 'Invoice amount is within approved budget and cost center balance.', 'No critical regulatory, sanctions, tax, or conflict-of-interest issue was found.']
    };
  }
  if (decision === 'rejected') {
    return {
      headline: 'Rejected: one or more non-negotiable SOP gates failed.',
      summary: `Rejected because critical SOP gate(s) failed: ${critical.map((item) => item.name).join(', ') || 'critical score threshold'}. These checks cannot be bypassed by Zathura.AI.`,
      reasons: critical.length ? critical.map((item) => `${item.name}: ${item.note}`) : deterministic.reasons.slice(0, 4)
    };
  }
  return {
    headline: 'Flagged for human review: there are exceptions that need a person to confirm.',
    summary: `Flagged for human review because there is no critical blocker, but ${warnings.length} exception(s) need procurement judgement before approval.`,
    reasons: warnings.slice(0, 5).map((item) => `${item.name}: ${item.note}`)
  };
}

function countStatuses(rows) {
  return {
    total: rows.length,
    unvalidated: rows.filter((item) => item.status === 'unvalidated').length,
    approved: rows.filter((item) => item.status === 'approved').length,
    rejected: rows.filter((item) => item.status === 'rejected').length,
    manual_review: rows.filter((item) => item.status === 'manual_review').length
  };
}

function summarizeInvoice(invoice) {
  const vendor = vendors.find((item) => item.id === invoice.vendorId);
  const department = departments.find((item) => item.id === invoice.departmentId);
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    poNumber: invoice.poNumber,
    departmentId: invoice.departmentId,
    departmentName: department?.name || invoice.departmentId,
    vendorId: invoice.vendorId,
    vendorName: vendor?.name || invoice.vendorId,
    category: invoice.category,
    item: invoice.item,
    invoiceTotal: invoice.invoiceTotal,
    approvedBudget: invoice.approvedBudget,
    status: invoice.status,
    deterministicScore: invoice.validation?.deterministic?.deterministicScore ?? null,
    finalDecision: invoice.validation?.final?.decision ?? null,
    blendedConfidence: invoice.validation?.final?.blendedConfidence ?? null,
    issueCount: invoice.validation?.deterministic?.reasons?.length ?? null,
    pdfUrl: invoice.pdfUrl || null,
    aribaSource: invoice.aribaSource || 'SAP Ariba',
    scannedFromAribaAt: invoice.scannedFromAribaAt || null,
    simpleExplanation: invoice.validation?.final?.simpleExplanation || null
  };
}

function enrichInvoice(invoice) {
  const vendor = vendors.find((item) => item.id === invoice.vendorId);
  const department = departments.find((item) => item.id === invoice.departmentId);
  return {
    ...invoice,
    vendor,
    department,
    quotationDetails: (invoice.quotations || []).map((quote) => ({ ...quote, vendor: vendors.find((vendorItem) => vendorItem.id === quote.vendorId) }))
  };
}
