import { useContext, useEffect } from "react";
import { ToastContext } from "./ToastProvider";

export const useToast = () => {
  const { showToast, setShowToast } = useContext(ToastContext);

  useEffect(() => {
    if (showToast) {
      const autoClose = () =>
        setTimeout(() => {
          setShowToast(null);
        }, 2500);
      autoClose();
    }
  }, [showToast, setShowToast]);

  return setShowToast;
};
