import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import React, { FC, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  const { collapsed, onCollapse, onExpand } = useSidebar();
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [onCollapse, onExpand, matches]);

  return (
    <div className={cn("flex-1", collapsed ? "w-20" : "w-20 lg:w-60")}>
      {children}
    </div>
  );
};

export default Container;
