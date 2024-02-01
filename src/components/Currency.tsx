import { FC } from "react";
import { cn, formatCurrency } from "@/lib/utils";

interface CurrencyProps {
  unitPrice: number;
  className?: string;
}

const Currency: FC<CurrencyProps> = ({ unitPrice, className }) => {
  return (
    <div className={cn("font-semibold", className)}>
      {formatCurrency.format(Number(unitPrice))}
    </div>
  );
};

export default Currency;
