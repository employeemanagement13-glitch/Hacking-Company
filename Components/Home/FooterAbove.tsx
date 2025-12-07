"use client";

import React from "react";
import ContactForm from "../SubComponents/home/ContactForm";
import SocialLinks from "../SubComponents/home/SocialLinks";
import { EmailCard, PhoneCard } from "../SubComponents/home/ContactCard";
import OfficeLocations from "../SubComponents/home/OfficeLocation";
import ContactPageForm from "../ContactPageForm";

const ContactSection = () => {
  return (
    <section className="py-16 md:py-24 text-white font-sans">
      <div className="w-[80vw] mx-auto">
        <div className="flex justify-between items-start gap-20">

          {/* FORM */}
          <ContactPageForm
            title="Get Your Cybersecurity or Compliance Quote Now"
            subtitle="Tell us your project vision and receive expert insights, practical feedback, and suitable engagement options from our leadership."
          />

          {/* RIGHT SIDE */}
          <div className="text-base text-gray-300 flex flex-col gap-8 w-full">

            <SocialLinks />
            <EmailCard />
            <PhoneCard />

            <div className="border-t border-neutral-700" />

            <OfficeLocations />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
