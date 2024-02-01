import React, { FC } from "react";
import { Button } from "./ui/button";
import { Edit3 } from "lucide-react";
import useModal from "@/hooks/modal/useModal";

interface FormInputProps {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({ id, value, label, disabled }) => {
  const { openModal } = useModal();
  return (
    <div className="p-2 flex justify-between items-center border-b">
      <div className="flex flex-auto overflow-hidden mr-16">
        <div>
          <label className="font-medium text-xs md:text-lg">{label}</label>
          <span className="block">{value}</span>
        </div>
      </div>
      <Button
        size="quantity"
        type="button"
        disabled={disabled}
        onClick={() => openModal(id)}
      >
        <Edit3 />
      </Button>
    </div>
  );
};

export default FormInput;
