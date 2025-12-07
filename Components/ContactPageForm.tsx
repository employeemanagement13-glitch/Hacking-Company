"use client";

import React, { useState, useEffect } from "react";
import ContactField from "./SubComponents/home/ContactField";
import { supabase } from "@/utils/supabaseClient";
import { ChevronDown } from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

export default function ContactPageForm({
  title = "Get in touch",
  subtitle,
}: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requiredService, setRequiredService] = useState("");
  const [details, setDetails] = useState("");

  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  // 🔥 Fetch services from `solutions` table
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("solutions").select("title");

      if (error) {
        console.error("Error fetching services:", error);
        return;
      }

      setServiceOptions(data.map((item: any) => item.title));
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    if (!firstName || !businessEmail) {
      setError("Please provide your name and email.");
      setStatus("error");
      return;
    }

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: businessEmail,
        company_name: companyName,
        required_service: requiredService,
        details,
        created_at: new Date().toISOString(),
      };

      const { error: supError } = await supabase
        .from("contacts")
        .insert([payload]);

      if (supError) {
        console.error("Supabase insert error:", supError);
        setError("Submission failed. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");

      setFirstName("");
      setLastName("");
      setBusinessEmail("");
      setCompanyName("");
      setRequiredService("");
      setDetails("");

      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      console.error(err);
      setError("Submission failed. Try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="cardBackground w-full rounded-xl p-8 md:p-10 shadow-2xl">
      <h2 className="text-2xl md:text-3xl mb-2 font-bold text-white leading-snug">
        {title}
      </h2>
      {subtitle && <p className="text-neutral-300 mb-6">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ContactField
            id="firstName"
            placeholder="First Name*"
            value={firstName}
            onChange={(v) => setFirstName(v)}
          />
          <ContactField
            id="lastName"
            placeholder="Last Name*"
            value={lastName}
            onChange={(v) => setLastName(v)}
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ContactField
            id="businessEmail"
            placeholder="Business Email*"
            type="email"
            value={businessEmail}
            onChange={(v) => setBusinessEmail(v)}
          />
          <ContactField
            id="companyName"
            placeholder="Company Name*"
            value={companyName}
            onChange={(v) => setCompanyName(v)}
          />
        </div>

        {/* Dropdown Only */}
        <div>
          <label className="text-sm font-medium text-white block mb-2">
            Required Service*
          </label>

          <div className="relative w-full">
            <select
              value={requiredService}
              onChange={(e) => setRequiredService(e.target.value)}
              className="
      w-full bg-neutral-900 border border-neutral-700 text-white 
      rounded-lg px-4 py-3 pr-10 cursor-pointer
      appearance-none 
      focus:ring-2 focus:ring-red-500/40 focus:border-red-500
      transition-all duration-300
    "
            >
              <option value="">Select a service</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Custom arrow */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <ChevronDown className="text-[5px]"/>
            </span>
          </div>

        </div>

        <textarea
          id="details"
          placeholder="Security needs, scoping details, etc*"
          rows={6}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full bg-black text-white border border-neutral-700 
                     focus:border-white focus:outline-none rounded-md px-4 py-3 
                     text-base placeholder-neutral-500 transition-colors duration-200 
                     resize-none"
          required
        ></textarea>

        {status === "loading" && (
          <p className="text-yellow-400">Submitting…</p>
        )}
        {status === "success" && (
          <p className="text-green-400 font-semibold">✓ Request submitted successfully!</p>
        )}
        {status === "error" && error && (
          <p className="text-red-400">{error}</p>
        )}

        <div className="flex items-center gap-6 mt-2">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`buttonstyles py-2 px-6 rounded-md transition-colors duration-200 shadow-lg font-bold text-white ${status !== "idle"
                ? "opacity-60 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500"
              }`}
          >
            {status === "loading"
              ? "Submitting..."
              : status === "success"
                ? "Submitted"
                : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
