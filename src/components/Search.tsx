import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "./ui/button";
// import useSearchProducts from "@/hooks/products/useSearchProducts";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;
    navigate(`/search?query=${value}`);
  };

  const onClear = () => {
    setValue("");
  };

  useEffect(() => {
    if (location.pathname === "/search") return;
    setValue("");
  }, [location.pathname]);

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          onClick={onClear}
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground hover:opacity-75 transition cursor-pointer"
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none h-10"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
