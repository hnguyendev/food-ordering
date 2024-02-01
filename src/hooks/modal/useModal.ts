import { create } from "zustand";

interface ModalStore {
  id?: string;
  isOpen: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
}

const useModal = create<ModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  openModal: (id: string) => set({ id, isOpen: true }),
  closeModal: () => set({ id: undefined, isOpen: false }),
}));

export default useModal;
