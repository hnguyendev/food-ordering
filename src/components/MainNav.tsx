import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Pizza, CupSoda } from "lucide-react";
import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";
import useUser from "@/hooks/auth/useUser";

const MainNav = () => {
  const { collapsed } = useSidebar((state) => state);
  const { isAuthenticated } = useUser();
  const location = useLocation();

  const NavBar = [
    { to: "/dashboard", icon: HiOutlineHome, title: "Home" },
    { to: "/food", icon: Pizza, title: "Food" },
    { to: "/drink", icon: CupSoda, title: "Drink" },
    {
      to: "/bookings",
      icon: HiOutlineCalendarDays,
      title: "Orders",
      isAuthenticated,
    },
    // { to: "/cabins", icon: HiOutlineHomeModern, title: "Cabins" },
    {
      to: "/users",
      icon: HiOutlineUsers,
      title: "Users",
      isAuthenticated,
    },
    // { to: "/settings", icon: HiOutlineCog6Tooth, title: "Settings" },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {NavBar.map((item) => {
          const isActive = location.pathname === item.to;

          if (item.isAuthenticated === false) return null;

          return (
            <li key={item.title}>
              <NavLink
                to={item.to}
                className={cn(
                  `group px-4 py-2 flex items-center gap-4 rounded-md hover:bg-neutral-100`,
                  collapsed && "justify-center",
                  isActive && "bg-neutral-100"
                )}
              >
                <item.icon
                  className={cn(
                    "group-hover:text-purple-700",
                    isActive && "text-purple-700"
                  )}
                  size={25}
                />
                <span
                  className={cn(
                    `font-medium group-hover:text-purple-700`,
                    collapsed && "hidden",
                    isActive && "text-purple-700"
                  )}
                >
                  {item.title}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainNav;
