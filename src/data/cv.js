// src/data/cv.js
//
// Structured facts pulled directly from Habiba Zulfiqar's CV. This is the
// single source of truth for anything factual (contact info, education,
// certifications, skills) so it's never duplicated or re-typed elsewhere.
// Nothing here is invented — fields with no confirmed value are left null
// and the UI is expected to handle that gracefully.

export const CV = {
  name: "Habiba Zulfiqar",
  title: "Graphic Designer — Social Media & Brand Visuals",
  location: "Sahiwal, Punjab, Pakistan",
  phone: "0325-6383242",
  email: "habibaofficial937@gmail.com",
  linkedin: "https://linkedin.com/in/habiba-zulfiqar",
  behance: "https://www.behance.net/habibazulfiqar2",
  // No confirmed Instagram URL was supplied — never invent one.
  instagram: "https://www.instagram.com/hxb_ahh/",

  software: ["Adobe Photoshop", "Adobe Illustrator"],
  designSkills: [
    "Social Posts",
    "Posters",
    "Flyers",
    "Banners",
    "Event Promos",
    "Ad Creatives",
    "Product Design",
  ],
  strengths: [
    "Creative Thinking",
    "Attention to Detail",
    "Communication",
    "Time Management",
    "Problem Solving",
    "Accountability",
  ],

  education: [
    {
      degree: "BS Information Technology",
      institute: "Bahauddin Zakariya University",
      period: "2022–2026",
    },
    {
      degree: "Pre-Medical",
      institute: "Concordia College, Sahiwal",
      period: "2020–2022",
    },
  ],

  certifications: [
    {
      name: "Graphic Designing",
      institute: "Technojin Solutions",
      period: "2025–2026",
    },
  ],

  languages: [
    { name: "English", level: "Fluent" },
    { name: "Urdu", level: "Native" },
  ],

  experience: {
    role: "Freelance Graphic Designer",
    location: "Remote",
    period: "May 2026–Present",
    responsibilities: [
      "Designed branded social posts, banners, and ad creatives for three client accounts.",
      "Managed content for healthcare, agriculture, and digital marketing brands.",
      "Produced bilingual Urdu-English visuals.",
      "Delivered ready-to-post designs on tight client deadlines.",
    ],
  },

  cvProjects: [
    {
      client: "Dr. Tesneem Zainab — Gynecology Clinic",
      sector: "Healthcare",
      note: "Health-awareness posts with clear medical communication and a soft clinical visual style.",
    },
    {
      client: "Pak Agri Store",
      sector: "Agriculture",
      note: "Bilingual Urdu-English promotional posts for farming products and techniques.",
    },
    {
      client: "Scaleif — Digital Marketing Agency",
      sector: "Marketing",
      note: "B2B lead-generation graphics with a dark, high-contrast visual style.",
    },
  ],

  cvFile: "/Habiba-Zulfiqar-CV.pdf",
};
