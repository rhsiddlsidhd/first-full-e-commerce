import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = ({ handleSubmit, children }) => {
  return (
    <form
      className="flex flex-col justify-between max-lg:items-center w-3/4 max-lg:w-full"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
