/**
 * App.jsx — Application shell & route table (React Router v6).
 * Wires the Barba-style transition wrapper around a keyed <Routes> tree,
 * mounts the global reveal-animation choreographer, persistent navigation,
 * glass footer, floating conversion layer and the global booking modal.
 * All 10 routes are served from one <main> landmark; unknown paths redirect.
 */
import { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import useRevealAnimations from "./hooks/useRevealAnimations";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingActions from "./components/layout/FloatingActions";
import PageTransitionWrapper from "./components/layout/PageTransitionWrapper";
import BookingModal from "./components/ui/BookingModal";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TreatmentsPage from "./pages/TreatmentsPage";
import TreatmentDetailPage from "./pages/TreatmentDetailPage";
import TeamPage from "./pages/TeamPage";
import ReviewsPage from "./pages/ReviewsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

/* Keyed routes remount per pathname so GSAP contexts reset cleanly */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/treatments" element={<TreatmentsPage />} />
      <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  /* Central scroll choreography (data-reveal / data-parallax / counters) */
  useRevealAnimations();

  return (
    <BookingProvider>
      <div className="page-canvas min-h-screen">
        <Navbar />
        <BookingModal />
        <FloatingActions />

        <PageTransitionWrapper>
          {/* pb-24 reserves space for the mobile sticky CTA bar */}
          <main id="main-content" className="pb-24 md:pb-0">
            <Suspense fallback={null}>
              <AnimatedRoutes />
            </Suspense>
          </main>
        </PageTransitionWrapper>

        <Footer />
      </div>
    </BookingProvider>
  );
}
