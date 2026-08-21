const DEMO_DATE = '2026-08-21';

const seed = {
  personas: [
    { id:'marketing', label:'Marketing Manager', name:'Aarav Mehta', role:'Brand Marketing Manager', market:'India', permissions:['brand_read','claim_read','content_prepare','campaign_prepare','analytics_read','field_insight_read'] },
    { id:'medical', label:'Medical', name:'Dr. Meera Nair', role:'Medical Affairs Reviewer', market:'India', permissions:['claim_read','evidence_read','medical_review','medical_request_manage'] },
    { id:'legal', label:'Legal', name:'Ritika Shah', role:'Legal Reviewer', market:'India', permissions:['claim_read','legal_review','event_review'] },
    { id:'regulatory', label:'Regulatory', name:'Karan Rao', role:'Regulatory Affairs Reviewer', market:'India', permissions:['claim_read','regulatory_review','claim_status_manage','jurisdiction_read'] },
    { id:'field', label:'Field', name:'Neel Verma', role:'Field Representative', market:'India', territory:'Hyderabad Central', permissions:['approved_content_read','hcp_context_read','followup_prepare','field_insight_create'] },
    { id:'pv', label:'PV / Quality', name:'Dr. Sana Iqbal', role:'PV Safety Manager', market:'India', permissions:['pv_case_read','pv_case_manage','source_interaction_read'] },
    { id:'admin', label:'Admin / Auditor', name:'Isha Menon', role:'Commercial Operations Admin', market:'Global', permissions:['audit_read','workflow_admin','all_read'] }
  ],
  brands: [
    { id:'BR-A', name:'Cardiovance', product:'Product A', category:'Cardiometabolic', markets:['India','US'], indications:['IND-A1','IND-A2'], status:'ACTIVE' },
    { id:'BR-B', name:'Oncora', product:'Product B', category:'Oncology', markets:['India','EU'], indications:['IND-B1','IND-B2'], status:'ACTIVE' }
  ],
  indications: [
    { id:'IND-A1', product:'Product A', name:'Approved indication 1', market:'India', status:'APPROVED', labelVersion:'LBL-A-IN-6' },
    { id:'IND-A2', product:'Product A', name:'Approved indication 2', market:'India', status:'APPROVED', labelVersion:'LBL-A-IN-6' },
    { id:'IND-B1', product:'Product B', name:'Approved indication 1', market:'India', status:'APPROVED', labelVersion:'LBL-B-IN-4' },
    { id:'IND-B2', product:'Product B', name:'Approved indication 2', market:'EU', status:'APPROVED', labelVersion:'LBL-B-EU-3' }
  ],
  claims: [
    { id:'CLM-A-101', product:'Product A', indication:'IND-A1', wording:'Demonstrated a 24% relative reduction in the approved primary endpoint in the studied population.', audience:'HCP', jurisdiction:'India', evidence:['REF-A-01','LBL-A-IN-6 §5.1'], context:'Use only for the approved population and endpoint definition.', safetyBlock:'SB-A-04', channels:['Rep detail aid','Email','HCP portal','Webinar'], prohibited:['Consumer social','Unapproved population'], status:'APPROVED', effective:'2026-04-01', expiry:'2027-03-31', owner:'Brand + Medical + Regulatory' },
    { id:'CLM-A-102', product:'Product A', indication:'IND-A1', wording:'Once-daily dosing is approved for eligible patients according to the current label.', audience:'HCP', jurisdiction:'India', evidence:['LBL-A-IN-6 §4.2'], context:'Dosing statement must remain consistent with label.', safetyBlock:'SB-A-04', channels:['Rep detail aid','Email','HCP portal'], prohibited:['Unapproved dose'], status:'APPROVED', effective:'2026-04-01', expiry:'2027-03-31', owner:'Regulatory' },
    { id:'CLM-A-103', product:'Product A', indication:'IND-A1', wording:'Clinical evidence was generated in a randomized controlled study described in the approved reference library.', audience:'HCP', jurisdiction:'India', evidence:['REF-A-01'], context:'Do not imply outcomes beyond the approved endpoint.', safetyBlock:'SB-A-04', channels:['Rep detail aid','Email','HCP portal','Webinar'], prohibited:['Consumer social'], status:'APPROVED', effective:'2026-04-01', expiry:'2027-03-31', owner:'Medical' },
    { id:'CLM-A-104', product:'Product A', indication:'IND-A2', wording:'Approved for use in the indicated eligible adult population under the current India label.', audience:'HCP', jurisdiction:'India', evidence:['LBL-A-IN-6 §1.2'], context:'Indication-specific use only.', safetyBlock:'SB-A-05', channels:['Rep detail aid','Email','HCP portal'], prohibited:['Unapproved population'], status:'APPROVED', effective:'2026-06-15', expiry:'2027-06-14', owner:'Regulatory' },
    { id:'CLM-A-105', product:'Product A', indication:'IND-A1', wording:'The approved evidence supports meaningful clinical benefit in the studied eligible population.', audience:'HCP', jurisdiction:'India', evidence:['REF-A-02','LBL-A-IN-6'], context:'Must include population qualifier.', safetyBlock:'SB-A-04', channels:['Email','HCP portal','Rep detail aid'], prohibited:['Comparative superiority'], status:'APPROVED', effective:'2026-05-10', expiry:'2027-05-09', owner:'Brand + Medical' },
    { id:'CLM-A-106', product:'Product A', indication:'IND-A1', wording:'Product A is better than every available alternative.', audience:'HCP', jurisdiction:'India', evidence:[], context:'Unsupported superiority statement.', safetyBlock:'SB-A-04', channels:[], prohibited:['All promotional use'], status:'DRAFT', effective:null, expiry:null, owner:'Marketing' },
    { id:'CLM-B-201', product:'Product B', indication:'IND-B1', wording:'Demonstrated response in the approved biomarker-defined population described in the label.', audience:'HCP', jurisdiction:'India', evidence:['REF-B-01','LBL-B-IN-4 §5.3'], context:'Biomarker-defined approved population only.', safetyBlock:'SB-B-02', channels:['Rep detail aid','Email','HCP portal','Congress'], prohibited:['Consumer social','Unapproved biomarker groups'], status:'APPROVED', effective:'2026-03-01', expiry:'2027-02-28', owner:'Brand + Medical + Regulatory' },
    { id:'CLM-B-202', product:'Product B', indication:'IND-B1', wording:'The approved regimen is described in the current prescribing information.', audience:'HCP', jurisdiction:'India', evidence:['LBL-B-IN-4 §4'], context:'Do not alter regimen.', safetyBlock:'SB-B-02', channels:['Rep detail aid','Email','HCP portal'], prohibited:['Off-label regimen'], status:'APPROVED', effective:'2026-03-01', expiry:'2027-02-28', owner:'Regulatory' },
    { id:'CLM-B-203', product:'Product B', indication:'IND-B1', wording:'Approved evidence supports the labelled efficacy endpoint in the studied population.', audience:'HCP', jurisdiction:'India', evidence:['REF-B-02'], context:'Endpoint and population qualifier mandatory.', safetyBlock:'SB-B-02', channels:['Rep detail aid','Email','HCP portal','Congress'], prohibited:['Unsupported extrapolation'], status:'APPROVED', effective:'2026-03-01', expiry:'2027-02-28', owner:'Medical' },
    { id:'CLM-B-204', product:'Product B', indication:'IND-B2', wording:'Approved EU indication statement for the eligible population.', audience:'HCP', jurisdiction:'EU', evidence:['LBL-B-EU-3'], context:'EU only.', safetyBlock:'SB-B-EU-01', channels:['HCP portal','Rep detail aid'], prohibited:['India promotion'], status:'APPROVED', effective:'2026-01-10', expiry:'2026-12-31', owner:'EU Regulatory' },
    { id:'CLM-A-099', product:'Product A', indication:'IND-A1', wording:'Legacy efficacy statement from superseded reference.', audience:'HCP', jurisdiction:'India', evidence:['REF-A-OLD'], context:'Do not reuse.', safetyBlock:'SB-A-03', channels:[], prohibited:['All reuse'], status:'EXPIRED', effective:'2025-04-01', expiry:'2026-03-31', owner:'Regulatory' },
    { id:'CLM-A-142', product:'Product A', indication:'IND-A1', wording:'Supporting reference-linked claim currently under regulatory hold.', audience:'HCP', jurisdiction:'India', evidence:['REF-A-03-SUPERSEDED'], context:'Suspended pending impact review.', safetyBlock:'SB-A-04', channels:[], prohibited:['All new use'], status:'SUSPENDED', effective:'2026-04-01', expiry:'2027-03-31', owner:'Regulatory' }
  ],
  safetyBlocks: [
    { id:'SB-A-04', product:'Product A', market:'India', text:'Use the current approved safety and prescribing-information block for Product A. See approved prescribing information for contraindications, warnings and adverse reactions.', status:'APPROVED', version:'4' },
    { id:'SB-A-05', product:'Product A', market:'India', text:'Use the indication-specific current safety block and approved prescribing information.', status:'APPROVED', version:'5' },
    { id:'SB-B-02', product:'Product B', market:'India', text:'Use the current Product B approved safety block and prescribing information.', status:'APPROVED', version:'2' }
  ],
  hcps: Array.from({length:25}, (_,i)=>({
    id:`HCP${String(i+1).padStart(3,'0')}`,
    name:['Dr. Ananya Rao','Dr. Vikram Shah','Dr. Rohan Kapoor','Dr. Nisha Gupta','Dr. Mehul Jain','Dr. Kavya Iyer','Dr. Arjun Menon','Dr. Sara Khan','Dr. Dev Patel','Dr. Priya Bose'][i%10] + (i>=10?` ${Math.floor(i/10)+1}`:''),
    specialty:i%3===0?'Cardiology':(i%3===1?'Internal Medicine':'Endocrinology'),
    segment:['A','B','C'][i%3],
    territory:i%2===0?'Hyderabad Central':'Hyderabad East',
    consent:{email:i%5!==0, webinar:i%7!==0, rep:true, updated:'2026-08-15'},
    suppressed:i===17,
    frequency30d:i%6,
    lastEngagement:i%4===0?'Evidence page':(i%4===1?'Rep call':'Email'),
    eligibleProduct:'Product A'
  })),
  assets: [
    {id:'AST-044',name:'Product A Evidence Email v3',product:'Product A',market:'India',claimIds:['CLM-A-101','CLM-A-142'],channel:'Email',status:'ACTIVE',mlr:'APPROVED',expiry:'2026-10-31',campaigns:['CMP-001']},
    {id:'AST-045',name:'Product A Detail Aid v6',product:'Product A',market:'India',claimIds:['CLM-A-101','CLM-A-102'],channel:'Rep detail aid',status:'ACTIVE',mlr:'APPROVED',expiry:'2027-03-31',campaigns:['CMP-001']},
    {id:'AST-046',name:'Evidence Portal Tile',product:'Product A',market:'India',claimIds:['CLM-A-103'],channel:'HCP portal',status:'ACTIVE',mlr:'APPROVED',expiry:'2027-01-31',campaigns:['CMP-002']},
    {id:'AST-047',name:'Congress Leave-Behind',product:'Product A',market:'India',claimIds:['CLM-A-142'],channel:'Congress',status:'IN_REVIEW',mlr:'MEDICAL_REVIEW',expiry:'2026-11-30',campaigns:[]},
    {id:'AST-048',name:'Webinar Invitation',product:'Product A',market:'India',claimIds:['CLM-A-104'],channel:'Email',status:'ACTIVE',mlr:'APPROVED',expiry:'2026-09-30',campaigns:['CMP-003']},
    {id:'AST-101',name:'Product B HCP Email',product:'Product B',market:'India',claimIds:['CLM-B-201'],channel:'Email',status:'ACTIVE',mlr:'APPROVED',expiry:'2027-02-28',campaigns:[]}
  ],
  campaigns: [
    {id:'CMP-001',name:'Product A Evidence Wave 2',product:'Product A',market:'India',indication:'IND-A1',segment:'B',channel:'Email + Field',state:'ACTIVE',approved:true,assetIds:['AST-044','AST-045'],audienceCohort:'COH-A-B-01',mlr:'APPROVED',reach:680,engagement:42.4,guardrail:'Frequency caps + consent',owner:'Aarav Mehta'},
    {id:'CMP-002',name:'Product A HCP Portal Education',product:'Product A',market:'India',indication:'IND-A1',segment:'A',channel:'HCP portal',state:'READY_TO_ACTIVATE',approved:true,assetIds:['AST-046'],audienceCohort:'COH-A-A-02',mlr:'APPROVED',reach:0,engagement:0,guardrail:'HCP-only access',owner:'Aarav Mehta'},
    {id:'CMP-003',name:'Product A Specialist Webinar',product:'Product A',market:'India',indication:'IND-A2',segment:'A',channel:'Email + Webinar',state:'MLR_IN_REVIEW',approved:false,assetIds:['AST-048'],audienceCohort:'COH-A-A-03',mlr:'REGULATORY_REVIEW',reach:0,engagement:0,guardrail:'Consent + event rules',owner:'Aarav Mehta'}
  ],
  events: [
    {id:'EVT-001',name:'India Cardiology Congress 2026',date:'2026-08-25',type:'Congress',readiness:78,workstreams:[
      {name:'Booth material',state:'APPROVED',owner:'Marketing'},
      {name:'Speaker deck',state:'MEDICAL_REVIEW',owner:'Medical'},
      {name:'Speaker contracts',state:'2 INCOMPLETE',owner:'Legal'},
      {name:'Hospitality check',state:'1 POLICY EXCEPTION',owner:'Compliance'},
      {name:'Rep briefing',state:'82% COMPLETE',owner:'Sales Excellence'},
      {name:'Post-event email',state:'CLAIM EXPIRY RISK',owner:'Marketing'}
    ]}
  ],
  interactions: [
    {id:'INT-001',channel:'Owned social',hcpId:null,text:'I started Product A last week and experienced severe dizziness.',classification:'POTENTIAL_AE',state:'AWAITING_PV_TRIAGE',createdAt:'2026-08-21T06:20:00Z'},
    {id:'INT-002',channel:'Field note',hcpId:'HCP003',text:'Doctor asked whether Product A works in an unapproved population.',classification:'MEDICAL_INFORMATION',state:'ROUTED_TO_MEDICAL',createdAt:'2026-08-20T11:40:00Z'}
  ],
  exceptions: [
    {id:'EXC-201',type:'Claim dependency',severity:'HIGH',detail:'CLM-A-142 suspended; dependent live and in-review assets require impact assessment.',owner:'Regulatory',state:'OPEN'},
    {id:'EXC-202',type:'MLR SLA breach',severity:'MEDIUM',detail:'Speaker deck review is approaching congress critical path.',owner:'Medical',state:'OPEN'},
    {id:'EXC-203',type:'Consent mismatch',severity:'HIGH',detail:'1 suppressed HCP detected in legacy draft cohort; activation remains blocked.',owner:'CRM Operations',state:'OPEN'},
    {id:'EXC-204',type:'PV mention',severity:'CRITICAL',detail:'Potential adverse-event mention awaiting PV triage.',owner:'PV Safety',state:'OPEN'},
    {id:'EXC-205',type:'Event spend',severity:'MEDIUM',detail:'One proposed hotel expense exceeds configured local hospitality rule.',owner:'Legal / Finance',state:'OPEN'},
    {id:'EXC-206',type:'Asset expiry',severity:'LOW',detail:'Webinar invitation expires 30 September; dependent follow-up should use current approved asset.',owner:'Content Operations',state:'OPEN'}
  ],
  audit: [
    {at:'2026-08-21T07:55:00Z',actor:'System',action:'CLAIM_SUSPENDED',target:'CLM-A-142',result:'New reuse blocked; dependency impact queue created',sources:'Claims Library + Regulatory Labeling',rules:'CLAIM_LIFECYCLE_V4',level:'L3'},
    {at:'2026-08-21T07:56:00Z',actor:'System',action:'PV_ROUTE',target:'INT-001',result:'Marketing response restricted; PV workflow opened',sources:'Owned Social Monitor',rules:'SAFETY_OVERRIDES_MARKETING_V2',level:'L3'},
    {at:'2026-08-21T08:10:00Z',actor:'Aarav Mehta',action:'CAMPAIGN_REVIEW',target:'CMP-001',result:'Performance reviewed; no auto-change to approved claims',sources:'Campaign Analytics',rules:'CLOSED_LOOP_GOVERNANCE_V2',level:'L0'},
    {at:'2026-08-21T08:24:00Z',actor:'System',action:'CONSENT_FILTER',target:'COH-A-B-01',result:'Ineligible records excluded before channel activation',sources:'Consent System + CRM',rules:'CONSENT_RULE_11',level:'L2'}
  ],
  drafts: [],
  sequence:{draft:1001,campaign:100,mlr:500,pv:900,medical:700}
};

const clone = x => JSON.parse(JSON.stringify(x));
const nowIso = () => new Date().toISOString();
const d = x => x ? new Date(`${x}T00:00:00Z`) : null;
const isExpired = x => x && d(x) < d(DEMO_DATE);

export function createMarketingAgent(){
  let state = clone(seed);

  const persona = id => state.personas.find(p=>p.id===id) || state.personas[0];
  const publicPersona = p => ({id:p.id,label:p.label,name:p.name,role:p.role,market:p.market,territory:p.territory||null});
  const addAudit = (actor,action,target,result,sources,rules,level='L0') => state.audit.unshift({at:nowIso(),actor,action,target,result,sources,rules,level});
  const approvedClaims = ({product='Product A',market='India',indication,channel}={}) => state.claims.filter(c=>c.status==='APPROVED' && !isExpired(c.expiry) && c.product===product && c.jurisdiction===market && (!indication||c.indication===indication) && (!channel||c.channels.includes(channel)));
  const findHcp = id => state.hcps.find(h=>h.id===id);

  function eligibility(hcp,{product='Product A',channel='Email'}={}){
    const reasons=[];
    if(hcp.eligibleProduct!==product) reasons.push('Not in approved product segment');
    if(hcp.suppressed) reasons.push('Suppression status active');
    if(channel==='Email'&&!hcp.consent.email) reasons.push('Email consent not active');
    if(channel==='Webinar'&&!hcp.consent.webinar) reasons.push('Webinar consent not active');
    if(hcp.frequency30d>=5&&channel==='Email') reasons.push('Email frequency cap reached');
    return {hcpId:hcp.id,name:hcp.name,specialty:hcp.specialty,segment:hcp.segment,territory:hcp.territory,eligible:reasons.length===0,reasons,lastEngagement:hcp.lastEngagement,frequency30d:hcp.frequency30d};
  }

  function impactAnalysis(claimId){
    const claim=state.claims.find(c=>c.id===claimId);
    if(!claim) return null;
    const assets=state.assets.filter(a=>a.claimIds.includes(claimId));
    const campaigns=state.campaigns.filter(c=>c.assetIds.some(id=>assets.some(a=>a.id===id)));
    return {claim,assets,campaigns,liveAssets:assets.filter(a=>a.status==='ACTIVE').length,activeCampaigns:campaigns.filter(c=>c.state==='ACTIVE').length,blockedReuse:claim.status!=='APPROVED'||isExpired(claim.expiry),rule:'CLAIM_ASSET_DEPENDENCY_V3'};
  }

  function precheck({copy='',product='Product A',market='India',indication='IND-A1',channel='Email',claimIds=[]}){
    const claims=claimIds.length ? state.claims.filter(c=>claimIds.includes(c.id)) : approvedClaims({product,market,indication,channel}).slice(0,2);
    const checks=[];
    const add=(name,pass,detail,rule)=>checks.push({name,status:pass?'PASS':'FAIL',detail,rule});
    add('Approved claim match',claims.length>0&&claims.every(c=>c.status==='APPROVED'&&!isExpired(c.expiry)),claims.length?`${claims.length} selected claim(s) checked against lifecycle status.`:'No approved supporting claim found.','CLAIM_MATCH_V4');
    add('Jurisdiction',claims.every(c=>c.jurisdiction===market),`Target market: ${market}.`,'JURISDICTION_GATE_V3');
    add('Channel eligibility',claims.every(c=>c.channels.includes(channel)),`Selected claim(s) must permit ${channel}.`,'CHANNEL_RULE_V3');
    add('Evidence integrity',claims.every(c=>c.evidence?.length),`Every selected claim must retain mapped evidence.`,'REFERENCE_INTEGRITY_V2');
    const safety=claims.map(c=>c.safetyBlock).filter(Boolean);
    add('Safety / fair-balance dependency',safety.length===claims.length,`Mandatory safety blocks: ${[...new Set(safety)].join(', ')||'missing'}.`,'RISK_PRESENTATION_V3');
    const lower=copy.toLowerCase();
    const offlabel=/unapproved|off[- ]label|all patients|any patient/.test(lower);
    add('Off-label risk',!offlabel,offlabel?'Potential unapproved population or off-label wording detected.':'No obvious off-label trigger in supplied copy.','OFF_LABEL_GUARD_V5');
    const unsupported=/best|better than every|guarantee|100%|cure|zero risk/.test(lower);
    add('Unsupported / superiority risk',!unsupported,unsupported?'Unsupported superiority/absolute language detected.':'No obvious unsupported superiority language detected.','PROMO_SUBSTANTIATION_V4');
    return {ok:checks.every(c=>c.status==='PASS'),state:checks.every(c=>c.status==='PASS')?'PRECHECKED':'STOPPED',checks,claims,safetyBlocks:[...new Set(safety)].map(id=>state.safetyBlocks.find(s=>s.id===id)).filter(Boolean),market,product,indication,channel};
  }

  function createContent(body,p){
    if(!['marketing','admin'].includes(p.id)) return {status:403,payload:{error:'Content preparation requires Marketing or Admin permission'}};
    const product=body.product||'Product A', market=body.market||'India', indication=body.indication||'IND-A1', channel=body.channel||'Email', segment=body.segment||'B';
    const claims=approvedClaims({product,market,indication,channel}).slice(0,3);
    if(!claims.length) return {status:409,payload:{error:'STOP CONDITION: no approved claim supports this product / market / indication / channel combination'}};
    const safety=[...new Set(claims.map(c=>c.safetyBlock))].map(id=>state.safetyBlocks.find(s=>s.id===id)).filter(Boolean);
    const variants=[1,2,3].map(n=>({
      variant:`Variant ${n}`,
      subject:n===1?'New approved evidence for your clinical practice':n===2?'A concise evidence update for eligible specialists':'Explore the current approved evidence',
      body:`For eligible ${segment} HCPs: ${claims[0].wording} ${claims[1]?.wording||''}`.trim(),
      claimIds:claims.map(c=>c.id),
      evidence:[...new Set(claims.flatMap(c=>c.evidence))],
      safety:safety.map(s=>s.text).join(' ')
    }));
    const draft={id:`CNT-${state.sequence.draft++}`,product,market,indication,channel,segment,status:'PRECHECKED',variants,claims:claims.map(c=>c.id),createdBy:p.name,createdAt:nowIso(),mlrPackage:null};
    const pc=precheck({copy:variants[0].body,product,market,indication,channel,claimIds:draft.claims});
    if(!pc.ok) draft.status='STOPPED';
    draft.precheck=pc; state.drafts.unshift(draft);
    addAudit(p.name,'CONTENT_ASSEMBLED',draft.id,`${variants.length} variants assembled from approved claim objects`,'Claims Library + Reference Library + Channel Template','CONTROLLED_CONTENT_ASSEMBLY_V4','L1');
    return {status:201,payload:draft};
  }

  function createMlrPackage(body,p){
    const draft=state.drafts.find(x=>x.id===body.draftId); if(!draft) return {status:404,payload:{error:'Content draft not found'}};
    if(draft.status==='STOPPED') return {status:409,payload:{error:'Draft failed pre-MLR stop conditions'}};
    const pkg={id:`MLR-${state.sequence.mlr++}`,draftId:draft.id,state:'SUBMITTED',stages:[{name:'PRECHECKED',state:'COMPLETED'},{name:'MEDICAL_REVIEW',state:'PENDING'},{name:'LEGAL_REVIEW',state:'PENDING'},{name:'REGULATORY_REVIEW',state:'PENDING'}],claimAnnotations:draft.claims.map(id=>({claimId:id,evidence:state.claims.find(c=>c.id===id)?.evidence||[]})),submittedBy:p.name,submittedAt:nowIso()};
    draft.mlrPackage=pkg; draft.status='MLR_IN_REVIEW';
    addAudit(p.name,'MLR_PACKAGE_CREATED',pkg.id,'Submitted for Medical → Legal → Regulatory review','Content Draft + Claims + Evidence','MLR_STATE_MACHINE_V5','L1');
    return {status:201,payload:pkg};
  }

  function createCampaign(body,p){
    if(!['marketing','admin'].includes(p.id)) return {status:403,payload:{error:'Campaign preparation requires Marketing permission'}};
    const c={id:`CMP-${state.sequence.campaign++}`,name:body.name||'New governed HCP campaign',product:body.product||'Product A',market:body.market||'India',indication:body.indication||'IND-A1',segment:body.segment||'B',channel:body.channel||'Email',state:'BRIEF_DRAFT',approved:false,assetIds:body.assetIds||[],audienceCohort:null,mlr:'NOT_SUBMITTED',reach:0,engagement:0,guardrail:'Jurisdiction + consent + frequency + approved asset',owner:p.name};
    state.campaigns.unshift(c); addAudit(p.name,'CAMPAIGN_BRIEF_CREATED',c.id,'Brief drafted; activation locked until audience and MLR gates pass','Brand Plan + Campaign Rules','CAMPAIGN_STATE_MACHINE_V4','L1'); return {status:201,payload:c};
  }

  function activateCampaign(id,p){
    const c=state.campaigns.find(x=>x.id===id); if(!c) return {status:404,payload:{error:'Campaign not found'}};
    if(!['marketing','admin'].includes(p.id)) return {status:403,payload:{error:'Activation requires authorized Marketing / Admin role'}};
    const assets=state.assets.filter(a=>c.assetIds.includes(a.id));
    const failed=[];
    if(!c.approved||c.mlr!=='APPROVED') failed.push('Required MLR approval is absent');
    if(!assets.length) failed.push('No approved asset attached');
    if(assets.some(a=>a.status!=='ACTIVE'||a.mlr!=='APPROVED'||isExpired(a.expiry))) failed.push('Asset is not active / approved / current');
    const badClaim=assets.flatMap(a=>a.claimIds).map(id=>state.claims.find(x=>x.id===id)).filter(Boolean).find(cl=>cl.status!=='APPROVED'||isExpired(cl.expiry));
    if(badClaim) failed.push(`Claim ${badClaim.id} is ${badClaim.status}`);
    const eligible=state.hcps.map(h=>eligibility(h,{product:c.product,channel:c.channel.includes('Email')?'Email':'Rep'})).filter(x=>x.eligible&&x.segment===c.segment);
    if(!eligible.length) failed.push('No eligible audience after consent / suppression / frequency rules');
    if(failed.length){ addAudit(p.name,'CAMPAIGN_ACTIVATION_BLOCKED',c.id,failed.join('; '),'MLR + DAM + Claims + Consent','ACTIVATE_HCP_CAMPAIGN_V5','L3'); return {status:409,payload:{error:'STOP CONDITION: campaign cannot activate',failed,eligibleCount:eligible.length}}; }
    c.state='ACTIVE'; c.activatedAt=nowIso(); c.reach=eligible.length; addAudit(p.name,'CAMPAIGN_ACTIVATED',c.id,`Activated to ${eligible.length} eligible HCP(s)`,'MLR + DAM + Consent + CRM','ACTIVATE_HCP_CAMPAIGN_V5','L3'); return {status:200,payload:{...c,eligibleCount:eligible.length}};
  }

  function routeQuestion(body,p){
    const text=String(body.text||'').trim(); const q=text.toLowerCase();
    let type='APPROVED_PROMOTIONAL', action='Retrieve current approved promotional response / asset', rule='COMMERCIAL_RESPONSE_ROUTING_V3', id=null;
    if(/dizz|rash|nause|adverse|side effect|complaint|injury|hospital/.test(q)){
      type='POTENTIAL_AE'; action='Open PV / Quality workflow immediately; safety overrides marketing'; rule='SAFETY_OVERRIDES_MARKETING_V2'; id=`PV-${state.sequence.pv++}`; state.interactions.unshift({id,channel:body.channel||'Field / digital',hcpId:body.hcpId||null,text,classification:type,state:'OPEN_PV_CASE',createdAt:nowIso()});
    } else if(/unapproved|off[- ]label|population|mechanism|scientific|subgroup/.test(q)){
      type='MEDICAL_INFORMATION'; action='Route unsolicited scientific / off-label question to Medical Information; do not generate a sales answer'; rule='COMMERCIAL_MEDICAL_BOUNDARY_V4'; id=`MI-${state.sequence.medical++}`; state.interactions.unshift({id,channel:body.channel||'Field',hcpId:body.hcpId||null,text,classification:type,state:'ROUTED_TO_MEDICAL',createdAt:nowIso()});
    } else if(/price commitment|contract|discount exception/.test(q)){
      type='COMMERCIAL_LEGAL_EXCEPTION'; action='Route to authorized commercial / legal owner'; rule='COMMERCIAL_AUTHORITY_BOUNDARY_V2';
    }
    addAudit(p.name,'HCP_QUESTION_ROUTED',id||body.hcpId||'QUESTION',`${type}: ${action}`,'Field Interaction + Controlled Response Library',rule,type==='APPROVED_PROMOTIONAL'?'L0':'L4');
    return {type,action,rule,caseId:id,approvedAcknowledgement:type==='MEDICAL_INFORMATION'?'Thank you for the question. I will route it to our Medical Information team for an appropriate scientific response.':type==='POTENTIAL_AE'?'Thank you for sharing this. I need to route the information to our safety team in line with our required process.':null};
  }

  function ask(query,p){
    const q=String(query||'').trim().toLowerCase();
    if(!q) return {state:'UNKNOWN',behaviour:'KNOW',answer:'Ask about approved claims, live assets, campaign readiness, HCP eligibility, MLR, congress risk, field questions or compliance.',sources:[],rule:null};
    if(q.includes('approved claim')||q.includes('claims are approved')||q.includes('claims approved')){const list=approvedClaims({product:'Product A',market:'India'});return {state:'CONFIRMED',behaviour:'KNOW',answer:`${list.length} current approved Product A claims are available for India. ${list.slice(0,3).map(c=>`${c.id}: ${c.wording}`).join(' ')}`,sources:['Controlled Claims Library','Regulatory Labeling'],rule:'CLAIM_RETRIEVAL_V4'};}
    if(q.includes('clm-142')||q.includes('claim')&&q.includes('expire')){const i=impactAnalysis('CLM-A-142');return {state:'CONFIRMED',behaviour:'WATCH',answer:`${i.claim.id} is ${i.claim.status}. ${i.assets.length} dependent assets were found; ${i.liveAssets} are live. ${i.campaigns.length} campaign(s) depend on those assets. New reuse is blocked pending Regulatory impact review.`,sources:['Claims Library','DAM','Campaign Orchestrator'],rule:i.rule};}
    if(q.includes('campaign')&&(q.includes('underperform')||q.includes('wave 2'))){return {state:'INFERRED',behaviour:'LEARN',answer:'Wave 2 engagement is below the internal plan proxy. Evidence-page engagement remains stronger than generic follow-up. Treat this as a hypothesis, not causal attribution: test sequencing and timing while keeping claims and safety content fixed.',sources:['Campaign Analytics','CRM Activity'],rule:'ATTRIBUTION_HUMILITY_V2'};}
    if(q.includes('congress')||q.includes('launch-ready')){const e=state.events[0];const risks=e.workstreams.filter(w=>!['APPROVED'].includes(w.state));return {state:'CONFIRMED',behaviour:'WATCH',answer:`${e.name} is ${e.readiness}% ready. ${risks.length} workstreams need attention: ${risks.map(r=>`${r.name} — ${r.state}`).join('; ')}.`,sources:['Event Orchestrator','MLR','Legal','Field Enablement'],rule:'CONGRESS_CRITICAL_PATH_V3'};}
    if(q.includes('adverse')||q.includes('pv')||q.includes('safety')){const open=state.interactions.filter(i=>i.classification==='POTENTIAL_AE');return {state:'CONFIRMED',behaviour:'WATCH',answer:`${open.length} potential safety interaction(s) are in the seeded queue. Safety routing takes precedence over promotional engagement.`,sources:['Owned Channel Monitor','PV Workflow'],rule:'SAFETY_OVERRIDES_MARKETING_V2'};}
    if(q.includes('eligible')&&(q.includes('webinar')||q.includes('hcp'))){const channel=q.includes('webinar')?'Webinar':'Email';const eligible=state.hcps.map(h=>eligibility(h,{product:'Product A',channel})).filter(x=>x.eligible);return {state:'CONFIRMED',behaviour:'ACTIVATE',answer:`${eligible.length} of ${state.hcps.length} seeded HCPs pass current ${channel} eligibility after consent, suppression and frequency controls.`,sources:['CRM','Consent / Preference System'],rule:'AUDIENCE_ELIGIBILITY_V4'};}
    return {state:'CONFIRMED',behaviour:'KNOW',answer:'Zathura Marketing AI operates as a governed commercial orchestration layer. It retrieves approved claims and evidence, applies jurisdiction/consent/channel controls, routes MLR, activates only approved actions, monitors exceptions and retains an audit trail.',sources:['Marketing Agent Controlled Knowledge Base'],rule:'CONTROLLED_COMMERCIAL_ORCHESTRATION_V1'};
  }

  function commandCenter(){
    const live=state.campaigns.filter(c=>c.state==='ACTIVE');
    const approved=state.claims.filter(c=>c.status==='APPROVED'&&!isExpired(c.expiry));
    return {
      kpis:{activeCampaigns:live.length,approvedClaims:approved.length,openExceptions:state.exceptions.filter(e=>e.state==='OPEN').length,mlrInReview:state.campaigns.filter(c=>String(c.mlr).includes('REVIEW')).length,eligibleHcps:state.hcps.map(h=>eligibility(h,{product:'Product A',channel:'Email'})).filter(x=>x.eligible).length,pvOpen:state.interactions.filter(i=>i.classification==='POTENTIAL_AE'&&i.state!=='CLOSED').length},
      signals:[
        {area:'Brand performance',level:'GREEN',headline:'Product A demand tracking near internal plan',detail:'No automatic causal attribution to campaign activity.'},
        {area:'Content',level:'RED',headline:'Suspended claim dependency requires action',detail:'CLM-A-142 blocks new reuse and affects live/in-review assets.'},
        {area:'Field',level:'AMBER',headline:'Medical question routing active',detail:'One unsolicited scientific question routed to Medical Information.'},
        {area:'Congress',level:'AMBER',headline:'Critical path has unresolved items',detail:'Speaker review, contracts, hospitality exception and post-event claim risk remain.'},
        {area:'Compliance',level:'RED',headline:'Potential adverse-event mention awaiting triage',detail:'PV workflow overrides marketing follow-up.'}
      ],
      campaigns:state.campaigns,
      exceptions:state.exceptions,
      events:state.events,
      assets:state.assets,
      interactions:state.interactions
    };
  }

  async function readBody(req){return await new Promise((resolve,reject)=>{let data='';req.on('data',c=>{data+=c;if(data.length>1_000_000){req.destroy();reject(new Error('Request body too large'));}});req.on('end',()=>{if(!data)return resolve({});try{resolve(JSON.parse(data));}catch{reject(new Error('Invalid JSON body'));}});req.on('error',reject);});}

  async function handle(req,url){
    if(!url.pathname.startsWith('/api/marketing')) return null;
    const p=persona(url.searchParams.get('persona')||'marketing');
    if(url.pathname==='/api/marketing/config'&&req.method==='GET') return {status:200,payload:{appName:'Zathura.AI Marketing Manager',demoDate:DEMO_DATE,thesis:'Governed commercial operating layer above CRM, DAM, MLR, analytics, consent, events and content systems',brains:['Language','Knowledge','Rules','Action'],behaviours:['KNOW','CREATE','ORCHESTRATE','ACTIVATE','WATCH','LEARN'],personas:state.personas.map(publicPersona)}};
    if(url.pathname==='/api/marketing/personas'&&req.method==='GET') return {status:200,payload:state.personas.map(publicPersona)};
    if(url.pathname==='/api/marketing/summary'&&req.method==='GET') return {status:200,payload:commandCenter()};
    if(url.pathname==='/api/marketing/ask'&&req.method==='POST'){const b=await readBody(req);const r=ask(b.query,p);addAudit(p.name,'ASK_ZATHURA',String(b.query||'').slice(0,90),r.state,r.sources.join(' + '),r.rule||'N/A','L0');return {status:200,payload:r};}
    if(url.pathname==='/api/marketing/claims'&&req.method==='GET'){let c=state.claims;const product=url.searchParams.get('product'),status=url.searchParams.get('status'),market=url.searchParams.get('market');if(product)c=c.filter(x=>x.product===product);if(status)c=c.filter(x=>x.status===status);if(market)c=c.filter(x=>x.jurisdiction===market);return {status:200,payload:c};}
    const impact=url.pathname.match(/^\/api\/marketing\/claims\/([^/]+)\/impact$/); if(impact&&req.method==='GET'){const r=impactAnalysis(impact[1]);return r?{status:200,payload:r}:{status:404,payload:{error:'Claim not found'}};}
    if(url.pathname==='/api/marketing/validate-copy'&&req.method==='POST'){const b=await readBody(req);return {status:200,payload:precheck(b)};}
    if(url.pathname==='/api/marketing/content'&&req.method==='GET') return {status:200,payload:state.drafts};
    if(url.pathname==='/api/marketing/content'&&req.method==='POST'){const b=await readBody(req);return createContent(b,p);}
    if(url.pathname==='/api/marketing/mlr-package'&&req.method==='POST'){const b=await readBody(req);return createMlrPackage(b,p);}
    if(url.pathname==='/api/marketing/campaigns'&&req.method==='GET') return {status:200,payload:state.campaigns};
    if(url.pathname==='/api/marketing/campaigns'&&req.method==='POST'){const b=await readBody(req);return createCampaign(b,p);}
    const act=url.pathname.match(/^\/api\/marketing\/campaigns\/([^/]+)\/activate$/); if(act&&req.method==='POST') return activateCampaign(act[1],p);
    if(url.pathname==='/api/marketing/audience/eligible'&&req.method==='GET'){const product=url.searchParams.get('product')||'Product A',channel=url.searchParams.get('channel')||'Email',segment=url.searchParams.get('segment');let rows=state.hcps.map(h=>eligibility(h,{product,channel}));if(segment)rows=rows.filter(x=>x.segment===segment);return {status:200,payload:{eligible:rows.filter(x=>x.eligible),ineligible:rows.filter(x=>!x.eligible),rule:'AUDIENCE_ELIGIBILITY_V4'}};}
    if(url.pathname==='/api/marketing/field/precall'&&req.method==='GET'){const h=findHcp(url.searchParams.get('hcpId')||'HCP003');if(!h)return {status:404,payload:{error:'HCP not found'}};if(!['field','marketing','admin'].includes(p.id))return {status:403,payload:{error:'HCP context is restricted for this persona'}};return {status:200,payload:{hcp:{id:h.id,name:h.name,specialty:h.specialty,segment:h.segment,territory:h.territory,consent:h.consent,lastEngagement:h.lastEngagement},objective:`Approved Product A objective for Segment ${h.segment}`,approvedContent:state.assets.filter(a=>a.product==='Product A'&&a.status==='ACTIVE'&&a.mlr==='APPROVED').map(a=>({id:a.id,name:a.name,channel:a.channel})),suggestedPlan:['Confirm permitted discussion objective','Use current approved detail aid','Capture question and route Medical/PV exceptions'],rule:'FIELD_PRECALL_MINIMUM_NECESSARY_V3'}};}
    if(url.pathname==='/api/marketing/field/route-question'&&req.method==='POST'){const b=await readBody(req);return {status:200,payload:routeQuestion(b,p)};}
    if(url.pathname==='/api/marketing/events'&&req.method==='GET') return {status:200,payload:state.events};
    if(url.pathname==='/api/marketing/compliance'&&req.method==='GET') return {status:200,payload:{exceptions:state.exceptions,interactions:state.interactions,governance:{architecture:'Business signal → identity/role → product/market/audience → approved claims/evidence → rules/consent → workflow → MLR/human approval → execution → measurement → audit',autonomy:['L0 Inform','L1 Prepare','L2 Reversible low risk','L3 Execute after approval','L4 Human judgment mandatory'],stopConditions:['Missing product / market / audience context','No approved supporting claim','Potential off-label use','Required safety content missing','Expired / suspended claim or asset','Consent missing','Jurisdiction conflict','MLR approval missing','Potential adverse event / product complaint','Commercial / Medical boundary crossed','User lacks permission','Authoritative data conflict']}}};
    if(url.pathname==='/api/marketing/audit'&&req.method==='GET'){if(!['admin','regulatory','medical','legal','pv','marketing'].includes(p.id))return {status:403,payload:{error:'Audit access not permitted'}};return {status:200,payload:state.audit};}
    if(url.pathname==='/api/marketing/reset'&&req.method==='POST'){state=clone(seed);return {status:200,payload:{ok:true,claims:state.claims.length,campaigns:state.campaigns.length,hcps:state.hcps.length}};}
    return {status:404,payload:{error:'Marketing Manager API route not found'}};
  }
  return {handle};
}
