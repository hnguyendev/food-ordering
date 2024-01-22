import { useSidebar } from "@/store/useSidebar";
import { Button } from "./ui/button";
import { ArrowRightFromLine, ArrowLeftFromLine } from "lucide-react";
import Hint from "./Hint";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar();
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} className="h-auto p-2" variant="ghost">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="w-full flex items-center justify-center pt-4 mb-4">
          <p className="font-semibold">Welcome</p>
          <Hint label={label} side="right" asChild>
            <Button onClick={onCollapse} className="h-auto p-2" variant="ghost">
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
