"use client";

import React from "react";
import ContactForm from "../SubComponents/home/ContactForm";
import SocialLinks from "../SubComponents/home/SocialLinks";
import { EmailCard, PhoneCard } from "../SubComponents/home/ContactCard";
import OfficeLocations from "../SubComponents/home/OfficeLocation";
import ContactPageForm from "../ContactPageForm";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 text-white font-sans overflow-hidden"
    >
      <div className="w-[80vw] max-sm:w-full max-md:px-4 mx-auto">
        <div className="flex justify-between max-md:flex-col-reverse items-start gap-20">

          {/* FORM - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <ContactPageForm
              title="Get Your Cybersecurity or Compliance Quote Now"
              subtitle="Tell us your project vision and receive expert insights, practical feedback, and suitable engagement options from our leadership."
            />
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-300 flex flex-col gap-8 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <SocialLinks />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <EmailCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <PhoneCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="border-t border-neutral-700"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <OfficeLocations />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;