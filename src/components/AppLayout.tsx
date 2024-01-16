import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "../store/useSidebar";
import { cn } from "@/lib/utils";
import Container from "./Container";

const AppLayout = () => {
  const { collapsed } = useSidebar();

  return (
    <>
      <Header />
      <div className="pt-20">
        <Sidebar />
        <Container>
          <main className={cn("h-full ml-60", collapsed && "ml-20")}>
            <div className="flex flex-col mx-auto max-w-6xl">
              <Outlet />
            </div>
          </main>
        </Container>
      </div>
    </>
  );
};

export default AppLayout;
