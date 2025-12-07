import PrivacySubComponent from "@/Components/privacy/PrivacySubComponent";
import { PrivacyItem } from "@/Components/privacy/PrivacySubItem";

export default function PrivacyPage() {
const data: PrivacyItem[] = [
  {
    variant: "list",
    title: "Personal data we collect about you",
    bullets: [
      "Identity and contact data: name, work email, work phone, company, role/title.",
      "Enquiry/quote data: the details you provide in contact or 'Get a quote' forms.",
      "Booking data: meeting details captured when you use our 'Book A Consultation' link (Calendly).",
      "Usage data: pages visited, referral source and basic device/interaction data collected via essential site technologies and (where enabled) analytics.",
      "Public Business Info: your public profile or company web page from public sources only to contextualise and respond to your enquiry."
    ],
  },
  {
    variant: "highlight",
    title: "Important Note",
    subtitle: "Children's Privacy",
    content: "Given the nature of our website, we do not expect to collect the personal data of anyone under 13 years old. If you are aware that any personal data of anyone under 13 years old has been shared with our website, please let us know so that we can delete that data.",
  },
  {
    variant: "list",
    title: "What this policy applies to",
    bullets: [
      "Our public website only.",
      "Client engagements are covered by separate service agreements and privacy notices.",
      "Third-party websites (e.g., external resources, Calendly booking pages) are governed by their own privacy policies.",
    ],
  },
  {
    variant: "table",
    title: "How and why we use your personal data",
    subtitle: "We only use your data for legitimate reasons.",
    rows: [
      {
        left: "Creating and managing your account",
        right: "For our legitimate interests to provide efficient service.",
      },
      {
        left: "Providing services",
        right: "To perform our contract with you.",
      },
    ],
  },
  {
    variant: "highlight",
    title: "Marketing",
    subtitle: "We will use your personal data to send you updates (by email, text message or telephone) about our products and/or services, including exclusive offers, promotions or new products and/or services.",
    content:
      "We may send marketing emails under <strong>legitimate interest</strong>. You can unsubscribe anytime.",
  },
  {
    variant: "list",
    title: "Who we share your data with",
    bullets: [
      "Service providers (hosting, email)",
      "Professional advisors (lawyers, auditors)",
      "Regulators if required by law",
    ],
  },
  {
    variant: "table",
    title: "How long your personal data will be kept",
    subtitle: "We will not keep your personal data for longer than we need it for the purpose for which it is used.",
    rows: [
      {
        left: "Website enquiries / quotes",
        right: "Up to 24 months from last interaction | Manage repeat queries; understand pipeline"
      },
      {
        left: "Booking metadata (Calendly)",
        right: "Up to 24 months from appointment date | Scheduling history and follow ups"
      },
      {
        left: "Client and contract records",
        right: "Up to 7 years after end of engagement | Accounting, tax, legal limitation"
      },
      {
        left: "Suppression lists (Opt-out)",
        right: "Indefinitely (minimum necessary) | Ensure no further marketing is sent"
      }
    ],
  },
  {
    variant: "highlight",
    title: "Transferring your personal data out of the UK",
    subtitle: "Countries outside the UK have differing data protection laws",
    content: "It is sometimes necessary for us to transfer your personal data to countries outside the UK. We comply with applicable UK laws and only transfer data when: the UK government has approved the country's data protection level, appropriate safeguards are in place, or a specific exception applies under relevant data protection law.",
  },
  {
    variant: "list",
    title: "Cookies and other tracking technologies",
    bullets: [
      "We use essential cookies to make the site work.",
      "We may use functionality and analytics cookies to improve the site and understand usage.",
      "Where consent is required, we ask via a cookie banner and honour withdrawal.",
      "We may rely on PECR exceptions for certain security and low-risk analytics cookies where conditions are met.",
      "See our Cookie Policy for current list of cookies, categories, and lifetimes."
    ],
  },
  {
    variant: "highlight",
    title: "Keeping your personal data secure",
    subtitle: "Security Measures",
    content: "We implement appropriate administrative, technical and organisational measures (access controls, encryption in transit, environment hardening, vulnerability management, audit logging) proportionate to risk. While no system is 100% secure, we continually improve controls. We will notify you and the ICO of a personal data breach where legally required.",
  },
  {
    variant: "list",
    title: "How to complain",
    bullets: [
      "Please contact us if you have any queries or concerns about our use of your personal data.",
      "You have the right to lodge a complaint with the Information Commissioner.",
      "Contact the ICO: https://ico.org.uk/make-a-complaint or by telephone: 0303 123 1113."
    ],
  },
  {
    variant: "highlight",
    title: "Changes to this privacy policy",
    subtitle: "Policy Updates",
    content: "We may update this policy from time to time. If changes are material, we will highlight them on this page and, where appropriate, notify you by email.",
  },
] as const;


  return (
    <PrivacySubComponent
      title=""
      description=""
      data={data}
    />
  );
}
