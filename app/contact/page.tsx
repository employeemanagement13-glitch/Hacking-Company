"use client";
import SocialLinks from "@/Components/SubComponents/home/SocialLinks";
import { EmailCard } from "@/Components/SubComponents/home/ContactCard";
import { PhoneCard } from "@/Components/SubComponents/home/ContactCard";
import OfficeLocations from "@/Components/SubComponents/home/OfficeLocation";
import ContactPageForm from "@/Components/ContactPageForm";

export default function ContactPage() {
  return (
    <div className="min-h-fit py-20 px-6 lg:px-20 mt-20 w-[90vw] mx-auto">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT COLUMN */}
        <aside className="space-y-8">
          <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
            Speak with a Cyber <span className="text-red-600">expert</span> today
          </h1>

          <p className="text-[17px] text-gray-300 max-w-3xl">
            Our Cyber Security experts will be happy to assist you.
          </p>

          <div className="space-y-6">
            <div>
              <EmailCard />
            </div>

            <div>
              <PhoneCard />
            </div>

            <div>
              <SocialLinks />
            </div>

            <div className="mt-10">
              <OfficeLocations />
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN - FORM */}
        <main>
          <ContactPageForm
            title="Seeking Security excellence?"
            subtitle="Tell us your project vision and receive expert insights, practical feedback, and suitable engagement options from our leadership."
          />
        </main>
      </div>
    </div>
  );
}
