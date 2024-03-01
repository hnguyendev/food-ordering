import { Item } from "types";
import { create } from "zustand";

interface PreviewModal {
  isOpen: boolean;
  data?: Item;
  onOpen: (data: Item) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModal>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Item) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));

export default usePreviewModal;
