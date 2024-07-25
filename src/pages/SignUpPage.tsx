import React, { FormEvent } from "react";
import Card from "../components/loginpage/Card";
import Header from "../components/loginpage/Header";
import InputField from "../components/loginpage/InputField";
import { loginPageCharatorImg } from "../assets/images";
import Form from "../components/loginpage/Form";
import Radio from "../components/loginpage/Radio";
import Button from "../components/loginpage/Button";

const SignUpPage: React.FC = () => {
  const index = () => {};
  const value = "";
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("클릭");
  };
  const handleSignUpForm = () => {};
  const handleSignUpCheckForm = () => {};
  const handleGenderSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("zz", e.target.value);
  };
  return (
    <Card>
      <section className="w-4/6  h-full flex flex-col p-6 max-lg:w-full">
        <Header logo="Sign Up page" text="Welcome Sign Up" />
        <Form handleSubmit={handleSubmit}>
          <InputField
            id="user_id"
            placeholder="ID"
            type="text"
            onChange={() => handleSignUpForm()}
            value={""}
          />
          <InputField
            id="auth_email"
            placeholder="Email"
            type="email"
            onChange={() => handleSignUpForm()}
            value={""}
          />
          <InputField
            id="auth_password"
            placeholder="Password"
            type="password"
            onChange={() => handleSignUpForm()}
            value={""}
          />
          <InputField
            id="auth_Confirm Password"
            placeholder="Confirm Password"
            type="password"
            onChange={() => handleSignUpCheckForm()}
            value={""}
          />
          <section className="w-full">
            <span>성별</span>
            <div className=" flex justify-center items-center ">
              <Radio
                id="gender_male"
                value="value"
                name="gender"
                type="radio"
                className="peer hidden"
                handleGenderSelect={handleGenderSelect}
                title="남성"
                radioStyle="w-1/2"
              />
              <Radio
                id="gender_female"
                value="value"
                name="gender"
                type="radio"
                className="peer hidden"
                handleGenderSelect={handleGenderSelect}
                title="여성"
                radioStyle="w-1/2"
              />
            </div>
          </section>
          <section className="w-full flex justify-center">
            <Button customStyle="bg-pink-400 mt-4" type="submit">
              회원가입
            </Button>
          </section>
        </Form>
      </section>
      <section className="w-2/6 max-lg:w-full max-lg:h-96 rounded-l-3xl bg-sky-100 flex items-center relative max-lg:hidden  rounded-lg ">
        <img
          src={loginPageCharatorImg}
          alt="이미지"
          className=" absolute h-full w-full object-cover right-44 mix-blend-darken"
        />
      </section>
    </Card>
  );
};

export default SignUpPage;
