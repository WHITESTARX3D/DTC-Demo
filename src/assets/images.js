/**
 * images.js — Central asset registry.
 * All imagery is imported (not public/ URLs) so the Vite single-file build
 * inlines them reliably. Studio portraits & interiors are demo placeholders.
 */
import drElena from "./dr-elena.jpg";
import drMarcus from "./dr-marcus.jpg";
import sarahKim from "./sarah-kim.jpg";
import drPriya from "./dr-priya.jpg";
import clinicInterior from "./clinic-interior.jpg";
import clinicReception from "./clinic-reception.jpg";
import smileOne from "./smile-1.jpg";
import smileTwo from "./smile-2.jpg";

export const IMAGES = {
  drElena,
  drMarcus,
  sarahKim,
  drPriya,
  clinicInterior,
  clinicReception,
  smileOne,
  smileTwo,
};

export default IMAGES;
