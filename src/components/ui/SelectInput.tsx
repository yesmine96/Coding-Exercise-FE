import React from "react";

interface SelectInputProps {
  label: string;
  options: string[];
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  required = false,
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
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
