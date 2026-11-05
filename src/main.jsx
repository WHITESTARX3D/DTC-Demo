/**
 * main.jsx — Application entry point.
 * Mounts the React root, wires BrowserRouter (React Router v6) and the
 * demo booking context around the App shell. Strictly JSX — no TypeScript.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
