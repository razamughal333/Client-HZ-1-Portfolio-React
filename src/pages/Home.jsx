import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Services from "../components/Services";
import BehanceProjects from "../components/BehanceProjects";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

function Home() {
  const location = useLocation();

  // Support cross-page "scroll to section" navigation (e.g. clicking a nav
  // link while on the Know More page).
  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Services />
      <BehanceProjects limit={4} />
      <Testimonials />
      <Contact />
    </>
  );
}

export default Home;
