import React from 'react'
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  subtitleClassName?: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = "" , subtitleClassName=""}) => {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="heading tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader