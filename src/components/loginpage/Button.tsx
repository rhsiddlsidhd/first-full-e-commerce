import React, { ReactNode } from "react";
interface buttonProps {
  customStyle?: string;
  children: ReactNode;
  type: "submit" | "reset" | "button";
}

const Button: React.FC<buttonProps> = ({ customStyle, type, children }) => {
  return (
    <button
      className={`${customStyle} mb-4 py-1 w-40 h-10   text-white border-2 hover:border-sky-500 rounded-2xl`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
