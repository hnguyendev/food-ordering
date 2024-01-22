import SortBy from "./SortBy";
import SortTest from "./SortTest";

const SortOperations = () => {
  return (
    <div>
      <SortBy
        options={[
          // {
          //   value: "name-asc",
          //   label: "Sort by name (a-z)",
          // },
          // {
          //   value: "name-desc",
          //   label: "Sort by name (z-a)",
          // },
          {
            value: "unitPrice-asc",
            label: "Sort by price (low-high)",
          },
          {
            value: "unitPrice-desc",
            label: "Sort by price (high-low)",
          },
        ]}
      />
      {/* <SortTest
        options={[
          {
            value: "name-asc",
            label: "Sort by name (a-z)",
          },
          {
            value: "name-desc",
            label: "Sort by name (z-a)",
          },
          {
            value: "unitPrice-asc",
            label: "Sort by price (low-high)",
          },
          {
            value: "unitPrice-desc",
            label: "Sort by price (high-low)",
          },
        ]}
      /> */}
    </div>
  );
};

export default SortOperations;
