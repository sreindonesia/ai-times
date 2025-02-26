import React from "react";
import { Button } from "flowbite-react";

const SIZES = {
  md: "py-2.5 px-5 text-base",
  sm: "py-2 px-3 text-sm font-medium",
  lg: "py-3 px-4 text-base font-medium"
};

const COLORS = {
  light:
    "border border-text-primary bg-white text-text-primary hover:bg-gray-100",
  blue: "bg-button-primary text-white hover:bg-blue-900",
  primary: "bg-primary text-white hover:opacity:90",
  "invert-primary": "bg-white text-primary border border-primary",
};

interface AiTimesButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof SIZES;
  color: keyof typeof COLORS;
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const AiTimesButton = ({
  size,
  color,
  disabled,
  isLoading,
  children,
  className,
  ...props
}: AiTimesButtonProps) => {
  return (
    <Button
      disabled={disabled || isLoading}
      className={className}
      theme={{
        base: "group relative flex items-stretch  justify-center text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none disabled:bg-gray-400 disabled:text-gray-800 enabled:hover:opacity-90",
        inner: {
          base: "",
        },
        color: {
          [color]: COLORS[color],
        },
        size: {
          [size]: SIZES[size],
        },
      }}
      color={color}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AiTimesButton;
