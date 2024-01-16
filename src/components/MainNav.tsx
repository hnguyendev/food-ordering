import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";

const NavBar = [
  { to: "/dashboard", icon: HiOutlineHome, title: "Home" },
  { to: "/bookings", icon: HiOutlineCalendarDays, title: "Bookings" },
  { to: "/cabins", icon: HiOutlineHomeModern, title: "Cabins" },
  { to: "/users", icon: HiOutlineUsers, title: "Users" },
  { to: "/settings", icon: HiOutlineCog6Tooth, title: "Settings" },
];

const MainNav = () => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {NavBar.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.to}
              className={cn(
                `group px-4 py-2 flex items-center gap-4 rounded-md hover:bg-neutral-100`,
                collapsed && "justify-center"
              )}
            >
              <item.icon className="group-hover:text-purple-700" size={25} />
              <span
                className={cn(
                  `font-medium group-hover:text-purple-700`,
                  collapsed && "hidden"
                )}
              >
                {item.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
