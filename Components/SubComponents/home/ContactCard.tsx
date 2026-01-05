"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ContactCard = ({ title, icon, children }: CardProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className="rounded-xl"
  >
    <motion.h3
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="heading3"
    >
      {title}
    </motion.h3>

    <div className="flex items-center text-white hover:text-gray-400 transition-colors">
      {icon}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
      </motion.span>
    </div>
  </motion.div>
);

export const EmailCard = () => (
  <ContactCard title="Got a question?" icon={<Mail className="w-5 h-5 mr-3 text-red-700" />}>
    <a href="mailto:info@woxwing.com">info@woxwing.com</a>
  </ContactCard>
);

export const PhoneCard = () => (
  <ContactCard
    title="Want to talk to us?"
    icon={<Phone className="w-5 h-5 mr-3 text-red-700" />}
  >
    <a href="tel:+444046653424">+44 40 4665 3424</a>
  </ContactCard>
);