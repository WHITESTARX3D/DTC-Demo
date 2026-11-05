/**
 * BookingContext.jsx — Global "Book Appointment" modal controller.
 * Any CTA across the 10 routes can call openBooking(treatmentSlug) to launch
 * the demo booking flow with a treatment pre-selected. State lives purely in
 * memory (demo compliance: nothing is persisted to storage).
 */
import { createContext, useContext, useCallback, useMemo, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetTreatment, setPresetTreatment] = useState("");

  const openBooking = useCallback((treatmentSlug = "") => {
    setPresetTreatment(treatmentSlug);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetTreatment, openBooking, closeBooking }),
    [isOpen, presetTreatment, openBooking, closeBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export default BookingContext;
