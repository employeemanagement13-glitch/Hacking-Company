import { notFound } from "next/navigation";
import SecurityServicesSection from "@/Components/Solutions/SecurityServicesSection";
import WhyUs from "@/Components/Solutions/WhyUs";
import BulletsInSection from "@/Components/Solutions/BulletsInSection";
import CoreValuesSection from "@/Components/About/CoreValues";
import { getSolutionBySlug } from "@/lib/queries"; // YOU WILL CREATE THIS
import { SolutionHeaderProps } from "@/Components/SubComponents/Solutions/SolutionHeader";

// interface Solution {
//   title: string;
//   description?: string;
//   complianceTitle?: string;
//   logos?: string[];
//   formHeading?: string;
//   formParagraph?: string;
//   checkboxtitle?: string;
//   checkboxOptions?: string[];
//   whyDoYouNeed?: string[];
//   benefits?: string[];
//   methodology?: string[];
//   keyComponents?: string[];
//   frameworks?: string[];
//   capabilities?: string[];
//   typesOfService?: string[];
//   deliverables?: string[];
//   whyUsCoreValues?: string[];
//   whatYouGet?: string[];
//   procedure?: string[];
//   matter?: string[];
//   differences?: string[];
//   ourApproach?: string[];
//   whoShouldConsider?: string[];
// }

// Props for Next.js page
interface PageProps {
  params: {
    slug: string;
  };
}
export default async function Page({ params } : PageProps) {
  const { slug } = await params;

  // 🔥 FETCH SOLUTION FROM DATABASE
  const solution = await getSolutionBySlug(slug);

  if (!solution) return notFound();

  // 🔥 BUILD HEADER PROPS FOR COMPONENT
  const headerProps: SolutionHeaderProps = {
  title: solution.headtitle ?? "",
  description: solution.headerdesc ?? "",
  complianceTitle: "Meets Compliance Framework Regulations",
  logos: [
      { src: "/home/certifications/crest.png", alt: "CREST Certification" },
      { src: "/home/certifications/pentest.png", alt: "Pentest Certification" },
      { src: "/home/certifications/comptia.png", alt: "CompTIA PenTest+" },
    ],           // <-- Default empty array
  formHeading: solution.formtitle ?? "",
  formParagraph: solution.formdesc ?? "",
  checkboxtitle: solution.checkboxtitle ?? "",
  checkboxOptions: solution.formcheckboxes ?? [],  // <-- Default empty array
};

console.log(solution.methodology)

  return (
    <main className="h-fit p-0 m-0 box-border">

      {/* ----------------------------------------- */}
      {/* 🔥 HEADER SECTION */}
      {/* ----------------------------------------- */}
      <SecurityServicesSection headerProps={headerProps} />

      {/* ----------------------------------------- */}
      {/* 🔥 WHY DO YOU NEED */}
      {/* ----------------------------------------- */}
      {solution.whydoyouneed?.length > 0 && (
        <WhyUs title="Why Do You Need" data={solution.whydoyouneed} />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 BENEFITS */}
      {/* ----------------------------------------- */}
      {solution.benefitsofservice?.length > 0 && (
        <BulletsInSection
          title="Benefits of Service"
          para="The Principles that Shape Our Identity and Drive Our Work"
          bullets={solution.benefitsofservice}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 METHODOLOGY */}
      {/* ----------------------------------------- */}
      {solution.methodology?.length > 0 && (
        <CoreValuesSection
          title="Methodology"
          para="An Approach that Fulfil Your Needs."
          coreValues={solution.methodology}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 KEY COMPONENTS */}
      {/* ----------------------------------------- */}
      {solution.keycomponents?.length > 0 && (
        <CoreValuesSection
          title="Key Components"
          para="Components that drive security of your organization."
          coreValues={solution.keycomponents}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 FRAMEWORKS */}
      {/* ----------------------------------------- */}
      {solution.frameworks?.length > 0 && (
        <CoreValuesSection
          title="Frameworks"
          para="Blueprints that keep your data safe."
          coreValues={solution.frameworks}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 CAPABILITIES */}
      {/* ----------------------------------------- */}
      {solution.capabilities?.length > 0 && (
        <CoreValuesSection
          title="Capabilities"
          para="Service capable to meet your requirement."
          coreValues={solution.capabilities}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 TYPES OF SERVICE */}
      {/* ----------------------------------------- */}
      {solution.typesofservice?.length > 0 && (
        <BulletsInSection
          title="Types of Service"
          para="The Principles that Shape Our Identity and Drive Our Work"
          bullets={solution.typesofservice}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 DELIVERABLES */}
      {/* ----------------------------------------- */}
      {solution.deliverables?.length > 0 && (
        <BulletsInSection
          title="Deliverables"
          para="The Principles that Shape Our Identity and Drive Our Work"
          bullets={solution.deliverables}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 WHY US (CORE VALUES VERSION) */}
      {/* ----------------------------------------- */}
      {solution.whyus?.length > 0 && (
        <CoreValuesSection
          title="Why Us?"
          para="Our services keeps you safe against every type of attacks."
          coreValues={solution.whyus}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 WHAT YOU GET */}
      {/* ----------------------------------------- */}
      {solution.whatyouget?.length > 0 && (
        <CoreValuesSection
          title="What You Get?"
          para="Our services keeps you safe against every type of attacks."
          coreValues={solution.whatyouget}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 PROCEDURE */}
      {/* ----------------------------------------- */}
      {solution.procedure?.length > 0 && (
        <CoreValuesSection
          title="Procedure"
          para="Our services keeps you safe against every type of attacks."
          coreValues={solution.procedure}
        />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 ADDITIONAL WHY US SECTIONS */}
      {/* ----------------------------------------- */}
      {solution.matters?.length > 0 && (
        <WhyUs title="Matter" data={solution.matters} />
      )}

      {solution.differences?.length > 0 && (
        <WhyUs title="Differences" data={solution.differences} />
      )}

      {solution.ourapproach?.length > 0 && (
        <WhyUs title="Our Approach" data={solution.ourapproach} />
      )}

      {/* ----------------------------------------- */}
      {/* 🔥 WHO SHOULD CONSIDER */}
      {/* ----------------------------------------- */}
      {solution.whoconsider?.length > 0 && (
        <BulletsInSection
          title="Who Should Consider"
          para="The Principles that Shape Our Identity and Drive Our Work"
          bullets={solution.whoconsider}
        />
      )}

    </main>
  );
}
