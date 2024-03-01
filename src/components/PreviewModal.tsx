import { cn } from "@/lib/utils";
import { FC, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import usePreviewModal from "@/store/usePreviewModal";
import ProductInfo from "./ProductInfo";
import { Item } from "types";

interface PreviewModalProps {
  visible?: boolean;
  onClose: () => void;
}

const PreviewModal: FC<PreviewModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { data } = usePreviewModal();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 transition duration-300 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto rounded-md relative overflow-hidden">
        <div
          className={cn(
            `transform duration-200 relative flex-auto bg-background drop-shadow-lg shadow-lg scale-0`,
            isVisible && "scale-100"
          )}
        >
          <div className="relative h-auto px-4 p-5">
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
              <div className="sm:col-span-4 lg:col-span-5">
                <img src={data?.imageUrl} alt={data?.name} className="h-72" />
              </div>
              <div className="sm:col-span-8 lg:col-span-7">
                <ProductInfo data={data as Item} onClose={handleClose} />
              </div>
            </div>
            <button
              onClick={handleClose}
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

export default PreviewModal;
