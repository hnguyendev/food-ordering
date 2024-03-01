import { FC } from "react";
import { cn, formatCurrency } from "@/lib/utils";

interface CurrencyProps {
  unitPrice: number;
  className?: string;
}

const Currency: FC<CurrencyProps> = ({ unitPrice, className }) => {
  return (
    <span className={cn("font-semibold", className)}>
      {formatCurrency.format(Number(unitPrice))}
    </span>
  );
};

export default Currency;
