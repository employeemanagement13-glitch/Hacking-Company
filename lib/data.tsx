import { BlogCardData } from "@/Components/SubComponents/home/BlogCard";
import { SolutionCardData, AchievementCardData, WhyUsItem, SolutionData, LogoData, LogoGroup, LeaderData, CertificationData, TestimonialData, BlogData, NavColumn, MethodologyItem, FAQItemData, CoreValue, LocationData, Benefit } from "@/types/dataType";
import { supabase } from '@/utils/supabaseClient';
// Data array for the cards, adhering to the DRY principle

const { data, error } = await supabase
  .from("solutions")
  .select("*");

const blogs = await supabase.from("blogs").select("*")
// console.log(blogs.data)

const currentblogs = blogs.data ?? [];
const allblogs = currentblogs?.map((blog, index) => ({
  title: blog.title,
  blogid: `blogs/${blog.id}`,
  summary: blog.description,
  imagePath: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${blog.banner_image}`,
  category: blog.type,
  date: blog.created_at,
  id: index
}))


const safeData = data ?? [];
const solutionsdata = safeData
  .slice(0, 6)
  .map((sol) => ({
    title: sol.title,
    description: sol.description,
    href: `solutions/${sol.slug}`,
    visualIcon: sol.banner_image,
  }));

  const allsols = safeData.map(sol=>({
    title: sol.title,
    summary: sol.description,
    category: sol.category,
    date: sol.created_at,
    blogid: `solutions/${sol.slug}`,
    imagePath: sol.banner_image,
  }))



// console.log(solutionsdata)
export const SolutionCards: SolutionCardData[] = solutionsdata



// Data array for the cards, now including the offset class for staggering
export const AchievementsCards: AchievementCardData[] = [
  {
    value: "60+",
    description: "+12.3% clients from last year",
    // Card 1: Elevated (no offset)
    offsetClass: "lg:mt-0",
  },
  {
    value: "75%",
    description: "+1.3% recurring clients from last year",
    // Card 2: Lowered by a specific amount (md:mt-12)
    offsetClass: "lg:mt-12",
  },
  {
    value: "100+",
    description: "Companies protected by our services",
    // Card 3: Elevated (no offset)
    offsetClass: "lg:mt-0",
  },
  {
    value: "30+",
    description: "Countries we served",
    // Card 4: Lowered by a specific amount (md:mt-12)
    offsetClass: "lg:mt-12",
  },
];


// Data for the "Featured By" section (Media Logos)
// Switched to placeholder images for the "Featured By" section
export const featuredByLogos: LogoData[] = [
  { id: 1, name: "BUSINESS INSIDER", imagePath: "/home/businessinsider.webp" },
  { id: 2, name: "New York Weekly", imagePath: "/home/newyorkweekly.webp" },
  { id: 3, name: "Khaleej Times", imagePath: "/home/khaleejtimes.webp" },
  { id: 4, name: "YAHOO! Finance", imagePath: "/home/yahoofinance.webp" },
  { id: 5, name: "Forbes", imagePath: "/home/forbes.png" },
  { id: 6, name: "Travelers UNITED", imagePath: "/home/hasedout.png" },
  { id: 7, name: "BLOCKGEEKS", imagePath: "/home/blockgeeks.webp" },
  { id: 8, name: "iPlocation", imagePath: "/home/iplocation.png" },
];





// Data for the "Trusted Clients" section (Text-based Logos)
export const trustedClientsData: LogoGroup = {
  title: "Trusted Clients",
  subtitle: "Our commitment to providing top-notch penetration testing services has earned us the trust of leading companies worldwide. Here are some of our esteemed clients who rely on our expertise to secure their digital assets.",
  pathway: false,
  logos: [
    { id: 10, name: "BYKEA", imagePath: "/home/bykea.png" },
    { id: 11, name: "xiami", imagePath: "/home/xiaomi.png" },
    { id: 12, name: "inDrive", imagePath: "/home/indrive.jpg" },
    { id: 13, name: "HoneyBricks", imagePath: "/home/honeybricks.jpg" },
    { id: 14, name: "Holistico", imagePath: "/home/holistico.png" },
    { id: 15, name: "foodpanda", imagePath: "/home/foodpanda.png" },
  ],
};



// Data array for the leadership team
export const leaderCardsData: LeaderData[] = [
  {
    name: "Andreson Woley",
    title: "Founder, CEO",
    imagePath: "/home/headshot.webp",
    linkedinUrl: "https://linkedin.com/",
  },
  {
    name: "James Coshey",
    title: "Chief Technical Officer",
    imagePath: "/home/headshot2.jpg",
    linkedinUrl: "https://linkedin.com/",
  },
  {
    name: "John Machelistor",
    title: "Chief Product Officer",
    imagePath: "/home/headshot3.webp",
    linkedinUrl: "https://linkedin.com/",
  },
  // Adding more data to ensure scrolling is necessary and visible
  {
    name: "James Andreson",
    title: "Head of Marketing",
    imagePath: "/home/headshot1.jpg",
    linkedinUrl: "https://linkedin.com/",
  },
  {
    name: "David Chen",
    title: "VP of Engineering",
    imagePath: "/home/headshot4.jpg",
    linkedinUrl: "https://linkedin.com/",
  },
];


// Data array for the certification logos (using placeholder images to match the visual style)
export const certificationCardsData: CertificationData[] = [
  // Row 1
  { alt: "OSCP Certification", imagePath: "/home/certifications/oscp.png" },
  { alt: "OSWE Certification", imagePath: "/home/certifications/oswe.png" },
  { alt: "OSEP Certification", imagePath: "/home/certifications/osep.png" },
  { alt: "OSED Certification", imagePath: "/home/certifications/osed.png" },
  { alt: "CISSP Certification", imagePath: "/home/certifications/cissp.png" },

  // Row 2
  { alt: "eCPPTv2 Certification", imagePath: "/home/certifications/ecppt.png" },
  { alt: "CompTIA PenTest+ Certification", imagePath: "/home/certifications/comptia.png" },
  { alt: "SSCP Certification", imagePath: "/home/certifications/sscp.png" },
  { alt: "CREST Certification", imagePath: "/home/certifications/crest.png" },
  { alt: "PEN TEST Certification", imagePath: "/home/certifications/pentest.png" },
];


// --- 2. Data Array for Testimonials ---
export const testimonialCardsData: TestimonialData[] = [
  {
    name: "Muneeb Maayr",
    company: "Company Bykea",
    feedback: "Working as a cybersecurity consultant, RedSecLabs has improved the security posture of Bykea by formulating a Cybersecurity Framework for Developers and implementing DevSecOps practices. They also enhanced our Vulnerability Disclosure Program (VDP) with clear documentation and structured response workflows. Their deep technical insight and professionalism make them a valuable partner for any organization.",
  },
  {
    name: "Jane Smith",
    company: "TechCorp Solutions",
    feedback: "RedSecLabs provided invaluable penetration testing for our new e-commerce platform. Their comprehensive report identified critical vulnerabilities we missed, and their team was extremely responsive and helpful during remediation. The quality of their work is unmatched, and they truly prioritize client security.",
  },
  {
    name: "David Lee",
    company: "Global Finance Inc.",
    feedback: "We engaged RedSecLabs for continuous monitoring and compliance auditing. Their ability to integrate seamlessly with our existing infrastructure and deliver actionable intelligence has dramatically reduced our risk exposure. Their expertise in financial sector security standards is exceptional.",
  },
];

// --- 2. Data Array for Blog Posts ---
// Total 6 posts, making 3 pages of 2 cards each.

export const blogPosts: BlogData[] = allblogs;

export const gothackedlinks = [
  {
    link: "/contact",
    title: "Get Immediate Help"
  },
  {
    link: "/blogs",
    title: "Find Answer in Blog"
  },
]

export const socials = [
  { link: "https://facebook.com", image: "/home/Socials/facebook11.png" },
  { link: "https://x.com", image: "/home/Socials/x.png" },
  { link: "https://instagram.com", image: "/home/Socials/instagram.webp" },
  { link: "https://linkedin.com", image: "/home/Socials/linkedin.png" },
];


const solutionLinks = safeData.map(sol => ({
  name: sol.name,
  href: `/solutions/${sol.slug}`,
}));

// Data for the three navigation columns
export const navData: NavColumn[] = [
  {
    title: "Company",
    links: [
      { name: "Blogs", href: "/blogs" },
      { name: "Publications", href: "/publications" },
      { name: "Career", href: "/career" },
      { name: "About", href: "/about" },
    ],
  },
  {
    title: "Solutions",
    links: solutionLinks,
  },
  {
    title: "Help Center",
    links: [
      { name: "Contact", href: "/contact" },
      { name: "Got Hack?", href: "/#gothacked" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
];


export const navLinks = [
  {
    name: "Solutions",
    href: "/solutions",
    links: solutionLinks,
  },
  { name: "About us", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Publications", href: "/publications" },
  { name: "Career", href: "/pathway" },
];




// Solutions page 


export const mockSolutions: SolutionData[] = allsols;




export const whyUsData: WhyUsItem[] = [
  {
    title: 'Our Human-Centered Approach',
    description: "Just like real hackers, our pen testers use unpredictable methods that a vulnerability scan can't simulate. We focus on business logic flaws and multi-stage attacks that machines miss.",
  },
  {
    title: 'Our Actionable Reports',
    description: "We'll describe what each vulnerability means in your specific environment so you can make effective remediations. Every finding is prioritized by risk and includes clear fix recommendations.",
  },
  {
    title: 'Our Scoping Process',
    description: "We help you plan a penetration test that meets your goals, ensuring that you get the most from your investment. This includes clearly defined rules of engagement and a commitment to communication.",
  }
];



// --- MOCK DATA FOR METHODOLOGY ---
export const methodologyData: MethodologyItem[] = [
  {
    title: 'Scoping & Pre-Engagement',
    bullets: [
      "Define success criteria.",
      "Set ground rules and scope boundaries.",
      "Establish communication channels and incident response plan.",
    ],
  },
  {
    title: 'Reconnaissance & Vulnerability Assessment',
    bullets: [
      "Information gathering & discovery (passive and active).",
      "Device & OS enumeration, port scanning, network sniffing.",
      "Vulnerability scanning using commercial and open-source tools.",
      "Social engineering reconnaissance (if in scope).",
    ],
  },
  {
    title: 'Exploitation',
    bullets: [
      "Vulnerability verification and manual exploitation.",
      "Pivoting through system and privilege escalation attempts.",
      "Elimination of false positives and false negatives.",
      "Data exfiltration simulation (if in scope).",
    ],
  },
  // Additional items for Page 2
  {
    title: 'Post-Exploitation & Cleanup',
    bullets: [
      "Maintaining persistence and accessing sensitive data.",
      "Documenting proof of concept for every vulnerability.",
      "Restoring the environment to its original state.",
    ],
  },
  {
    title: 'Analysis & Reporting',
    bullets: [
      "Deep dive analysis of findings and impact assessment.",
      "Generating a detailed, prioritized, and actionable report.",
      "Providing executive summaries and technical details.",
    ],
  }
];


// --- MOCK DATA ---
export const faqData: FAQItemData[] = [
  {
    id: 1,
    question: 'What compliance and certification services are available?',
    answer: "RedSecLabs provides ISO 27001 certification preparation, PCI-DSS readiness assessments, HIPAA compliance checks, and comprehensive cybersecurity due diligence assessments. We help you navigate complex regulatory landscapes.",
  },
  {
    id: 2,
    question: 'How long does a typical penetration test take?',
    answer: "The duration of a penetration test varies widely depending on the scope (e.g., number of IP addresses, complexity of applications). A standard web application test usually takes between 1 to 3 weeks, including the final report delivery.",
  },
  {
    id: 3,
    question: 'Can we help with cybersecurity strategy and governance?',
    answer: "Yes, our expert consultants assist organizations in developing mature cybersecurity strategies, risk management frameworks, and governance models aligned with business objectives and regulatory requirements.",
  },
  {
    id: 4,
    question: 'How do we ensure the quality of our services?',
    answer: "Our team consists of certified security professionals (OSCP, CISSP, etc.) who adhere to a rigorous, documented methodology. Every report undergoes a multi-stage technical and editorial review before delivery.",
  },
  {
    id: 5,
    question: 'Do you offer retesting after vulnerabilities are fixed?',
    answer: "Absolutely. We offer a complimentary retesting period (usually 30 days) following the final report to verify that all identified vulnerabilities have been effectively remediated and closed.",
  }
];

// Content taken directly from the "Our mission.png" image
export const missionContent = "To empower SMEs with AI-driven cybersecurity solutions, delivering precise, long-term protection through tailored consulting at competitive rates";
export const visionContent = "To transform IT systems into intelligent, adaptive digital assets that shape a connected, AI-driven future for businesses worldwide";


// Use the CoreValue interface for the coreValues array
export const coreValues: CoreValue[] = [
  {
    title: "Security-First Mindset",
    description: "We prioritise security in every aspect of our work, from product development to customer support. Our commitment is to deliver solutions that safeguard our customers' digital assets and ensure their data privacy.",
  },
  {
    title: "Innovation",
    description: "We embrace creativity and continuous improvement to stay ahead of emerging cyber threats. We encourage curiosity, experimentation, and out-of-the-box thinking to develop cutting-edge solutions that address evolving security challenges.",
  },
  {
    title: "Collaboration",
    description: "We foster a culture of teamwork, respect, and shared success, believing collaboration within our organization and with partners unlocks diverse skills, perspectives, and expertise to effectively solve complex cybersecurity challenges and drive collective growth and resilience together.",
  },
  {
    title: "Adaptability",
    description: "We remain agile and adaptable amidst evolving cyber threats and shifting market dynamics. Embracing change, we learn from experience and proactively refine our strategies and approaches to stay ahead of the curve.",
  },
  {
    title: "Excellence",
    description: "We pursue excellence in every aspect of our work, from product quality to customer satisfaction. Committed to continuous learning and improvement, we set high standards and consistently strive to exceed expectations.",
  },
  {
    title: "Customer-Centricity",
    description: "We put our customers' needs at the heart of everything we do. We endeavour to understand their unique requirements, deliver exceptional service, and foster long-term relationships founded on trust, transparency, and responsiveness.",
  },
];


// Data for the "Trusted Clients" section (Text-based Logos)
export const globalPartnersData: LogoGroup = {
  title: "Global Partners",
  pathway: false,
  logos: [
    { id: 0, name: "BYKEA", imagePath: "/home/bykea.png" },
    { id: 1, name: "ZettaMight", imagePath: "/about/Zettamigh.png" },
    { id: 2, name: "Work Generators", imagePath: "/about/workgen.png" },
  ],
};


export const locations: LocationData[] = [
  {
    name: "Pakistan",
    imageUrl: "/about/pakistan.webp",
    altText: "Skyscrapers in Pakistan at sunset",
    city: "Islamabad",
    state: "ICT",
    addressLine: "Street 10, Sector I-10/2, Islamabad, 44000",
    phone: "+92 51 123 4567",
  },
  {
    name: "United States",
    imageUrl: "/about/usa.webp",
    altText: "New York City skyline",
    city: "New York",
    state: "NY",
    addressLine: "123 Wall Street, Suite 500, New York, 10005",
    phone: "+1 212 555 0100",
  },
  {
    name: "United Kingdom",
    imageUrl: "/about/ukk.webp",
    altText: "London's Tower Bridge at dusk",
    city: "London",
    state: "Greater London",
    addressLine: "20 Fenchurch Street, EC3M 3BD, London",
    phone: "+44 20 7946 0123",
  },
  {
    name: "United Arab Emirates",
    imageUrl: "/about/uae.webp",
    altText: "Dubai skyline with Burj Khalifa",
    city: "Dubai",
    state: "Dubai Emirate",
    addressLine: "Emaar Square, Building 4, Office 101, Dubai",
    phone: "+971 4 123 4567",
  },
];


// Data for the "Trusted Clients" section (Text-based Logos)
export const folllowpathway: LogoGroup = {
  title: "Pathway",
  subtitle: "To be a part of us, follow this simple & efficient pathway",
  pathway: true,
  logos: [
    { id: 1, name: "applicationsubmit", imagePath: "/pathway/applicationsubmit.png" },
    { id: 2, name: "expertevaluation", imagePath: "/pathway/expertevaluation.png" },
    { id: 3, name: "interview", imagePath: "/pathway/interview.png" },
    { id: 4, name: "hire", imagePath: "/pathway/hire.png" },
  ],
};

// Data for the "Featured By" section (Media Logos)
// Switched to placeholder images for the "Featured By" section
export const cultureImages: LogoData[] = [
  { id: 1, name: "culture6", imagePath: "/pathway/culture6.avif" },
  { id: 2, name: "culture7", imagePath: "/pathway/culture7.avif" },
  { id: 3, name: "culture8", imagePath: "/pathway/culture8.avif" },
  { id: 4, name: "group", imagePath: "/pathway/group.jpg" },
  { id: 5, name: "team1", imagePath: "/pathway/team1.jpg" },
  { id: 6, name: "team2", imagePath: "/pathway/team2.jpg" },
  { id: 7, name: "team3", imagePath: "/pathway/team3.jpg" },
  { id: 8, name: "office", imagePath: "/pathway/office.jpg" },
];


export const BENEFITS_DATA: Benefit[] = [
  {
    id: 1,
    title: "Fuel Allowance",
    imagePath: "/pathway/fuel.jpg",
    alt: "A close-up of a fuel pump nozzle, symbolizing fuel allowance.",
  },
  {
    id: 2,
    title: "Health and Wellness Programs",
    imagePath: "/pathway/health.webp",
    alt: "A person doing yoga, symbolizing health and wellness.",
  },
  {
    id: 3,
    title: "Performance Bonuses",
    imagePath: "/pathway/bonuses.webp",
    alt: "A stack of gold coins or a trophy, symbolizing performance rewards.",
  },
  {
    id: 4,
    title: "Outpatient (OPD) & Inpatient (IPD) Benefits",
    imagePath: "/pathway/opd.webp",
    alt: "A medical doctor consulting a patient, symbolizing OPD/IPD benefits.",
  },
  {
    id: 5,
    title: "World Class Gyms",
    imagePath: "/pathway/gyms.webp",
    alt: "Modern gym equipment, symbolizing world-class gyms.",
  },
  {
    id: 6,
    title: "Work from Home Options",
    imagePath: "/pathway/workfromhome.webp",
    alt: "A comfortable home office setup, symbolizing work from home.",
  },
  {
    id: 7,
    title: "Tech Allowances",
    imagePath: "/pathway/techallowance.webp",
    alt: "A laptop and monitor setup, symbolizing tech allowances.",
  },
];



export const bullets = [
  "Define success criteria Set ground rules",
  "Define success criteria Set ground rules",
  "Set ground rules Define success criteria",
  "Define success criteria Set ground rules",
  "Set ground rules Define success criteria",
  "Define success criteria Set ground rules",
  "Set ground rules Define success criteria",
  "Define success criteria Set ground rules",
  "Set ground rules Set ground rule sSet ground rules",
];

export const headerProps = {
  // LEFT SIDE TEXT
  title: "Expert Digital Security Services | Company",
  description:
    "Find top Digital Security services by RedSecLabs. From penetration testing to incident response, we help secure businesses across with trusted solutions.",
  complianceTitle: "Meets Compliance Framework Regulations",

  logos: [
    { src: "/home/certifications/crest.png", alt: "CREST Certification" },
    { src: "/home/certifications/pentest.png", alt: "Pentest Certification" },
    { src: "/home/certifications/comptia.png", alt: "CompTIA PenTest+" },
  ],

  // RIGHT SIDE — FORM TEXT
  formHeading: "Request Your Pentesting Quote",
  formParagraph:
    "Provide your details below and select the testing type you need. Our team will reach out shortly.",

  checkboxtitle: "What type of testing do you need?",
  checkboxOptions: [
    "Web Application Testing",
    "Mobile App Testing",
    "API Testing",
    "Cloud Security Testing",
    "Network Security Testing",
    "Not Sure",
  ],
};


// --- 4. BeAPartSection (Main Component) ---
  // Data structure updated to use 'summary' instead of 'description'
  export const jobData: BlogCardData[] = [
    {
      id: 1,
      title: "SOC analyst Level 1/Level 2",
      summary: "We are looking for SOC analyst Level 1/Level 2 proficient in Wazuh customization and/or Microsoft Sentinel.",
      imagePath: "/pathway/soc.png",
      blogid:"https://linkedin.com"
    },
    {
      id: 2,
      title: "Cybersecurity Researcher",
      summary: "Build and manage attack-simulation labs and automation environments, researching threat-actor techniques, zero-day exploits.",
      imagePath: "/pathway/cyber.png",
      blogid:"https://linkedin.com"
    },
    {
      id: 3,
      title: "Project Manager",
      summary: "Manage cloud, endpoint, identity, and compliance security projects from planning to delivery with full coordination and reporting.",
      imagePath: "/pathway/project.png",
      blogid:"https://linkedin.com"
    },
  ];