import { motion } from "framer-motion";
import { useMemo } from "react";

interface TaxBreakdownProps {
  subtotal: number;
  vatTotal: number;
  irpfTotal: number;
  total: number;
}

export default function TaxBreakdownChart({ subtotal, vatTotal, irpfTotal, total }: TaxBreakdownProps) {
  const steps = useMemo(() => {
    return [
      { label: "Base Amount", amount: subtotal, color: "bg-blue-500" },
      { label: "+ VAT", amount: vatTotal, color: "bg-green-500" },
      { label: "- IRPF", amount: irpfTotal, color: "bg-red-500" },
      { label: "Total", amount: total, color: "bg-primary" },
    ];
  }, [subtotal, vatTotal, irpfTotal, total]);

  const maxAmount = Math.max(subtotal + vatTotal, total) * 1.1; // Add 10% padding

  return (
    <div className="w-full space-y-2">
      <div className="text-sm font-medium mb-4">Tax Breakdown</div>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.label} className="relative">
            <div className="flex justify-between text-sm mb-1">
              <span>{step.label}</span>
              <span>€{step.amount.toFixed(2)}</span>
            </div>
            <motion.div
              className={`h-4 rounded ${step.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${(step.amount / maxAmount) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
