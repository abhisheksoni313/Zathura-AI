# Zathura.AI Procurement Analyst MVP - No Install

This package is a zero-dependency Node.js MVP for the Zathura.AI Procurement Analyst demo. It includes the updated landing page, backend-connected procurement dashboard, SAP Ariba-style invoice creation screen, 10 sample invoices, and invoice PDFs.

## Run

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Procurement Analyst dashboard:

```text
http://localhost:3000/procurement.html
```

## What is included

- 10 sample invoices from IT, Commercial, Legal, Drug Discovery, R&D, Finance, Operations, and Manufacturing/QA.
- Actual PDF invoice files in `public/invoices/`, visible from the dashboard through **View Invoice PDF**.
- 25-point SOP validation engine.
- Zathura.AI advisory layer for simpler explanations and remediation suggestions.
- **Validate All** API and UI button to run validation across all invoices together.
- SAP Ariba-style Create Invoice page.
- SAP Ariba scan simulation every 10 minutes, plus a manual **Scan SAP Ariba Now** button.

## Expected sample validation result

After clicking **Validate All** on the initial 10 sample invoices:

- 7 approved
- 1 rejected
- 2 human review

## Optional advisory API

The demo works without an external API key. To enable external advisory reasoning, set either:

```bash
export ZATHURA_AI_API_KEY=your_key_here
```

or use your existing API-compatible key environment variable.

Then restart:

```bash
npm start
```
