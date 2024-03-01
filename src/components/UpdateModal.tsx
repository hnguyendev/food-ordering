import { cn } from "@/lib/utils";
import { FC, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import useModal from "@/hooks/modal/useModal";
import { Input } from "./ui/input";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import useUser from "@/hooks/auth/useUser";

interface UpdateModalProps {
  visible?: boolean;
  onClose: () => void;
}

const UpdateModal: FC<UpdateModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { id } = useModal();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { mutate, isPending } = useUpdateProfile();
  const { data } = useUser();
  const userId = data?.id as string;

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleUpdate = () => {
    if (!phone && !address) return;
    mutate({ id: userId, phone, address });
    setPhone("");
    setAddress("");
    handleClose();
  };

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
                Are you sure you want to update your {id} ?
              </p>
              <div className="flex flex-col items-center justify-center gap-4">
                <h6 className="uppercase font-medium">Input new {id}</h6>
                {id === "phone" && (
                  <Input
                    className="w-80"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
                {id === "address" && (
                  <Input
                    className="w-80"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                )}
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
            <Button
              onClick={handleUpdate}
              disabled={isPending}
              variant="confirm"
            >
              UPDATE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
