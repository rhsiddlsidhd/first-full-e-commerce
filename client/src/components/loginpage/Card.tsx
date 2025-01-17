import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex justify-center  bg-gradient-to-r from-sky-300 to-pink-500 items-center   ">
      <main className="w-tablet h-fit flex justify-between bg-white shadow-2xl  rounded-lg max-lg:w-mobile   ">
        {children}
      </main>
    </div>
  );
};

export default Card;
