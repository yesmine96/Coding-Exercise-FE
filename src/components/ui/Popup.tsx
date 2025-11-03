import clsx from "clsx";
import React, { useRef } from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  classname?: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  title,
  classname,
  children,
}) => {
  if (!open) return null;
  const modalRef = useRef<HTMLDivElement>(null);

  // Close if clicked outside the modal content
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 w-full"
      ref={modalRef}
      onClick={handleClose}
    >
      <div
        className={clsx(
          "bg-white rounded-xl p-6 shadow-lg lg:w-1/3 min-h-3/5 lg:max-h-1/2 relative",
          classname
        )}
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        )}
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
