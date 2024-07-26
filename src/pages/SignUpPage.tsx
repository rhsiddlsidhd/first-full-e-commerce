import React, { FormEvent, useEffect, useRef, useState } from "react";
import Card from "../components/loginpage/Card";
import Header from "../components/loginpage/Header";
import InputField from "../components/loginpage/InputField";
import { loginPageCharatorImg } from "../assets/images";
import Form from "../components/loginpage/Form";
import Radio from "../components/loginpage/Radio";
import Button from "../components/loginpage/Button";
import { emailRegex, passwordRegex, userIdRegex } from "../utils/regex";

const SignUpPage: React.FC = () => {
  const genderRef = useRef<HTMLDivElement>(null);

  const [signUpFormData, setSignUpFormData] = useState({
    userid: "",
    email: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const [error, setError] = useState({
    userid: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**
     * signUpFormData 가지고 유효성검사 진행 후 회원가입 API 호출
     */

    let valid = true;

    if (!userIdRegex(signUpFormData.userid)) {
      setError({
        ...error,
        userid: "영문자로 시작하는 영문자 또는 숫자 6~20자 입력해주세요",
      });
      valid = false;
    }

    if (valid && !emailRegex(signUpFormData.email)) {
      setError({ ...error, email: "이메일형식에 맞춰 입력해주세요." });
      valid = false;
    }

    if (valid && !passwordRegex(signUpFormData.password)) {
      setError({
        ...error,
        password:
          "8~16자 영문, 숫자, 특수문자를 최소 한가지씩 조합을 입력해주세요.",
      });
      valid = false;
    }

    if (
      (valid && signUpFormData.password !== signUpFormData.confirmpassword) ||
      (valid && !signUpFormData.confirmpassword)
    ) {
      setError({
        ...error,
        confirmpassword: "비밀번호가 일치하지 않습니다.",
      });
      valid = false;
    }

    if (valid && !signUpFormData.gender) {
      if (genderRef.current) {
        genderRef.current.className =
          "flex justify-center items-center border-2 border-red-500";
      }
      valid = false; // 에러처리해줘야함
    }

    if (valid) {
      // 회원가입 API 호출
      console.log("회원가입 API 호출");
    } else {
      console.log("error");
    }
  };

  const handleSignUpForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = e.target;

    if (name === "gender") {
      genderRef.current &&
        (genderRef.current.className = "flex justify-center items-center");

      setSignUpFormData({ ...signUpFormData, [name]: value });
    } else {
      setError((prevError) => ({ ...prevError, [id]: "" }));
      setSignUpFormData({ ...signUpFormData, [id]: value });
    }
  };

  return (
    <Card>
      <section className="w-4/6 h-full flex flex-col p-6 max-lg:w-full">
        <Header logo="Sign Up page" text="Welcome Sign Up" />
        <Form handleSubmit={handleSubmit}>
          <InputField
            id="userid"
            placeholder="ID"
            type="text"
            onChange={(e) => handleSignUpForm(e)}
            value={signUpFormData.userid}
            error={error.userid}
          />
          <InputField
            id="email"
            placeholder="Email"
            type="email"
            onChange={(e) => handleSignUpForm(e)}
            value={signUpFormData.email}
            error={error.email}
          />
          <InputField
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => handleSignUpForm(e)}
            value={signUpFormData.password}
            error={error.password}
          />
          <InputField
            id="confirmpassword"
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => handleSignUpForm(e)}
            value={signUpFormData.confirmpassword}
            error={error.confirmpassword}
          />
          <section className="w-full max-lg:w-3/4">
            <span>성별</span>
            <div className="flex justify-center items-center" ref={genderRef}>
              <Radio
                id="gender_male"
                value="male"
                name="gender"
                type="radio"
                className="peer hidden"
                handleGenderSelect={handleSignUpForm}
                title="남성"
                radioStyle="w-1/2"
              />
              <Radio
                id="gender_female"
                value="female"
                name="gender"
                type="radio"
                className="peer hidden"
                handleGenderSelect={handleSignUpForm}
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
      <section className="w-2/6 max-lg:w-full max-lg:h-96 rounded-l-3xl bg-sky-100 flex items-center relative max-lg:hidden rounded-lg ">
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
