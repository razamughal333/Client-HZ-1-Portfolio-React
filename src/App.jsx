import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import FloatingMessageButton from "./components/FloatingMessageButton";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import KnowMore from "./pages/KnowMore";
import AllWork from "./pages/AllWork";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--ink)]">
      <CustomCursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/know-more" element={<KnowMore />} />
          <Route path="/work" element={<AllWork />} />
        </Routes>
      </AnimatePresence>

      <BackToTop />
      <FloatingMessageButton />
    </div>
  );
}

export default App;
