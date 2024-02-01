import Logo from "./Logo";
import Search from "./Search";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="bg-white h-20 px-2 lg:px-4 fixed top-0 z-50 w-full flex items-center justify-between border shadow-sm">
      <Logo />
      <Search />
      <HeaderActions />
    </header>
  );
};

export default Header;
