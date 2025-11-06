// Input.tsx
import React from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  className,
  type = "text",
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-black mb-1">
        {label}
        {required && <span>*</span>}
      </label>
      <input
        className={`block w-full h-3 px-1 py-4 text-sm font-bold text-black bg-white border focus:border-blue-500 ${className}`}
        type={type}
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
