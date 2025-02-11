"use client";
import { Toast } from "flowbite-react";
import React from "react";
import { createPortal } from "react-dom";

export interface ErrorToastProps {
  message: string;
}

const ErrorToast = ({ message }: ErrorToastProps) => {
  return (
    <>
      {createPortal(
        <Toast
          className={`bg-red-100 border-2 border-red-600 rounded-lg p-3 z-50 fixed left-1/2 -translate-x-1/2 bottom-20 ${"flex"}`}
        >
          <p className="text-red-600 text-sm">{message}</p>
        </Toast>,
        document.body
      )}
    </>
  );
};

export default ErrorToast;
