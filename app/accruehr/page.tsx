import { ArrowRight, ArrowUpRight, Users, Clock3, CalendarCheck, Wallet, BriefcaseBusiness, UserRoundCheck, Headset, Network, FileCheck2, Check, Building2, ShieldCheck, UserRound, ClipboardCheck } from 'lucide-react';
import './product-story.css';

export const metadata = {
  title: 'AccrueHRMS | Employee management, payroll & everyday HR',
  description: 'Understand AccrueHRMS: one workspace for employee records, attendance, leave, payroll, accounting, hiring and employee support. Explore features and plans from Accrue Technologies.',
};
const registration = '/accruehr/contact/?request=registration';
const modules = [
  { icon: Users, title: 'Employee management', description: 'Keep the information behind every employee in one place.', items: ['Employee profiles and documents', 'Departments, job positions and reporting lines', 'Head office and branch records'] },
  { icon: CalendarCheck, title: 'Attendance & leave', description: 'Give working time and time off a clear process.', items: ['Attendance and shift schedules', 'Leave requests, balances and holidays', 'Manager approvals and regularisation'] },
  { icon: Wallet, title: 'Payroll & accounting', description: 'Connect salary records with the work of your accounts team.', items: ['Allowances, deductions and payslips', 'Monthly salary sheets and Excel exports', 'Payroll payment records and accounting entries'] },
  { icon: BriefcaseBusiness, title: 'Recruitment & onboarding', description: 'Connect the steps from a job opening to a new joiner.', items: ['Job posts and candidate applications', 'Careers page, jobs widget and public feed', 'Onboarding tasks and employee setup'] },
  { icon: UserRound, title: 'Employee self-service', description: 'Give employees a place to handle their everyday requests.', items: ['View their profile and payslips', 'Submit attendance and leave requests', 'Access their documents and support tickets'] },
  { icon: Headset, title: 'Support & communication', description: 'Keep employee questions and company updates organized.', items: ['Department-based helpdesk routing', 'Ticket assignments and conversations', 'Announcements and notifications'] },
  { icon: Network, title: 'Structure & access', description: 'Reflect how your organization actually works.', items: ['Organization chart and reporting managers', 'Standard and custom departments and positions', 'Configured roles and job-position permissions'] },
  { icon: FileCheck2, title: 'Documents & offboarding', description: 'Keep joining and leaving processes organized.', items: ['Offer and relieving letters', 'Employee documents and requests', 'Offboarding tasks and clearances'] },
];
const plans = [
  { name: 'FREE / STARTER', price: '₹0', billing: '(Free Forever / Starter)', users: 'Up to 15 employees', branches: '1 branch included', feature: 'Core HR, Employee directory, Attendance, Leave, Basic Payslips', note: 'Early startups & micro teams. ₹0 Free Forever · No card required.' },
  { name: 'BASIC (Growth)', price: '₹999', billing: '/ mo + GST', users: 'Up to 50 employees (15–50 staff)', branches: '2 branches included', feature: 'Everything in Free + India Statutory Compliance (PF, ESI, PT, TDS), Biometric sync, Document generation', note: 'Growing startups. ₹9,990 / yr (Save ₹1,998 · 2 Mo Free).' },
  { name: 'STANDARD (Scale)', price: '₹2,999', billing: '/ mo + GST', users: 'Up to 200 employees (50–200 staff)', branches: '5 branches included', feature: 'Everything in Basic + Cross-branch access, Multi-entity accounting, Audit logs, Shift & roster management', note: 'Mid-sized companies. ₹29,990 / yr (Save ₹5,998 · 2 Mo Free).' },
  { name: 'ENTERPRISE', price: '₹6,999', billing: '/ mo + GST', users: 'Unlimited employees', branches: 'Unlimited branches', feature: 'Everything in Standard + Unlimited scale, Custom roles, Dedicated support, Priority assistance', note: 'Large orgs & multi-branch networks. ₹69,990 / yr (Save ₹13,998 · 2 Mo Free).' },
];
const journey = [
  { title: 'Hire', text: 'Publish openings and collect applications.' },
  { title: 'Welcome', text: 'Coordinate onboarding and set up employee records.' },
  { title: 'Manage', text: 'Handle attendance, leave, documents and approvals.' },
  { title: 'Pay', text: 'Prepare payroll records, payslips and salary reports.' },
  { title: 'Support', text: 'Resolve requests and manage employee transitions.' },
];

export default function Page() {
  return <div className="product-story">
    <section className="ps-hero ps-section">
      <div className="ps-hero-copy">
        <p className="ps-eyebrow"><span /> PEOPLE. TIME. PAYROLL.</p>
        <div className="ps-wordmark">Accrue<span>HRMS</span><small>BY ACCRUE TECHNOLOGIES</small></div>
        <h1>Your people.<br />Your everyday HR.<br /><em>One place.</em></h1>
        <p className="ps-lead">Manage employee records, attendance, leave, payroll and hiring in one connected workspace. Give your HR team, managers and employees a clearer way to work together.</p>
        <div className="ps-actions"><a className="button" href={registration}>Request registration <ArrowUpRight size={17} /></a><a className="ps-secondary" href="#what-it-does">See what AccrueHRMS does <ArrowRight size={16} /></a></div>
        <p className="ps-small">Free Forever starter plan for up to 15 employees. Our team helps you get started.</p>
      </div>
      <div className="ps-workspace" aria-label="Illustration of connected AccrueHRMS workflows">
        <div className="ps-workspace-top"><span><img src="/assets/accrue-logo.svg" alt="" /> Accrue<span className="ps-purple">HRMS</span></span><small>WORKFLOW OVERVIEW</small></div>
        <div className="ps-workspace-body">
          <p className="ps-demo-label">YOUR ORGANIZATION</p><h2>One team.<br />Connected work.</h2>
          <div className="ps-hub"><Building2 size={25} /><div><strong>Your organization</strong><span>Head office · Branches · Departments</span></div><ShieldCheck size={20} /></div>
          <div className="ps-hub-line" aria-hidden="true" />
          <div className="ps-workspace-grid">{[
            { icon: Users, title: 'People', detail: 'Profiles & documents' },
            { icon: Clock3, title: 'Time & leave', detail: 'Attendance & approvals' },
            { icon: Wallet, title: 'Payroll', detail: 'Salary records & payslips' },
            { icon: BriefcaseBusiness, title: 'Talent', detail: 'Hiring & onboarding' },
          ].map(item => <div className="ps-mini-module" key={item.title}><item.icon size={21} /><strong>{item.title}</strong><span>{item.detail}</span></div>)}</div>
          <div className="ps-shared"><UserRoundCheck size={18} /><span>HR teams <i>·</i> Managers <i>·</i> Employees</span></div>
        </div>
        <div className="ps-workspace-bottom"><span className="ps-status-dot" /> Shared information. Clear responsibilities.</div>
      </div>
    </section>

    <nav className="ps-jump-links" aria-label="Explore AccrueHRMS"><a href="#what-it-does">What it does</a><a href="#how-it-works">How it works</a><a href="#who-uses-it">Who it’s for</a><a href="#plans">Plans & pricing</a><a href="#get-started">Get started <ArrowUpRight size={14} /></a></nav>

    <section className="ps-definition ps-section" id="what-it-does"><p className="ps-eyebrow">WHAT IS ACCRUEHRMS?</p><div className="ps-definition-grid"><h2>Your company’s<br /><em>HR workspace.</em></h2><div><p>AccrueHRMS is a human resource management system built by Accrue Technologies. It brings the records, requests and processes involved in managing employees into one application.</p><p>Instead of keeping employee details, leave approvals, salary records and hiring updates in separate places, your teams can work through connected modules with access suited to their responsibilities.</p></div></div></section>

    <section className="ps-section ps-capabilities"><div className="ps-heading"><div><p className="ps-eyebrow">WHAT YOU CAN DO</p><h2>Everyday HR,<br /><em>clearly organized.</em></h2></div><p>Start with your people.<br />Connect the work around them.</p></div><div className="ps-module-grid">{modules.map((module, index) => <article key={module.title}><div className="ps-module-top"><module.icon size={25} strokeWidth={1.5} /><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{module.title}</h3><p>{module.description}</p><ul>{module.items.map(item => <li key={item}><Check size={13} /><span>{item}</span></li>)}</ul></article>)}</div></section>

    <section className="ps-section ps-journey" id="how-it-works"><p className="ps-eyebrow">HOW THE WORK CONNECTS</p><div className="ps-heading"><h2>From the first application<br /><em>to everyday employee life.</em></h2><p>A connected process<br />across the employee journey.</p></div><ol>{journey.map((step, index) => <li key={step.title}><span className="ps-step-number">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p>{index < journey.length - 1 && <ArrowRight className="ps-step-arrow" size={18} aria-hidden="true" />}</li>)}</ol><div className="ps-example"><ClipboardCheck size={24} /><div><strong>A simple example: an employee needs a day off.</strong><p>The employee submits a leave request. An authorized manager reviews it. The decision and leave balance stay in the same workspace.</p></div></div></section>

    <section className="ps-section ps-audience" id="who-uses-it"><div className="ps-heading"><div><p className="ps-eyebrow">WHO USES ACCRUEHRMS?</p><h2>One workspace.<br /><em>A clear role for everyone.</em></h2></div></div><div className="ps-audience-grid">{[
      { title: 'Organization administrators', text: 'Set up the company, branches, departments and access for your team.' },
      { title: 'HR & accounts teams', text: 'Maintain employee records, run HR processes and manage payroll and accounting work.' },
      { title: 'Managers', text: 'Review team requests and approvals within the responsibilities assigned to them.' },
      { title: 'Employees', text: 'Access their own information, request leave, view payslips and ask for help.' },
    ].map((person, index) => <article key={person.title}><span>0{index + 1}</span><h3>{person.title}</h3><p>{person.text}</p></article>)}</div><p className="ps-access-note"><ShieldCheck size={17} /> Access depends on configured roles, job positions and organization scope.</p></section>

    <section className="ps-section ps-pricing" id="plans"><div className="ps-heading"><div><p className="ps-eyebrow">PLANS & PRICING</p><h2>A package for<br /><em>your organization.</em></h2></div><p>Fixed packages in INR + 18% GST.<br />Get started Free Forever for up to 15 employees. Annual billing gives 2 months free (20% off).</p></div><div className="ps-plan-grid">{plans.map(plan => <article key={plan.name}><h3>{plan.name}</h3><div className="ps-plan-price">{plan.price}<small>{plan.billing}</small></div><p>{plan.note}</p><ul><li><Check size={15} />{plan.users}</li><li><Check size={15} />{plan.branches}</li><li><Check size={15} />{plan.feature}</li></ul><a href={registration}>Ask about {plan.name} <ArrowUpRight size={15} /></a></article>)}</div><p className="ps-pricing-note">All paid plans are subject to 18% GST (SAC 998313). Confirm billing terms, payment options (Razorpay UPI, cards, netbanking) and support arrangements with our team. This website accepts enquiries; payments and subscription activation are handled securely in AccrueHRMS.</p></section>

    <section className="ps-section ps-start" id="get-started"><div><p className="ps-eyebrow">LET’S GET YOUR TEAM STARTED</p><h2>Bring your people<br /><em>and HR work together.</em></h2><p>Tell us about your organization, team size and the processes you want to manage. We’ll help you understand the fit and next steps.</p><a className="button" href={registration}>Request registration <ArrowUpRight size={17} /></a></div><div className="ps-next-steps"><h3>What happens next?</h3>{['Send your organization details.', 'Discuss your needs and choose a package.', 'Configure your workspace and add your team.'].map((text, index) => <div key={text}><span>0{index + 1}</span><p>{text}</p></div>)}<small>Registration is reviewed by our team. An enquiry does not create a login automatically.</small></div></section>

    <section className="ps-section ps-questions"><p className="ps-eyebrow">A FEW THINGS TO KNOW</p><h2>Questions, answered.</h2><details><summary>Can we use our existing careers website?</summary><p>Yes. AccrueHRMS provides a careers page, embeddable jobs widget and public jobs feed. Your existing website can connect to these using the deployed AccrueHRMS application URL.</p></details><details><summary>Can we use our own departments and job positions?</summary><p>Yes. You can start with standard templates suited to your industry and add custom departments and positions for your organization.</p></details><details><summary>Does AccrueHRMS automatically handle every payroll or legal requirement?</summary><p>Payroll configuration and statutory requirements depend on your country and organization. Review required calculations, deductions and reporting with your accounts team and confirm the setup with us before using it for live payroll.</p></details><details><summary>How can we get support or share feedback?</summary><p>Use the <a href="/accruehr/contact/?request=support">AccrueHRMS support form</a> or <a href="/accruehr/contact/?request=feedback">feedback form</a>. Organization administrators can also raise platform support requests inside AccrueHRMS.</p></details></section>
    <div className="ps-support-strip"><span>Already using AccrueHRMS?</span><a href="/accruehr/contact/?request=support">Get support <ArrowUpRight size={15} /></a><a href="/accruehr/contact/?request=feedback">Share feedback <ArrowUpRight size={15} /></a></div>
  </div>;
}
