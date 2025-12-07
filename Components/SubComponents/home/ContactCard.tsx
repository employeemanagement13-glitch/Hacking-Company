"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ContactCard = ({ title, icon, children }: CardProps) => (
  <div className="rounded-xl">
    <h3 className="heading3">{title}</h3>

    <div className="flex items-center text-white hover:text-gray-400 transition-colors">
      {icon}
      {children}
    </div>
  </div>
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
