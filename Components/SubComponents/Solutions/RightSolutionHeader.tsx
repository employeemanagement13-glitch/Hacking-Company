"use client";
import React, { useState } from "react";

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
    setFormData((prev) => ({
      ...prev,
      testingTypes: prev.testingTypes.includes(label)
        ? prev.testingTypes.filter((t) => t !== label)
        : [...prev.testingTypes, label],
    }));
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
    <div className="bg-[#101010] w-full lg:w-1/2 p-8 sm:p-10 rounded-lg shadow-xl">
      <h2 className="text-[28px] font-bold text-white mb-3">
        {formHeading}
      </h2>

      <p className="text-neutral-400 text-sm mb-8">{formParagraph}</p>

      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        {(["fullName", "companyName", "email", "telNo"] as const).map(
          (field) => (
            <input
              key={field}
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
          )
        )}

        {/* Checkbox Options */}
        <fieldset className="mb-6">
          <legend className="text-white text-base font-medium mb-3">
            {checkboxtitle}
          </legend>

          <div className="grid grid-cols-2 gap-3">
            {checkboxOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-white"
              >
                <input
                  type="checkbox"
                  checked={formData.testingTypes.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="h-4 w-4 text-red-600 bg-neutral-800 border-gray-500 rounded"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* STATUS MESSAGES */}
        {status === "loading" && (
          <p className="text-yellow-500 mb-4">Submitting...</p>
        )}
        {status === "success" && (
          <p className="text-green-500 mb-4 font-semibold">
            ✓ Request submitted successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`px-5 py-2 rounded-md font-bold bg-red-600 hover:bg-red-500 transition w-fit ${
            status !== "idle" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading"
            ? "Submitting..."
            : status === "success"
            ? "Successful!"
            : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RightSolutionHeader;
