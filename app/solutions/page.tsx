import FAQSection from '@/Components/Solutions/FAQs';
import OurMethodology from '@/Components/Solutions/Methodology';
import OurSolutions from '@/Components/Solutions/OurSolutions';
import SecurityServicesSection from '@/Components/Solutions/SecurityServicesSection';
import WhyUs from '@/Components/Solutions/WhyUs';

import { headerProps, whyUsData } from "@/lib/data";

const page = () => {
  return (
    <main className="h-fit p-0 m-0 box-border">
      <SecurityServicesSection headerProps={headerProps} />
      <OurSolutions />

      {/* WHY US - NOW FULLY DYNAMIC */}
      <WhyUs
        title="Why Us?"
        data={whyUsData}
      />

      <OurMethodology />
      <FAQSection />
    </main>
  );
};

export default page;
