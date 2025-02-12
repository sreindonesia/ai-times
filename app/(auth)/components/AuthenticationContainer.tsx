import React from "react";

interface AuthenticationContainerProps {
  children?: React.ReactNode;
}
const AuthenticationContainer = ({ children }: AuthenticationContainerProps) => {
  return (
    <div className="bg-white w-[400px] py-[50px] px-[30px] gap-[50px] flex flex-col rounded-lg shadow-md relative z-10">
      <p className="text-zinc-200 font-bold text-[84px] leading-[88px] tracking-normal">AITimes</p>
      {children}
    </div>
  );
};

export default AuthenticationContainer;
