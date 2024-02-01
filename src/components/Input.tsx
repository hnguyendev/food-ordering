import React, { FC } from "react";
import { FieldError } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  error?: FieldError | undefined;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  id,
  type,
  onChange,
  value,
  label,
  error,
  disabled,
}) => {
  return (
    <div className="relative">
      <input
        className="block w-full px-6 bg-neutral-300 pb-1 pt-6 rounded-md focus:outline-none focus:ring-0 peer"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute top-3 left-6 z-[10] origin-[0] transition duration-150 scale-75 -translate-y-3 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
      >
        {label}
        {error && <span>{error.message}</span>}
      </label>
    </div>
  );
};

export default Input;
