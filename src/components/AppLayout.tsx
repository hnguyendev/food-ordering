import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "../store/useSidebar";
import { cn } from "@/lib/utils";
import Container from "./Container";
import useModal from "@/hooks/modal/useModal";
import UpdateModal from "./UpdateModal";
import usePreviewModal from "@/store/usePreviewModal";
import PreviewModal from "./PreviewModal";

const AppLayout = () => {
  const { collapsed } = useSidebar((state) => state);
  const { isOpen, closeModal } = useModal();
  const { isOpen: isisOpenPreview, onClose } = usePreviewModal();

  return (
    <>
      <Header />
      <div className="pt-20 flex h-full">
        <UpdateModal visible={isOpen} onClose={closeModal} />
        <PreviewModal visible={isisOpenPreview} onClose={onClose} />
        <Sidebar />
        <Container>
          <main
            className={cn(
              "h-full ml-60 py-2 px-2 lg:px-4",
              collapsed && "ml-20"
            )}
          >
            <Outlet />
          </main>
        </Container>
      </div>
    </>
  );
};

export default AppLayout;
