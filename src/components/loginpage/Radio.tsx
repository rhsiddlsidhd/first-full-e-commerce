import React from "react";
interface RadioProps {
  type: string;
  name: string;
  id: string;
  value: string;
  className: string;
  title: string;
  radioStyle: string;
  handleGenderSelect: React.ChangeEventHandler<HTMLInputElement>;
}

const Radio: React.FC<RadioProps> = ({
  handleGenderSelect,
  id,
  value,
  name,
  type,
  className,
  title,
  radioStyle,
}) => {
  return (
    <div
      className={`${radioStyle} bg-white-100 flex justify-center items-center `}
    >
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className={className}
        onChange={handleGenderSelect}
      />
      <label
        htmlFor={id}
        className="w-full p-2 cursor-pointer border-2 border-gray-300 bg-gray-200 peer-checked:border-blue-400 peer-checked:bg-sky-100 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-sky-50"
      >
        <span className="flex justify-center  items-center">{title}</span>
      </label>
    </div>
  );
};

export default Radio;
