export const dynamic = 'force-dynamic';
export const metadata = { title: 'Terms & Conditions | Accrue Technologies', description: 'Terms of service, subscription policies and legal conditions for Accrue Technologies and AccrueHRMS.' };

export default function Page() {
  return <>
    <section className="page-hero section">
      <p className="eyebrow">TERMS & CONDITIONS</p>
      <h1>Clear terms.<br /><em>Dependable partnership.</em></h1>
      <p>Terms and conditions governing use of Accrue Technologies services and the AccrueHRMS platform.</p>
      <p>Effective Date: 6 November 2026</p>
    </section>
    <section className="section prose">
      <h2>1. Agreement to Terms</h2>
      <p>By accessing, subscribing to, or using the software, websites, APIs, and cloud services operated by Accrue Technologies (&ldquo;Accrue Technologies&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), including AccrueHRMS, you enter into a binding agreement with Accrue Technologies. If you act on behalf of a company or legal entity, you confirm that you possess full authority to bind that entity to these Terms.</p>

      <h2>2. Service Description & License Grant</h2>
      <p>Accrue Technologies delivers cloud-hosted software and engineering solutions, including Human Resource Management Systems (AccrueHRMS), time & attendance tracking, biometric synchronization, automated payroll computation, talent acquisition pipelines, and enterprise workflow automation. We grant your organization a non-exclusive, non-transferable, revocable license to access the platform for internal business operations during your active subscription period.</p>

      <h2>3. User Accounts & Security</h2>
      <p>Administrators configure user access, role assignments, and feature permissions. Users maintain the secrecy of login credentials and tokens. You remain directly responsible for all activities conducted under your authenticated accounts. Notify our team immediately if you detect unauthorized account activity.</p>

      <h2>4. Subscription Plans, Invoicing & Indian GST</h2>
      <p>AccrueHRMS provides tiered plans including Free Starter (up to 15 employees, 1 branch, ₹0 free forever), Basic/Growth (up to 50 employees, ₹999/mo or ₹9,990/yr), Standard/Scale (up to 200 employees, ₹2,999/mo or ₹29,990/yr), and Enterprise (unlimited scale, ₹6,999/mo or ₹69,990/yr). Commercial subscriptions incur an 18% Goods and Services Tax (GST) as mandated by Indian tax legislation, calculated and displayed directly during checkout. Recurring billing is processed through certified payment gateways including Razorpay. Paid subscriptions renew automatically at the conclusion of each billing period unless cancelled beforehand.</p>

      <h2>5. Customer Data Ownership & Processing</h2>
      <p>Your organization holds 100% exclusive ownership of all corporate data, employee records, attendance punch logs, payroll details, and uploaded files. Accrue Technologies acts as a data processor. We do not sell, rent, or commercialize your corporate records. Data is stored in isolated PostgreSQL tenant schemas with encryption in transit and at rest.</p>

      <h2>6. Attendance Verification & Geolocation</h2>
      <p>When organizations enable GPS-verified attendance or geofencing, coordinates are recorded strictly at the instant of check-in and check-out punches to confirm authorized location attendance. The application does not conduct ongoing or background location tracking.</p>

      <h2>7. Prohibited Uses</h2>
      <p>You agree not to: (a) reverse engineer, decompile, or replicate platform software or architectures; (b) attempt to circumvent access controls or tenant isolation safeguards; (c) introduce malicious software or automated scraping agents; or (d) utilize the platform for illegal activities.</p>

      <h2>8. Availability & Backups</h2>
      <p>Accrue Technologies targets 99.9% availability for cloud infrastructure. Routine maintenance is scheduled during off-peak windows. Automated database snapshots are taken on daily cycles to protect business continuity.</p>

      <h2>9. Cancellation & Termination</h2>
      <p>Administrators cancel active subscriptions at any time through the billing dashboard. Access continues through the end of the paid billing cycle. Accrue Technologies terminates access for accounts that breach these terms or engage in fraudulent actions.</p>

      <h2>10. Limitation of Liability</h2>
      <p>The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. Accrue Technologies disclaims liability for indirect, incidental, or consequential damages resulting from downtime or third-party telecommunications interruptions.</p>

      <h2>11. Governing Law & Jurisdiction</h2>
      <p>These Terms are governed by the laws of India. Legal proceedings arising from or connected to these Terms fall under the exclusive jurisdiction of the courts located in Hyderabad, Telangana / Andhra Pradesh, India.</p>

      <h2>12. Contact</h2>
      <p>For questions or formal legal notices, contact <strong>Accrue Technologies</strong> at <a href="mailto:siva@accruetechnologies.com">siva@accruetechnologies.com</a> or <a href="tel:+919381934911">+91 9381934911</a>.</p>
    </section>
  </>;
}
