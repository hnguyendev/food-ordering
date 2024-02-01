import MainNav from "./MainNav";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import Toggle from "./Toggle";

const Sidebar = () => {
  const { collapsed } = useSidebar();
  return (
    <aside
      className={cn(
        "fixed left-0 z-[49] w-60 h-full bg-background shadow-md overflow-auto transition-all",
        collapsed && "w-20"
      )}
    >
      <Toggle />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
