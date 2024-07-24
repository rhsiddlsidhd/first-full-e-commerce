import React, { ReactNode } from "react";
interface buttonProps {
  customStyle?: string;
  children: ReactNode;
  type: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<buttonProps> = ({
  customStyle,
  type,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${customStyle} mb-4 py-1 w-40 h-10   text-white border-2 hover:border-sky-500 rounded-2xl valid:`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
