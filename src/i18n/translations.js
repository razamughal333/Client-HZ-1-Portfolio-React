// src/i18n/translations.js
//
// Central bilingual content. Every section pulls its copy from here so
// language switching never touches component logic. Urdu strings are
// written as natural, professional Urdu — not literal word-for-word
// translations — and use proper RTL-friendly phrasing.

export const translations = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      services: "Services",
      work: "Work",
      contact: "Contact",
      knowMore: "Know More",
      backToHome: "Back to Home",
      hireMe: "Hire Me",
    },
    hero: {
      eyebrow: "Portfolio",
      name: "Habiba Zulfiqar",
      title: "Graphic Designer — Social Media & Brand Visuals",
      intro:
        "I design clean, on-brand social media visuals for healthcare, agriculture, and marketing brands — dependable turnarounds, remote-friendly, and built to look good on every screen.",
      ctaPrimary: "Hire Me",
      ctaSecondary: "View My Work",
    },
    social: {
      linkedin: "LinkedIn",
      instagram: "Instagram",
      email: "Email",
      instagramSoon: "Instagram — coming soon",
    },
    about: {
      eyebrow: "About",
      heading: "About Me",
      body: "I'm a graphic designer focused on social media and brand visuals for healthcare, agriculture, and marketing brands. Working mainly in Adobe Photoshop and Illustrator, I create clean, on-brand posts, banners, and campaign creatives — and as a remote collaborator, I keep turnarounds fast without cutting corners.",
      downloadCv: "Download CV",
      knowMore: "Know More",
    },
    knowMore: {
      eyebrow: "Full Profile",
      heading: "Know Habiba",
      profileHeading: "Profile",
      profileBody:
        "Graphic designer creating social media visuals for healthcare, agriculture, and marketing brands. Skilled in Adobe Photoshop and Illustrator, with a focus on clean, on-brand posts, banners, and campaign creatives. A dependable remote collaborator known for fast turnarounds.",
      skillsHeading: "Skills",
      educationHeading: "Education",
      certificationsHeading: "Certifications",
      languagesHeading: "Languages",
      interestsHeading: "Interests",
      interestsPlaceholder: "Coming soon — to be added.",
      downloadCv: "Download CV",
      viewBehance: "View Behance",
      backToTop: "Back to Top",
    },
    skills: {
      eyebrow: "Skills & Tools",
      heading: "What I Work With",
      softwareLabel: "Software Skills",
      designLabel: "Design Skills",
      strengthsLabel: "Soft Skills",
    },
    experience: {
      eyebrow: "Experience",
      heading: "Experience",
      role: "Freelance Graphic Designer",
      location: "Remote",
      period: "May 2026 — Present",
      positioning:
        "Provided branding, social media, and print design services to clients across multiple countries. Delivered creative solutions that matched client needs and exceeded expectations.",
      responsibilities: [
        "Designed branded social posts, banners, and ad creatives for three client accounts.",
        "Managed content for healthcare, agriculture, and digital marketing brands.",
        "Produced bilingual Urdu–English visuals.",
        "Delivered ready-to-post designs on tight client deadlines.",
      ],
    },
    services: {
      eyebrow: "What I Offer",
      heading: "Services",
      items: [
        {
          title: "Social Media Design",
          desc: "On-brand posts and campaign visuals built to perform across platforms.",
        },
        {
          title: "Poster Design",
          desc: "Clear, eye-catching posters for events, launches, and awareness campaigns.",
        },
        {
          title: "Flyer Design",
          desc: "Print-ready flyers that stay clean and readable at any size.",
        },
        {
          title: "Banner Design",
          desc: "Digital and print banners sized right for the space they'll live in.",
        },
        {
          title: "Ad Creatives",
          desc: "Scroll-stopping ad visuals tuned to the brand and the platform.",
        },
        {
          title: "Event Promotions",
          desc: "Promotional visuals that carry an event's identity end to end.",
        },
        {
          title: "Product Visuals",
          desc: "Clean product-focused graphics for catalogs and campaigns.",
        },
        {
          title: "Brand Visuals",
          desc: "Consistent visual language across a brand's everyday materials.",
        },
      ],
    },
    work: {
      eyebrow: "Live from Behance",
      heading: "Selected Work",
      body: "Every project below is pulled automatically from Habiba's Behance profile — new work published there appears here on its own.",
      viewAll: "View All Work",
      viewLatest: "View Latest Work",
      latestBadge: "Latest Work",
      allWorkEyebrow: "Full Portfolio",
      allWorkHeading: "All Work",
      allWorkBody:
        "Every project currently published on Behance, fetched live — nothing here is hard-coded.",
    },
    instagram: {
      eyebrow: "Currently Designing For",
      heading: "Instagram Accounts",
      body: "Habiba is actively creating social content for these accounts.",
      viewCta: "View Instagram",
    },
    stats: {
      posts: "Posts",
      accounts: "Accounts Handling",
      education: "IT Graduate",
      skills: "Skills",
    },
    testimonials: {
      eyebrow: "Testimonials",
      heading: "What Clients Say",
      sampleBadge: "Sample testimonial — replace with real client feedback",
      items: [
        {
          quote:
            "Habiba understood our clinic's tone right away — clean, reassuring, and easy for patients to read at a glance.",
          name: "Client Name",
          role: "Healthcare Brand",
        },
        {
          quote:
            "Our bilingual posts finally look as professional as our products. She turned a basic brief into something people actually stop scrolling for.",
          name: "Client Name",
          role: "Agriculture Brand",
        },
        {
          quote:
            "Fast turnarounds without sacrificing quality — exactly what a growing agency needs from a design partner.",
          name: "Client Name",
          role: "Marketing Agency",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Contact Me",
      subheading:
        "Have a project in mind? Send a message and I'll get back to you.",
      detailsHeading: "Contact Details",
      location: "Location",
      phone: "Phone",
      formName: "Name",
      formNamePlaceholder: "John Doe",
      formEmail: "Email",
      formEmailPlaceholder: "you@example.com",
      formMessage: "Message",
      formMessagePlaceholder: "Tell me about your project...",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent — thank you! I'll get back to you soon.",
      error: "Something went wrong. Please try again, or email me directly.",
      configMissing:
        "Contact form isn't fully configured yet — please email me directly for now.",
      validation: {
        nameRequired: "Please enter your name.",
        emailRequired: "Please enter your email.",
        emailInvalid: "Please enter a valid email address.",
        messageRequired: "Please enter a message.",
      },
    },
    floatingButton: {
      label: "Message me",
    },
    footer: {
      designedBy: "Designed & Developed by",
      rights: "All Rights Reserved",
    },
    backToTop: "Back to top",
  },

  ur: {
    dir: "rtl",
    nav: {
      home: "ہوم",
      about: "تعارف",
      skills: "مہارتیں",
      experience: "تجربہ",
      services: "خدمات",
      work: "کام",
      contact: "رابطہ",
      knowMore: "مزید جانیں",
      backToHome: "ہوم پر واپس جائیں",
      hireMe: "مجھے ہائر کریں",
    },
    hero: {
      eyebrow: "پورٹ فولیو",
      name: "حبیبہ ذوالفقار",
      title: "گرافک ڈیزائنر — سوشل میڈیا اور برانڈ ویژولز",
      intro:
        "میں صحت، زراعت اور مارکیٹنگ برانڈز کے لیے صاف ستھرے اور برانڈ کے مطابق سوشل میڈیا ویژولز ڈیزائن کرتی ہوں — قابلِ اعتماد ڈیلیوری، ریموٹ ورک کے لیے موزوں، اور ہر اسکرین پر عمدہ نظر آنے والا کام۔",
      ctaPrimary: "مجھے ہائر کریں",
      ctaSecondary: "میرا کام دیکھیں",
    },
    social: {
      linkedin: "لنکڈان",
      instagram: "انسٹاگرام",
      email: "ای میل",
      instagramSoon: "انسٹاگرام — جلد آ رہا ہے",
    },
    about: {
      eyebrow: "تعارف",
      heading: "میرے بارے میں",
      body: "میں ایک گرافک ڈیزائنر ہوں جو صحت، زراعت اور مارکیٹنگ برانڈز کے لیے سوشل میڈیا اور برانڈ ویژولز پر کام کرتی ہوں۔ بنیادی طور پر ایڈوبی فوٹوشاپ اور السٹریٹر استعمال کرتے ہوئے میں صاف ستھرے اور برانڈ کے مطابق پوسٹس، بینرز اور کیمپین کریٹیوز بناتی ہوں — اور ایک ریموٹ ساتھی کے طور پر معیار پر سمجھوتہ کیے بغیر تیز ڈیلیوری یقینی بناتی ہوں۔",
      downloadCv: "سی وی ڈاؤن لوڈ کریں",
      knowMore: "مزید جانیں",
    },
    knowMore: {
      eyebrow: "مکمل پروفائل",
      heading: "حبیبہ کے بارے میں مزید",
      profileHeading: "پروفائل",
      profileBody:
        "صحت، زراعت اور مارکیٹنگ برانڈز کے لیے سوشل میڈیا ویژولز بنانے والی گرافک ڈیزائنر۔ ایڈوبی فوٹوشاپ اور السٹریٹر میں مہارت رکھتی ہیں، اور صاف ستھرے، برانڈ کے مطابق پوسٹس، بینرز اور کیمپین کریٹیوز پر توجہ دیتی ہیں۔ تیز ڈیلیوری کے لیے معروف ایک قابلِ اعتماد ریموٹ ساتھی۔",
      skillsHeading: "مہارتیں",
      educationHeading: "تعلیم",
      certificationsHeading: "سرٹیفیکیشنز",
      languagesHeading: "زبانیں",
      interestsHeading: "دلچسپیاں",
      interestsPlaceholder: "جلد شامل کی جائیں گی۔",
      downloadCv: "سی وی ڈاؤن لوڈ کریں",
      viewBehance: "بیہانس دیکھیں",
      backToTop: "اوپر واپس جائیں",
    },
    skills: {
      eyebrow: "مہارتیں اور اوزار",
      heading: "میں کن چیزوں پر کام کرتی ہوں",
      softwareLabel: "سافٹ ویئر مہارتیں",
      designLabel: "ڈیزائن مہارتیں",
      strengthsLabel: "سافٹ اسکلز",
    },
    experience: {
      eyebrow: "تجربہ",
      heading: "تجربہ",
      role: "فری لانس گرافک ڈیزائنر",
      location: "ریموٹ",
      period: "مئی 2026 — تاحال",
      positioning:
        "متعدد ممالک کے کلائنٹس کو برانڈنگ، سوشل میڈیا اور پرنٹ ڈیزائن کی خدمات فراہم کیں۔ کلائنٹ کی ضروریات کے مطابق اور توقعات سے بڑھ کر تخلیقی حل پیش کیے۔",
      responsibilities: [
        "تین کلائنٹ اکاؤنٹس کے لیے برانڈڈ سوشل پوسٹس، بینرز اور ایڈ کریٹیوز ڈیزائن کیے۔",
        "صحت، زراعت اور ڈیجیٹل مارکیٹنگ برانڈز کا مواد ترتیب دیا۔",
        "اردو اور انگریزی دونوں زبانوں میں ویژولز تیار کیے۔",
        "کلائنٹس کی مقررہ ڈیڈ لائنز میں ریڈی ٹو پوسٹ ڈیزائنز فراہم کیے۔",
      ],
    },
    services: {
      eyebrow: "میں کیا پیش کرتی ہوں",
      heading: "خدمات",
      items: [
        {
          title: "سوشل میڈیا ڈیزائن",
          desc: "ہر پلیٹ فارم پر مؤثر، برانڈ کے مطابق پوسٹس اور کیمپین ویژولز۔",
        },
        {
          title: "پوسٹر ڈیزائن",
          desc: "ایونٹس، لانچز اور آگاہی مہمات کے لیے واضح اور نمایاں پوسٹرز۔",
        },
        {
          title: "فلائر ڈیزائن",
          desc: "پرنٹ کے لیے تیار فلائرز جو ہر سائز میں صاف اور پڑھنے میں آسان رہیں۔",
        },
        {
          title: "بینر ڈیزائن",
          desc: "ڈیجیٹل اور پرنٹ بینرز، صحیح جگہ کے مطابق درست سائز میں۔",
        },
        {
          title: "اشتہاری ویژولز",
          desc: "برانڈ اور پلیٹ فارم کے مطابق توجہ حاصل کرنے والے اشتہاری ڈیزائنز۔",
        },
        {
          title: "ایونٹ پروموشنز",
          desc: "ایونٹ کی شناخت کو شروع سے آخر تک برقرار رکھنے والے پروموشنل ویژولز۔",
        },
        {
          title: "پروڈکٹ ویژولز",
          desc: "کیٹلاگز اور کیمپینز کے لیے صاف پروڈکٹ پر مبنی گرافکس۔",
        },
        {
          title: "برانڈ ویژولز",
          desc: "برانڈ کے روزمرہ مواد میں یکساں بصری زبان۔",
        },
      ],
    },
    work: {
      eyebrow: "بیہانس سے براہِ راست",
      heading: "منتخب کام",
      body: "نیچے دیا گیا ہر پروجیکٹ خودکار طور پر حبیبہ کے بیہانس پروفائل سے حاصل کیا جاتا ہے — وہاں شائع ہونے والا نیا کام خود بخود یہاں شامل ہو جاتا ہے۔",
      viewAll: "تمام کام دیکھیں",
      viewLatest: "تازہ ترین کام دیکھیں",
      latestBadge: "تازہ ترین کام",
      allWorkEyebrow: "مکمل پورٹ فولیو",
      allWorkHeading: "تمام کام",
      allWorkBody:
        "بیہانس پر شائع تمام موجودہ پروجیکٹس، براہِ راست حاصل کیے گئے — یہاں کچھ بھی دستی طور پر شامل نہیں کیا گیا۔",
    },
    instagram: {
      eyebrow: "فی الحال جن کے لیے ڈیزائن کر رہی ہیں",
      heading: "انسٹاگرام اکاؤنٹس",
      body: "حبیبہ ان اکاؤنٹس کے لیے فعال طور پر سوشل مواد تیار کر رہی ہیں۔",
      viewCta: "انسٹاگرام دیکھیں",
    },
    stats: {
      posts: "پوسٹس",
      accounts: "اکاؤنٹس ہینڈلنگ",
      education: "آئی ٹی گریجویٹ",
      skills: "مہارتیں",
    },
    testimonials: {
      eyebrow: "آراء",
      heading: "کلائنٹس کیا کہتے ہیں",
      sampleBadge: "نمونہ رائے — اصل کلائنٹ فیڈبیک سے تبدیل کی جائے گی",
      items: [
        {
          quote:
            "حبیبہ نے ہماری کلینک کا لہجہ فوراً سمجھ لیا — صاف، اطمینان بخش، اور مریضوں کے لیے ایک نظر میں پڑھنے میں آسان۔",
          name: "کلائنٹ کا نام",
          role: "ہیلتھ کیئر برانڈ",
        },
        {
          quote:
            "ہماری دو لسانی پوسٹس اب ہماری مصنوعات جتنی ہی پیشہ ورانہ نظر آتی ہیں۔ انہوں نے ایک عام سی بریف کو ایسی چیز میں بدل دیا جسے لوگ واقعی رک کر دیکھتے ہیں۔",
          name: "کلائنٹ کا نام",
          role: "زراعت برانڈ",
        },
        {
          quote:
            "معیار پر سمجھوتہ کیے بغیر تیز ڈیلیوری — بالکل وہی جو ایک بڑھتی ہوئی ایجنسی کو اپنے ڈیزائن پارٹنر سے چاہیے۔",
          name: "کلائنٹ کا نام",
          role: "مارکیٹنگ ایجنسی",
        },
      ],
    },
    contact: {
      eyebrow: "رابطہ",
      heading: "مجھ سے رابطہ کریں",
      subheading: "کوئی پروجیکٹ ذہن میں ہے؟ پیغام بھیجیں، میں جلد جواب دوں گی۔",
      detailsHeading: "رابطہ کی تفصیلات",
      location: "مقام",
      phone: "فون",
      formName: "نام",
      formNamePlaceholder: "مثال: جان ڈو",
      formEmail: "ای میل",
      formEmailPlaceholder: "you@example.com",
      formMessage: "پیغام",
      formMessagePlaceholder: "اپنے پروجیکٹ کے بارے میں بتائیں...",
      send: "پیغام بھیجیں",
      sending: "بھیجا جا رہا ہے...",
      success: "پیغام بھیج دیا گیا — شکریہ! میں جلد رابطہ کروں گی۔",
      error: "کچھ غلط ہو گیا۔ دوبارہ کوشش کریں یا براہِ راست ای میل کریں۔",
      configMissing:
        "فی الحال کانٹیکٹ فارم مکمل طور پر سیٹ نہیں ہے — براہِ کرم براہِ راست ای میل کریں۔",
      validation: {
        nameRequired: "براہِ کرم اپنا نام درج کریں۔",
        emailRequired: "براہِ کرم اپنا ای میل درج کریں۔",
        emailInvalid: "براہِ کرم درست ای میل ایڈریس درج کریں۔",
        messageRequired: "براہِ کرم پیغام درج کریں۔",
      },
    },
    floatingButton: {
      label: "مجھے پیغام بھیجیں",
    },
    footer: {
      designedBy: "ڈیزائن اور تیار کردہ از",
      rights: "جملہ حقوق محفوظ ہیں",
    },
    backToTop: "اوپر واپس جائیں",
  },
};

export function getTranslations(lang) {
  return translations[lang] || translations.en;
}
