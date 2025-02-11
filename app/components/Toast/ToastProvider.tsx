"use client"
import React, { createContext, useState } from "react";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";

export const ToastContext = createContext<{
  showToast: Toast | null;
  setShowToast: React.Dispatch<React.SetStateAction<Toast | null>>;
}>({
  showToast: null,
  setShowToast: () => null,
});

interface Toast {
  type: "error" | "success";
  message: string;
}
const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [showToast, setShowToast] = useState<Toast | null>(null);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        setShowToast,
      }}
    >
      {children}
      {showToast?.type === "error" && <ErrorToast message={showToast.message} />}
      {showToast?.type === "success" && <SuccessToast message={showToast.message} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
