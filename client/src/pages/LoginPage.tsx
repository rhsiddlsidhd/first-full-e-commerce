import React, { useState } from "react";
import { googleIcon, loginPageCharatorImg } from "../assets/images";
import InputField from "../components/loginpage/InputField";
import Button from "../components/loginpage/Button";
import Card from "../components/loginpage/Card";
import Header from "../components/loginpage/Header";
import { useNavigate } from "react-router-dom";
import Form from "../components/loginpage/Form";
import { useDispatch } from "react-redux";
import { fetchLoginWithUserIdAndEmail } from "../actions/authAction";
import { AppDispatch } from "../reducer/store";

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**로그인 api 호출
     */
    console.log("클릭");
    const { email, password } = loginForm;
    dispatch(fetchLoginWithUserIdAndEmail({ email, password }));
  };

  const handlePssword = () => {
    navigate("/");
  };
  const handleGoogle = () => {
    navigate("/");
  };
  const handleNavigateToSignUP = () => {
    navigate("/signup");
  };
  const handleSignInForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { type, value } = e.target;
    setLoginForm({ ...loginForm, [type]: value });
  };
  return (
    <Card>
      <section className="w-4/6  h-full flex flex-col p-6 max-lg:w-full">
        <Header logo="LoGo Here" text="Welcome home" />
        <Form handleSubmit={handleSubmit}>
          <InputField
            id="user_id"
            placeholder="Email"
            type="email"
            onChange={(e) => handleSignInForm(e)}
            value={loginForm.email}
          />
          <InputField
            id="user_password"
            placeholder="Password"
            type="password"
            error="패스워드가 틀렸습니다."
            onChange={(e) => handleSignInForm(e)}
            value={loginForm.password}
          />
          <p
            className="mb-4 text-xs flex items-center text-slate-400 hover:text-black cursor-pointer justify-center"
            onClick={handlePssword}
          >
            Forgot password?
          </p>
          <div className="w-full flex justify-center">
            <Button customStyle="bg-pink-400" type="submit">
              Login →
            </Button>
          </div>
        </Form>
        <section className="w-3/4 flex flex-col items-center max-lg:w-full max-lg:justify-center">
          <p className="text-slate-400 text-xs mb-4">or continue with</p>
          <Button
            customStyle="flex items-center justify-center"
            type="button"
            onClick={handleGoogle}
          >
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
            <button
              className="text-slate-400 hover:text-black cursor-pointer"
              onClick={handleNavigateToSignUP}
            >
              Sign Up for free
            </button>
          </div>
        </section>
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

export default LoginPage;
