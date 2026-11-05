/**
 * clinicData.js — Single source of truth for the entire demo clinic.
 * Contains: clinic identity, all 12 treatments (overview, steps timeline,
 * indicative prices, FAQs), demo team profiles, testimonials, blog articles,
 * general FAQs and contact channels. All clinical claims are deliberately
 * phrased without outcome guarantees — every plan follows a clinical exam.
 */
import {
  Stethoscope,
  Sparkles,
  Sun,
  Activity,
  Anchor,
  AlignHorizontalDistributeCenter,
  Crown,
  Scissors,
  Baby,
  Layers,
  HeartPulse,
  Gem,
  ShieldCheck,
  Syringe,
  ScanLine,
  ClipboardList,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Clinic identity & contact channels                                  */
/* ------------------------------------------------------------------ */
export const CLINIC = {
  name: "Pearl Dental Studio",
  city: "Riverton",
  tagline: "Gentle modern dentistry, transparent care.",
  description:
    "Pearl Dental Studio is a demo modern dental clinic in Riverton offering gentle family, cosmetic and restorative dentistry with transparent pricing and anxiety-free care.",
  phoneDisplay: "+1 (555) 019-2210",
  phoneHref: "tel:+15550192210",
  whatsappDisplay: "+1 (555) 019-2210",
  whatsappHref: "https://wa.me/15550192210",
  email: "hello@pearldental.studio",
  address: "24 Harbor Lane, Riverton, CA 90210",
  mapUrl: "https://maps.google.com/?q=24+Harbor+Lane+Riverton",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed · Emergency line only" },
  ],
  emergencyNote:
    "Severe pain, swelling or a knocked-out tooth? Call our priority line immediately — keep a knocked-out tooth moist in milk and seek care within 30–60 minutes.",
};

/* WhatsApp deep-link builder with a formatted demo message */
export const buildWhatsAppLink = (message) =>
  `${CLINIC.whatsappHref}?text=${encodeURIComponent(message)}`;

/* ------------------------------------------------------------------ */
/* Treatment categories (filter chips on the Treatments directory)     */
/* ------------------------------------------------------------------ */
export const CATEGORIES = [
  "All Treatments",
  "Preventive",
  "Cosmetic",
  "Restorative",
  "Orthodontic",
  "Surgical",
  "Pediatric",
];

/* ------------------------------------------------------------------ */
/* The 12 required treatments — full detail objects                    */
/* ------------------------------------------------------------------ */
export const TREATMENTS = [
  {
    slug: "general-dentistry",
    name: "General Dentistry & Checkups",
    category: "Preventive",
    icon: Stethoscope,
    gradient: "from-teal-400 to-sky-500",
    soft: "bg-teal-50 text-teal-700",
    price: "$49 – $89",
    duration: "30–45 min",
    featured: true,
    short:
      "Comprehensive exams, digital X-rays and personalised prevention plans that keep small issues small.",
    overview:
      "A comprehensive checkup at Pearl Dental Studio blends a careful clinical examination with low-dose digital X-rays and a gentle conversation about your goals. We chart every tooth, screen gums and soft tissues, and build a prevention-first plan around your lifestyle — never a one-size-fits-all script.",
    purpose:
      "Detect concerns at their earliest, most treatable stage and keep your natural teeth healthy for life.",
    steps: [
      { t: "Warm welcome & history review", d: "We listen first — your concerns, medical history and any anxieties shape the entire visit." },
      { t: "Digital imaging", d: "Low-radiation digital X-rays and intraoral photos give a crisp baseline of your oral health." },
      { t: "Tooth-by-tooth examination", d: "Every tooth, existing restoration and gum pocket is charted and screened." },
      { t: "Oral cancer screening", d: "A quick, painless soft-tissue screening is included in every comprehensive exam." },
      { t: "Personalised care plan", d: "You leave with a transparent, prioritised plan — nothing is ever carried out without your consent." },
    ],
    faqs: [
      { q: "How often should I have a checkup?", a: "Most adults benefit from a visit every six months. Your dentist may suggest a different rhythm based on your gum health, medical history and risk profile." },
      { q: "Are digital X-rays safe?", a: "Digital sensors use up to 90% less radiation than traditional film. We only take images that are clinically justified for your care." },
      { q: "I feel anxious at the dentist. Can you help?", a: "Absolutely. We practise anxiety-free dentistry: explain-first pacing, stop signals you control, and a calm, judgement-free environment." },
    ],
  },
  {
    slug: "teeth-cleaning-scaling",
    name: "Teeth Cleaning & Scaling",
    category: "Preventive",
    icon: Sparkles,
    gradient: "from-cyan-400 to-teal-500",
    soft: "bg-cyan-50 text-cyan-700",
    price: "$59 – $129",
    duration: "45–60 min",
    featured: true,
    short:
      "Gentle ultrasonic scaling, polish and airflow stain removal for a fresh, smooth, healthier smile.",
    overview:
      "Professional cleaning removes the hardened tartar that brushing simply cannot reach. Our hygienists use fine ultrasonic tips, warm-water irrigation and a gentle airflow polish, finishing with tailored coaching so your home routine actually works for your mouth.",
    purpose:
      "Prevent gum inflammation and decay by removing plaque, tartar and surface stains safely and comfortably.",
    steps: [
      { t: "Gum health assessment", d: "We measure and chart gum pockets to tailor the cleaning intensity to you." },
      { t: "Ultrasonic scaling", d: "Fine vibrating tips with warm water lift away tartar above and below the gumline." },
      { t: "Airflow polish", d: "A gentle jet of water, air and fine powder removes tea, coffee and wine stains." },
      { t: "Fluoride & finish", d: "Optional fluoride varnish strengthens enamel and calms sensitivity." },
      { t: "Home-care coaching", d: "You get specific technique tips for the areas your brush keeps missing." },
    ],
    faqs: [
      { q: "Does scaling hurt?", a: "Most patients find it comfortable. If your gums are sensitive we can numb the area first — comfort always comes first." },
      { q: "Will cleaning make my teeth loose?", a: "No. Tartar can create a false sense of support; removing it improves long-term gum and bone health." },
      { q: "How often do I need a professional clean?", a: "Typically every six months, or every three to four months if you have a history of gum disease." },
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    category: "Cosmetic",
    icon: Sun,
    gradient: "from-amber-300 to-teal-400",
    soft: "bg-amber-50 text-amber-700",
    price: "$199 – $449",
    duration: "60–90 min",
    featured: true,
    short:
      "Dentist-supervised whitening with enamel-safe gels — brighter results without the sensitivity guesswork.",
    overview:
      "Professional whitening lifts years of staining safely because it is prescribed, not guessed. After checking your enamel and gums, we offer in-office power whitening or custom take-home trays, with desensitising protocols built in. Results vary per person — we set realistic shade goals together before we begin.",
    purpose:
      "Brighten natural enamel safely under professional supervision, with a plan matched to your sensitivity level.",
    steps: [
      { t: "Shade & suitability check", d: "We record your starting shade and confirm whitening is appropriate for your teeth and restorations." },
      { t: "Gum protection", d: "A protective barrier shields your gums and lips from the professional gel." },
      { t: "Whitening application", d: "Enamel-safe professional gel is applied in short, monitored cycles." },
      { t: "Desensitise & review", d: "A soothing mineral finish calms the teeth and we compare shades together." },
      { t: "Maintenance plan", d: "Optional custom top-up trays keep your result fresh for the long term." },
    ],
    faqs: [
      { q: "Is whitening safe for enamel?", a: "Dentist-supervised gels are formulated to be enamel-safe. We always examine your teeth first and decline cases where whitening would not be appropriate." },
      { q: "How white will my teeth get?", a: "Results vary with your natural shade and stain type. We show you a realistic target on a shade guide before treatment — no promises we cannot keep." },
      { q: "Will it whiten crowns or fillings?", a: "Whitening only lifts natural enamel. We plan any replacement of visible restorations after your new shade stabilises." },
    ],
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    category: "Restorative",
    icon: Activity,
    gradient: "from-sky-400 to-teal-600",
    soft: "bg-sky-50 text-sky-700",
    price: "$399 – $899",
    duration: "60–120 min",
    featured: false,
    short:
      "Modern, genuinely comfortable endodontics that relieves pain and saves your natural tooth.",
    overview:
      "A root canal today feels remarkably similar to a long filling. With profound numbing, rotary instruments and digital imaging, we gently clean the inflamed inner space of the tooth, seal it, and plan a strong final restoration. Our goal is always to save your natural tooth wherever clinically possible.",
    purpose:
      "Remove infection or inflammation from inside the tooth, relieve pain, and preserve your natural bite.",
    steps: [
      { t: "Diagnosis & comfort first", d: "Targeted X-rays confirm the diagnosis, then profound local anaesthesia settles the tooth fully." },
      { t: "Gentle disinfection", d: "The inflamed tissue is removed and the canals are cleaned with fine rotary instruments." },
      { t: "3D cleaning & shaping", d: "Antimicrobial irrigation disinfects the full canal system in three dimensions." },
      { t: "Sealing the canals", d: "A biocompatible filling seals the space to prevent reinfection." },
      { t: "Final restoration plan", d: "We plan a crown or onlay where needed to protect the tooth long-term." },
    ],
    faqs: [
      { q: "Is a root canal painful?", a: "The procedure itself is performed under profound anaesthesia — most patients are surprised by how routine it feels. Its purpose is to remove pain, not cause it." },
      { q: "How long does it take?", a: "Most cases complete in one or two visits of 60–120 minutes depending on the tooth's anatomy." },
      { q: "Root canal or extraction?", a: "Saving your natural tooth is usually the healthier, more economical long-term choice — we always walk you through both options honestly." },
    ],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    category: "Surgical",
    icon: Anchor,
    gradient: "from-teal-500 to-blue-600",
    soft: "bg-teal-50 text-teal-800",
    price: "$1,499 – $3,200 / site",
    duration: "Staged over 3–6 months",
    featured: true,
    short:
      "Digitally planned titanium roots and ceramic crowns that look, feel and bite like your own teeth.",
    overview:
      "Implants replace missing teeth from the root up. Using 3D digital planning, we place a small titanium post that fuses with the bone, then restore it with a custom ceramic crown, bridge or denture. Suitability always depends on bone health, gums and medical factors — your consultation includes an honest eligibility assessment.",
    purpose:
      "Restore chewing strength and confidence after tooth loss, while protecting neighbouring teeth and bone.",
    steps: [
      { t: "3D consultation & scan", d: "A CBCT-style 3D scan maps bone volume and nerves for precise, safe planning." },
      { t: "Guided placement", d: "The implant is placed under local anaesthesia with a digitally guided protocol." },
      { t: "Healing & integration", d: "Over 8–16 weeks the bone naturally bonds to the implant surface." },
      { t: "Digital impression", d: "A quick intraoral scan designs your crown — no messy moulds." },
      { t: "Crown fitting & aftercare", d: "Your custom crown is fitted, bite-checked and reviewed at maintenance visits." },
    ],
    faqs: [
      { q: "Am I a candidate for implants?", a: "Most healthy adults are, but bone volume, gum health, smoking and some medical conditions matter. A 3D assessment gives you a definitive, honest answer." },
      { q: "Does implant surgery hurt?", a: "Placement is done under effective local anaesthesia; most patients describe mild post-op soreness managed with standard painkillers." },
      { q: "How long do implants last?", a: "With good hygiene and reviews, implants often serve for decades. We never guarantee outcomes, but we design for longevity." },
    ],
  },
  {
    slug: "braces-clear-aligners",
    name: "Braces & Clear Aligners",
    category: "Orthodontic",
    icon: AlignHorizontalDistributeCenter,
    gradient: "from-sky-400 to-teal-500",
    soft: "bg-sky-50 text-sky-700",
    price: "$1,999 – $4,999",
    duration: "6–24 months",
    featured: true,
    short:
      "Nearly invisible aligners or modern low-profile braces — guided by a 3D preview of your future smile.",
    overview:
      "From removable clear aligners to discreet ceramic braces, we straighten teeth with digitally planned movements you can preview before starting. Every plan balances aesthetics with a healthy, stable bite — and we are upfront about which option genuinely suits your case, timeline and budget.",
    purpose:
      "Align crowded or spaced teeth for easier cleaning, a balanced bite and a confident smile.",
    steps: [
      { t: "Smile assessment & scan", d: "A 3D intraoral scan captures your current alignment in minutes — no impressions." },
      { t: "Digital treatment preview", d: "See a simulated step-by-step animation of your projected result before committing." },
      { t: "Appliance fitting", d: "Aligners are delivered in sequenced sets; braces are bonded in a single comfortable visit." },
      { t: "Progress reviews", d: "Short reviews every 6–8 weeks keep movement healthy, tracked and on schedule." },
      { t: "Retention for life", d: "Custom retainers and a retention plan protect your result for the long term." },
    ],
    faqs: [
      { q: "Aligners or braces — which is better?", a: "Aligners suit mild-to-moderate cases and busy lifestyles; braces remain best for complex movements. We recommend based on your scan, not on trends." },
      { q: "Do aligners hurt?", a: "Expect gentle pressure for a day or two with each new set — a sign the planned movement is happening." },
      { q: "Am I too old for orthodontics?", a: "Healthy teeth can move at any age. Many of our aligner patients are in their 40s, 50s and beyond." },
    ],
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    category: "Restorative",
    icon: Crown,
    gradient: "from-teal-400 to-indigo-400",
    soft: "bg-indigo-50 text-indigo-700",
    price: "$599 – $1,299 / unit",
    duration: "2 visits · ~2 weeks",
    featured: false,
    short:
      "Hand-crafted ceramic restorations, digitally designed to match your bite, shade and character.",
    overview:
      "A crown wraps and protects a weakened tooth; a bridge replaces a missing one by anchoring to its neighbours. Ours are digitally scanned, shade-matched and milled from high-strength ceramics, then hand-finished by master technicians for a result that disappears into your smile.",
    purpose:
      "Rebuild cracked, root-treated or missing teeth with strong, natural-looking ceramic protection.",
    steps: [
      { t: "Assessment & shade mapping", d: "We evaluate the tooth, photograph your shade and discuss ceramic options." },
      { t: "Gentle preparation", d: "The tooth is shaped conservatively under local anaesthesia; a digital scan replaces moulds." },
      { t: "Custom fabrication", d: "Your restoration is precision-milled and hand-characterised by our lab partners." },
      { t: "Fit & bond", d: "We check fit, bite and aesthetics meticulously before final bonding." },
      { t: "Review & care plan", d: "A review visit and hygiene guidance protect your investment for years." },
    ],
    faqs: [
      { q: "How long do crowns last?", a: "With good care, quality ceramic crowns commonly serve 10–15 years or longer. Night-time grinding guards extend their life." },
      { q: "Will it look natural?", a: "We layer shades and translucency to mimic real enamel, and we always show you the result before bonding." },
      { q: "Bridge or implant?", a: "Both are valid; implants preserve bone and spare neighbours, bridges are faster and don't need surgery. We compare both for your specific gap." },
    ],
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    category: "Surgical",
    icon: Scissors,
    gradient: "from-rose-300 to-sky-400",
    soft: "bg-rose-50 text-rose-700",
    price: "$99 – $349",
    duration: "20–60 min",
    featured: false,
    short:
      "Calm, gentle removal of hopeless teeth or wisdom teeth — with comfort protocols at every step.",
    overview:
      "When a tooth cannot be predictably saved, we remove it atraumatically to protect the surrounding bone and gums. Profound anaesthesia, gentle techniques and a clear aftercare kit make the experience far calmer than its reputation — and we always discuss replacement options so the gap never becomes a problem.",
    purpose:
      "Remove unsalvageable or problematic teeth safely while preserving bone for future restoration.",
    steps: [
      { t: "Assessment & options", d: "Imaging confirms the tooth's position; we confirm removal is truly the right call." },
      { t: "Comfort & numbing", d: "We take time to achieve profound numbness — and test it before starting." },
      { t: "Atraumatic removal", d: "Fine instruments loosen and lift the tooth gently, protecting surrounding bone." },
      { t: "Socket care", d: "The site is cleaned and, where useful, prepared for future implant options." },
      { t: "Aftercare kit & follow-up", d: "You leave with written instructions, gauze and our emergency contact." },
    ],
    faqs: [
      { q: "How painful is an extraction?", a: "You should feel pressure, not pain. Post-op soreness typically peaks at 24–48 hours and settles with simple analgesia." },
      { q: "What is a dry socket and how do I avoid it?", a: "It is a sore that develops if the protective clot is lost. Avoid straws, smoking and vigorous rinsing for 72 hours — your aftercare kit explains everything." },
      { q: "Should I replace the tooth afterwards?", a: "Usually yes — neighbouring teeth drift into gaps over time. We map sensible options from implants to bridges at your review." },
    ],
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    category: "Pediatric",
    icon: Baby,
    gradient: "from-violet-300 to-teal-400",
    soft: "bg-violet-50 text-violet-700",
    price: "$39 – $99",
    duration: "30–45 min",
    featured: true,
    short:
      "Playful, pressure-free first visits that build lifelong brave patients — not dental fear.",
    overview:
      "Children's dentistry is psychology first, dentistry second. Visits are playful, honest and never rushed: ride the chair, count the teeth, meet the water sprayer. We focus on prevention with fluoride, sealants and habit coaching, and we never restrain or surprise a child — trust is the treatment.",
    purpose:
      "Protect developing smiles and build positive, fearless dental habits from the very first tooth.",
    steps: [
      { t: "Happy visit introduction", d: "First visits are gentle tours — your child explores the chair and tools at their own pace." },
      { t: "Playful examination", d: "Counting games make the checkup fun while we assess growth, decay risk and habits." },
      { t: "Gentle clean & fluoride", d: "A soft polish and kid-friendly fluoride strengthen brand-new enamel." },
      { t: "Sealants where useful", d: "Protective coatings shield the deep grooves of newly erupted molars." },
      { t: "Parent coaching", d: "Practical guidance on brushing battles, snacks, bottles and thumb-sucking." },
    ],
    faqs: [
      { q: "When should my child first visit?", a: "Around the first birthday or first tooth. Early, easy visits make dentistry normal long before anything hurts." },
      { q: "Are baby teeth really that important?", a: "Yes — they hold space for adult teeth, guide speech and chewing, and early decay is painful and avoidable." },
      { q: "What if my child refuses treatment?", a: "We never force it. Patience, tell-show-do and staged visits build cooperation — trust beats speed every time." },
    ],
  },
  {
    slug: "dentures-restorative",
    name: "Dentures & Restorative Dentistry",
    category: "Restorative",
    icon: Layers,
    gradient: "from-sky-400 to-teal-600",
    soft: "bg-sky-50 text-sky-800",
    price: "$699 – $2,499 / arch",
    duration: "3–5 visits",
    featured: false,
    short:
      "Precision full and partial dentures — natural-looking, comfortable, and implant-upgradeable.",
    overview:
      "Modern dentures are a world away from the false teeth of the past. Digitally measured, hand-characterised acrylics and precision fit deliver stability and a genuinely natural look. Where extra confidence is wanted, a few implants can lock a denture firmly in place — we design every case around your comfort and budget.",
    purpose:
      "Restore comfortable chewing, clear speech and facial support after extensive tooth loss.",
    steps: [
      { t: "Consultation & design", d: "We map your bite, facial support and smile line; tooth shades are chosen together." },
      { t: "Precision impressions", d: "Detailed measurements and moulds capture your unique anatomy." },
      { t: "Wax try-in", d: "You preview the exact teeth and smile before anything is final — changes are easy here." },
      { t: "Fitting & adjustments", d: "Your denture is fitted and pressure spots are refined over follow-up visits." },
      { t: "Long-term maintenance", d: "Relines, repairs and implant upgrades keep the fit perfect as years pass." },
    ],
    faqs: [
      { q: "Will people know I wear dentures?", a: "Well-designed dentures look remarkably natural — we choose tooth shapes and shades that match your age and character." },
      { q: "How long does getting used to them take?", a: "Most patients adapt within a few weeks. We schedule adjustment visits during that period at no stress to you." },
      { q: "What are implant-supported dentures?", a: "Two to four implants can anchor a lower denture so it clicks firmly in place — a life-changing upgrade for many wearers." },
    ],
  },
  {
    slug: "gum-disease-treatment",
    name: "Gum Disease Treatment",
    category: "Preventive",
    icon: HeartPulse,
    gradient: "from-emerald-400 to-teal-600",
    soft: "bg-emerald-50 text-emerald-700",
    price: "$149 – $699",
    duration: "2–4 visits",
    featured: false,
    short:
      "Deep-cleaning therapy that stops bleeding gums, protects the bone and saves natural teeth.",
    overview:
      "Gum disease is common, quiet and treatable — especially when caught early. Our periodontal programme combines deep cleaning (scaling and root planing), honest home-care systems and measurable reviews. We track pocket depths over time so you can literally see your gums healing.",
    purpose:
      "Stop the inflammation that quietly destroys the bone supporting your teeth — and keep it stopped.",
    steps: [
      { t: "Periodontal charting", d: "Six measurements per tooth map exactly where the disease is active." },
      { t: "Deep cleaning phase", d: "Under local anaesthesia, tartar and bacteria are removed from deep pockets." },
      { t: "Home-care systems", d: "Interdental brushes, techniques and rinses matched to your actual pockets." },
      { t: "Healing re-evaluation", d: "After 6–8 weeks we re-measure — most patients see pockets shrink visibly." },
      { t: "Maintenance programme", d: "Three or four-monthly therapy visits keep the disease dormant for good." },
    ],
    faqs: [
      { q: "Why do my gums bleed when I brush?", a: "Bleeding is inflammation — usually gingivitis, which is fully reversible. Left alone it can progress to bone loss, so an early assessment matters." },
      { q: "Can gum disease be cured?", a: "Early gingivitis, yes completely. Advanced periodontitis can be controlled and stabilised long-term with therapy and maintenance." },
      { q: "Is treatment painful?", a: "Deep cleaning is performed with local anaesthesia, so you stay comfortable. Some tenderness for a day or two afterwards is normal." },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    category: "Cosmetic",
    icon: Gem,
    gradient: "from-fuchsia-300 to-sky-400",
    soft: "bg-fuchsia-50 text-fuchsia-700",
    price: "$299 – $899 / tooth",
    duration: "1–3 visits",
    featured: false,
    short:
      "Veneers, bonding and smile design — conservative artistry planned digitally before anything begins.",
    overview:
      "Great cosmetic dentistry is invisible. From same-day composite bonding to hand-layered porcelain veneers, we design smiles digitally first — you preview shapes and shades on a mockup in your own mouth before committing. Our philosophy is always minimum drilling, maximum preservation of natural enamel.",
    purpose:
      "Close gaps, repair chips and harmonise shapes and shades — conservatively and predictably.",
    steps: [
      { t: "Smile design session", d: "Photographs, scans and your wishlist combine into a digital smile proposal." },
      { t: "Mock-up preview", d: "A reversible trial smile lets you see and feel the planned result in your own mouth." },
      { t: "Conservative preparation", d: "Where veneers are chosen, only minimal enamel is reshaped; bonding often needs none." },
      { t: "Artistic placement", d: "Restorations are layered, shaded and bonded with meticulous isolation." },
      { t: "Polish, protect & review", d: "A final aesthetic review and a protective night guard preserve your new smile." },
    ],
    faqs: [
      { q: "Veneers or bonding — what is the difference?", a: "Bonding is sculpted directly in one visit and is gentler on the wallet; porcelain veneers are lab-made, more stain-resistant and longer-lived. We compare both honestly for your case." },
      { q: "Does it damage my natural teeth?", a: "Our philosophy is enamel preservation. Many cases need little or no drilling — your mock-up visit includes a clear explanation of what is involved." },
      { q: "Will my smile still look like me?", a: "That is the entire point of digital design — we enhance harmony and character, never a generic 'perfect' template." },
    ],
  },
];

/* Quick lookup helper for dynamic treatment routes */
export const getTreatmentBySlug = (slug) =>
  TREATMENTS.find((t) => t.slug === slug);

/* ------------------------------------------------------------------ */
/* Indicative fee guide rows (Treatments & Contact pages)              */
/* ------------------------------------------------------------------ */
export const FEE_GUIDE = [
  { label: "New Patient Exam & Digital X-rays", range: "$49 – $89", category: "Diagnostics" },
  { label: "Hygiene Clean, Scale & Polish", range: "$59 – $129", category: "Preventive" },
  { label: "Professional Teeth Whitening", range: "$199 – $449", category: "Cosmetic" },
  { label: "Tooth-Coloured Filling", range: "$129 – $329", category: "Restorative" },
  { label: "Root Canal Treatment", range: "$399 – $899", category: "Restorative" },
  { label: "Ceramic Crown / Bridge Unit", range: "$599 – $1,299", category: "Restorative" },
  { label: "Dental Implant (per site, restored)", range: "$1,499 – $3,200", category: "Surgical" },
  { label: "Clear Aligner Programme", range: "$1,999 – $4,999", category: "Orthodontic" },
  { label: "Simple Tooth Extraction", range: "$99 – $349", category: "Surgical" },
  { label: "Children's Exam & Clean", range: "$39 – $99", category: "Pediatric" },
  { label: "Full Denture (per arch)", range: "$699 – $2,499", category: "Restorative" },
  { label: "Gum Therapy Programme", range: "$149 – $699", category: "Preventive" },
];

/* ------------------------------------------------------------------ */
/* Demo team profiles — explicitly marked as sample placeholders       */
/* ------------------------------------------------------------------ */
export const TEAM = [
  {
    id: "dr-elena-vance",
    name: "Dr. Elena Vance, DDS",
    role: "Lead Cosmetic & Restorative Dentist",
    experience: "14+ years clinical focus (sample figure)",
    credential: "DDS · Prosthodontic Aesthetics Certificate (sample)",
    image: "drElena",
    color: "teal",
    bio: "Dr. Vance founded Pearl Dental Studio on a simple belief: superb dentistry should feel calm, honest and never rushed. Her focus is minimally invasive cosmetic and restorative work — digital smile design, ceramic artistry and full-mouth rehabilitation for patients who thought a confident smile was out of reach.",
    specialties: ["Digital Smile Design", "Porcelain Veneers", "Full-Mouth Rehabilitation", "Anxious Patient Care"],
  },
  {
    id: "dr-marcus-hale",
    name: "Dr. Marcus Hale, DMD",
    role: "Implant & Surgical Dentistry Lead",
    experience: "12+ years surgical focus (sample figure)",
    credential: "DMD · Advanced Implantology Residency (sample)",
    image: "drMarcus",
    color: "sky",
    bio: "Dr. Hale leads our guided implant and surgical programme. His planning-first philosophy — 3D scans before any decision — means surgical visits are shorter, calmer and more predictable. He is known for explaining complex treatment in refreshingly plain language.",
    specialties: ["Guided Implant Surgery", "Wisdom Tooth Surgery", "Bone Grafting", "Full-Arch Solutions"],
  },
  {
    id: "sarah-kim",
    name: "Sarah Kim, RDH",
    role: "Lead Dental Hygienist & Prevention Coach",
    experience: "9+ years hygiene focus (sample figure)",
    credential: "RDH · Periodontal Therapy Certification (sample)",
    image: "sarahKim",
    color: "cyan",
    bio: "Sarah runs the prevention engine of the studio: gentle airflow cleanings, periodontal therapy and the home-care coaching that makes results last. Patients consistently describe her cleanings as the first they've ever looked forward to.",
    specialties: ["Airflow Polishing", "Gum Therapy", "Sensitivity Care", "Home-Care Coaching"],
  },
  {
    id: "dr-priya-nair",
    name: "Dr. Priya Nair, BDS",
    role: "Pediatric & Family Dentist",
    experience: "10+ years paediatric focus (sample figure)",
    credential: "BDS · Paediatric Dentistry Diploma (sample)",
    image: "drPriya",
    color: "violet",
    bio: "Dr. Nair has one job description: make children actually enjoy the dentist. Her tell-show-do approach, endless patience and prevention-first care turn nervous first visits into proud, sticker-collecting milestones — and parents into loyal families.",
    specialties: ["Children's First Visits", "Fissure Sealants", "Habit & Diet Coaching", "Special Needs Care"],
  },
];

/* ------------------------------------------------------------------ */
/* Clinic pillars — the four trust promises                            */
/* ------------------------------------------------------------------ */
export const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Hospital-Grade Sterilization",
    desc: "Class-B autoclave cycles, sealed instrument pouches and single-use barriers — every patient, every time, logged and traceable.",
  },
  {
    icon: Syringe,
    title: "Pain-Free Modern Anesthesia",
    desc: "Buffered, warmed anaesthetic and slow-delivery technique make numbing virtually unnoticeable — comfort is non-negotiable.",
  },
  {
    icon: ScanLine,
    title: "Digital 3D Intraoral Scanning",
    desc: "Goodbye gag-inducing moulds: a 3D digital scan captures your smile in minutes and powers precise, same-day planning.",
  },
  {
    icon: ClipboardList,
    title: "Transparent Treatment Plans",
    desc: "Itemised plans, honest options and indicative fees before we begin — you approve everything, always, in writing.",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials — sample demo reviews for layout demonstration only    */
/* ------------------------------------------------------------------ */
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Amelia R.",
    meta: "Clear Aligner Patient · Sample Review",
    category: "Orthodontics",
    rating: 5,
    date: "2 weeks ago",
    text: "I previewed my entire result in 3D before paying a cent. Ten months later, the simulation and my real smile are nearly identical. The team explained every step — zero surprises, zero jargon.",
  },
  {
    id: 2,
    name: "Daniel K.",
    meta: "Implant Patient · Sample Review",
    category: "Implants",
    rating: 5,
    date: "1 month ago",
    text: "After years of hiding a missing tooth, the implant process was honestly easier than the filling I had years ago. The 3D planning appointment alone was worth it — everything was mapped and explained.",
  },
  {
    id: 3,
    name: "Grace & Family M.",
    meta: "Family Patients · Sample Review",
    category: "Family",
    rating: 5,
    date: "3 weeks ago",
    text: "Our five-year-old asks when she gets to go back to the dentist. Let that sink in. Dr. Nair turned her first checkup into the highlight of her week, and we watched the whole thing in complete trust.",
  },
  {
    id: 4,
    name: "Robert T.",
    meta: "Root Canal Patient · Sample Review",
    category: "Endodontics",
    rating: 5,
    date: "2 months ago",
    text: "I arrived terrified with a throbbing molar and left wondering why I'd lost a week of sleep dreading it. Completely painless, and they phoned the next morning to check on me. Old-fashioned care, new-grade tech.",
  },
  {
    id: 5,
    name: "Sofia L.",
    meta: "Whitening & Bonding Patient · Sample Review",
    category: "Cosmetic",
    rating: 5,
    date: "1 month ago",
    text: "They talked me OUT of veneers and into simple whitening plus tiny bonding tweaks — half the price I expected to pay, and my smile has never looked better. That honesty earned a patient for life.",
  },
  {
    id: 6,
    name: "James W.",
    meta: "Hygiene Patient · Sample Review",
    category: "Hygiene",
    rating: 5,
    date: "3 days ago",
    text: "Sarah's airflow cleaning felt like a spa treatment for my teeth. She showed me exactly where my brushing was failing with the tiny camera — no lecture, just genuinely useful coaching.",
  },
  {
    id: 7,
    name: "Nadia H.",
    meta: "Emergency Patient · Sample Review",
    category: "Emergency",
    rating: 4,
    date: "2 months ago",
    text: "Cracked a tooth on a Sunday morning; they coached me over the phone and fit me in first thing Monday. Calm, organised, kind. The chip repair is invisible — even I can't find it anymore.",
  },
  {
    id: 8,
    name: "Margaret D.",
    meta: "Denture Patient · Sample Review",
    category: "Dentures",
    rating: 5,
    date: "6 weeks ago",
    text: "At 71, I didn't think comfortable dentures existed. Mine stay put through steak dinners and sneezes. I only wish I'd found this studio a decade earlier.",
  },
];

export const REVIEW_CATEGORIES = [
  "All",
  "Cosmetic",
  "Implants",
  "Orthodontics",
  "Family",
  "Hygiene",
  "Emergency",
];

/* ------------------------------------------------------------------ */
/* General clinic FAQs (Home page accordion)                           */
/* ------------------------------------------------------------------ */
export const GENERAL_FAQS = [
  {
    q: "Do you accept nervous or anxious patients?",
    a: "Anxious patients are our specialty, not an inconvenience. We use explain-first pacing, agreed stop-signals you control, noise-cancelling headphones and numbing protocols that are genuinely gentle. You set the speed of every visit.",
  },
  {
    q: "How much will my treatment cost?",
    a: "Every plan is itemised in writing before we begin, and our indicative fee guide is published openly on the Treatments page. Final fees are confirmed only after a clinical examination — you'll never discover a surprise on your invoice.",
  },
  {
    q: "Do you offer payment plans or financing?",
    a: "Yes — staged payment schedules and 0% interest financing options are available on larger treatment plans (clinic-configurable). Speak with our care coordinator for a plan that fits your budget.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call our priority line first. Severe swelling, trauma or a knocked-out tooth is time-critical: keep the tooth moist (ideally in milk), avoid aspirin on the gum, and get to us within 30–60 minutes for the best chance of saving it.",
  },
  {
    q: "Are X-rays really necessary and safe?",
    a: "We use low-dose digital sensors — up to 90% less radiation than traditional film — and only take images that change your diagnosis or safety. You can always ask us why a particular image is recommended.",
  },
  {
    q: "Which insurance providers do you work with?",
    a: "We provide the coded itemised invoices your insurer needs for fast reimbursement, and our team happily helps with claim paperwork. Coverage varies by plan — bring your policy details to your first visit.",
  },
];

/* ------------------------------------------------------------------ */
/* Blog articles — educational, disclaimer-first content               */
/* ------------------------------------------------------------------ */
export const BLOG_POSTS = [
  {
    slug: "pain-free-root-canal-guide",
    title: "The Complete Guide to Genuinely Pain-Free Root Canals",
    excerpt:
      "Root canals have a 50-year-old reputation and a five-star modern reality. Here's what the treatment actually involves today — and why relief, not pain, is the point.",
    category: "Treatment Guides",
    date: "January 12, 2026",
    readTime: "6 min read",
    author: "Dr. Elena Vance, DDS",
    authorRole: "Lead Cosmetic & Restorative Dentist",
    tags: ["Root Canal", "Comfort", "Endodontics"],
    accent: "from-sky-400 to-teal-500",
    sections: [
      {
        heading: "Why the bad reputation is decades out of date",
        paragraphs: [
          "Ask someone to picture a root canal and they'll picture pain. That reputation was earned in an era of silver instruments, film X-rays and hit-or-miss anaesthesia. Modern endodontics is a different procedure entirely: rotary nickel-titanium files, apex locators that measure canal length electronically, and buffered anaesthetics that take effect predictably and completely.",
          "In contemporary practice, the overwhelming majority of patients describe the appointment as comparable to having a filling placed — only longer. The most common post-treatment feedback we hear is some version of: 'I can't believe I was worried about that.'",
        ],
      },
      {
        heading: "What a root canal actually treats",
        paragraphs: [
          "Inside every tooth is a small chamber of living tissue called the pulp. When deep decay, a crack or trauma inflames or infects it, the pressure inside the rigid tooth creates the throbbing pain that brings patients to our door. A root canal simply removes that inflamed tissue, disinfects the space, and seals it — the tooth stays, the pain leaves.",
        ],
        list: [
          "Deep decay reaching the inner pulp chamber",
          "A crack or fracture exposing the nerve",
          "A dying nerve after an old knock or trauma",
          "A persistent abscess at the root tip",
        ],
      },
      {
        heading: "The modern appointment, step by step",
        paragraphs: [
          "First, diagnosis: a targeted digital X-ray confirms which tooth is responsible, because referred pain is famously misleading. Then comfort: profound local anaesthesia, tested before we begin. If you can feel it, we don't start — that is the rule.",
          "The inflamed tissue is removed with fine rotary instruments while antimicrobial irrigation disinfects in three dimensions. The canals are then sealed with a biocompatible material, and a plan is made for the final crown or onlay that protects the tooth for the long term.",
        ],
      },
      {
        heading: "Recovery: what the first 48 hours look like",
        paragraphs: [
          "Once the anaesthesia wears off, expect mild tenderness when biting for a day or two — the ligament around the root has been through a procedure and deserves a brief rest. Standard over-the-counter analgesics are usually all that's needed, and most patients return to work the same afternoon.",
          "Call the clinic promptly if pain escalates rather than settles, if swelling appears, or if your bite feels high — a two-minute adjustment solves it. Otherwise, your review appointment confirms quiet healing.",
        ],
      },
      {
        heading: "Save the tooth or remove it? An honest comparison",
        paragraphs: [
          "Extraction is quicker and cheaper on day one — and more expensive over a decade. A gap drifts, bites shift, and replacing a tooth with an implant or bridge costs more than saving it ever did. When a tooth has a reasonable prognosis, root canal treatment is almost always the wiser investment. When it doesn't, we'll tell you that too.",
        ],
      },
    ],
  },
  {
    slug: "daily-enamel-protection-habits",
    title: "10 Daily Habits That Protect Your Enamel for Life",
    excerpt:
      "Enamel is the hardest substance in your body — and it doesn't grow back. These tiny daily decisions decide whether yours lasts a lifetime.",
    category: "Preventative Care",
    date: "January 4, 2026",
    readTime: "4 min read",
    author: "Sarah Kim, RDH",
    authorRole: "Lead Dental Hygienist & Prevention Coach",
    tags: ["Prevention", "Enamel", "Hygiene"],
    accent: "from-emerald-400 to-teal-500",
    sections: [
      {
        heading: "Enamel: precious, and permanently non-renewable",
        paragraphs: [
          "Tooth enamel is 96% mineral — harder than bone, tougher than you think, and completely incapable of regenerating once worn away. Every habit below is about one of two things: reducing acid attacks, or helping your saliva do its remarkable natural repair work.",
        ],
      },
      {
        heading: "The habits that matter most",
        paragraphs: [
          "None of these require willpower or expensive products. They require timing and awareness — and they compound quietly for decades.",
        ],
        list: [
          "Wait 30 minutes after acidic food or drink before brushing — softened enamel brushes away",
          "Sip water after coffee, wine or juice to rinse acids and sugars",
          "Use a soft brush, and let the bristles do the work — scrubbing wears grooves",
          "Fluoride toothpaste, twice daily, and spit without rinsing to let it keep working",
          "Snack less often rather than less overall — frequency, not volume, drives acid attacks",
          "Chew sugar-free gum after meals to trigger protective saliva flow",
          "Wear a night guard if you grind — night-time grinding can exert enormous force",
          "Treat dry mouth seriously; saliva is your enamel's repair crew",
          "Rinse or chew gum after vomiting or reflux, never brush immediately",
          "Keep six-month hygiene visits so small soft spots never become cavities",
        ],
      },
      {
        heading: "The 30-minute rule, explained",
        paragraphs: [
          "Acid temporarily softens the enamel surface — a normal, reversible event. Brushing during that softened window physically scrubs mineral away. Waiting half an hour lets saliva neutralise and reharden the surface first. If mornings are rushed, brush before breakfast, not after.",
        ],
      },
      {
        heading: "When to see us",
        paragraphs: [
          "New sensitivity to cold, translucent or chipped edges, or a yellowing that whitening won't fix can all signal enamel wear. Early professional fluoride, bonding or simple habit changes are far easier than rebuilding later — prevention will always beat restoration.",
        ],
      },
    ],
  },
  {
    slug: "clear-aligners-vs-braces",
    title: "Clear Aligners vs Traditional Braces: An Honest Comparison",
    excerpt:
      "Aligners look invisible on Instagram. Braces quietly win complex cases. Here's the candid, scan-first framework we use to recommend one or the other.",
    category: "Treatment Guides",
    date: "December 18, 2025",
    readTime: "5 min read",
    author: "Dr. Elena Vance, DDS",
    authorRole: "Lead Cosmetic & Restorative Dentist",
    tags: ["Aligners", "Braces", "Orthodontics"],
    accent: "from-violet-400 to-sky-500",
    sections: [
      {
        heading: "Two tools, one goal — and real differences",
        paragraphs: [
          "Both aligners and braces move teeth with gentle, sustained forces. Neither is universally 'better'; they're different instruments with different strengths. The right choice is the one matched to your specific tooth movements, your discipline and your lifestyle — which is why we always start with a 3D scan rather than a preference.",
        ],
      },
      {
        heading: "Where clear aligners shine",
        paragraphs: [
          "For mild to moderate crowding, spacing and cosmetic refinement, aligners are superb. They're nearly invisible, removable for meals and important meetings, and make brushing and flossing straightforward. Digital planning lets you preview the projected result before committing.",
        ],
        list: [
          "Aesthetics: virtually invisible in daily life",
          "Hygiene: remove to brush and floss normally",
          "Comfort: no brackets or wires to irritate cheeks",
          "Predictability: every movement is pre-programmed on screen",
        ],
      },
      {
        heading: "Where braces still win",
        paragraphs: [
          "Complex rotations, large bite corrections, severely impacted teeth and vertical movements remain the home turf of fixed braces. Brackets give the clinician three-dimensional control that plastic cannot yet match, and modern ceramic options are far subtler than the metal of school photos. Braces also work 24/7 — no reliance on remembering to wear them.",
        ],
      },
      {
        heading: "The honesty section: compliance and cost",
        paragraphs: [
          "Aligners only work when worn 20–22 hours a day. If trays live in a pocket, treatment stalls — removable convenience demands real discipline. Cost is typically comparable between the two for moderate cases; complex cases can make braces the more economical route. During your scan consultation we show you both pathways with projected timelines and fees side by side, then recommend — never upsell.",
        ],
      },
      {
        heading: "Whichever you choose, retention is forever",
        paragraphs: [
          "Teeth have memory, and without retention they drift back toward their old positions — that's biology, not a sales line. Every completed case at the studio includes a custom retainer plan, because the day the braces come off is the day retention begins.",
        ],
      },
    ],
  },
  {
    slug: "children-dental-visit-frequency",
    title: "How Often Should Children Really Visit the Dentist?",
    excerpt:
      "First tooth, first birthday — then what? A paediatric dentist's honest guide to visit rhythms, and what actually happens at each age.",
    category: "Family & Kids",
    date: "December 5, 2025",
    readTime: "4 min read",
    author: "Dr. Priya Nair, BDS",
    authorRole: "Pediatric & Family Dentist",
    tags: ["Children", "Prevention", "First Visit"],
    accent: "from-amber-300 to-rose-300",
    sections: [
      {
        heading: "The first visit: earlier than most parents expect",
        paragraphs: [
          "The professional guidance is simple: first tooth or first birthday, whichever comes first. Not because a one-year-old needs treatment — but because an early, easy 'happy visit' makes the dental clinic a familiar, boring place long before anything could possibly hurt. Fear is learned; so is calm.",
        ],
      },
      {
        heading: "The default rhythm — and when it changes",
        paragraphs: [
          "For most children, a visit every six months keeps prevention ahead of decay. We see more often — every three to four months — when a child has early signs of enamel weakness, orthodontic concerns, or habits we're actively reshaping together. The rhythm is always personalised, never a conveyor belt.",
        ],
        list: [
          "Ages 1–3: gentle counting games, brushing coaching for parents, fluoride guidance",
          "Ages 4–6: first polishings, diet talks, monitoring habits like thumb-sucking",
          "Ages 6–12: fissure sealants on new molars, early orthodontic screening, sport guards",
          "Teens: aligner conversations, wisdom-tooth monitoring, tightening independence in home care",
        ],
      },
      {
        heading: "What we actually watch for (it's not just holes)",
        paragraphs: [
          "A paediatric checkup screens far more than decay: jaw growth and bite development, airway and breathing patterns, speech-friendly spacing, grinding, and the quietly important psychology of how your child feels in the chair. Catching a growth pattern at seven is gentle guidance; catching it at seventeen is orthodontics.",
        ],
      },
      {
        heading: "Making visits easy: three parent-tested tips",
        paragraphs: [
          "Book morning appointments when children are fresh. Describe the visit honestly but cheerfully — 'they'll count your teeth and give you a ride in the chair' beats nervous over-reassurance. And let us do the explaining in surgery: our words are rehearsed, child-tested, and gloriously boring to anxious imaginations.",
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

export const BLOG_CATEGORIES = ["All Articles", "Preventative Care", "Treatment Guides", "Family & Kids"];
