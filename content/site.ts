/**
 * Single source of truth for all portfolio copy.
 * Every number here is taken from Manit's resume, case studies, or confirmed in chat.
 * Edit text here — components only render it.
 */

export const profile = {
  name: "Manit Agarwal",
  role: "Product Manager",
  status: "Available for product roles",
  location: "New Delhi, India",
  email: "agarwalmanit2004@gmail.com",
  linkedin: "https://www.linkedin.com/in/manit-agarwal-a43b3a2a6",
  // "Request my resume" popup → Web3Forms emails the visitor's address to Manit (no backend).
  // Paste the access key from web3forms.com here; it is a public key, safe to keep in the site's code.
  resumeRequestKey: "4640669d-ed13-406e-9b25-cac90f194948",
  education: "B.Tech, Electrical Engineering · Delhi Technological University · 2023–2027",
};

export const hero = {
  headline: ["Building", "products", "people come", "back to"],
  stickers: ["Founder", "PM Intern", "AI Builder"],
  taglineLead: "Not just PRDs.",
  tagline: "i talk to users, read the data, and ship",
};

export const about = {
  heading: ["I turn user problems", "into shipped products"],
  body:
    "I founded a student-housing marketplace and grew it to 3,000+ active users, shipped A/B-tested flows as a Product Management intern at Holiday Tribe, and built Compass AI, an AI cold-outreach tool. I start with users, decide with data, and ship.",
  stats: [
    {
      value: "3,000+",
      label: "Active users",
      note: "Housing DTU, the student-housing marketplace I founded — at 30% monthly retention.",
    },
    {
      value: "40→60%",
      label: "Itinerary → advisor call",
      note: "Conversion after shipping the new Tara AI flow via A/B test at Holiday Tribe.",
    },
    {
      value: "170+",
      label: "User conversations",
      note: "100+ user interviews for Housing DTU, plus 70 captains, riders & non-riders across Delhi NCR for my Rapido teardown.",
    },
    {
      value: "1,000+",
      label: "Users in 24 hours",
      note: "Compass AI site users within a day of going live, plus 100+ waitlist signups.",
    },
  ],
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  place: string;
  color: "pink" | "blue" | "butter" | "mint" | "lavender" | "lime";
  preview: string;
  previewAlt: string;
  summary: string;
  points: string[];
  links: { label: string; href: string; external?: boolean }[];
};

export const experience: Experience[] = [
  {
    id: "holiday-tribe",
    company: "Holiday Tribe",
    role: "Product Management Intern",
    period: "May 2026 – Aug 2026",
    place: "Gurugram",
    color: "pink",
    preview: "/images/ht-itinerary.jpg",
    previewAlt: "Redesigned Holiday Tribe itinerary detail page",
    summary: "Owned the Tara AI chat revamp, the itinerary page redesign and the Beat the Price flow.",
    points: [
      "Self-initiated and solo-built the Beat the Price Simulator as a Claude skill — parses competitor quotes in any format (PDF, image, link), applies discount rules and auto-logs to Google Drive via MCP. Adopted by sales leadership: 60 comparisons/week, 40 bookings converted.",
      "Analyzed 16.8K+ chat messages across 2.8K sessions (SQL) on Tara AI to locate a 5-message drop-off; found a top-of-funnel intent mismatch and designed an intent-triggered questionnaire with context retention.",
      "Shipped the new Tara flow via A/B test — itineraries generated per session up ~50%, itinerary → advisor-call conversion from 40% to 60% (+50% relative).",
      "Diagnosed the itinerary-detail page as the mid-funnel drop-off; coordinated with Engineering and Design on an end-to-end redesign, validated via a cookie-randomized A/B test — Book Now → quotation conversion up ~20%, with 29% of users building above-default itineraries.",
      "Built an app-less Meta Ads → WhatsApp (Gallabox) lead-gen funnel for Maldives: qualification flow → package carousel → seller handoff, with a CRM fallback for drop-offs. Early signal: 70% fewer sellers needed per booking.",
    ],
    links: [{ label: "Read case study", href: "/work/holiday-tribe" }],
  },
  {
    id: "housing-dtu",
    company: "Housing DTU",
    role: "Founder & Product Lead",
    period: "Dec 2025 – Present",
    place: "Delhi",
    color: "blue",
    preview: "/images/shot-housingdtu.jpg",
    previewAlt: "Housing DTU homepage",
    summary: "A zero-brokerage, verified student-housing marketplace for DTU students.",
    points: [
      "Founded and scaled the marketplace to 3,000+ active users at 30% monthly retention; drove the first 250+ users in 48 hours via organic word-of-mouth with zero paid spend, addressing housing search for 10,000+ DTU students.",
      "Spotted in WhatsApp, LinkedIn and contact-page data that users couldn't find flatmates; shipped flatmate matching — active users up ~40% in 2 weeks, average engagement time up 30s.",
      "Moved from freemium to a paid model (₹199/listing) and scaled to ₹5,200 revenue with inbound owner demand — PMF validated through 100+ user interviews → PRD → 7 Figma screens.",
      "Built a self-serve analytics stack (Supabase + GA4) tracking 43 active listings and 24K+ page views. Incubated at IIF-DTU and pre-seed funded.",
    ],
    links: [
      { label: "Read case study", href: "/work/housing-dtu" },
      { label: "Visit housingdtu.in", href: "https://housingdtu.in/", external: true },
    ],
  },
  {
    id: "compass-ai",
    company: "Compass AI",
    role: "Founder & Product Lead",
    period: "May 2026 – Present",
    place: "Delhi",
    color: "lavender",
    preview: "/images/shot-compass.jpg",
    previewAlt: "Compass AI homepage",
    summary: "An AI cold-outreach platform that turns a resume and a job description into emails and LinkedIn DMs.",
    points: [
      "Architected a 4-stage AI pipeline: Tavily (company research) → Claude Haiku (JD/resume parsing) → Claude Sonnet (outreach strategy + templates) → Hunter.io (verified contacts, 30-day domain cache).",
      "Launched to 1,000+ site users and 100+ waitlist signups within 24 hours of going live; ran Meta ads campaigns for ongoing lead generation; added email finding after user research.",
      "Halved per-generation cost ($0.13 → $0.065) by eliminating a duplicated analysis stage — shipped only after an LLM-judged quality gate confirmed a ≤2-point quality drop.",
    ],
    links: [{ label: "Visit trycompass.in", href: "https://trycompass.in/", external: true }],
  },
  {
    id: "iiit-allahabad",
    company: "IIIT Allahabad",
    role: "Machine Learning Research Intern",
    period: "May 2025 – Jul 2025",
    place: "Prayagraj · On-site",
    color: "mint",
    preview: "/images/iiit-training.jpg",
    previewAlt: "YOLOv5 training and validation curves",
    summary: "An assistive sign-language detection system for deaf, mute and lower-limb-disabled users.",
    points: [
      "Designed and trained a YOLOv5 custom object-detection model for 24 real-life hand signs, including emergency gestures like “Help”, “Fist” and “Triple Tap” — mAP@0.5 = 0.992.",
      "Integrated text-to-speech to turn recognized signs into voice output, and deployed the model on a Raspberry Pi 4 for a compact, low-power, portable system.",
      "Added a flex-sensor glove for extra gesture inputs, and used Roboflow augmentations to fix class imbalance and improve robustness.",
      "Shipped a fully working end-to-end system: live video feed → YOLO detection → glove input → real-time voice output.",
    ],
    links: [],
  },
];

export type Project = {
  title: string;
  kind: string;
  meta: string;
  image: string;
  href: string;
  external?: boolean;
  logo?: string;
  brief?: string; // id in `briefs` — clicking the card opens that quick-look popup
};

export const builtProjects: Project[] = [
  {
    title: "Holiday Tribe",
    kind: "PM Internship",
    meta: "A/B tests · AI tooling",
    image: "/images/ht-simulator.jpg",
    href: "/work/holiday-tribe",
    brief: "holiday-tribe",
  },
  {
    title: "Housing DTU",
    kind: "Founder",
    meta: "Marketplace · 0 → 3,000+",
    image: "/images/shot-housingdtu.jpg",
    href: "/work/housing-dtu",
    logo: "/images/logo-housingdtu-mark.png",
    brief: "housing-dtu",
  },
  {
    title: "Compass AI",
    kind: "Founder",
    meta: "AI product · Live",
    image: "/images/shot-compass.jpg",
    href: "https://trycompass.in/",
    external: true,
    logo: "/images/logo-compass.png",
    brief: "compass-ai",
  },
];

export const teardowns: Project[] = [
  {
    title: "Rapido After Dark",
    kind: "Teardown + simulation",
    meta: "70 interviews",
    image: "/images/shot-rapido.jpg",
    href: "https://rapido-product-manit.netlify.app/",
    external: true,
    brief: "rapido",
  },
  {
    title: "Flam Flicks Lab",
    kind: "Teardown + working demo",
    meta: "Ad metrics",
    image: "/images/shot-flam.jpg",
    href: "https://flam-product-manit.netlify.app/",
    external: true,
    brief: "flam",
  },
  {
    title: "Blinkit Restock Run",
    kind: "Teardown + game",
    meta: "Inventory ops",
    image: "/images/shot-blinkit.jpg",
    href: "https://manit-blinkit-product.netlify.app/",
    external: true,
    brief: "blinkit",
  },
  {
    title: "Tata 1mg",
    kind: "Growth teardown",
    meta: "eDiagnostics",
    image: "/images/shot-onemg.jpg",
    href: "https://manit-1mg-teardown.netlify.app/",
    external: true,
    brief: "onemg",
  },
];

export const howIWork = [
  {
    title: "User research",
    color: "pink",
    proof: "100+ user interviews to validate PMF for Housing DTU; 70 conversations with captains, riders & non-riders for Rapido.",
    tools: ["Interviews", "Surveys", "Personas"],
  },
  {
    title: "Data & experimentation",
    color: "blue",
    proof: "SQL across 16.8K+ chat messages to find a drop-off; cookie-randomized A/B tests that lifted conversion.",
    tools: ["SQL", "Mixpanel", "GA4", "PostHog", "Amplitude", "Tableau", "Python"],
  },
  {
    title: "Strategy & PRDs",
    color: "butter",
    proof: "Interviews → PRD → 7 Figma screens for Housing DTU; a PRD-lite for Flam; guardrails and kill criteria for Rapido's pilot.",
    tools: ["PRDs & DRDs", "User stories", "Jira", "Figma", "Notion"],
  },
  {
    title: "Building with AI",
    color: "mint",
    proof: "A Claude skill wired to Google Drive via MCP; a 4-stage AI pipeline shipped behind an LLM-judged quality gate.",
    tools: ["Claude", "MCP", "RAG", "Next.js", "Supabase", "Prompt engineering"],
  },
  {
    title: "Growth & GTM",
    color: "lavender",
    proof: "250+ users in 48 hours with zero paid spend; a Meta Ads → WhatsApp funnel with CRM fallback.",
    tools: ["Go-to-market", "Lead generation", "Meta Ads", "Funnels", "Retention"],
  },
] as const;

export type Testimonial = {
  name: string;
  title: string;
  relation: string;
  date: string;
  photo: string;
  linkedin: string;
  highlight: string;
  full: string[];
};

export const testimonials: Testimonial[] = [
  {
    name: "Mohib Ahmed",
    title: "Product Manager · Holiday Tribe",
    relation: "Managed Manit directly",
    date: "September 8, 2026",
    photo: "/images/mohib-ahmed.jpg",
    linkedin: "https://www.linkedin.com/in/mohib-ahmed-739128167/",
    highlight: "A sharp product sense, strong problem-solving skills, and a genuine empathy for traveler pain points.",
    full: [
      "I had the pleasure of working with Manit during their product internship at Holiday Tribe, where they took significant ownership of our self-assisted tour package customization flow, Tara AI Chat Revamp and competitive “Beat The Price” flow for intelligently handling competitive quotes matching requests",
      "Self serve flow was a major contribution by Manit to the existing product journey. Self-serve flows in travel can get messy very quickly—balancing complex inventory, pricing logic, and dynamic itineraries while keeping the user experience intuitive is no easy feat. Manit dove right into our package edit feature set, demonstrating a sharp product sense, strong problem-solving skills, and a genuine empathy for traveler pain points.",
      "They bring great curiosity, a strong work ethic, and structured thinking to every problem they tackle. Manit would be a fantastic addition to any product team, and I’m excited to see where their career takes them.",
    ],
  },
  {
    name: "Sonali Agarwal",
    title: "Advanced Data Analytics & Machine Learning · IIIT Allahabad",
    relation: "Manit’s mentor",
    date: "September 28, 2026",
    photo: "/images/sonali-agarwal.jpg",
    linkedin: "https://www.linkedin.com/in/sonali-agarwal-87395a11a/",
    highlight: "His willingness to experiment, learn, and work across both software and hardware components was particularly valuable.",
    full: [
      "I had the opportunity to work with Manit Agarwal on a project focused on developing a Sign Language Detection System for assisting deaf, mute, and lower-limb-disabled individuals.",
      "Manit made valuable contributions to the development of the complete system. He worked on building a YOLOv5-based real-time sign language detection model using a custom-labelled dataset comprising 24 sign classes. He also contributed to dataset preparation and augmentation using Roboflow and carried out iterative training and experimentation to improve the model’s performance.",
      "A particularly important aspect of his work was integrating the trained model with a Raspberry Pi and flex-sensor glove, enabling gesture-based communication in a practical assistive setting. The system was further enhanced with text-to-speech functionality, allowing detected signs to be converted into live voice output.",
      "In addition to the implementation, Manit contributed to the literature review, project documentation, and comparative analysis with existing research, demonstrating his ability to connect technical development with research-oriented evaluation.",
      "Throughout the project, he showed a good understanding of computer vision, deep learning, embedded system integration, and assistive technology applications. His willingness to experiment, learn, and work across both software and hardware components was particularly valuable.",
      "I appreciate Manit’s contribution to the project and wish him continued success in his future academic and professional endeavors.",
    ],
  },
];

export type CreativePiece = {
  title: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  aspect: "16/9" | "1/1" | "wide" | "tall";
  caption: string;
};

export const creative: CreativePiece[] = [
  {
    title: "Compass AI — launch film",
    type: "video",
    src: "/video/compass-launch.mp4",
    poster: "/video/compass-launch-poster.jpg",
    aspect: "16/9",
    caption: "Celebrating 1,000+ users in 24 hours",
  },
  {
    title: "Compass AI — product demo",
    type: "video",
    src: "/video/compass-demo.mp4",
    poster: "/video/compass-demo-poster.jpg",
    aspect: "1/1",
    caption: "45-second walkthrough of the product",
  },
  {
    title: "Compass AI — key visual",
    type: "image",
    src: "/images/compass-meadow.jpg",
    aspect: "wide",
    caption: "Brand visual for launch",
  },
  {
    title: "Housing DTU — pre-seed announcement",
    type: "image",
    src: "/images/housingdtu-preseed.png",
    aspect: "tall",
    caption: "Backed by IIF-DTU",
  },
];

export const faqs = [
  {
    q: "What roles are you looking for?",
    a: "Mostly Associate Product Manager roles and product management internships. I’m also open to product designer and product analyst roles, because a lot of what I enjoy sits right there: talking to users, designing the experience, and checking what the numbers say once it’s live.",
    color: "pink",
  },
  {
    q: "Can you code?",
    a: "Yes. I can code and understand how systems fit together, and I’ve built a few small projects from scratch. In practice, though, I build with AI-native tools in an AI-integrated IDE, for everything from design and architecture to fixing bugs, security and shipping. It lets me move a lot faster and get the most out of every build.",
    color: "lime",
  },
  {
    q: "What problems do you enjoy most?",
    a: "Users always come first for me, but the ones I enjoy most are problems I’ve faced myself. When I know the pain first-hand, researching it, building something, watching how people use it and rebuilding it all feel much more natural. I like digging deep into problems in order to find the real root cause and fix that, not just what shows on the surface.",
    color: "butter",
  },
  {
    q: "Can you design?",
    a: "Yes, Figma is my main tool. Housing DTU went from user interviews to 7 Figma screens before any code. I also design in Canva, Framer and Claude Design: Housing DTU and Compass AI’s visuals, launch film, product demo and this portfolio.",
    color: "blue",
  },
  {
    q: "Where are you based?",
    a: "I’m based in New Delhi, India.",
    color: "mint",
  },
] as const;

/* ---------- quick-look popups (opened from Work cards and Experience rows) ---------- */

type Img = { src: string; alt: string; w: number; h: number };

export type Brief = {
  id: string;
  title: string;
  logo?: string;
  path: string; // shown in the window's address bar
  caseStudy?: string; // no case study → no green button and no "Read full case study"
  // label → link beside the title; button → text on the action buttons (defaults to "Visit site")
  live?: { label?: string; href: string; button?: string };
  description: string;
  hero: Img | Img[]; // several images sit side by side at equal height
  fields: { label: string; value: string }[];
  metrics?: { value: string; label: string; color: string }[];
  highlights: { title: string; text: string }[];
  phones?: [Img, Img];
  gallery?: (Img & { caption: string })[]; // full-width images, in order
  // closing row: one proof piece on the left, the dark call-to-action card on the right
  side?: Img & { caption: string };
  video?: Img & { poster: string; caption: string };
  quote?: { name: string; color: string }; // a name from `testimonials`
  cta?: { kicker: string; title: string; text: string };
};

export const briefs: Record<string, Brief> = {
  "housing-dtu": {
    id: "housing-dtu",
    title: "Housing DTU",
    logo: "/images/logo-housingdtu-mark.png",
    path: "Portfolio / Housing DTU",
    caseStudy: "/work/housing-dtu",
    live: { label: "housingdtu.in", href: "https://housingdtu.in/" },
    description:
      "A zero-brokerage, verified student-housing marketplace for DTU students — PGs, flats and flatmates, with every listing checked by our team before it goes live. I took it from a frustrating PG hunt to 3,000+ active users.",
    hero: { src: "/images/shot-housingdtu.jpg", alt: "Housing DTU homepage", w: 1920, h: 1200 },
    fields: [
      { label: "Role", value: "Founder & Product Lead" },
      { label: "Timeline", value: "Dec 2025 – Present" },
      { label: "Backing", value: "Incubated at IIF-DTU · pre-seed funded" },
      { label: "Built with", value: "Figma · Claude Code · Supabase · GA4" },
    ],
    metrics: [
      { value: "3,000+", label: "Active users", color: "blue" },
      { value: "30%", label: "Monthly retention", color: "mint" },
      { value: "250+", label: "Users in 48 hours", color: "butter" },
      { value: "~40%", label: "Active-user lift", color: "pink" },
    ],
    highlights: [
      {
        title: "Validated before code",
        text: "100+ user interviews → a PRD → 7 Figma screens. One student's flat-hunting pain widened the product from PGs to PGs and flats.",
      },
      {
        title: "Flatmate matching",
        text: "Noticed message after message in a college WhatsApp group saying “flatmate required” and shipped matching in 5–6 days — active users up ~40% in two weeks.",
      },
      {
        title: "Testing willingness to pay",
        text: "Introduced a ₹199 one-time listing fee — 26 owners have paid to list (₹5,200 revenue), and owners now reach out to us first.",
      },
    ],
    phones: [
      { src: "/images/hdtu-mobile-home.jpg", alt: "Housing DTU mobile homepage", w: 780, h: 1300 },
      { src: "/images/hdtu-mobile-search.jpg", alt: "Housing DTU mobile — find a PG or flat", w: 780, h: 1300 },
    ],
    gallery: [
      {
        src: "/images/hdtu-listings.jpg",
        alt: "Housing DTU verified property listings",
        w: 1180,
        h: 580,
        caption: "Verified listings — rent, walking distance to DTU and amenities at a glance.",
      },
    ],
    side: {
      src: "/images/housingdtu-preseed.png",
      alt: "Announcement: Housing DTU backed by IIF DTU, pre-seed grant",
      w: 640,
      h: 674,
      caption: "Incubated and pre-seed funded by IIF-DTU.",
    },
    cta: {
      kicker: "Full case study",
      title: "Want the whole story?",
      text: "The problem, the pivots, the failure I pulled and the numbers — chapter by chapter.",
    },
  },

  "holiday-tribe": {
    id: "holiday-tribe",
    title: "Holiday Tribe",
    path: "Portfolio / Holiday Tribe",
    caseStudy: "/work/holiday-tribe",
    description:
      "Finding where a travel funnel leaked — then shipping A/B-tested fixes, plus an AI tool sales leadership adopted. Over my PM internship I owned the Tara AI chat revamp, the itinerary page redesign and the Beat the Price flow.",
    hero: { src: "/images/ht-simulator.jpg", alt: "Comparability Simulator interface comparing our package with a competitor's", w: 1897, h: 1036 },
    fields: [
      { label: "Role", value: "Product Management Intern" },
      { label: "Timeline", value: "May 2026 – Aug 2026" },
      { label: "Location", value: "Gurugram" },
      { label: "Toolkit", value: "SQL · A/B tests · Claude + MCP · Meta Ads · Gallabox" },
    ],
    metrics: [
      { value: "40→60%", label: "Itinerary → advisor call", color: "pink" },
      { value: "~50%", label: "More itineraries / session", color: "blue" },
      { value: "~20%", label: "Book Now → quotation", color: "butter" },
      { value: "40", label: "Bookings converted", color: "mint" },
    ],
    highlights: [
      {
        title: "Tara AI chat revamp",
        text: "SQL across 16.8K+ messages in 2.8K sessions traced a 5-message drop-off to an intent mismatch. An intent-triggered questionnaire took itinerary → advisor-call conversion from 40% to 60%.",
      },
      {
        title: "Itinerary page redesign",
        text: "A two-pane layout with in-line customisation, validated by a cookie-randomized A/B test — Book Now → quotation up ~20%, with 29% of users building above-default itineraries.",
      },
      {
        title: "Beat the Price Simulator",
        text: "Self-initiated and solo-built as a Claude skill that parses competitor quotes in any format and logs to Google Drive via MCP — 60 comparisons a week, 40 bookings converted.",
      },
      {
        title: "App-less WhatsApp funnel",
        text: "Meta Ads → WhatsApp (Gallabox) qualification → package carousel → seller handoff, with a CRM fallback for drop-offs. Early signal: 70% fewer sellers needed per booking.",
      },
    ],
    gallery: [
      {
        src: "/images/ht-itinerary.jpg",
        alt: "Redesigned Holiday Tribe itinerary page with day-by-day plan on the left and a booking panel on the right",
        w: 1862,
        h: 982,
        caption: "The redesigned itinerary page — the trip on the left, a booking panel on the right.",
      },
    ],
    quote: { name: "Mohib Ahmed", color: "pink" },
    cta: {
      kicker: "Full case study",
      title: "Want the whole story?",
      text: "The signals, the diagnosis, what I shipped and the results — chapter by chapter.",
    },
  },

  "compass-ai": {
    id: "compass-ai",
    title: "Compass AI",
    logo: "/images/logo-compass.png",
    path: "Portfolio / Compass AI",
    live: { label: "trycompass.in", href: "https://trycompass.in/" },
    description:
      "An AI cold-outreach platform that turns a resume and a job description into cold emails and LinkedIn DMs — researching the company and finding verified contacts along the way. I architected the AI pipeline and launched it to 1,000+ site users within 24 hours.",
    hero: { src: "/images/shot-compass.jpg", alt: "Compass AI homepage", w: 1920, h: 1200 },
    fields: [
      { label: "Role", value: "Founder & Product Lead" },
      { label: "Timeline", value: "May 2026 – Present" },
      { label: "Status", value: "Live at trycompass.in" },
      { label: "AI pipeline", value: "Tavily → Claude Haiku → Claude Sonnet → Hunter.io" },
    ],
    metrics: [
      { value: "1,000+", label: "Site users in 24 hours", color: "lavender" },
      { value: "100+", label: "Waitlist signups", color: "mint" },
      { value: "50%", label: "Lower cost per generation", color: "butter" },
      { value: "4-stage", label: "AI pipeline", color: "blue" },
    ],
    highlights: [
      {
        title: "A 4-stage AI pipeline",
        text: "Tavily researches the company, Claude Haiku parses the JD and resume, Claude Sonnet writes the strategy and templates, and Hunter.io finds verified contacts — with a 30-day domain cache.",
      },
      {
        title: "Launch and growth",
        text: "1,000+ site users and 100+ waitlist signups within 24 hours of going live, then Meta ads campaigns for ongoing lead generation. Email finding was added after user research.",
      },
      {
        title: "Halving the cost",
        text: "Cut per-generation cost from $0.13 to $0.065 by removing a duplicated analysis stage — shipped only after an LLM-judged quality gate confirmed a ≤2-point quality drop.",
      },
    ],
    gallery: [
      {
        src: "/images/compass-pipeline.png",
        alt: "How Compass AI works — pipeline from understand and research to strategize and write",
        w: 1857,
        h: 968,
        caption: "How it works — from resume and job description to a ready-to-send message.",
      },
      {
        src: "/images/compass-feedback.png",
        alt: "Early feedback on Compass AI from students and recruiters",
        w: 1856,
        h: 957,
        caption: "Early feedback from people I shared Compass AI with.",
      },
    ],
    video: {
      src: "/video/compass-demo.mp4",
      poster: "/video/compass-demo-poster.jpg",
      alt: "Compass AI product demo",
      w: 720,
      h: 720,
      caption: "45-second walkthrough of the product.",
    },
    cta: {
      kicker: "Live product",
      title: "Try it yourself",
      text: "Drop in a resume and a job description — your first outreach package in under a minute.",
    },
  },

  "iiit-allahabad": {
    id: "iiit-allahabad",
    title: "IIIT Allahabad",
    path: "Portfolio / IIIT Allahabad",
    description:
      "An assistive sign-language detection system for deaf, mute and lower-limb-disabled users — a custom YOLOv5 model, a flex-sensor glove and text-to-speech, running in real time on a Raspberry Pi 4.",
    hero: [
      { src: "/images/iiit-glove.jpg", alt: "Flex-sensor glove wired to a Raspberry Pi 4", w: 1200, h: 1600 },
      { src: "/images/iiit-setup.jpg", alt: "The detection system running on a laptop and a Raspberry Pi 4", w: 739, h: 410 },
    ],
    fields: [
      { label: "Role", value: "Machine Learning Research Intern" },
      { label: "Timeline", value: "May 2025 – Jul 2025" },
      { label: "Location", value: "Prayagraj · On-site" },
      { label: "Built with", value: "YOLOv5 · Roboflow · Raspberry Pi 4 · flex sensors · text-to-speech" },
    ],
    metrics: [
      { value: "0.992", label: "mAP@0.5", color: "mint" },
      { value: "24", label: "Hand signs detected", color: "blue" },
      { value: "Real-time", label: "Sign → voice output", color: "butter" },
      { value: "Pi 4", label: "On-device, portable", color: "lavender" },
    ],
    highlights: [
      {
        title: "Custom detection model",
        text: "Designed and trained a YOLOv5 model on 24 real-life hand signs — including emergency gestures like “Help”, “Fist” and “Triple Tap” — reaching mAP@0.5 of 0.992.",
      },
      {
        title: "Glove + Raspberry Pi",
        text: "A flex-sensor glove adds extra gesture inputs, and the model runs on a Raspberry Pi 4 for a compact, low-power, portable system.",
      },
      {
        title: "From signs to speech",
        text: "Live video → YOLO detection → glove input → real-time voice output via text-to-speech. Roboflow augmentations fixed class imbalance and improved robustness.",
      },
    ],
    gallery: [
      {
        src: "/images/iiit-training.jpg",
        alt: "YOLOv5 training and validation curves: losses, precision, recall and mAP",
        w: 1600,
        h: 800,
        caption: "Training and validation curves — mAP@0.5 settles at 0.992.",
      },
    ],
    quote: { name: "Sonali Agarwal", color: "mint" },
  },

  /* ---- product teardowns: kept light — no numbers row, one button out to the live teardown ---- */

  rapido: {
    id: "rapido",
    title: "Rapido After Dark",
    path: "Portfolio / Teardowns / Rapido",
    live: { href: "https://rapido-product-manit.netlify.app/", button: "View full teardown" },
    description:
      "Rapido wins the day and loses the night. After 9 PM captains drift home and riders stop trusting the ride. I had 70 conversations with captains and riders across Delhi NCR, built a simulation of the night, and proposed a fix.",
    hero: { src: "/images/shot-rapido.jpg", alt: "Rapido After Dark teardown — homepage", w: 1920, h: 1200 },
    fields: [
      { label: "Type", value: "Teardown + simulation" },
      { label: "Research", value: "25 captains · 42 riders · 3 non-riders" },
      { label: "Where & when", value: "7 neighbourhoods, Delhi NCR · Aug–Sep 2026" },
      { label: "Recommendation", value: "Night Shield" },
    ],
    highlights: [
      {
        title: "What I heard",
        text: "28 of 42 riders find it hard to get a bike at night, and all 6 women I spoke to avoid bikes after 8–9 PM. A full-time captain earns ₹100–110/hr — the bar any night fix has to beat.",
      },
      {
        title: "A playable simulation",
        text: "You run Delhi NCR from 6 PM to midnight with zone bonuses, surge and night-verified captains. Across 200 simulated nights, surge alone serves fewer riders than doing nothing.",
      },
      {
        title: "Night Shield",
        text: "Night-verified captains chosen by riding score, safety on by default after dark, and a night pass for captains near demand — 58% → 79% of night riders served in my model.",
      },
    ],
    cta: {
      kicker: "Full teardown",
      title: "Want the whole story?",
      text: "The journey, the market, the interviews, the simulation and the recommendation — all on one page.",
    },
  },

  flam: {
    id: "flam",
    title: "Flam Flicks Lab",
    path: "Portfolio / Teardowns / Flam",
    live: { href: "https://flam-product-manit.netlify.app/", button: "View full teardown" },
    description:
      "An independent concept for Flam: a working mini Flick — an interactive ad where the viewer picks what they see — with the metrics it produces, and where I would take the product next.",
    hero: { src: "/images/shot-flam.jpg", alt: "Flam Flicks Lab teardown — homepage", w: 1920, h: 1200 },
    fields: [
      { label: "Type", value: "Teardown + working demo" },
      { label: "Focus", value: "Ad metrics" },
      { label: "Includes", value: "Mini Flick · live metrics · PRD-lite · cost-per-purchase calculator" },
      { label: "Approach", value: "Testable hypotheses, ranked with RICE" },
    ],
    highlights: [
      {
        title: "A working mini Flick",
        text: "Pick a colorway and the ad responds, while a live panel tracks viewability, interactions, engaged time and an event stream from your own session.",
      },
      {
        title: "Five places I would look",
        text: "With no access to Flam's data, each opportunity is a hypothesis with a way to test it, then ranked — qualified interaction rate goes first.",
      },
      {
        title: "PRD-lite: qualified interactions",
        text: "Report a qualified interaction rate beside the raw one: a variant held for 1.5 seconds, or a CTA click. The page implements exactly that definition.",
      },
    ],
    cta: {
      kicker: "Full teardown",
      title: "Try the Flick yourself",
      text: "The working ad, the metrics it produces, the PRD-lite and the cost-per-purchase calculator.",
    },
  },

  blinkit: {
    id: "blinkit",
    title: "Blinkit Restock Run",
    path: "Portfolio / Teardowns / Blinkit",
    live: { href: "https://manit-blinkit-product.netlify.app/", button: "View full teardown" },
    description:
      "A dark-store ops manager reorders a fast-moving SKU every day under demand they can't predict. Restock Run lets you play their week and feel the stockout vs. holding-cost trade-off yourself.",
    hero: { src: "/images/shot-blinkit.jpg", alt: "Blinkit Restock Run teardown — homepage", w: 1920, h: 1200 },
    fields: [
      { label: "Type", value: "Teardown + game" },
      { label: "Focus", value: "Store ops · inventory" },
      { label: "The game", value: "One SKU, one store, 12 days" },
      { label: "Metric", value: "Total cost per SKU · stockout-rate guardrail" },
    ],
    highlights: [
      {
        title: "The problem",
        text: "Fast-movers swing hard day to day, so a fixed reorder rule either runs out of stock or wastes scarce dark-store shelf space holding too much.",
      },
      {
        title: "Restock Run",
        text: "Set a safety buffer and watch 12 days play out — the shelf, the deliveries and a running cost tally — then compare your policy with a benchmark on the same demand.",
      },
      {
        title: "My recommendation",
        text: "Size each SKU's reorder buffer from how much its demand swings, instead of one rule for everything — judged on total cost, with stockout rate as the guardrail.",
      },
    ],
    cta: {
      kicker: "Full teardown",
      title: "Play the week yourself",
      text: "Set your buffer, run the 12 days and see what your reorder policy costs in rupees.",
    },
  },

  onemg: {
    id: "onemg",
    title: "Tata 1mg",
    path: "Portfolio / Teardowns / Tata 1mg",
    live: { href: "https://manit-1mg-teardown.netlify.app/", button: "View full teardown" },
    description:
      "Tata 1mg books a lab test in under a minute, any hour, any day. Its newest category, at-home vaccination, still asks you to wait for a callback. A growth teardown of what that gap is probably costing, and a two-week test to close it.",
    hero: { src: "/images/shot-onemg.jpg", alt: "Tata 1mg growth teardown — homepage", w: 1920, h: 1200 },
    fields: [
      { label: "Type", value: "Growth teardown" },
      { label: "Focus", value: "eDiagnostics · at-home vaccination" },
      { label: "Includes", value: "Funnel comparison · revenue-at-stake model · experiment design" },
      { label: "Proposed test", value: "Two weeks · instant slot vs. callback" },
    ],
    highlights: [
      {
        title: "Two funnels, one company",
        text: "Home diagnostics is self-serve in one session. At-home vaccination puts a callback at the moment intent is highest — a lead after 9 PM waits up to ~11 hours.",
      },
      {
        title: "Sizing the gap",
        text: "An interactive model turns the delay into bookings and revenue at stake. The inputs are assumptions you can change — the mechanism holds either way.",
      },
      {
        title: "A two-week test",
        text: "Auto-confirm the earliest slot for after-hours leads and let the agent call afterwards. Primary metric: lead → confirmed booking; guardrail: nurse no-show rate.",
      },
    ],
    cta: {
      kicker: "Full teardown",
      title: "Try the math yourself",
      text: "The two funnels, the revenue-at-stake model with your own numbers, and the test design.",
    },
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "kind-words", label: "Kind words" },
  { id: "contact", label: "Contact" },
];
