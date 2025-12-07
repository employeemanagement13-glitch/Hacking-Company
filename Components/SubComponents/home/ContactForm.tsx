"use client";
import React, { useState } from "react";
import ContactField from "./ContactField";

const ContactForm = () => {
  const [formData] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="cardBackground w-full rounded-xl p-8 md:p-12 shadow-2xl shadow-neutral-900/50">
      <h2 className="text-2xl md:text-3xl mb-8 leading-snug">
        Get Your Cybersecurity or Compliance Quote Now
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ContactField id="firstName" placeholder="First Name*" />
          <ContactField id="lastName" placeholder="Last Name*" />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ContactField id="businessEmail" placeholder="Business Email*" type="email" />
          <ContactField id="companyName" placeholder="Company Name*" />
        </div>

        <ContactField id="requiredService" placeholder="Required Service*" />

        <textarea
          id="details"
          placeholder="Security needs scoping details"
          rows={6}
          className="w-full bg-black text-white border border-neutral-700 
                     focus:border-white focus:outline-none rounded-md px-4 py-3 
                     text-base placeholder-neutral-500 transition-colors duration-200 
                     resize-none"
        ></textarea>

        <button
          type="submit"
          className="buttonstyles py-2 px-4 
                     rounded-md transition-colors duration-200 shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
