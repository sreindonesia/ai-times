import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import AuthenticationContainer from "../components/AuthenticationContainer";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen bg-primary grid place-content-center relative overflow-hidden">
      {/* BACKGROUND TEXT */}
      <p className="absolute -bottom-8 right-0 font-semibold text-[255px] leading-[255px] text-white opacity-10">AITimes</p>
      <AuthenticationContainer>
        <LoginForm />
      </AuthenticationContainer>
    </div>
  );
};

export default LoginPage;
