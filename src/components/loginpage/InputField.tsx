import React, { ReactNode } from "react";

interface inputProprs {
  id: string;
  placeholder: string;
  type: string;
  children?: ReactNode;
}

const InputField: React.FC<inputProprs> = ({
  id,
  placeholder,
  type,
  children,
}) => {
  return (
    <label htmlFor={id} className="max-lg:flex max-lg:flex-col max-lg:w-2/4 ">
      {children ? (
        <div className="flex justify-between w-full mb-2">
          <p>{placeholder}</p>
          <p className="text-xs flex items-center text-slate-400 hover:text-black cursor-pointer  ">
            {children}
          </p>
        </div>
      ) : (
        <p>{placeholder}</p>
      )}
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        className="mb-6 outline-none bg-sky-100 h-8 w-full text-xs"
      />
    </label>
  );
};

export default InputField;
