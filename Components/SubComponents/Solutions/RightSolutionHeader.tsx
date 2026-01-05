"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface RightSolutionHeaderProps {
  formHeading: string;
  formParagraph: string;
  checkboxtitle: string;
  checkboxOptions: string[];
}

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  telNo: string;
  testingTypes: string[];
}

const RightSolutionHeader: React.FC<RightSolutionHeaderProps> = ({
  formHeading,
  formParagraph,
  checkboxtitle,
  checkboxOptions,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    telNo: "",
    testingTypes: [],
  });

  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (label: string): void => {
    setFormData((prev) => {
      const isChecked = prev.testingTypes.includes(label);
      return {
        ...prev,
        testingTypes: isChecked
          ? prev.testingTypes.filter((t) => t !== label)
          : [...prev.testingTypes, label],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        telNo: "",
        testingTypes: [],
      });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setErrorMessage("Submission failed. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#101010] w-full p-8 sm:p-10 rounded-lg shadow-xl"
    >
      {/* Form heading with fade-in */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-[28px] font-bold text-white mb-3"
      >
        {formHeading}
      </motion.h2>

      {/* Form paragraph with fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-neutral-400 text-sm mb-8"
      >
        {formParagraph}
      </motion.p>

      <form onSubmit={handleSubmit}>
        {/* Input fields with staggered fade-in */}
        {(["fullName", "companyName", "email", "telNo"] as const).map(
          (field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "fullName"
                    ? "Full Name"
                    : field === "companyName"
                      ? "Company Name"
                      : field === "email"
                        ? "Email"
                        : "Tel No"
                }
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mb-4 bg-neutral-800 border border-neutral-700 rounded-md text-white"
                required
              />
            </motion.div>
          )
        )}

        {/* Checkbox section with fade-in */}
        <motion.fieldset
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <legend className="text-white text-base font-medium mb-3">
            {checkboxtitle}
          </legend>

          <div className="grid grid-cols-2 gap-3">
            {checkboxOptions.map((option, index) => (
              <motion.label
                key={option}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="flex items-center gap-2 text-white cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                {/* Hidden original checkbox for functionality */}
                <input
                  type="checkbox"
                  checked={formData.testingTypes.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="sr-only"
                />

                {/* Animated checkbox container */}
                <motion.div
                  className={`relative h-4 w-4 rounded border flex items-center justify-center ${formData.testingTypes.includes(option)
                      ? "bg-red-600 border-red-600"
                      : "bg-neutral-800 border-gray-500"
                    }`}
                  animate={{
                    scale: formData.testingTypes.includes(option) ? 1.1 : 1,
                    // ... other properties
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  {/* Animated checkmark */}
                  {formData.testingTypes.includes(option) && (
                    <motion.svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </motion.div>

                {option}
              </motion.label>
            ))}
          </div>
        </motion.fieldset>

        {/* Status messages with scale animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: status !== "idle" ? 1 : 0,
            scale: status !== "idle" ? 1 : 0.9
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="h-8 mb-4"
        >
          {status === "loading" && (
            <p className="text-yellow-500">Submitting...</p>
          )}
          {status === "success" && (
            <p className="text-green-500 font-semibold">
              ✓ Request submitted successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500">{errorMessage}</p>
          )}
        </motion.div>

        {/* Submit button with pulse animation on success */}
        <motion.button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`px-5 py-2 rounded-md cursor-pointer font-bold bg-red-600 hover:bg-red-500 transition w-fit ${status !== "idle" ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {status === "loading"
            ? "Submitting..."
            : status === "success"
              ? "Successful!"
              : "Submit"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RightSolutionHeader;