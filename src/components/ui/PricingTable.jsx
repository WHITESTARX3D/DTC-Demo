/**
 * PricingTable.jsx — Indicative Treatment Fee Guide.
 * A clean clay table grouped for scannability, with the mandatory ethics
 * banner: all figures are indicative demo ranges; final plans follow a
 * comprehensive clinical examination. Also renders consultation, payment
 * method and 0% financing placeholder cards.
 */
import { BadgeDollarSign, CreditCard, FlaskConical, Percent, ReceiptText } from "lucide-react";
import { FEE_GUIDE } from "../../data/clinicData";

export default function PricingTable() {
  return (
    <div>
      {/* Ethics banner */}
      <p className="badge-demo w-full justify-center text-center !py-3 !px-5 !rounded-2xl leading-relaxed">
        <FlaskConical size={14} className="shrink-0" />
        <span>
          [Indicative Demo Price Ranges — Final treatment plans and fees are determined following a
          comprehensive clinical examination by a dentist]
        </span>
      </p>

      {/* Fee table — clay shell with row hover states */}
      <div className="clay-lg mt-6 overflow-hidden" data-reveal>
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] gap-x-6 px-6 sm:px-8 py-4 bg-gradient-to-r from-teal-50 to-sky-50 border-b border-teal-100/70">
          <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-teal-800">Treatment</span>
          <span className="hidden sm:block font-display text-xs font-bold uppercase tracking-[0.16em] text-teal-800">Category</span>
          <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-teal-800 text-right">Indicative Range</span>
        </div>
        <ul>
          {FEE_GUIDE.map((row, i) => (
            <li
              key={row.label}
              className={`grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-x-6 px-6 sm:px-8 py-4 transition-colors duration-300 hover:bg-teal-50/60 ${
                i !== FEE_GUIDE.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <span className="font-medium text-navy-deep text-sm sm:text-[15px] flex items-center gap-2.5">
                <BadgeDollarSign size={15} className="text-teal-500 shrink-0" aria-hidden="true" />
                {row.label}
              </span>
              <span className="hidden sm:inline-flex text-[11px] font-display font-bold uppercase tracking-wider text-slate-400">
                {row.category}
              </span>
              <span className="font-display font-bold text-teal-700 text-sm sm:text-[15px] text-right tabular-nums">
                {row.range}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Consultation / payment / financing placeholder cards */}
      <div className="grid sm:grid-cols-3 gap-5 mt-6" data-reveal-group>
        {[
          {
            icon: ReceiptText,
            title: "Consultation Fee",
            body: "$49 new-patient exam including digital X-rays — deducted from treatment when you proceed. [Sample figure — clinic-configurable]",
          },
          {
            icon: CreditCard,
            title: "Payment Methods",
            body: "Cards, bank transfer and major insurers with coded invoices for fast reimbursement. [Placeholder — configure per clinic]",
          },
          {
            icon: Percent,
            title: "0% Interest Financing",
            body: "Larger plans can be staged monthly at 0% interest through partner providers. [Demo option — subject to approval]",
          },
        ].map((c) => (
          <div key={c.title} className="clay-sm clay-hover p-6" data-reveal-item>
            <span className="clay-inset w-11 h-11 rounded-xl grid place-items-center text-teal-700">
              <c.icon size={19} />
            </span>
            <h3 className="font-display font-bold text-navy-deep mt-4">{c.title}</h3>
            <p className="text-[13px] leading-relaxed text-slate-med mt-2">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
