import React from "react";
import { googleIcon, loginPageCharatorImg } from "../assets/images";
import InputField from "../components/loginpage/InputField";
import Button from "../components/loginpage/Button";
import Card from "../components/loginpage/Card";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center  bg-gradient-to-r from-sky-300 to-pink-500 items-center   ">
      <Card />
    </div>
  );
};

export default LoginPage;
