/**
 * SEOHead.jsx — Per-route SEO manager (no external dependency).
 * Updates document.title, meta description, canonical + Open Graph tags and
 * injects JSON-LD Dentist/MedicalClinic structured data for local discovery.
 * Unmounting removes the route-specific JSON-LD node to avoid duplication.
 */
import { useEffect } from "react";
import { CLINIC } from "../../data/clinicData";

const SITE = CLINIC.name;
const BASE_URL = "https://pearldental.studio";

export default function SEOHead({ title, description, path = "/" }) {
  useEffect(() => {
    /* Title + description */
    document.title = title ? `${title} | ${SITE}` : `${SITE} — Gentle Family & Cosmetic Dentist in ${CLINIC.city}`;
    const desc = description || CLINIC.description;

    const setMeta = (selector, attr, key, value) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', "name", "description", desc);
    setMeta('meta[property="og:title"]', "property", "og:title", title ? `${title} | ${SITE}` : SITE);
    setMeta('meta[property="og:description"]', "property", "og:description", desc);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:url"]', "property", "og:url", `${BASE_URL}${path}`);

    /* Canonical */
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);

    /* JSON-LD structured data (Dentist / MedicalClinic) */
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalClinic"],
      name: CLINIC.name,
      description: CLINIC.description,
      url: `${BASE_URL}${path}`,
      telephone: CLINIC.phoneDisplay,
      email: CLINIC.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "24 Harbor Lane",
        addressLocality: "Riverton",
        addressRegion: "CA",
        postalCode: "90210",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      medicalSpecialty: "Dentistry",
      priceRange: "$$",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "route";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.querySelectorAll('script[data-seo="route"]').forEach((n) => n.remove());
    };
  }, [title, description, path]);

  return null; // head-only component; renders nothing into the DOM tree
}
