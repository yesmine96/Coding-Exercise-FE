import React, { useRef } from "react";
import { mergeClasses } from "../../utils/cn";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  classname?: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ open, onClose, title, classname, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  if (!open) return null;

  // Close if clicked outside the modal content
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] w-full"
      ref={modalRef}
      onClick={handleClose}
    >
      <div
        className={mergeClasses(
          "bg-white rounded-xl p-6 shadow-lg lg:w-1/3 min-h-3/5 h-96 lg:h-1/2 relative",
          classname
        )}
      >
        {title && <h2 className="text-xl font-semibold pb-4 pt-2 text-center">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 font-bold cursor-pointer"
        >
          X{" "}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
