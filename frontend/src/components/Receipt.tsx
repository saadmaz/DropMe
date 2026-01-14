import { motion } from "framer-motion";
import { Receipt as ReceiptIcon } from "lucide-react";

interface ReceiptData {
  timestamp: string;
  from: string;
  to: string;
  mode: string;
  grossAmount: number;
  promoDiscount: number;
  randomReduction: number;
  totalFinal: number;
}

interface ReceiptProps {
  data: ReceiptData | null;
}

export function Receipt({ data }: ReceiptProps) {
  if (!data) {
    return (
      <div className="receipt-paper flex flex-col items-center justify-center h-80 text-muted-foreground">
        <ReceiptIcon className="h-16 w-16 mb-4 opacity-30" />
        <p className="text-sm">No receipt generated yet</p>
        <p className="text-xs mt-1">Configure a trip and click "Generate Receipt"</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="receipt-paper"
    >
      {/* Header */}
      <div className="text-center border-b border-dashed border-border/50 pb-4 mb-4">
        <h3 className="text-xl font-bold text-primary tracking-wider">DROPME</h3>
        <p className="text-xs text-muted-foreground mt-1">Kingdom of Miranda Cab Services</p>
        <p className="text-xs text-muted-foreground">Official Receipt</p>
      </div>

      {/* Timestamp */}
      <div className="text-center mb-4">
        <p className="font-mono text-sm text-foreground">{data.timestamp}</p>
      </div>

      {/* Trip Details */}
      <div className="space-y-2 text-sm border-b border-dashed border-border/50 pb-4 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">From:</span>
          <span className="font-medium capitalize">{data.from}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">To:</span>
          <span className="font-medium capitalize">{data.to}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Mode:</span>
          <span className="font-medium capitalize">{data.mode}</span>
        </div>
      </div>

      {/* Billing */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gross Amount:</span>
          <span className="font-mono">{data.grossAmount.toFixed(2)} KMD</span>
        </div>
        <div className="flex justify-between text-green-500">
          <span>Promo Discount:</span>
          <span className="font-mono">-{data.promoDiscount.toFixed(2)} KMD</span>
        </div>
        <div className="flex justify-between text-blue-400">
          <span>Random Reduction:</span>
          <span className="font-mono">-{data.randomReduction.toFixed(2)} KMD</span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t-2 border-primary">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">TOTAL:</span>
          <span className="text-2xl font-bold text-primary font-mono">
            {data.totalFinal.toFixed(2)} KMD
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-dashed border-border/50 text-center">
        <p className="text-xs text-muted-foreground">Thank you for choosing DROPME</p>
        <p className="text-xs text-muted-foreground mt-1">Safe travels in the Kingdom!</p>
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-4 bg-primary/30 rounded-full" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export type { ReceiptData };
