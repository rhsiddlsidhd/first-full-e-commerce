import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import { googleIcon, loginPageCharatorImg } from "../../assets/images";
import Header from "./Header";

const Card: React.FC = () => {
  return (
    <main className="w-tablet h-fit rounded-lg flex justify-between bg-white shadow-2xl max-lg:w-mobile  ">
      <section className="w-4/6  h-full flex flex-col p-6 max-lg:w-full max-lg:">
        <Header logo="LoGo Here" text="Welcome home" />
        <form className="flex flex-col justify-between max-lg:items-center w-3/4 max-lg:w-full">
          <InputField id="user_id" placeholder="Email" type="email" />
          <InputField id="user_password" placeholder="Password" type="password">
            For got password?
          </InputField>
          <div className="w-full flex justify-center">
            <Button customStyle="bg-pink-400" type="submit">
              "Login →
            </Button>
          </div>
        </form>
        <section className="w-3/4 flex flex-col items-center max-lg:w-full max-lg:justify-center">
          <p className="text-slate-400 text-xs mb-4">or continue with</p>
          <Button customStyle="flex items-center justify-center" type="button">
            <img
              alt="구글아이콘"
              src={googleIcon}
              className="w-10 h-6 object-cover"
            />
          </Button>
          <div className="flex justify-between items-center w-full">
            <p className="text-slate-400 text-xs">
              Don't have an account yet ?
            </p>
            <button className="text-slate-400 hover:text-black cursor-pointer  ">
              Sign Up for free
            </button>
          </div>
        </section>
      </section>
      <section className="w-2/6 max-lg:w-full max-lg:h-96 rounded-l-3xl bg-sky-100 flex items-center relative max-lg:hidden  ">
        <img
          src={loginPageCharatorImg}
          alt="이미지"
          className=" absolute h-full w-full object-cover right-44 mix-blend-darken"
        />
      </section>
    </main>
  );
};

export default Card;
