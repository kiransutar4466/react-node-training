import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import "./Modal.css";
export const Modal = ({ children, isOpen, handleClose }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close modal on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Click outside to close
  const handleBackdropClick = (event) => {
    if (event.target.id === "modal-backdrop") {
      handleClose();
    }
  };

  if (!isOpen) return null; // Don't render when closed

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 text-left bg-black/50  flex justify-center items-center z-[999] transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className=" bg-white py-2  w-fit modal-container max-h-[90vh] rounded-lg shadow-lg overflow-y-auto   ">
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-900 text-lg mr-4 cursor-pointer"
            onClick={() => handleClose()}
          >
            <IoIosCloseCircle size={28} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};
