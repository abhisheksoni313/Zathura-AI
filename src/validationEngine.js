import sop from '../data/sop.json' with { type: 'json' };
import vendors from '../data/vendors.json' with { type: 'json' };
import departments from '../data/departments.json' with { type: 'json' };
import allInvoicesSeed from '../data/sampleInvoices.json' with { type: 'json' };

const vendorById = new Map(vendors.map((vendor) => [vendor.id, vendor]));
const departmentById = new Map(departments.map((department) => [department.id, department]));
const MS_DAY = 24 * 60 * 60 * 1000;
const TODAY = new Date(process.env.DEMO_TODAY || '2026-07-01T00:00:00.000Z');

function money(value) {
  return `$${Math.round(Number(value || 0)).toLocaleString('en-US')}`;
}

function dateOnly(value) {
  if (!value) return null;
  return new Date(`${String(value).slice(0, 10)}T00:00:00.000Z`);
}

function daysBetween(start, end) {
  return Math.round((dateOnly(end) - dateOnly(start)) / MS_DAY);
}

function check(status, note, meta = {}) {
  return { status, note, ...meta };
}

function invoiceSubtotal(invoice) {
  return Number(invoice.unitPrice || 0) * Number(invoice.quantity || 0);
}

function expectedInvoiceTotal(invoice) {
  return Math.round(invoiceSubtotal(invoice) * (1 + Number(invoice.taxRate || 0)) * 100) / 100;
}

function selectedQuote(invoice) {
  return (invoice.quotations || []).find((quote) => quote.vendorId === invoice.selectedQuoteVendorId || quote.vendorId === invoice.vendorId);
}

function lowestQuote(invoice) {
  const quotes = invoice.quotations || [];
  if (!quotes.length) return null;
  return quotes.reduce((lowest, quote) => (Number(quote.total) < Number(lowest.total) ? quote : lowest), quotes[0]);
}

function duplicateFound(invoice, allInvoices) {
  return allInvoices.some((other) => (
    other.id !== invoice.id &&
    other.departmentId === invoice.departmentId &&
    other.duplicateKey &&
    other.duplicateKey === invoice.duplicateKey &&
    Math.abs(daysBetween(other.invoiceDate, invoice.invoiceDate)) <= 30
  ));
}

function evaluateCheck(def, ctx) {
  const { invoice, vendor, department, allInvoices } = ctx;
  const quote = selectedQuote(invoice);
  const lowest = lowestQuote(invoice);
  const expectedTotal = expectedInvoiceTotal(invoice);
  const totalVariancePercent = expectedTotal ? ((Number(invoice.invoiceTotal) - expectedTotal) / expectedTotal) * 100 : 0;
  const authorityLimit = sop.authorityLimits[invoice.requestorLevel] || 0;
  const benchmark = Number(vendor?.unitPrice || invoice.unitPrice || 0) * Number(invoice.quantity || 0) * (1 + Number(invoice.taxRate || 0));
  const priceVariance = benchmark ? ((Number(invoice.invoiceTotal) - benchmark) / benchmark) * 100 : 0;
  const deliveryLateDays = daysBetween(invoice.requiredByDate, invoice.deliveryDate);

  switch (def.id) {
    case 1:
      return vendor && vendor.approved && vendor.category === invoice.category
        ? check('pass', `${vendor.name} is present in the approved vendor master for ${invoice.category}.`)
        : check('fail', `Vendor ${invoice.vendorId} is not approved for the invoice category ${invoice.category}.`);
    case 2:
      return vendor?.complianceStatus === 'Active'
        ? check('pass', 'Vendor compliance status is Active.')
        : check('warning', `Vendor status is ${vendor?.complianceStatus || 'Unknown'}; procurement must review before award.`);
    case 3: {
      const expiry = dateOnly(vendor?.certExpiry);
      if (!expiry) return check('fail', 'Vendor certification expiry date is missing.');
      if (expiry < dateOnly(invoice.deliveryDate)) return check('fail', `Vendor certification expires before delivery/service completion date ${invoice.deliveryDate}.`);
      if (daysBetween(TODAY, vendor.certExpiry) < 60) return check('warning', `Vendor certification expires on ${vendor.certExpiry}, within 60 days.`);
      return check('pass', `Certification is valid through ${vendor.certExpiry}.`);
    }
    case 4:
      return vendor?.gstValid
        ? check('pass', 'GST/PAN/tax registration verified.')
        : check('fail', 'GST/PAN/tax registration could not be verified.');
    case 5:
      return vendor?.bankVerified
        ? check('pass', 'Vendor banking details are verified.')
        : check('warning', 'Vendor banking details are not verified; hold payment until validated.');
    case 6:
      return vendor?.sanctionsClear
        ? check('pass', 'No sanctions or denied-party screening hit.')
        : check('fail', 'Potential sanctions/denied-party hit detected.');
    case 7:
      if (!sop.insuranceRequiredCategories.includes(invoice.category)) return check('pass', 'Insurance not mandatory for this category.');
      return vendor?.insuranceValid
        ? check('pass', 'Required insurance and liability coverage is on file.')
        : check('warning', 'Insurance proof is missing or expired for a risk-bearing category.');
    case 8: {
      const overPct = ((Number(invoice.invoiceTotal) - Number(invoice.approvedBudget)) / Number(invoice.approvedBudget)) * 100;
      if (Number(invoice.invoiceTotal) <= Number(invoice.approvedBudget)) return check('pass', `Invoice total ${money(invoice.invoiceTotal)} is within approved budget ${money(invoice.approvedBudget)}.`);
      if (overPct <= 15) return check('warning', `Invoice exceeds approved budget by ${overPct.toFixed(1)}%; requires budget owner confirmation.`);
      return check('fail', `Invoice exceeds approved budget by ${overPct.toFixed(1)}%, above tolerance.`);
    }
    case 9:
      return Math.abs(priceVariance) <= 15
        ? check('pass', `Price variance is ${priceVariance.toFixed(1)}% vs benchmark, within +/-15%.`)
        : check('warning', `Price variance is ${priceVariance.toFixed(1)}% vs benchmark, outside +/-15%.`);
    case 10:
      return (invoice.quotations || []).length >= 3 || Number(invoice.invoiceTotal) < 1000
        ? check('pass', `${(invoice.quotations || []).length} quotations attached.`)
        : check('fail', 'Fewer than 3 competitive quotations are attached for a non-micro purchase.');
    case 11:
      if (!lowest || !quote) return check('warning', 'Unable to compare selected quotation with alternatives.');
      if (quote.vendorId === lowest.vendorId) return check('pass', 'Selected vendor is the lowest-cost quotation.');
      if ((invoice.businessJustification || '').trim().length >= 30) return check('pass', 'Non-lowest vendor selection is supported by business justification.');
      return check('warning', `Selected vendor is ${money(Number(quote.total) - Number(lowest.total))} above the lowest quote and lacks justification.`);
    case 12:
      return Number(invoice.invoiceTotal) <= Number(invoice.costCenterRemaining)
        ? check('pass', `Cost center has ${money(invoice.costCenterRemaining)} remaining; sufficient for ${money(invoice.invoiceTotal)}.`)
        : check('fail', `Cost center has only ${money(invoice.costCenterRemaining)} remaining; insufficient for ${money(invoice.invoiceTotal)}.`);
    case 13:
      return vendor?.paymentTermsDays >= 30 && vendor?.paymentTermsDays <= 90
        ? check('pass', `Payment terms Net ${vendor.paymentTermsDays} are within policy.`)
        : check('warning', `Payment terms Net ${vendor?.paymentTermsDays || 'unknown'} are outside policy.`);
    case 14:
      return Number(invoice.invoiceTotal) <= authorityLimit
        ? check('pass', `${invoice.requestorLevel} authority covers ${money(invoice.invoiceTotal)}.`)
        : check('fail', `${money(invoice.invoiceTotal)} exceeds ${invoice.requestorLevel} authority limit ${money(authorityLimit)}.`);
    case 15:
      return duplicateFound(invoice, allInvoices)
        ? check('warning', 'A similar invoice/request exists in the last 30 days; check duplicate risk.')
        : check('pass', 'No duplicate invoice/request found in 30-day window.');
    case 16:
      return vendor?.contractOnFile
        ? check('pass', 'Master agreement / contract exists on file.')
        : check('warning', 'No active master agreement / contract found for this vendor-category combination.');
    case 17:
      if (deliveryLateDays <= 0) return check('pass', `Delivery/service date ${invoice.deliveryDate} meets required-by date ${invoice.requiredByDate}.`);
      if (invoice.urgency === 'Critical') return check('fail', `Delivery is ${deliveryLateDays} day(s) late for a critical request.`);
      return check('warning', `Delivery/service date is ${deliveryLateDays} day(s) after required-by date.`);
    case 18:
      return department?.categories?.includes(invoice.category)
        ? check('pass', `${invoice.category} is in ${department.name}'s approved scope.`)
        : check('warning', `${invoice.category} is outside ${department?.name || invoice.departmentId}'s normal procurement scope.`);
    case 19:
      return vendor?.coiFlag
        ? check('fail', 'Conflict-of-interest flag exists for this vendor.')
        : check('pass', 'No conflict-of-interest flag detected.');
    case 20:
      if (invoice.category !== sop.regulatedCategory) return check('pass', 'Not applicable; non-controlled category.');
      return invoice.regulatorySignoff
        ? check('pass', 'QA/regulatory sign-off confirmed for controlled raw material/API procurement.')
        : check('fail', 'QA/regulatory sign-off is missing for controlled raw material/API procurement.');
    case 21:
      if (vendor?.region !== 'International') return check('pass', 'Domestic vendor; cross-border terms not applicable.');
      return vendor?.complianceStatus === 'Active'
        ? check('pass', 'International vendor has verified currency, tax, and Incoterms controls.')
        : check('warning', 'International vendor is not fully active; currency/tax/Incoterms need review.');
    case 22:
      return vendor?.esgScore >= 60
        ? check('pass', `ESG score ${vendor.esgScore}/100 meets threshold.`)
        : check('warning', `ESG score ${vendor?.esgScore ?? 'unknown'}/100 is below threshold 60.`);
    case 23:
      return vendor?.onTimeDelivery >= 85 && vendor?.qualityReject <= 5
        ? check('pass', `Vendor performance meets threshold: ${vendor.onTimeDelivery}% on-time, ${vendor.qualityReject}% reject rate.`)
        : check('warning', `Vendor performance below threshold: ${vendor?.onTimeDelivery ?? 'unknown'}% on-time, ${vendor?.qualityReject ?? 'unknown'}% reject rate.`);
    case 24: {
      const vendorMatch = invoice.poVendorId === invoice.vendorId;
      const qtyMatch = Number(invoice.poQuantity) === Number(invoice.quantity);
      const priceMatch = Number(invoice.poUnitPrice) === Number(invoice.unitPrice);
      const totalMatch = Math.abs(totalVariancePercent) <= 1;
      const grnMatch = Boolean(invoice.goodsReceiptConfirmed);
      if (vendorMatch && qtyMatch && priceMatch && totalMatch && grnMatch) {
        return check('pass', 'PO, GRN/service confirmation, and invoice data match.');
      }
      const misses = [];
      if (!vendorMatch) misses.push('vendor mismatch');
      if (!qtyMatch) misses.push('quantity mismatch');
      if (!priceMatch) misses.push('unit price mismatch');
      if (!totalMatch) misses.push(`tax/total mismatch ${totalVariancePercent.toFixed(1)}%`);
      if (!grnMatch) misses.push('missing GRN/service confirmation');
      return check('warning', `Three-way match issue: ${misses.join(', ')}.`);
    }
    case 25:
      return invoice.documentationComplete && (Number(invoice.invoiceTotal) < 1000 || (invoice.businessJustification || '').trim().length >= 30)
        ? check('pass', 'Required invoice, quotation, justification, and support documents are complete.')
        : check('fail', 'Required documentation or business justification is missing/incomplete.');
    default:
      return check('warning', `No evaluator is configured for SOP check ${def.id}.`);
  }
}

export function validateInvoice(invoice, allInvoices = allInvoicesSeed) {
  const vendor = vendorById.get(invoice.vendorId);
  const department = departmentById.get(invoice.departmentId);
  const results = sop.checks.map((def) => {
    const evaluated = evaluateCheck(def, { invoice, vendor, department, allInvoices });
    return {
      id: def.id,
      group: def.group,
      name: def.name,
      critical: def.critical,
      weight: def.weight,
      description: def.description,
      ...evaluated
    };
  });

  const maxScore = results.reduce((sum, result) => sum + result.weight, 0);
  const earnedScore = results.reduce((sum, result) => {
    if (result.status === 'pass') return sum + result.weight;
    if (result.status === 'warning') return sum + result.weight * 0.45;
    return sum;
  }, 0);
  const deterministicScore = Math.round((earnedScore / maxScore) * 100);
  const criticalFailures = results.filter((result) => result.critical && result.status === 'fail');
  const warnings = results.filter((result) => result.status === 'warning');
  const nonCriticalFailures = results.filter((result) => !result.critical && result.status === 'fail');

  let decision = 'manual_review';
  if (criticalFailures.length > 0 || deterministicScore < 60) {
    decision = 'rejected';
  } else if (deterministicScore >= 92 && warnings.length <= 2 && nonCriticalFailures.length === 0) {
    decision = 'approved';
  }

  const action = decision === 'approved'
    ? 'Approve and create/confirm PO in SAP Ariba.'
    : decision === 'rejected'
      ? 'Reject and return to requestor with critical SOP findings.'
      : 'Flag for human procurement intervention with reasons and remediation steps.';

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    poNumber: invoice.poNumber,
    department: department?.name || invoice.departmentId,
    vendor: vendor?.name || invoice.vendorId,
    deterministicWeight: sop.deterministicWeight,
    advisoryWeight: sop.llmWeight,
    deterministicScore,
    decision,
    action,
    summary: buildDeterministicSummary(decision, deterministicScore, criticalFailures, warnings, nonCriticalFailures),
    reasons: results.filter((result) => result.status !== 'pass').map((result) => `${String(result.id).padStart(2, '0')} - ${result.name}: ${result.note}`),
    suggestions: buildSuggestions(decision, criticalFailures, warnings, nonCriticalFailures),
    counts: {
      passed: results.filter((result) => result.status === 'pass').length,
      warnings: warnings.length,
      failed: results.filter((result) => result.status === 'fail').length,
      criticalFailures: criticalFailures.length
    },
    results
  };
}

function buildDeterministicSummary(decision, score, criticalFailures, warnings, nonCriticalFailures) {
  if (decision === 'approved') {
    return `SOP score is ${score}/100 with no blocking issue. Invoice can be auto-approved.`;
  }
  if (decision === 'rejected') {
    const criticalNames = criticalFailures.map((item) => item.name).join('; ') || 'score below minimum threshold';
    return `SOP score is ${score}/100. Rejection is required because critical gate(s) failed: ${criticalNames}.`;
  }
  return `SOP score is ${score}/100. No critical gate blocks the request, but ${warnings.length + nonCriticalFailures.length} exception(s) require human procurement judgement.`;
}

function buildSuggestions(decision, criticalFailures, warnings, nonCriticalFailures) {
  const issues = [...criticalFailures, ...warnings, ...nonCriticalFailures];
  if (!issues.length) return ['Proceed to approval and retain validation log in SAP Ariba audit trail.'];
  return issues.slice(0, 8).map((issue) => {
    if (issue.critical) return `Resolve critical gate: ${issue.name}. ${issue.note}`;
    if (/budget/i.test(issue.name)) return 'Ask budget owner to revise budget approval or reduce PO value.';
    if (/Insurance/i.test(issue.name)) return 'Collect valid insurance/liability certificate before payment release.';
    if (/Certification/i.test(issue.name)) return 'Request updated vendor certification or choose an alternate active vendor.';
    if (/Regulatory|QA/i.test(issue.name)) return 'Route to QA/regulatory owner for approval before procurement can continue.';
    if (/Three-Way/i.test(issue.name)) return 'Reconcile PO, GRN/service confirmation, invoice quantity, and price before approval.';
    if (/Documentation/i.test(issue.name)) return 'Attach missing invoice support, quotation comparison, and business justification.';
    return `Review exception: ${issue.name}. ${issue.note}`;
  });
}

export function createInvoiceFromPayload(payload, existingInvoices = allInvoicesSeed) {
  const next = String(existingInvoices.length + 1).padStart(4, '0');
  const departmentId = payload.departmentId || 'IT';
  const vendor = vendorById.get(payload.vendorId);
  const quantity = Number(payload.quantity || 1);
  const unitPrice = Number(payload.unitPrice || vendor?.unitPrice || 1000);
  const taxRate = Number(payload.taxRate ?? 0.18);
  const invoiceTotal = Math.round(quantity * unitPrice * (1 + taxRate) * 100) / 100;
  return {
    id: `INV-${departmentId}-${next}`,
    invoiceNumber: payload.invoiceNumber || `NEW-2026-${next}`,
    poNumber: payload.poNumber || `ARB-PO-2026-${String(11000 + existingInvoices.length).padStart(5, '0')}`,
    departmentId,
    category: payload.category || vendor?.category || 'IT Hardware & Software',
    item: payload.item || 'New procurement invoice',
    quantity,
    unitPrice,
    taxRate,
    invoiceTotal: Number(payload.invoiceTotal || invoiceTotal),
    approvedBudget: Number(payload.approvedBudget || invoiceTotal * 1.1),
    costCenterRemaining: Number(payload.costCenterRemaining || 100000),
    requiredByDate: payload.requiredByDate || '2026-07-31',
    invoiceDate: payload.invoiceDate || '2026-07-01',
    deliveryDate: payload.deliveryDate || '2026-07-20',
    vendorId: payload.vendorId || 'V01',
    selectedQuoteVendorId: payload.selectedQuoteVendorId || payload.vendorId || 'V01',
    requestorLevel: payload.requestorLevel || 'Manager',
    requestedBy: payload.requestedBy || 'Demo User',
    businessJustification: payload.businessJustification || '',
    regulatorySignoff: Boolean(payload.regulatorySignoff),
    goodsReceiptConfirmed: Boolean(payload.goodsReceiptConfirmed ?? true),
    poQuantity: Number(payload.poQuantity || quantity),
    poUnitPrice: Number(payload.poUnitPrice || unitPrice),
    poVendorId: payload.poVendorId || payload.vendorId || 'V01',
    documentationComplete: Boolean(payload.documentationComplete ?? true),
    duplicateKey: payload.duplicateKey || `${departmentId}-${(payload.item || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    quotations: payload.quotations || [
      { vendorId: payload.vendorId || 'V01', unitPrice, total: Number(payload.invoiceTotal || invoiceTotal), deliveryDays: 10 }
    ]
  };
}

export { sop, vendors, departments };
