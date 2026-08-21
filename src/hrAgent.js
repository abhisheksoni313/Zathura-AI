const DEMO_DATE = '2026-08-21';

const seed = {
  personas: [
    { id: 'employee', label: 'Employee', employeeId: 'EMP10417', name: 'Abhishek Soni', role: 'QC Analyst', site: 'Hyderabad', permissions: ['self_read','leave_submit','document_read','training_read'] },
    { id: 'manager', label: 'Manager', employeeId: 'MGR2001', name: 'Maya Iyer', role: 'Production Manager', site: 'Hyderabad', permissions: ['team_read','leave_approve','readiness_read','shift_propose','roster_approve'] },
    { id: 'hr', label: 'HR / HRBP', employeeId: 'HR3001', name: 'Priya Nair', role: 'HR Business Partner', site: 'Hyderabad', permissions: ['employee_read','policy_read','workflow_admin','recruitment','onboarding','payroll_exception','case_manage'] },
    { id: 'qa', label: 'QA', employeeId: 'QA4001', name: 'Kavya Rao', role: 'QA Manager', site: 'Hyderabad', permissions: ['qualification_read','qualification_approve','sop_revise','readiness_read','roster_approve','audit_read'] },
    { id: 'chro', label: 'CHRO', employeeId: 'CHRO001', name: 'Ananya Menon', role: 'Chief Human Resources Officer', site: 'Corporate', permissions: ['executive_read','employee_read','audit_read','workflow_admin','exception_approve'] }
  ],
  policies: [
    { id: 'POL-LEAVE-IN-005', title: 'India Leave & Time-Off Policy', version: '5.0', jurisdiction: 'India', employeeCategory: 'Regular', location: 'All India', businessUnit: 'All', effectiveDate: '2026-04-01', expiryDate: null, owner: 'HR Operations', approvalStatus: 'APPROVED', sourceDocument: 'Controlled HR Policy Library', clauses: { annualLeave: 18, sickLeave: 10, casualLeave: 6, carryForward: 12, approval: 'Reporting manager' } },
    { id: 'POL-ATT-004', title: 'Attendance, Shift & Weekly Rest Policy', version: '4.0', jurisdiction: 'India', employeeCategory: 'Plant Workforce', location: 'Manufacturing Sites', businessUnit: 'Operations', effectiveDate: '2026-01-01', expiryDate: null, owner: 'Plant HR', approvalStatus: 'APPROVED', sourceDocument: 'Controlled HR Policy Library', clauses: { maxWeeklyHours: 48, preferredWeeklyHours: 40, minRestHours: 11, shiftApproval: 'Authorized manager' } },
    { id: 'POL-QUAL-007', title: 'GMP Role Qualification & Operational Authorization Standard', version: '7.0', jurisdiction: 'Global', employeeCategory: 'Regulated Workforce', location: 'GMP Sites', businessUnit: 'Quality & Operations', effectiveDate: '2026-06-15', expiryDate: null, owner: 'Quality Assurance', approvalStatus: 'APPROVED', sourceDocument: 'QMS Document Control', clauses: { currentSopRequired: true, equipmentAuthorizationRequired: true, expiredCertificationBlocksAssignment: true } },
    { id: 'POL-NOTICE-003', title: 'Employment Separation & Notice Policy', version: '3.0', jurisdiction: 'India', employeeCategory: 'Regular', location: 'All India', businessUnit: 'All', effectiveDate: '2026-01-01', expiryDate: null, owner: 'HR Operations', approvalStatus: 'APPROVED', sourceDocument: 'Controlled HR Policy Library', clauses: { defaultNoticeDays: 90 } }
  ],
  employees: [
    { id:'EMP10417', name:'Abhishek Soni', status:'ACTIVE', role:'QC Analyst', department:'Quality Control', site:'Hyderabad', area:'QC Laboratory B', managerId:'MGR2002', managerName:'Rohan Desai', hrbp:'Priya Nair', employeeCategory:'Regular', joinDate:'2026-06-01', probationEnd:'2026-11-30', weeklyHours:36, shift:'Day', leave:{annual:11,sick:8,casual:4}, payroll:{gross:118000,deductions:18500,net:99500,lastMonthNet:101900,drivers:['₹2,400 lower reimbursement payout this month']}, access:['HYD_SITE','QC_LAB_B','LIMS'], equipment:['HPLC-07','HPLC-11'], processes:['QC_HPLC_TESTING'], qualifications:[{id:'QUAL-HPLC-07',name:'Independent HPLC-07 Operator',validUntil:'2026-11-16',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-02-12'},{id:'SOP-330',name:'HPLC Operation',version:'5',status:'COMPLETED',validUntil:'2027-01-20'}], certifications:[{name:'Analytical Lab Safety',validUntil:'2027-03-31'}], restrictions:[], available:true },
    { id:'EMP11001', name:'Riya Sharma', status:'ACTIVE', role:'QA Executive', department:'Quality Assurance', site:'Hyderabad', area:'Packaging Line 4', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2024-02-15', probationEnd:null, weeklyHours:32, shift:'B', leave:{annual:8,sick:6,casual:3}, access:['HYD_SITE','PACK_LINE_4','QMS'], equipment:['PACK-L4'], processes:['QA_LINE_CLEARANCE'], qualifications:[{id:'QUAL-QA-L4',name:'QA Line 4 Clearance Approver',validUntil:'2027-02-28',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-01-31'},{id:'SOP-412',name:'Packaging Line Clearance',version:'7',status:'COMPLETED',validUntil:'2027-01-31'}], certifications:[{name:'Aseptic Operations',validUntil:'2027-01-15'}], restrictions:[], available:false, absence:{date:'2026-08-21',reason:'Sick leave'} },
    { id:'EMP11002', name:'Rahul Verma', status:'ACTIVE', role:'QA Executive', department:'Quality Assurance', site:'Hyderabad', area:'Packaging', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2023-07-10', probationEnd:null, weeklyHours:32, shift:'A', leave:{annual:12,sick:8,casual:4}, access:['HYD_SITE','PACK_LINE_4','QMS'], equipment:['PACK-L4'], processes:['QA_LINE_CLEARANCE'], qualifications:[{id:'QUAL-QA-L4',name:'QA Line 4 Clearance Approver',validUntil:'2026-12-20',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-02-01'},{id:'SOP-412',name:'Packaging Line Clearance',version:'7',status:'COMPLETED',validUntil:'2027-02-01'}], certifications:[{name:'Aseptic Operations',validUntil:'2026-12-20'}], restrictions:[], available:true },
    { id:'EMP11003', name:'Nisha Kulkarni', status:'ACTIVE', role:'QA Executive', department:'Quality Assurance', site:'Hyderabad', area:'Packaging', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2022-04-11', probationEnd:null, weeklyHours:36, shift:'A', leave:{annual:5,sick:7,casual:2}, access:['HYD_SITE','PACK_LINE_4','QMS'], equipment:['PACK-L4'], processes:['QA_LINE_CLEARANCE'], qualifications:[{id:'QUAL-QA-L4',name:'QA Line 4 Clearance Approver',validUntil:'2026-09-04',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2026-10-31'},{id:'SOP-412',name:'Packaging Line Clearance',version:'7',status:'COMPLETED',validUntil:'2026-09-04'}], certifications:[{name:'Aseptic Operations',validUntil:'2026-09-04'}], restrictions:[], available:true },
    { id:'EMP11004', name:'Arvind Rao', status:'ACTIVE', role:'QA Executive', department:'Quality Assurance', site:'Hyderabad', area:'Packaging', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2021-10-18', probationEnd:null, weeklyHours:38, shift:'C', leave:{annual:14,sick:9,casual:5}, access:['HYD_SITE','PACK_LINE_4','QMS'], equipment:['PACK-L4'], processes:['QA_LINE_CLEARANCE'], qualifications:[{id:'QUAL-QA-L4',name:'QA Line 4 Clearance Approver',validUntil:'2026-11-18',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-03-01'},{id:'SOP-412',name:'Packaging Line Clearance',version:'7',status:'COMPLETED',validUntil:'2026-11-18'}], certifications:[{name:'Aseptic Operations',validUntil:'2026-11-18'}], restrictions:[], available:true },
    { id:'EMP11005', name:'Fatima Khan', status:'ACTIVE', role:'QA Executive', department:'Quality Assurance', site:'Hyderabad', area:'Packaging', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2025-01-06', probationEnd:null, weeklyHours:28, shift:'A', leave:{annual:10,sick:8,casual:4}, access:['HYD_SITE','QMS'], equipment:['PACK-L3'], processes:['QA_LINE_CLEARANCE'], qualifications:[{id:'QUAL-QA-L3',name:'QA Line 3 Clearance Approver',validUntil:'2027-01-05',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-01-05'},{id:'SOP-412',name:'Packaging Line Clearance',version:'7',status:'COMPLETED',validUntil:'2027-01-05'}], certifications:[{name:'Aseptic Operations',validUntil:'2027-01-05'}], restrictions:[], available:true },
    { id:'EMP12001', name:'Arjun Nair', status:'ACTIVE', role:'Production Technician', department:'Production', site:'Hyderabad', area:'Sterile Operations', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2022-08-08', probationEnd:null, weeklyHours:40, shift:'B', leave:{annual:9,sick:8,casual:3}, access:['HYD_SITE','STERILE_AREA','LINE_B'], equipment:['ASEP-02'], processes:['ASEPTIC_FILLING'], qualifications:[{id:'QUAL-ASEP-02',name:'Aseptic Filling Operator',validUntil:'2026-08-28',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2026-10-12'},{id:'SOP-501',name:'Aseptic Filling',version:'9',status:'COMPLETED',validUntil:'2026-08-28'}], certifications:[{name:'Aseptic Operator Certification',validUntil:'2026-08-28'}], restrictions:[], available:true },
    { id:'EMP12002', name:'Neha Patil', status:'ACTIVE', role:'Production Technician', department:'Production', site:'Hyderabad', area:'Sterile Operations', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2023-03-21', probationEnd:null, weeklyHours:32, shift:'B', leave:{annual:7,sick:9,casual:4}, access:['HYD_SITE','STERILE_AREA','LINE_B'], equipment:['ASEP-02'], processes:['ASEPTIC_FILLING'], qualifications:[{id:'QUAL-ASEP-02',name:'Aseptic Filling Operator',validUntil:'2027-01-20',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-01-20'},{id:'SOP-501',name:'Aseptic Filling',version:'9',status:'COMPLETED',validUntil:'2027-01-20'}], certifications:[{name:'Aseptic Operator Certification',validUntil:'2027-01-20'}], restrictions:[], available:false, approvedLeave:{start:'2026-08-21',end:'2026-08-23'} },
    { id:'EMP12003', name:'Sanjay Pillai', status:'ACTIVE', role:'Production Technician', department:'Production', site:'Hyderabad', area:'Sterile Operations', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2024-06-17', probationEnd:null, weeklyHours:30, shift:'A', leave:{annual:13,sick:10,casual:5}, access:['HYD_SITE','STERILE_AREA','LINE_B'], equipment:['ASEP-02'], processes:['ASEPTIC_FILLING'], qualifications:[{id:'QUAL-ASEP-02',name:'Aseptic Filling Operator',validUntil:'2027-02-14',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2027-02-14'},{id:'SOP-501',name:'Aseptic Filling',version:'9',status:'COMPLETED',validUntil:'2027-02-14'}], certifications:[{name:'Aseptic Operator Certification',validUntil:'2027-02-14'}], restrictions:[], available:true },
    { id:'EMP12004', name:'Meera Das', status:'ACTIVE', role:'Production Technician', department:'Production', site:'Hyderabad', area:'Sterile Operations', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2024-11-04', probationEnd:null, weeklyHours:34, shift:'C', leave:{annual:15,sick:9,casual:5}, access:['HYD_SITE','STERILE_AREA','LINE_B'], equipment:['ASEP-02'], processes:['ASEPTIC_FILLING'], qualifications:[{id:'QUAL-ASEP-02',name:'Aseptic Filling Operator',validUntil:'2026-09-12',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'COMPLETED',validUntil:'2026-12-01'},{id:'SOP-501',name:'Aseptic Filling',version:'9',status:'COMPLETED',validUntil:'2026-09-12'}], certifications:[{name:'Aseptic Operator Certification',validUntil:'2026-09-12'}], restrictions:[], available:true },
    { id:'EMP12005', name:'Vikram Singh', status:'ACTIVE', role:'Production Technician', department:'Production', site:'Hyderabad', area:'Sterile Operations', managerId:'MGR2001', managerName:'Maya Iyer', hrbp:'Priya Nair', employeeCategory:'Plant Workforce', joinDate:'2025-02-03', probationEnd:null, weeklyHours:36, shift:'A', leave:{annual:16,sick:10,casual:5}, access:['HYD_SITE','STERILE_AREA','LINE_B'], equipment:['ASEP-02'], processes:['ASEPTIC_FILLING'], qualifications:[{id:'QUAL-ASEP-02',name:'Aseptic Filling Operator',validUntil:'2027-02-03',status:'CURRENT'}], training:[{id:'GMP-ANNUAL',name:'Annual GMP',version:'2026',status:'OVERDUE',validUntil:'2026-08-18'},{id:'SOP-501',name:'Aseptic Filling',version:'9',status:'COMPLETED',validUntil:'2027-02-03'}], certifications:[{name:'Aseptic Operator Certification',validUntil:'2027-02-03'}], restrictions:[], available:true }
  ],
  taskCatalog: {
    QA_LINE4_CLEARANCE: { id:'QA_LINE4_CLEARANCE', label:'QA Line 4 Clearance', site:'Hyderabad', role:'QA Executive', equipment:'PACK-L4', process:'QA_LINE_CLEARANCE', qualification:'QUAL-QA-L4', sop:{id:'SOP-412',version:'7'}, access:['PACK_LINE_4','QMS'], maxHours:40 },
    ASEPTIC_SHIFT_B: { id:'ASEPTIC_SHIFT_B', label:'Sterile Shift B — Aseptic Filling', site:'Hyderabad', role:'Production Technician', equipment:'ASEP-02', process:'ASEPTIC_FILLING', qualification:'QUAL-ASEP-02', sop:{id:'SOP-501',version:'9'}, access:['STERILE_AREA','LINE_B'], maxHours:40 }
  },
  leaveRequests: [
    { id:'LR-1001', employeeId:'EMP12002', employeeName:'Neha Patil', leaveType:'annual', startDate:'2026-08-21', endDate:'2026-08-23', days:3, state:'APPROVED', approver:'Maya Iyer', createdAt:'2026-08-14T10:00:00Z' },
    { id:'LR-1002', employeeId:'EMP11003', employeeName:'Nisha Kulkarni', leaveType:'casual', startDate:'2026-08-24', endDate:'2026-08-24', days:1, state:'PENDING_APPROVAL', approver:'Maya Iyer', createdAt:'2026-08-20T08:10:00Z' },
    { id:'LR-1003', employeeId:'EMP12003', employeeName:'Sanjay Pillai', leaveType:'annual', startDate:'2026-08-26', endDate:'2026-08-27', days:2, state:'PENDING_APPROVAL', approver:'Maya Iyer', createdAt:'2026-08-20T09:15:00Z' }
  ],
  payrollExceptions: [
    { id:'PAY-813', employeeId:'EMP10417', type:'Promotion effective-date mismatch', hrmsValue:'1 August 2026', payrollValue:'1 September 2026', impact:'₹12,400', owner:'HR Operations', nextStep:'Verify approved promotion letter', severity:'HIGH' },
    { id:'PAY-824', employeeId:'EMP13104', type:'Missing bank details', impact:'Payroll hold risk', owner:'Payroll', nextStep:'Request verified bank proof', severity:'MEDIUM' }
  ],
  onboarding: [
    { id:'ONB-301', employee:'Aisha Khan', role:'QC Analyst', site:'Hyderabad', joiningDate:'2026-08-24', readiness:72, blocker:'Laptop assignment incomplete', stage:'Preboarding' },
    { id:'ONB-302', employee:'Dev Mehta', role:'Microbiologist', site:'Hyderabad', joiningDate:'2026-08-24', readiness:84, blocker:'Plant access approval pending', stage:'Preboarding' },
    { id:'ONB-303', employee:'Tara Bose', role:'Production Analyst', site:'Goa', joiningDate:'2026-08-27', readiness:91, blocker:'Mandatory safety induction pending', stage:'Preboarding' }
  ],
  requisitions: [
    { id:'REQ-4401', role:'QC Analyst', site:'Hyderabad', openings:2, status:'INTERVIEWING', candidates:6, owner:'Priya Nair', salaryBand:'₹9.5L–₹12.5L', mandatory:['B.Pharm/M.Sc.','GMP exposure','HPLC experience'] },
    { id:'REQ-4402', role:'Production Technician', site:'Hyderabad', openings:3, status:'OPEN', candidates:11, owner:'Priya Nair', salaryBand:'₹6.0L–₹8.0L', mandatory:['Diploma/B.Sc.','GMP manufacturing','Shift eligibility'] }
  ],
  cases: [
    { id:'HR-2941', type:'Policy conflict', subject:'Notice period conflict', owner:'Plant HR', sla:'4h', state:'OPEN', sensitivity:'NORMAL', detail:'Employment contract states 90 days; older FAQ states 60 days. Both sources attached.' },
    { id:'ER-118', type:'Employee relations', subject:'Confidential employee relations case', owner:'Employee Relations', sla:'1d', state:'IN_PROGRESS', sensitivity:'RESTRICTED', detail:'Restricted: details available only to authorized Employee Relations users.' }
  ],
  staffingRisks: [
    { id:'RISK-01', site:'Hyderabad', area:'Packaging Line 3', severity:'AMBER', detail:'3 certifications expire within 14 days; potential staffing deficiency next month.' },
    { id:'RISK-02', site:'Hyderabad', area:'Sterile Shift B', severity:'RED', detail:'Only 2 currently available aseptic-qualified operators for a minimum requirement of 3.' },
    { id:'RISK-03', site:'Goa', area:'QC', severity:'AMBER', detail:'2 analysts enter qualification renewal window within 30 days.' }
  ],
  audit: [
    { id:'AUD-0001', at:'2026-08-21T08:00:00Z', actor:'SYSTEM', action:'PAYROLL_PRE_CLOSE', target:'Payroll August 2026', result:'2 exceptions surfaced', source:'HRMS + Attendance + Payroll', rule:'PAYROLL_RECON_V3', autonomy:'L2' },
    { id:'AUD-0002', at:'2026-08-21T08:15:00Z', actor:'SYSTEM', action:'CERTIFICATION_EXPIRING', target:'Arjun Nair', result:'Renewal workflow created', source:'Qualification System', rule:'CERT_EXPIRY_30D_V2', autonomy:'L2' }
  ],
  sopVersions: { 'SOP-412':'7', 'SOP-501':'9', 'SOP-330':'5' },
  shiftProposals: [],
  sequence: { leave: 1004, audit: 3, requisition: 4403, proposal: 1 }
};

function clone(value){ return JSON.parse(JSON.stringify(value)); }
function date(value){ return new Date(`${value}T00:00:00Z`); }
function daysBetween(a,b){ return Math.round((date(b)-date(a))/86400000); }
function countInclusive(start,end){ return Math.max(1, daysBetween(start,end)+1); }
function nowIso(){ return new Date().toISOString(); }
function inRange(value,start,end){ return date(value)>=date(start) && date(value)<=date(end); }
function isExpired(value, asOf=DEMO_DATE){ return date(value) < date(asOf); }
function withinDays(value, n, asOf=DEMO_DATE){ const d=daysBetween(asOf,value); return d>=0 && d<=n; }

function publicPersona(p){ return { id:p.id,label:p.label,employeeId:p.employeeId,name:p.name,role:p.role,site:p.site }; }

export function createHrAgent(){
  let state = clone(seed);

  const getPersona = (id='employee') => state.personas.find(p=>p.id===id) || state.personas[0];
  const findEmployee = id => state.employees.find(e=>e.id===id);
  const teamFor = persona => state.employees.filter(e=>e.managerId===persona.employeeId);

  function addAudit(actor, action, target, result, source='Zathura HR Agent', rule='N/A', autonomy='L2'){
    const item={ id:`AUD-${String(state.sequence.audit++).padStart(4,'0')}`, at:nowIso(), actor, action, target, result, source, rule, autonomy };
    state.audit.unshift(item); return item;
  }

  function redactEmployee(emp, persona){
    if(!emp) return null;
    const base={ id:emp.id,name:emp.name,status:emp.status,role:emp.role,department:emp.department,site:emp.site,area:emp.area,managerId:emp.managerId,managerName:emp.managerName,weeklyHours:emp.weeklyHours,shift:emp.shift,available:emp.available,qualifications:emp.qualifications,training:emp.training,certifications:emp.certifications };
    if(persona.id==='employee' && emp.id===persona.employeeId) return { ...base, hrbp:emp.hrbp,joinDate:emp.joinDate,probationEnd:emp.probationEnd,leave:emp.leave,payroll:emp.payroll,access:emp.access,equipment:emp.equipment,processes:emp.processes,restrictions:emp.restrictions };
    if(['hr','chro'].includes(persona.id)) return { ...base, hrbp:emp.hrbp,joinDate:emp.joinDate,probationEnd:emp.probationEnd,leave:emp.leave,access:emp.access,equipment:emp.equipment,processes:emp.processes,restrictions:emp.restrictions };
    if(persona.id==='manager' && emp.managerId===persona.employeeId) return { ...base, leaveStatus: emp.approvedLeave ? 'APPROVED LEAVE' : (emp.absence ? 'ABSENT' : 'AVAILABLE'), access:emp.access.filter(x=>!x.includes('BANK')),equipment:emp.equipment,processes:emp.processes,restrictions:emp.restrictions.map(()=> 'Operational restriction present') };
    if(persona.id==='qa') return { ...base, access:emp.access,equipment:emp.equipment,processes:emp.processes,restrictions:emp.restrictions.map(()=> 'Operational restriction present') };
    return base;
  }

  function readiness(employeeId, taskId, shiftDate=DEMO_DATE){
    const emp=findEmployee(employeeId); const task=state.taskCatalog[taskId];
    if(!emp || !task) return { status:'UNKNOWN', ready:false, failed:['Employee or task not found'], checks:[] };
    const checks=[]; const push=(id,label,ok,detail)=>checks.push({id,label,status:ok?'PASS':'FAIL',detail});
    push('employment','Employment status',emp.status==='ACTIVE',emp.status==='ACTIVE'?'Employee active':`Status is ${emp.status}`);
    push('role','Role authorization',emp.role===task.role,emp.role===task.role?`Approved role: ${emp.role}`:`Requires ${task.role}; employee is ${emp.role}`);
    push('site','Site authorization',emp.site===task.site,emp.site===task.site?`Authorized site: ${emp.site}`:`Requires ${task.site}`);
    const qual=emp.qualifications.find(q=>q.id===task.qualification);
    push('qualification','Process qualification',Boolean(qual)&&qual.status==='CURRENT'&&!isExpired(qual.validUntil,shiftDate),qual?`${qual.name} valid until ${qual.validUntil}`:`Missing ${task.qualification}`);
    const tr=emp.training.find(t=>t.id===task.sop.id && String(t.version)===String(task.sop.version));
    push('sop','SOP readiness',Boolean(tr)&&tr.status==='COMPLETED'&&!isExpired(tr.validUntil,shiftDate),tr?`${tr.id} v${tr.version} ${tr.status}, valid until ${tr.validUntil}`:`Requires ${task.sop.id} v${task.sop.version}`);
    push('equipment','Equipment qualification',emp.equipment.includes(task.equipment),emp.equipment.includes(task.equipment)?`Authorized on ${task.equipment}`:`Not authorized on ${task.equipment}`);
    push('process','Process authorization',emp.processes.includes(task.process),emp.processes.includes(task.process)?`Authorized for ${task.process}`:`Missing process authorization ${task.process}`);
    const requiredAccess=task.access.filter(a=>!emp.access.includes(a));
    push('access','Required access',requiredAccess.length===0,requiredAccess.length===0?'Required physical/digital access valid':`Missing: ${requiredAccess.join(', ')}`);
    push('availability','Availability',emp.available!==false,emp.available!==false?'Available for assignment':(emp.absence?`Unavailable: ${emp.absence.reason}`:'Unavailable / approved leave'));
    push('hours','Hours / rest rules',emp.weeklyHours<=task.maxHours,`${emp.weeklyHours} hours scheduled this week; threshold ${task.maxHours}`);
    push('restriction','Work restriction',!emp.restrictions?.length,!emp.restrictions?.length?'No assignment-blocking restriction':'Operational restriction prevents assignment');
    const failed=checks.filter(c=>c.status==='FAIL');
    return { employeeId, employeeName:emp.name, taskId, taskLabel:task.label, asOf:shiftDate, status:failed.length?'NOT_READY':'READY', ready:failed.length===0, failed:failed.map(f=>f.label), checks, rule:`${taskId}_ELIGIBILITY_V4`, sources:['HRMS','LMS','QMS / Qualification System','Roster','IAM'] };
  }

  function controlTower(persona){
    const expiring=[]; const overdue=[];
    state.employees.forEach(e=>{
      e.qualifications.forEach(q=>{if(withinDays(q.validUntil,30)) expiring.push({employeeId:e.id,employee:e.name,item:q.name,validUntil:q.validUntil,site:e.site});});
      e.training.forEach(t=>{if(t.status!=='COMPLETED'||isExpired(t.validUntil)) overdue.push({employeeId:e.id,employee:e.name,item:t.name,status:t.status,validUntil:t.validUntil});});
    });
    const pendingApprovals=state.leaveRequests.filter(r=>r.state==='PENDING_APPROVAL');
    return {
      asOf:DEMO_DATE,
      kpis:{ pendingApprovals:pendingApprovals.length+24, payrollExceptions:state.payrollExceptions.length+12, overdueTrainings:overdue.length+41, joiningThisWeek:state.onboarding.length+4, staffingRisks:state.staffingRisks.length, hrCases:state.cases.length+9 },
      staffingRisks:state.staffingRisks,
      payrollExceptions:state.payrollExceptions,
      qualificationExpiries:expiring,
      overdueTraining:overdue,
      onboarding:state.onboarding,
      requisitions:state.requisitions,
      cases:state.cases.map(c=> c.sensitivity==='RESTRICTED' && !['hr','chro'].includes(persona.id) ? {...c,detail:'Restricted case — details hidden by field-level permissioning.'}:c),
      dailyBrief:{ teamEmployees:47, qualificationsExpiring7d:expiring.filter(x=>withinDays(x.validUntil,7)).length, leaveAwaiting:pendingApprovals.length, joinerMonday:1, joinerBlocker:'Laptop assignment incomplete' }
    };
  }

  function policyAnswer(query){
    const q=query.toLowerCase();
    let p=state.policies[0];
    if(q.includes('attendance')||q.includes('shift')||q.includes('overtime')||q.includes('rest')) p=state.policies.find(x=>x.id==='POL-ATT-004');
    if(q.includes('qualification')||q.includes('sop')||q.includes('training')||q.includes('authorized')) p=state.policies.find(x=>x.id==='POL-QUAL-007');
    if(q.includes('notice')||q.includes('resign')||q.includes('separation')) p=state.policies.find(x=>x.id==='POL-NOTICE-003');
    return p;
  }

  function ask(query, persona){
    const q=String(query||'').trim().toLowerCase();
    if(!q) return { state:'UNKNOWN', mode:'KNOW', answer:'Ask me an HR, workforce readiness, policy, leave, payroll, onboarding or staffing question.', sources:[], rule:null };
    const self=findEmployee(persona.employeeId);
    if(q.includes('employee id')) return { state:'CONFIRMED', mode:'FIND', answer:`Your employee ID is ${persona.employeeId}.`, sources:['HRMS — Employment Profile'], rule:'IDENTITY_CONTEXT_V1' };
    if(q.includes('hrbp')) return { state:'CONFIRMED', mode:'FIND', answer:self?`Your HRBP is ${self.hrbp}.`:'No employee HRBP is attached to this demo persona.', sources:['HRMS — Organization Assignment'], rule:'IDENTITY_CONTEXT_V1' };
    if(q.includes('probation')) return { state:'CONFIRMED', mode:'FIND', answer:self?.probationEnd?`Your probation ends on ${self.probationEnd}.`:'No active probation end date is recorded for this persona.', sources:['HRMS — Employment Lifecycle'], rule:'EMPLOYMENT_STATUS_V2' };
    if((q.includes('leave')&&q.includes('balance'))||q.includes('how many leaves')) return self ? { state:'CONFIRMED', mode:'FIND', answer:`Annual leave: ${self.leave.annual} days · Sick leave: ${self.leave.sick} days · Casual leave: ${self.leave.casual} days.`, sources:['HRMS — Leave Ledger', 'India Leave & Time-Off Policy v5.0'], rule:'LEAVE_BALANCE_V5' } : { state:'UNKNOWN', mode:'FIND', answer:'This persona does not have a personal leave ledger.', sources:['HRMS'], rule:null };
    if(q.includes('salary')&&(q.includes('lower')||q.includes('month'))) return self?.payroll ? { state:'CONFIRMED', mode:'ORCHESTRATE', answer:`Your net pay is ₹${self.payroll.net.toLocaleString('en-IN')} vs ₹${self.payroll.lastMonthNet.toLocaleString('en-IN')} last month. Verified driver: ${self.payroll.drivers.join('; ')}. No unexplained discrepancy remains in the demo record.`, sources:['Payroll — August 2026','Payroll — July 2026','Attendance'], rule:'PAYROLL_EXPLAIN_V3' } : { state:'UNKNOWN', mode:'FIND', answer:'Payroll detail is not exposed to this persona.', sources:[], rule:'FIELD_PERMISSION_V2' };
    if(q.includes('cover')||q.includes('replace')||q.includes('tonight')){
      if(persona.id==='employee') return { state:'UNKNOWN', mode:'ORCHESTRATE', answer:'Qualified replacement discovery is restricted to authorized manager, HR and QA roles. I can help with your own HR requests instead.', sources:['RBAC / ABAC Permission Service'], rule:'FIELD_PERMISSION_V2' };
      const task=q.includes('sterile')||q.includes('aseptic')?'ASEPTIC_SHIFT_B':'QA_LINE4_CLEARANCE';
      const candidates=state.employees.map(e=>readiness(e.id,task)).filter(r=>r.ready).sort((a,b)=>findEmployee(a.employeeId).weeklyHours-findEmployee(b.employeeId).weeklyHours);
      const names=candidates.slice(0,4).map(r=>`${r.employeeName} (${findEmployee(r.employeeId).weeklyHours}h scheduled)`).join(', ');
      return { state:'CONFIRMED', mode:'ORCHESTRATE', answer:candidates.length?`I found ${candidates.length} compliant replacement option${candidates.length===1?'':'s'}: ${names}. I can prepare a manager approval proposal; readiness is based on current qualification, SOP, equipment, access, availability and hours rules.`:'No fully compliant replacement is available. Escalation is required.', sources:['HRMS','LMS','Qualification System','Roster','IAM'], rule:`${task}_ELIGIBILITY_V4`, action:{type:'SHIFT_REPLACEMENT',taskId:task} };
    }
    if(q.includes('qualification')&&(q.includes('expire')||q.includes('expiring'))){
      const list=controlTower(persona).qualificationExpiries;
      return { state:'CONFIRMED', mode:'WATCH', answer:list.length?`${list.length} qualification(s) expire within 30 days: ${list.map(x=>`${x.employee} — ${x.validUntil}`).join('; ')}.`:'No qualifications expire within 30 days.', sources:['Qualification System'], rule:'CERT_EXPIRY_30D_V2' };
    }
    if(q.includes('who')&&q.includes('hplc')){
      const hits=state.employees.filter(e=>e.equipment.includes('HPLC-07')&&e.qualifications.some(x=>x.id==='QUAL-HPLC-07'&&!isExpired(x.validUntil)));
      return { state:'CONFIRMED', mode:'FIND', answer:hits.length?hits.map(e=>`${e.name} is currently authorized to independently operate HPLC-07 in ${e.area}; authorization valid until ${e.qualifications.find(x=>x.id==='QUAL-HPLC-07').validUntil}.`).join(' '):'No current HPLC-07 authorization found.', sources:['Qualification System','LMS','IAM'], rule:'HPLC_07_OPERATIONAL_PERMISSION_V1' };
    }
    if(q.includes('onboarding')||q.includes('joining')){
      const items=state.onboarding;
      return { state:'CONFIRMED', mode:'WATCH', answer:`${items.length} seeded joiners are in preboarding. Current blockers: ${items.map(x=>`${x.employee}: ${x.blocker}`).join('; ')}.`, sources:['HRMS Preboarding','IAM','LMS'], rule:'ONBOARDING_DEPENDENCY_V2' };
    }
    if(q.includes('payroll')&&q.includes('exception')) return { state:'CONFIRMED', mode:'WATCH', answer:`${state.payrollExceptions.length} live seeded payroll exceptions. Highest impact: ${state.payrollExceptions[0].type} for ${state.payrollExceptions[0].employeeId}, estimated impact ${state.payrollExceptions[0].impact}.`, sources:['HRMS','Payroll'], rule:'PAYROLL_RECON_V3' };
    if(q.includes('notice')&&q.includes('conflict')) return { state:'CONFIRMED', mode:'ORCHESTRATE', answer:'I found a controlled-policy conflict case already open: the employment contract states 90 days while an older FAQ states 60 days. Case HR-2941 contains both sources; the agent will not average or invent an answer.', sources:['Employment Contract','Old FAQ','Employment Separation & Notice Policy v3.0'], rule:'SOURCE_CONFLICT_ESCALATE_V1' };
    const p=policyAnswer(q);
    return { state:'CONFIRMED', mode:'KNOW', answer:`The applicable controlled source is ${p.title} v${p.version}, effective ${p.effectiveDate}. This prototype uses approved, effective policy objects rather than model memory.`, sources:[`${p.sourceDocument} — ${p.id} v${p.version}`], rule:'TEMPORAL_POLICY_RESOLUTION_V2', policy:p };
  }

  function validateLeave(payload, persona){
    const employeeId=payload.employeeId || persona.employeeId;
    const emp=findEmployee(employeeId);
    if(!emp) return {ok:false,errors:['Employee not found']};
    if(persona.id==='employee' && employeeId!==persona.employeeId) return {ok:false,errors:['Employee self-service may only submit for self']};
    const leaveType=String(payload.leaveType||'annual').toLowerCase();
    const startDate=payload.startDate, endDate=payload.endDate||startDate;
    const errors=[];
    if(!startDate||!endDate) errors.push('Start and end date are required');
    if(startDate&&endDate&&date(endDate)<date(startDate)) errors.push('End date cannot precede start date');
    const days=startDate&&endDate?countInclusive(startDate,endDate):0;
    if(!['annual','sick','casual'].includes(leaveType)) errors.push('Unsupported leave type');
    if(emp.status!=='ACTIVE') errors.push('Employee is not active');
    if(emp.leave?.[leaveType]===undefined) errors.push('Leave balance unavailable');
    if(days>Number(emp.leave?.[leaveType]||0)) errors.push(`Insufficient ${leaveType} leave balance`);
    const overlap=state.leaveRequests.find(r=>r.employeeId===employeeId && !['REJECTED','CANCELLED'].includes(r.state) && startDate&&endDate && !(date(endDate)<date(r.startDate)||date(startDate)>date(r.endDate)));
    if(overlap) errors.push(`Overlaps existing request ${overlap.id}`);
    return { ok:errors.length===0, employeeId, employeeName:emp.name, leaveType, startDate, endDate, days, balanceBefore:emp.leave?.[leaveType]||0, balanceAfter:(emp.leave?.[leaveType]||0)-days, approver:emp.managerName, policy:'POL-LEAVE-IN-005 v5.0', rule:'LEAVE_ELIGIBILITY_V5', errors, state:errors.length?'ESCALATED':'VALIDATED' };
  }

  function submitLeave(payload, persona){
    const validation=validateLeave(payload,persona);
    if(!validation.ok) return {status:400,payload:validation};
    const request={ id:`LR-${state.sequence.leave++}`, employeeId:validation.employeeId, employeeName:validation.employeeName, leaveType:validation.leaveType, startDate:validation.startDate, endDate:validation.endDate, days:validation.days, state:'PENDING_APPROVAL', approver:validation.approver, createdAt:nowIso(), policy:validation.policy, rule:validation.rule };
    state.leaveRequests.unshift(request);
    addAudit(persona.name,'SUBMIT_LEAVE',request.id,'PENDING_APPROVAL','HRMS Leave + Policy Store',validation.rule,'L3');
    return {status:201,payload:{...request,validation}};
  }

  function approveLeave(id, body, persona){
    const req=state.leaveRequests.find(r=>r.id===id); if(!req) return {status:404,payload:{error:'Leave request not found'}};
    const emp=findEmployee(req.employeeId); const canApprove=(persona.id==='manager'&&emp?.managerId===persona.employeeId)||['hr','chro'].includes(persona.id);
    if(!canApprove) return {status:403,payload:{error:'Approval not permitted for this persona'}};
    const decision=body.decision||'APPROVE';
    if(decision==='REJECT'){
      req.state='REJECTED'; req.decidedBy=persona.name; req.decidedAt=nowIso();
      addAudit(persona.name,'LEAVE_DECISION',req.id,'REJECTED','HRMS Leave',req.rule||'LEAVE_ELIGIBILITY_V5','L3');
      return {status:200,payload:req};
    }
    if(req.state!=='PENDING_APPROVAL') return {status:409,payload:{error:`Request is ${req.state}`}};
    const balance=emp.leave[req.leaveType]; if(balance<req.days) return {status:409,payload:{error:'Deterministic balance validation failed at approval'}};
    emp.leave[req.leaveType]-=req.days; req.state='APPROVED'; req.decidedBy=persona.name; req.decidedAt=nowIso(); emp.approvedLeave={start:req.startDate,end:req.endDate};
    addAudit(persona.name,'LEAVE_DECISION',req.id,'APPROVED → HRIS_SYNCED → ROSTER_RECALCULATED','HRMS + Roster',req.rule||'LEAVE_ELIGIBILITY_V5','L3');
    return {status:200,payload:req};
  }

  function shiftReplacement(payload, persona){
    if(!['manager','hr','qa','chro'].includes(persona.id)) return {status:403,payload:{error:'Shift replacement requires authorized manager/HR/QA context'}};
    const taskId=payload.taskId||'QA_LINE4_CLEARANCE'; const unavailableId=payload.unavailableEmployeeId||'EMP11001';
    const candidates=state.employees.filter(e=>e.id!==unavailableId).map(e=>({emp:e,ready:readiness(e.id,taskId,payload.shiftDate||DEMO_DATE)})).filter(x=>x.ready.ready).sort((a,b)=>a.emp.weeklyHours-b.emp.weeklyHours).map(x=>({employeeId:x.emp.id,name:x.emp.name,weeklyHours:x.emp.weeklyHours,shift:x.emp.shift,status:'READY',why:x.ready.checks.filter(c=>['qualification','sop','availability','hours'].includes(c.id)).map(c=>c.detail),rule:x.ready.rule}));
    const proposal={ id:`SR-${String(state.sequence.proposal++).padStart(3,'0')}`, taskId, taskLabel:state.taskCatalog[taskId]?.label, unavailableEmployeeId:unavailableId, unavailableEmployeeName:findEmployee(unavailableId)?.name, shiftDate:payload.shiftDate||DEMO_DATE, candidates, state:'PROPOSED', createdBy:persona.name, createdAt:nowIso() };
    state.shiftProposals.unshift(proposal);
    addAudit(persona.name,'FIND_QUALIFIED_REPLACEMENT',proposal.id,`${candidates.length} compliant candidate(s) returned`,'HRMS + LMS + QMS + Roster + IAM',`${taskId}_ELIGIBILITY_V4`,'L2');
    return {status:200,payload:proposal};
  }

  function approveShift(id, body, persona){
    const p=state.shiftProposals.find(x=>x.id===id); if(!p) return {status:404,payload:{error:'Proposal not found'}};
    if(!['manager','qa','hr','chro'].includes(persona.id)) return {status:403,payload:{error:'Roster approval not permitted'}};
    const candidate=p.candidates.find(c=>c.employeeId===body.employeeId); if(!candidate) return {status:400,payload:{error:'Candidate is not in deterministic compliant set'}};
    const recheck=readiness(candidate.employeeId,p.taskId,p.shiftDate); if(!recheck.ready) return {status:409,payload:{error:'Candidate no longer passes readiness gate',readiness:recheck}};
    p.state='APPROVED'; p.selectedEmployeeId=candidate.employeeId; p.selectedEmployeeName=candidate.name; p.approvedBy=persona.name; p.approvedAt=nowIso();
    const emp=findEmployee(candidate.employeeId); emp.weeklyHours+=8;
    addAudit(persona.name,'APPROVE_SHIFT_REPLACEMENT',p.id,`${candidate.name} assigned; roster updated; notifications queued`,'Roster + Notification Service',recheck.rule,'L3');
    return {status:200,payload:p};
  }

  function reviseSop(body, persona){
    if(!['qa','hr','chro'].includes(persona.id)) return {status:403,payload:{error:'SOP revision orchestration requires QA/HR authorization'}};
    const sopId=body.sopId||'SOP-412'; const newVersion=String(body.newVersion||Number(state.sopVersions[sopId]||0)+1); const oldVersion=state.sopVersions[sopId]; state.sopVersions[sopId]=newVersion;
    let impacted=0;
    state.employees.forEach(emp=>{
      const t=emp.training.find(x=>x.id===sopId);
      if(t){ impacted++; t.previousVersion=t.version; t.version=newVersion; t.status='ASSIGNED'; t.assignedAt=DEMO_DATE; t.validUntil='2026-09-14'; }
    });
    Object.values(state.taskCatalog).forEach(task=>{if(task.sop.id===sopId) task.sop.version=newVersion;});
    const event={sopId,oldVersion,newVersion,impactedEmployees:impacted,requiredBy:'2026-09-14',workflow:['SOP_REVISED','IDENTIFY_IMPACTED_ROLES','ASSIGN_TRAINING','NOTIFY','MONITOR','RECALCULATE_READINESS','ESCALATE_EXCEPTIONS','RETAIN_EVIDENCE']};
    addAudit(persona.name,'SOP_REVISED',`${sopId} v${newVersion}`,`${impacted} employees assigned retraining; readiness rules recalculated`,'QMS + LMS + Qualification Service','SOP_CHANGE_ORCHESTRATION_V2','L3');
    return {status:200,payload:event};
  }

  function completeTraining(body, persona){
    const emp=findEmployee(body.employeeId||persona.employeeId); if(!emp) return {status:404,payload:{error:'Employee not found'}};
    if(persona.id==='employee'&&emp.id!==persona.employeeId) return {status:403,payload:{error:'Not permitted'}};
    const t=emp.training.find(x=>x.id===body.sopId); if(!t) return {status:404,payload:{error:'Training assignment not found'}};
    t.status='COMPLETED'; t.completedAt=DEMO_DATE; t.validUntil=body.validUntil||'2027-08-21';
    addAudit(persona.name,'TRAINING_COMPLETED',`${emp.id}/${t.id}`,`Version ${t.version} completed; readiness recalculated`,'LMS','TRAINING_EFFECTIVENESS_V2','L2');
    return {status:200,payload:{employeeId:emp.id,training:t}};
  }

  function createRequisition(body, persona){
    if(!['hr','chro'].includes(persona.id)) return {status:403,payload:{error:'Recruitment action requires HR authorization'}};
    const role=body.role||'QC Analyst', site=body.site||'Hyderabad', openings=Number(body.openings||2);
    const architecture={ 'QC Analyst':{salaryBand:'₹9.5L–₹12.5L',mandatory:['B.Pharm/M.Sc.','GMP exposure','HPLC experience']}, 'Production Technician':{salaryBand:'₹6.0L–₹8.0L',mandatory:['Diploma/B.Sc.','GMP manufacturing','Shift eligibility']} };
    const a=architecture[role]||{salaryBand:'Configured band required',mandatory:['Approved role requirements']};
    const req={id:`REQ-${state.sequence.requisition++}`,role,site,openings,status:'DRAFT_PENDING_HR_APPROVAL',candidates:0,owner:persona.name,salaryBand:a.salaryBand,mandatory:a.mandatory,jdDraft:`${role} — ${site}. Controlled draft assembled from job architecture, competency requirements and approved legal template.`,approvalRequired:'HR / Workforce Planning'};
    state.requisitions.unshift(req); addAudit(persona.name,'CREATE_REQUISITION',req.id,'Draft created and routed for approval','Headcount Plan + Job Architecture + Approved JD Library','REQUISITION_CONTROL_V2','L1');
    return {status:201,payload:req};
  }

  function summaryForPersona(persona){
    if(persona.id==='employee') return { self:redactEmployee(findEmployee(persona.employeeId),persona), leaveRequests:state.leaveRequests.filter(r=>r.employeeId===persona.employeeId), policies:state.policies.map(p=>({id:p.id,title:p.title,version:p.version,effectiveDate:p.effectiveDate,owner:p.owner})) };
    if(persona.id==='manager') return { team:teamFor(persona).map(e=>({...redactEmployee(e,persona),readiness: e.role==='QA Executive'?readiness(e.id,'QA_LINE4_CLEARANCE').status:(e.role==='Production Technician'?readiness(e.id,'ASEPTIC_SHIFT_B').status:'N/A')})), leaveRequests:state.leaveRequests.filter(r=>findEmployee(r.employeeId)?.managerId===persona.employeeId), dailyBrief:controlTower(persona).dailyBrief };
    return controlTower(persona);
  }

  async function readBody(req){
    return await new Promise((resolve,reject)=>{let data='';req.on('data',c=>{data+=c;if(data.length>1_000_000){req.destroy();reject(new Error('Request body too large'));}});req.on('end',()=>{if(!data)return resolve({});try{resolve(JSON.parse(data));}catch{reject(new Error('Invalid JSON body'));}});req.on('error',reject);});
  }

  async function handle(req,url){
    if(!url.pathname.startsWith('/api/hr')) return null;
    const personaId=url.searchParams.get('persona')||'employee'; const persona=getPersona(personaId);
    if(url.pathname==='/api/hr/config'&&req.method==='GET') return {status:200,payload:{appName:'Zathura.AI HR Agent',demoDate:DEMO_DATE,thesis:'Controlled HR operating layer above systems of record',brains:['Language','Knowledge','Rules','Action'],autonomy:['L0 Inform','L1 Prepare','L2 Reversible low risk','L3 Execute after authorization','L4 Human judgment mandatory'],personas:state.personas.map(publicPersona)}};
    if(url.pathname==='/api/hr/personas'&&req.method==='GET') return {status:200,payload:state.personas.map(publicPersona)};
    if(url.pathname==='/api/hr/summary'&&req.method==='GET') return {status:200,payload:summaryForPersona(persona)};
    if(url.pathname==='/api/hr/control-tower'&&req.method==='GET') {
      if(!['manager','qa','hr','chro'].includes(persona.id)) return {status:403,payload:{error:'HR Control Tower is not permitted for this persona'}};
      return {status:200,payload:controlTower(persona)};
    }
    if(url.pathname==='/api/hr/policies'&&req.method==='GET') return {status:200,payload:state.policies};
    if(url.pathname==='/api/hr/employees'&&req.method==='GET'){
      let list=[]; if(persona.id==='employee') list=[findEmployee(persona.employeeId)]; else if(persona.id==='manager') list=teamFor(persona); else list=state.employees;
      return {status:200,payload:list.filter(Boolean).map(e=>redactEmployee(e,persona))};
    }
    const empMatch=url.pathname.match(/^\/api\/hr\/employees\/([^/]+)$/); if(empMatch&&req.method==='GET'){
      const emp=findEmployee(empMatch[1]); if(!emp) return {status:404,payload:{error:'Employee not found'}};
      const allowed=persona.id!=='employee'||persona.employeeId===emp.id; if(!allowed) return {status:403,payload:{error:'Field-level permission denied'}};
      return {status:200,payload:redactEmployee(emp,persona)};
    }
    if(url.pathname==='/api/hr/readiness'&&req.method==='GET') {
      const employeeId=url.searchParams.get('employeeId');
      if(persona.id==='employee'&&employeeId!==persona.employeeId) return {status:403,payload:{error:'Readiness data is limited to self for the Employee persona'}};
      return {status:200,payload:readiness(employeeId,url.searchParams.get('taskId')||'QA_LINE4_CLEARANCE',url.searchParams.get('date')||DEMO_DATE)};
    }
    if(url.pathname==='/api/hr/readiness/check'&&req.method==='POST'){const body=await readBody(req);if(persona.id==='employee'&&body.employeeId!==persona.employeeId)return {status:403,payload:{error:'Readiness data is limited to self for the Employee persona'}};return {status:200,payload:readiness(body.employeeId,body.taskId||'QA_LINE4_CLEARANCE',body.shiftDate||DEMO_DATE)};}
    if(url.pathname==='/api/hr/ask'&&req.method==='POST'){const body=await readBody(req);const result=ask(body.query,persona);addAudit(persona.name,'ASK_ZATHURA',String(body.query||'').slice(0,80),result.state,result.sources?.join(' + ')||'Controlled sources',result.rule||'N/A','L0');return {status:200,payload:result};}
    if(url.pathname==='/api/hr/leave'&&req.method==='GET'){
      let items=state.leaveRequests; if(persona.id==='employee') items=items.filter(r=>r.employeeId===persona.employeeId); if(persona.id==='manager') items=items.filter(r=>findEmployee(r.employeeId)?.managerId===persona.employeeId); return {status:200,payload:items};
    }
    if(url.pathname==='/api/hr/leave/validate'&&req.method==='POST'){const body=await readBody(req);const result=validateLeave(body,persona);return {status:result.ok?200:400,payload:result};}
    if(url.pathname==='/api/hr/leave'&&req.method==='POST'){const body=await readBody(req);return submitLeave(body,persona);}
    const leaveApprove=url.pathname.match(/^\/api\/hr\/leave\/([^/]+)\/decision$/); if(leaveApprove&&req.method==='POST'){const body=await readBody(req);return approveLeave(leaveApprove[1],body,persona);}
    if(url.pathname==='/api/hr/shift-replacement'&&req.method==='POST'){const body=await readBody(req);return shiftReplacement(body,persona);}
    const shiftApprove=url.pathname.match(/^\/api\/hr\/shift-replacement\/([^/]+)\/approve$/); if(shiftApprove&&req.method==='POST'){const body=await readBody(req);return approveShift(shiftApprove[1],body,persona);}
    if(url.pathname==='/api/hr/sop-revision'&&req.method==='POST'){const body=await readBody(req);return reviseSop(body,persona);}
    if(url.pathname==='/api/hr/training/complete'&&req.method==='POST'){const body=await readBody(req);return completeTraining(body,persona);}
    if(url.pathname==='/api/hr/requisitions'&&req.method==='GET') {if(!['hr','chro'].includes(persona.id))return {status:403,payload:{error:'Recruitment data is restricted to HR / CHRO personas'}};return {status:200,payload:state.requisitions};}
    if(url.pathname==='/api/hr/requisitions'&&req.method==='POST'){const body=await readBody(req);return createRequisition(body,persona);}
    if(url.pathname==='/api/hr/onboarding'&&req.method==='GET') {if(!['manager','hr','chro'].includes(persona.id))return {status:403,payload:{error:'Onboarding data is restricted for this persona'}};return {status:200,payload:state.onboarding};}
    if(url.pathname==='/api/hr/audit'&&req.method==='GET'){
      if(!['qa','hr','chro'].includes(persona.id)) return {status:403,payload:{error:'Audit view not permitted for this persona'}};
      return {status:200,payload:{events:state.audit,governance:{architecture:'LLM → Intent → Policy/RAG → Rules → Workflow → Permission → Human approval → API action → Audit',hallucinationStates:['CONFIRMED','INFERRED','UNKNOWN'],stopConditions:['Required information missing','Permission denied','Sources conflict','Policy ambiguous','Required approval absent','Deterministic validation fails','Sensitive ER issue','Regulated qualification affected','Source system unavailable','Exception outside rules']}}};
    }
    if(url.pathname==='/api/hr/reset'&&req.method==='POST'){state=clone(seed);return {status:200,payload:{ok:true,employees:state.employees.length,leaveRequests:state.leaveRequests.length}};}
    return {status:404,payload:{error:'HR Agent API route not found'}};
  }

  return { handle };
}
