import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm ${
        hoverEffect ? "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-400/60" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
