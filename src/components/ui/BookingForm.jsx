/**
 * BookingForm.jsx — High-converting, demo-safe appointment booking system.
 *
 * Features: real-time field validation, error messages with aria-live,
 * simulated network latency, animated success state, WhatsApp prefilled
 * deep-link and click-to-call shortcut. Treatment/date can be pre-selected
 * via props or ?treatment= & ?date= URL params (used by CTAs sitewide).
 *
 * DEMO COMPLIANCE: state lives strictly in React memory. Nothing is written
 * to localStorage/sessionStorage/cookies, nothing is transmitted anywhere.
 * The success screen is explicitly labelled a "Demo Appointment Request
 * Preview" — not a confirmed clinical booking.
 */
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CalendarCheck,
  Clock,
  FlaskConical,
  Loader2,
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  User,
  Mail,
  Stethoscope,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CLINIC, TREATMENTS, buildWhatsAppLink } from "../../data/clinicData";

const TIME_SLOTS = [
  "08:00 — Morning",
  "09:30 — Morning",
  "11:00 — Late Morning",
  "13:00 — Midday",
  "14:30 — Afternoon",
  "16:00 — Afternoon",
  "17:30 — Evening",
];

const EMPTY = { name: "", phone: "", email: "", date: "", slot: "", treatment: "", notes: "" };

/* --- Field validators (pure functions, run live + on submit) --------- */
const validators = {
  name: (v) => (!v.trim() ? "Please enter your full name." : v.trim().length < 3 ? "Name must be at least 3 characters." : ""),
  phone: (v) => {
    if (!v.trim()) return "A phone number is required for confirmation.";
    return /^[+()\-.\s\d]{7,18}$/.test(v.trim()) ? "" : "Please enter a valid phone number (7–15 digits).";
  },
  email: (v) => (v.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Please enter a valid email address, or leave this field empty." : ""),
  date: (v) => {
    if (!v) return "Please choose a preferred date.";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(v) < today ? "Please choose a date in the future." : "";
  },
  slot: (v) => (!v ? "Please pick a preferred time slot." : ""),
  treatment: (v) => (!v ? "Please select a treatment so we can prepare." : ""),
  notes: (v) => (v.length > 400 ? "Please keep notes under 400 characters." : ""),
};

export default function BookingForm({ initialTreatment = "", onSuccess, headingLevel: H = "h3" }) {
  const [params] = useSearchParams();

  /* Pre-selection priority: prop → URL param → empty */
  const preTreatment = initialTreatment || params.get("treatment") || "";
  const preDate = params.get("date") || "";

  const [fields, setFields] = useState({ ...EMPTY, treatment: preTreatment, date: preDate });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [summary, setSummary] = useState(null);

  /* Keep in sync when a CTA re-opens the form with a new preset */
  useEffect(() => {
    setFields((f) => ({ ...f, treatment: preTreatment, date: preDate || f.date }));
    setStatus("idle");
  }, [preTreatment, preDate]);

  const errors = useMemo(() => {
    const e = {};
    Object.keys(validators).forEach((k) => {
      const msg = validators[k](fields[k]);
      if (msg) e[k] = msg;
    });
    return e;
  }, [fields]);

  const setField = (key, value) => setFields((f) => ({ ...f, [key]: value }));
  const blur = (key) => setTouched((t) => ({ ...t, [key]: true }));
  const showError = (key) => touched[key] && errors[key];

  /* Simulated submission — pure memory, zero persistence */
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, date: true, slot: true, treatment: true, notes: true });
    if (Object.keys(errors).length) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus?.();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      const chosen = TREATMENTS.find((t) => t.slug === fields.treatment);
      setSummary({ ...fields, treatmentName: chosen ? chosen.name : fields.treatment });
      setStatus("success");
      onSuccess?.();
    }, 1400);
  };

  const reset = () => {
    setFields({ ...EMPTY });
    setTouched({});
    setSummary(null);
    setStatus("idle");
  };

  const whatsappMessage = `Hello ${CLINIC.name}! I'd like to request an appointment.\n\n• Name: ${fields.name || "—"}\n• Treatment: ${(TREATMENTS.find((t) => t.slug === fields.treatment)?.name) || "—"}\n• Preferred date: ${fields.date || "—"}\n• Preferred time: ${fields.slot || "—"}\n\n(This is a demo request — no personal data was stored.)`;

  /* ------------------------------------------------------------------ */
  /* Success state — clearly labelled demo preview                       */
  /* ------------------------------------------------------------------ */
  if (status === "success" && summary) {
    return (
      <div className="text-center py-6" role="status" aria-live="polite">
        <div className="relative inline-grid place-items-center w-24 h-24 mx-auto">
          <span className="absolute inset-0 rounded-full bg-emerald-300/40 animate-pulse-ring" aria-hidden="true" />
          <span className="clay w-20 h-20 rounded-full grid place-items-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </span>
        </div>

        <H className="font-display text-2xl sm:text-3xl font-bold text-navy-deep mt-6">
          Request received — beautifully done!
        </H>
        <p className="text-slate-med mt-2 max-w-md mx-auto text-sm leading-relaxed">
          Here is a preview of the request our care team would receive. In a live clinic, we'd
          confirm your slot by phone within one working hour.
        </p>

        {/* Summary receipt */}
        <div className="clay-inset rounded-3xl p-6 mt-6 text-left max-w-md mx-auto">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
            {[
              ["Patient", summary.name],
              ["Phone", summary.phone],
              ["Treatment", summary.treatmentName],
              ["Date", summary.date],
              ["Time", summary.slot],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-display font-semibold text-slate-500">{k}</dt>
                <dd className="text-navy-deep font-medium text-right">{v}</dd>
              </div>
            ))}
            {summary.notes && (
              <div className="contents">
                <dt className="font-display font-semibold text-slate-500">Notes</dt>
                <dd className="text-navy-deep text-right">{summary.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        <p className="badge-demo mt-6">
          <FlaskConical size={13} />
          Demo Appointment Request Preview — not a confirmed clinical booking
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <button type="button" onClick={reset} className="btn-ghost !py-3 text-sm">
            <RotateCcw size={16} /> Book Another
          </button>
          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald !py-3 text-sm"
          >
            <MessageCircle size={16} /> Confirm via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Main form                                                           */
  /* ------------------------------------------------------------------ */
  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      {/* Demo-mode compliance badge */}
      <div className="flex justify-center mb-6">
        <p className="badge-demo !text-center leading-snug">
          <FlaskConical size={13} className="shrink-0" />
          <span>
            Interactive Demo Mode: Simulated Booking Experience — No personal health information
            (PHI) is stored or transmitted.
          </span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Full name */}
        <div className="sm:col-span-1">
          <label htmlFor="bk-name" className="field-label">
            <User size={14} className="text-teal-600" /> Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="bk-name"
            type="text"
            autoComplete="name"
            className="input-clay"
            placeholder="e.g. Alexandra Bennett"
            value={fields.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!showError("name")}
            aria-describedby={showError("name") ? "bk-name-err" : undefined}
          />
          {showError("name") && (
            <p id="bk-name-err" role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label htmlFor="bk-phone" className="field-label">
            <Phone size={14} className="text-teal-600" /> Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="bk-phone"
            type="tel"
            autoComplete="tel"
            className="input-clay"
            placeholder="+1 555 000 0000"
            value={fields.phone}
            onChange={(e) => setField("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!showError("phone")}
            aria-describedby={showError("phone") ? "bk-phone-err" : undefined}
          />
          {showError("phone") && (
            <p id="bk-phone-err" role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.phone}
            </p>
          )}
        </div>

        {/* Email (optional) */}
        <div className="sm:col-span-2">
          <label htmlFor="bk-email" className="field-label">
            <Mail size={14} className="text-teal-600" /> Email <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            id="bk-email"
            type="email"
            autoComplete="email"
            className="input-clay"
            placeholder="you@example.com"
            value={fields.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!showError("email")}
            aria-describedby={showError("email") ? "bk-email-err" : undefined}
          />
          {showError("email") && (
            <p id="bk-email-err" role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="bk-date" className="field-label">
            <CalendarCheck size={14} className="text-teal-600" /> Preferred Date <span className="text-rose-500">*</span>
          </label>
          <input
            id="bk-date"
            type="date"
            className="input-clay"
            min={new Date().toISOString().split("T")[0]}
            value={fields.date}
            onChange={(e) => setField("date", e.target.value)}
            onBlur={() => blur("date")}
            aria-invalid={!!showError("date")}
            aria-describedby={showError("date") ? "bk-date-err" : undefined}
          />
          {showError("date") && (
            <p id="bk-date-err" role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.date}
            </p>
          )}
        </div>

        {/* Time slot */}
        <div>
          <label htmlFor="bk-slot" className="field-label">
            <Clock size={14} className="text-teal-600" /> Preferred Time <span className="text-rose-500">*</span>
          </label>
          <select
            id="bk-slot"
            className="input-clay"
            value={fields.slot}
            onChange={(e) => setField("slot", e.target.value)}
            onBlur={() => blur("slot")}
            aria-invalid={!!showError("slot")}
            aria-describedby={showError("slot") ? "bk-slot-err" : undefined}
          >
            <option value="">Select a time slot…</option>
            {TIME_SLOTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {showError("slot") && (
            <p id="bk-slot-err" role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.slot}
            </p>
          )}
        </div>

        {/* Treatment */}
        <div className="sm:col-span-2">
          <label htmlFor="bk-treatment" className="field-label">
            <Stethoscope size={14} className="text-teal-600" /> Treatment <span className="text-rose-500">*</span>
          </label>
          <select
            id="bk-treatment"
            className="input-clay"
            value={fields.treatment}
            onChange={(e) => setField("treatment", e.target.value)}
            onBlur={() => blur("treatment")}
            aria-invalid={!!showError("treatment")}
            aria-describedby={showError("treatment") ? "bk-treatment-err" : undefined}
          >
            <option value="">Select from our 12 treatments…</option>
            {TREATMENTS.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
          {showError("treatment") && (
            <p id="bk-treatment-err" role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.treatment}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label htmlFor="bk-notes" className="field-label">
            <FileText size={14} className="text-teal-600" /> Additional Notes{" "}
            <span className="text-slate-400 font-normal">(optional · max 400 chars)</span>
          </label>
          <textarea
            id="bk-notes"
            rows={3}
            maxLength={400}
            className="input-clay resize-none"
            placeholder="Anything we should know? Anxiety, accessibility needs, insurance…"
            value={fields.notes}
            onChange={(e) => setField("notes", e.target.value)}
            onBlur={() => blur("notes")}
            aria-invalid={!!showError("notes")}
          />
          {showError("notes") && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-amber-600 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.notes}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full !py-4 text-base disabled:opacity-70 disabled:pointer-events-none"
          aria-live="polite"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Preparing your demo request…
            </>
          ) : (
            <>
              <CalendarCheck size={18} /> Request My Appointment
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald !py-3.5 text-sm"
          >
            <MessageCircle size={16} /> Request via WhatsApp
          </a>
          <a href={CLINIC.phoneHref} className="btn-ghost !py-3.5 text-sm">
            <Phone size={16} /> Click-to-Call
          </a>
        </div>

        <p className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center mt-1">
          <ShieldCheck size={13} className="text-teal-600 shrink-0" />
          Demo compliance: your input stays in browser memory only — never stored, never sent.
        </p>
      </div>
    </form>
  );
}
