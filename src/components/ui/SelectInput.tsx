import React from "react";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  required = false,
  error,
  placeholder,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        required={required}
        className="mt-1 block w-full px-1 py-3 text-sm font-bold text-black bg-white border focus:border-blue-500"
      >
        <option value="" disabled>
          Select {label?.toLowerCase() || placeholder?.toLowerCase()}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default SelectInput;
