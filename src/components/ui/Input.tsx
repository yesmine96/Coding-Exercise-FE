import React from "react";
import type { InputHTMLAttributes } from "react";
import { mergeClasses } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  type?: string;
  isDisabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  type = "text",
  isDisabled = false,
  className,

  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={mergeClasses(
          "block min-w-36 h-10 px-1 py-4 text-sm font-bold text-black bg-white border focus:border-blue-500",
          isDisabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white",

          className
        )}
        type={type}
        disabled={isDisabled}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
