import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import FloatingMessageButton from "./components/FloatingMessageButton";
import Home from "./pages/Home";
import KnowMore from "./pages/KnowMore";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--ink)]">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/know-more" element={<KnowMore />} />
      </Routes>

      <BackToTop />
      <FloatingMessageButton />
    </div>
  );
}

export default App;
