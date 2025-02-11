import React from "react";

interface AuthenticationContainerProps {
  children?: React.ReactNode;
  title: string;
}
const AuthenticationContainer = ({ children, title }: AuthenticationContainerProps) => {
  return (
    <div className="bg-white w-[400px] p-8 gap-6 flex flex-col rounded-lg shadow-md relative z-10">
      <p className="font-inter font-medium text-gray-700 text-xl">{title}</p>
      {children}
    </div>
  );
};

export default AuthenticationContainer;
