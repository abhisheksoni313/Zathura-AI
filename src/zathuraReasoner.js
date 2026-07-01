const DEFAULT_MODEL = process.env.ZATHURA_AI_MODEL || process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const API_KEY = process.env.ZATHURA_AI_API_KEY || process.env.OPENAI_API_KEY;

export async function getZathuraAdvisory(invoice, deterministicValidation) {
  if (!API_KEY) {
    return {
      enabled: false,
      model: 'fallback-advisory',
      contributionWeight: 0.2,
      advisoryDecision: deterministicValidation.decision,
      summary: buildLocalSummary(invoice, deterministicValidation),
      suggestions: deterministicValidation.suggestions,
      riskNarrative: buildRiskNarrative(deterministicValidation),
      guardrail: 'Zathura.AI advisory used local reasoning because no external advisory key is configured. Final decision remains SOP-led.'
    };
  }

  const prompt = buildPrompt(invoice, deterministicValidation);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.15,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are Zathura.AI Procurement Analyst. Return strict JSON only. Explain SOP findings simply, suggest remediation, and never override critical deterministic SOP gates.'
          },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Advisory API error ${response.status}: ${text.slice(0, 500)}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);
    return {
      enabled: true,
      model: DEFAULT_MODEL,
      contributionWeight: 0.2,
      advisoryDecision: normalizeDecision(parsed.advisoryDecision, deterministicValidation.decision),
      summary: parsed.summary || buildLocalSummary(invoice, deterministicValidation),
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 6) : deterministicValidation.suggestions,
      riskNarrative: parsed.riskNarrative || buildRiskNarrative(deterministicValidation),
      guardrail: 'Zathura.AI advisory is explanation-only. Critical SOP gates and final approval policy cannot be overridden.'
    };
  } catch (error) {
    return {
      enabled: false,
      model: 'fallback-advisory',
      contributionWeight: 0.2,
      advisoryDecision: deterministicValidation.decision,
      summary: `${buildLocalSummary(invoice, deterministicValidation)} Advisory service was unavailable, so Zathura.AI used SOP-led local reasoning.`,
      suggestions: deterministicValidation.suggestions,
      riskNarrative: buildRiskNarrative(deterministicValidation),
      guardrail: 'Final decision is SOP-led because external advisory was unavailable.'
    };
  }
}

function normalizeDecision(value, fallback) {
  return ['approved', 'rejected', 'manual_review'].includes(value) ? value : fallback;
}

function buildLocalSummary(invoice, validation) {
  const issueCount = validation.counts.warnings + validation.counts.failed;
  if (validation.decision === 'approved') {
    return `This invoice can be approved. The vendor, PO, amount, budget, delivery, documents, and three-way match are within the SOP controls.`;
  }
  if (validation.decision === 'rejected') {
    return `This invoice should be rejected because at least one non-negotiable SOP gate failed. Critical gates must be fixed before procurement can continue.`;
  }
  return `This invoice needs human review. There is no critical blocker, but ${issueCount} exception(s) need a procurement reviewer to confirm risk, documents, or timing before approval.`;
}

function buildRiskNarrative(validation) {
  if (validation.decision === 'approved') return 'Low risk: SOP gates passed and the invoice is ready for audit logging.';
  if (validation.decision === 'rejected') return 'High risk: a critical gate failed, so auto-approval is blocked.';
  return 'Medium risk: the invoice may still be valid, but exceptions need human judgement.';
}

function buildPrompt(invoice, validation) {
  const issues = validation.results
    .filter((item) => item.status !== 'pass')
    .map((item) => ({ id: item.id, name: item.name, critical: item.critical, status: item.status, note: item.note }));

  return JSON.stringify({
    instruction: 'Summarize procurement validation in simple business language. Suggest practical next steps. Do not override critical SOP gate failures. Return JSON with advisoryDecision, summary, riskNarrative, suggestions array.',
    finalDeterministicDecision: validation.decision,
    deterministicScore: validation.deterministicScore,
    invoice: {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      departmentId: invoice.departmentId,
      category: invoice.category,
      item: invoice.item,
      vendorId: invoice.vendorId,
      invoiceTotal: invoice.invoiceTotal,
      approvedBudget: invoice.approvedBudget,
      requestorLevel: invoice.requestorLevel
    },
    sopIssues: issues,
    outputSchema: {
      advisoryDecision: 'approved | rejected | manual_review',
      summary: 'one paragraph',
      riskNarrative: 'one short paragraph',
      suggestions: ['3 to 6 concise practical suggestions']
    }
  });
}
