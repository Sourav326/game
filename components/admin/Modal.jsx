'use client'

import { useEffect } from "react";

const Modal = ({ children, isOpen, handleClose }) => {

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
          document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
      }, [handleClose]);


    if (!isOpen) return null;
    return (
      <div className="modal">
        <div className="bg-white text-black rounded-lg py-6 px-8 relative w-6/12 h-3/4 max-h-full">
            <h1 className="text-2xl mb-4 text-center">User Details</h1>
            <div className="h-auto max-h-[80%] overflow-y-scroll">
                <button onClick={handleClose} className="text-red-500 close-btn absolute top-0 right-3 top-2 text-sm">
                    Close x
                </button>
                <div className="">{children}</div>
            </div>
        </div>
      </div>
    );
  }
  export default Modal;