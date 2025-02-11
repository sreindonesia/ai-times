"use client";
import { Toast } from "flowbite-react";
import React from "react";
import { createPortal } from "react-dom";

const SuccessToast = ({ message }: { message?: string }) => {
  return (
    <>
      {createPortal(
        <Toast
          className={`bg-green-100 border-2 border-green-700 rounded-lg p-3 z-50 fixed left-3 bottom-20 ${"flex"}`}
        >
          <p className="text-green-700 text-sm">{message}</p>
        </Toast>,
        document.body
      )}
    </>
  );
};

export default SuccessToast;
