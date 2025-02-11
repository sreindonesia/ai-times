import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import AuthenticationContainer from "../components/AuthenticationContainer";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen bg-bg-primary-light grid place-content-center relative">
      <img
        src={"/login-bg.png"}
        width={720}
        height={720}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        alt="Login background"
      />
      <AuthenticationContainer title="Dashboard Monitoring">
        <LoginForm />
        <Link href={"/forgot-password"}>
          <p className="text-bg-primary-light text-sm font-semibold">Lupa password?</p>
        </Link>
      </AuthenticationContainer>
    </div>
  );
};

export default LoginPage;
