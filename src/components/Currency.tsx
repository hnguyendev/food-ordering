import { FC } from "react";
import { formatCurrency } from "@/lib/utils";

interface CurrencyProps {
  unitPrice: number;
}

const Currency: FC<CurrencyProps> = ({ unitPrice }) => {
  return (
    <div className="font-semibold">
      {formatCurrency.format(Number(unitPrice))}
    </div>
  );
};

export default Currency;
