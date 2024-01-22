import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
  options: {
    value: string;
    label: string;
  }[];
}

const SortBy: FC<SortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const sortBy = searchParams.get("sortBy") || "";

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return <Select options={options} value={sortBy} onChange={handleOnChange} />;
};

export default SortBy;
