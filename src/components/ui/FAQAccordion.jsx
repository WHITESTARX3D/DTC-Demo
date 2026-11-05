/**
 * FAQAccordion.jsx — Accessible clay accordion.
 * Full ARIA wiring (aria-expanded / aria-controls / region role), smooth
 * GPU-friendly height animation via the grid-rows .faq-panel technique and
 * a rotating clay indicator chip. Keyboard-first, screen-reader friendly.
 */
import { useState } from "react";
import { Plus } from "lucide-react";

export function FAQItem({ item, index, openIndex, setOpenIndex, prefix = "faq" }) {
  const open = openIndex === index;
  const buttonId = `${prefix}-btn-${index}`;
  const panelId = `${prefix}-panel-${index}`;

  return (
    <div className={`clay-sm transition-all duration-300 ${open ? "shadow-clay" : ""}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpenIndex(open ? -1 : index)}
          className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4.5 sm:py-5 group"
        >
          <span className="font-display font-semibold text-navy-deep text-[15px] sm:text-base leading-snug">
            {item.q}
          </span>
          <span
            className={`shrink-0 w-9 h-9 rounded-xl grid place-items-center transition-all duration-400 ${
              open
                ? "rotate-45 text-white bg-gradient-to-br from-teal-500 to-sky-500 shadow-[0_8px_16px_-4px_rgba(13,148,136,0.45),inset_0_1px_3px_rgba(255,255,255,0.5)]"
                : "text-teal-700 bg-teal-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)] group-hover:bg-teal-100"
            }`}
            aria-hidden="true"
          >
            <Plus size={17} strokeWidth={2.4} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-panel"
        data-open={open}
      >
        <div>
          <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-slate-med">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items, prefix }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open guides scanning

  return (
    <div className="flex flex-col gap-3.5">
      {items.map((item, i) => (
        <FAQItem
          key={`${prefix || "faq"}-${i}`}
          item={item}
          index={i}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          prefix={prefix}
        />
      ))}
    </div>
  );
}
