import React, { FC } from "react";

interface SelectProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      className="text-sm font-medium p-3 rounded-md w-20 lg:w-full"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
