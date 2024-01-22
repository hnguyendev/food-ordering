import MainNav from "./MainNav";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import Toggle from "./Toggle";
import Footer from "./Footer";

const Sidebar = () => {
  const { collapsed } = useSidebar();
  return (
    <aside
      className={cn(
        "fixed left-0 z-[49] w-60 h-full bg-background shadow-md",
        collapsed && "w-20"
      )}
    >
      <Toggle />
      <MainNav />

      <div className={cn("mt-[230px]", collapsed && "hidden")}>
        <Footer />
      </div>
    </aside>
  );
};

export default Sidebar;
