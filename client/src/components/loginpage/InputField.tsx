import React from "react";

interface InputProprs {
  id: string;
  placeholder: string;
  type: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputField: React.FC<InputProprs> = ({
  id,
  placeholder,
  type,
  error,
  onChange,
  value,
}) => {
  return (
    <label htmlFor={id} className="max-lg:flex max-lg:flex-col max-lg:w-3/4 ">
      <div className="flex justify-between w-full mb-2">
        <p>{placeholder}</p>
        {error && (
          <p className="text-red-600 text-error flex justify-end items-center w-3/5 break-words text-wrap">
            {error}
          </p>
        )}
      </div>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        className={`mb-6 outline-none bg-sky-100 h-8 w-full text-xs focus:ring`}
      />
    </label>
  );
};

export default InputField;
