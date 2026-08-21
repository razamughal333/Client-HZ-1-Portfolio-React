import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import BehanceProjects from "../components/BehanceProjects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import InstagramAccounts from "../components/InstagramAccounts";
import Services from "../components/Services";
import LatestWorkCTA from "../components/LatestWorkCTA";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

function Home() {
  const location = useLocation();

  // Support cross-page "scroll to section" navigation (e.g. clicking a nav
  // link while on the Know More or All Work page).
  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
    }
  }, [location.state]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Hero />
      <About />
      <BehanceProjects limit={3} />
      <Skills />
      <Experience />
      <InstagramAccounts />
      <Services />
      <LatestWorkCTA />
      <Testimonials />
      <Contact />
    </motion.div>
  );
}

export default Home;
