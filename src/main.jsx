import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
