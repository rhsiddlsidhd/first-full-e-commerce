import React from "react";

interface headerProps {
  logo: string;
  text: string;
}

const Header: React.FC<headerProps> = ({ logo, text }) => {
  return (
    <header className="mb-6 ">
      <div className="text-3xl font-bold max-lg:flex max-lg:justify-center">
        {logo}
      </div>
      <div className="max-lg:flex max-lg:justify-center">{text}</div>
    </header>
  );
};

export default Header;
