/**
 * PrivacyPolicyPage.jsx — Legal route (/privacy-policy).
 * Clean, readable legal layout: patient data protection principles, the
 * demo-environment disclosure (no persistence, no transmission), cookie &
 * analytics stance, and contact points for data requests.
 */
import { Cookie, FlaskConical, Lock, Mail, ShieldCheck, Trash2, UserCheck } from "lucide-react";
import SEOHead from "../components/layout/SEOHead";
import { CLINIC } from "../data/clinicData";

/* Policy sections — kept in-file for easy legal review */
const SECTIONS = [
  {
    icon: Lock,
    title: "1 · What this demo collects (spoiler: nothing)",
    body: [
      "This website is a portfolio demonstration of a dental clinic experience. The booking form, quick-appointment bar and contact widgets run entirely in your browser's temporary memory (RAM) and are never transmitted to any server, third party or analytics platform.",
      "When you close or refresh the page, everything you typed is gone. By design, there is no database behind this demo.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "2 · Patient data protection principles (production standard)",
    body: [
      "In a live deployment, Pearl Dental Studio would operate under strict healthcare data-protection principles: encrypted transmission (TLS 1.3), encrypted at-rest storage, role-based access control, audit logging and retention windows limited by clinical regulation.",
      "Personal health information (PHI) would only ever be collected through dedicated, compliant patient-portal infrastructure — never through a public marketing form.",
    ],
  },
  {
    icon: FlaskConical,
    title: "3 · Demo environment disclaimer",
    body: [
      "All content on this site — clinic identity, team profiles, credentials, reviews, statistics, pricing and imagery — is illustrative placeholder material created for layout and design demonstration. It does not describe a real clinic, real clinicians or real patients.",
      "Nothing on this website constitutes medical advice. Diagnosis and treatment planning always require an in-person clinical examination by a qualified, registered dentist.",
    ],
  },
  {
    icon: Cookie,
    title: "4 · Cookies & tracking",
    body: [
      "This demo sets no cookies, reads no cookies and runs no advertising or fingerprinting trackers. No localStorage or sessionStorage is used for any user-provided data.",
      "A production clinic site should list any strictly-necessary cookies (e.g., session preferences) and obtain consent before any optional analytics cookies are activated.",
    ],
  },
  {
    icon: UserCheck,
    title: "5 · Your rights",
    body: [
      "Even in demo form, we model best practice: in production you would hold rights to access, correct, export or erase personal data held about you, subject to clinical record-keeping obligations required by law.",
      "Requests would be handled by the clinic's designated data-protection contact within statutory timeframes.",
    ],
  },
  {
    icon: Trash2,
    title: "6 · Data retention",
    body: [
      "In this demo: zero retention — your inputs vanish with the page session.",
      "In production: clinical records are retained only for the periods mandated by dental regulation, after which they are securely destroyed with a documented audit trail.",
    ],
  },
  {
    icon: Mail,
    title: "7 · Contact about privacy",
    body: [
      `Privacy questions in a production context would be directed to the data-protection officer at ${CLINIC.email} or ${CLINIC.phoneDisplay}. As this is a demonstration, that inbox is a placeholder too.`,
      `Last updated: January 2026 · Demo policy version 1.0.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy & Patient Data Protection"
        description="How Pearl Dental Studio (demo) approaches patient data protection, cookies and privacy — including the demo-environment no-storage disclosure."
        path="/privacy-policy"
      />

      <section className="pt-32 sm:pt-36 lg:pt-40 max-w-3xl mx-auto px-5 sm:px-8">
        <span className="kicker" data-reveal>
          <ShieldCheck size={13} className="text-teal-600" /> Legal & Privacy
        </span>
        <h1 className="font-display font-bold text-navy-deep tracking-tight leading-[1.05] text-4xl sm:text-5xl mt-6" data-reveal data-delay="0.08">
          Privacy, written in <span className="text-gradient">plain language.</span>
        </h1>
        <p className="text-slate-med leading-relaxed mt-5" data-reveal data-delay="0.16">
          Dental websites handle trust before they handle data. This page explains exactly what this
          demonstration site does — and the standard a production deployment must meet.
        </p>

        {/* Demo badge banner */}
        <p className="badge-demo w-full justify-center !rounded-3xl !py-4 !px-6 mt-8 leading-relaxed text-center" data-reveal data-delay="0.2">
          <FlaskConical size={15} className="shrink-0" />
          Interactive Demo Mode: No personal health information (PHI) is collected, stored or transmitted anywhere.
        </p>
      </section>

      {/* Policy body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 mt-12 space-y-6">
        {SECTIONS.map((s, i) => (
          <section key={s.title} className="clay p-7 sm:p-9" data-reveal data-delay={i < 3 ? i * 0.05 : 0} aria-labelledby={`pp-${i}`}>
            <h2 id={`pp-${i}`} className="font-display font-bold text-navy-deep text-xl flex items-center gap-3.5">
              <span className="clay-inset w-11 h-11 rounded-2xl grid place-items-center text-teal-700 shrink-0">
                <s.icon size={19} />
              </span>
              {s.title}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} className="text-[15px] text-slate-med leading-[1.85] mt-4">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
