"use client";

import React from "react";

export type PrivacyItem =
  | {
      variant: "table";
      title: string;
      subtitle?: string;
      rows: Array<{ left: string; right: string }>;
    }
  | {
      variant: "highlight";
      title: string;
      subtitle?: string;
      content: string;
    }
  | {
      variant: "list";
      title: string;
      subtitle?: string;
      bullets: string[];
    }
  | {
      variant: "paragraph";
      title: string;
      subtitle?: string;
      content: string;
    };

interface PrivacySubItemProps {
  data: PrivacyItem;
}

const PrivacySubItem: React.FC<PrivacySubItemProps> = ({ data }) => {
  return (
    <article className="bg-[#101010] rounded-lg shadow-md p-6 text-white">
      {/* Header */}
      <header className="mb-4">
        <h3 className="text-xl font-semibold text-red-600 mb-1">
          {data.title}
        </h3>
        {data.subtitle && (
          <p className="text-sm text-neutral-300">{data.subtitle}</p>
        )}
      </header>

      {/* Body */}
      <div className="space-y-4">

        {/* TABLE */}
        {data.variant === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-white">
                  <th className="text-left py-3 pr-4 border-b border-neutral-700 font-medium">
                    What we use your personal data for
                  </th>
                  <th className="text-left py-3 pl-4 border-b border-neutral-700 font-medium">
                    Our reasons
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 !== 0 ? "bg-[#101010]" : ""}>
                    <td className="py-4 pr-4 border-b border-neutral-700 align-top text-white">
                      {row.left}
                    </td>
                    <td className="py-4 pl-4 border-b border-neutral-700 align-top text-white">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* HIGHLIGHT BOX */}
        {data.variant === "highlight" && (
          <div className="border border-[#600000] bg-[#600000] rounded-md p-4 text-sm text-white">
            <p dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        )}

        {/* LIST */}
        {data.variant === "list" && (
          <ul className="list-disc list-inside text-sm text-white space-y-2">
            {data.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}

        {/* PARAGRAPH */}
        {data.variant === "paragraph" && (
          <p className="text-sm text-white">{data.content}</p>
        )}
      </div>
    </article>
  );
};

export default PrivacySubItem;
