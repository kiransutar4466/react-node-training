import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "radio"
    | "date"
    | "dynamicSelect";
  options?: string[];
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  options,
  name,
  value,
  onChange,
  ...props
}) => {
  let inputElement;

  // Handle date formatting for YYYY-MM-DD
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const formattedDate = e.target.value;
      onChange({ ...e, target: { ...e.target, value: formattedDate } });
    }
  };

  if (type === "text" || type === "email" || type === "password") {
    inputElement = (
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border-none shadow shadow-gray-400 p-2 rounded-md h-13.5 w-full"
      />
    );
  } else if (type === "date") {
    inputElement = (
      <input
        {...props}
        type="date"
        name={name}
        value={value.split("T")[0]}
        onChange={handleDateChange}
        className="border-none shadow shadow-gray-400 p-2 rounded-md h-13.5 w-full"
      />
    );
  } else if (type === "select" && options) {
    inputElement = (
      <select
        {...props}
        name={name}
        className="border-none shadow shadow-gray-400 p-2 rounded-md w-full h-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (type === "radio" && options) {
    inputElement = (
      <div className="flex gap-4 w-full bg-white shadow-gray-400 py-4  px-6 rounded-lg shadow">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer "
          >
            <input
              {...props}
              className="cursor-pointer"
              type="radio"
              name={name}
              checked={value?.toLowerCase() === option.toLowerCase()}
              value={option}
              onChange={(e) => onChange(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  } else if (type === "dynamicSelect") {
    inputElement = (
      <select
        {...props}
        name={name}
        className="border-none shadow shadow-gray-400 p-2 rounded-md w-full h-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options?.length > 0 ? (
          options.map(({ value, option }) => (
            <option key={option} value={value.toLowerCase()}>
              {option}
            </option>
          ))
        ) : (
          <option value={""} className="py-3" disabled>
            No records Found
          </option>
        )}
      </select>
    );
  } else {
    inputElement = null;
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block font-medium text-[18px] my-2">{label}</label>
      )}
      {inputElement}
    </div>
  );
};

export default Input;
