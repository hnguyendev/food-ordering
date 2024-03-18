import { cn } from "@/lib/utils";
import { FC, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import useModal from "@/hooks/modal/useModal";
import { startCase } from "lodash";
import UpdateFullnameForm from "./UpdateFullnameForm";
import UpdatePhoneForm from "./UpdatePhoneForm";
import UpdateAddressForm from "./UpdateAddressForm";

interface UpdateModalProps {
  visible?: boolean;
  onClose: () => void;
}

const UpdateModal: FC<UpdateModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { id } = useModal();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 transition duration-300 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto rounded-md relative overflow-hidden">
        <div
          className={cn(
            `transform duration-300 relative flex-auto bg-background drop-shadow-lg shadow-lg scale-0`,
            isVisible && "scale-100"
          )}
        >
          <div className="relative h-96 px-4 p-5">
            <div className="space-y-8">
              <p className="text-sm lg:text-lg text-center">
                Are you sure you want to update your {startCase(id)} ?
              </p>
            </div>
            {id === "fullName" && (
              <UpdateFullnameForm handleClose={handleClose} />
            )}
            {id === "phone" && <UpdatePhoneForm handleClose={handleClose} />}
            {id === "address" && (
              <UpdateAddressForm handleClose={handleClose} />
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black h-3 w-3 lg:h-6 lg:w-6 rounded-full flex items-center justify-center"
            >
              <X size={15} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
