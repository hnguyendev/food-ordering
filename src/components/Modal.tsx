import { cn } from "@/lib/utils";
import { FC, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ModalProps {
  visible?: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

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
          <div className="relative h-80 px-4 p-5">
            <div className="space-y-8">
              <p className="text-sm lg:text-lg text-center">
                Are you sure you want to update this info ?
              </p>
              <div className="flex items-center justify-center gap-4">
                <h6 className="uppercase text-xs font-medium text-neutral-300">
                  City name
                </h6>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {/* <span className="text-3xl">{city?.emoji}</span>{" "} */}
                  {/* {city?.cityName} */}
                </h3>
              </div>
              <div className="flex items-center justify-center gap-4">
                <h6 className="uppercase text-xs font-medium text-neutral-300">
                  {/* You went to {city?.cityName} on */}
                </h6>
                {/* <p>{formatDate(city?.date || null)}</p> */}
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black h-3 w-3 lg:h-6 lg:w-6 rounded-full flex items-center justify-center"
            >
              <X size={15} color="white" />
            </button>
          </div>
          <div className="absolute bottom-0 bg-secondary px-4 p-3 w-full flex items-center justify-end gap-x-4">
            <Button onClick={handleClose} variant="link">
              CANCLE
            </Button>
            <Button variant="primary">Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
