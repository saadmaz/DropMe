import { useState } from "react";
import { Tag, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromoCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: (code: string) => Promise<boolean>;
  discount: number;
}

export function PromoCodeInput({ value, onChange, onValidate, discount }: PromoCodeInputProps) {
  const [validating, setValidating] = useState(false);
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const handleValidate = async () => {
    if (!value.trim()) return;
    setValidating(true);
    const isValid = await onValidate(value);
    setStatus(isValid ? "valid" : "invalid");
    setValidating(false);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (status !== "idle") setStatus("idle");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Tag className="h-4 w-4 text-primary" />
        Promo Code
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={(e) => handleChange(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className={cn(
              "h-12 bg-card border-border uppercase tracking-wider font-mono",
              status === "valid" && "border-green-500 pr-10",
              status === "invalid" && "border-destructive pr-10"
            )}
          />
          {status === "valid" && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
          {status === "invalid" && (
            <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
          )}
        </div>
        <Button
          onClick={handleValidate}
          disabled={!value.trim() || validating}
          variant="secondary"
          className="h-12 px-6"
        >
          {validating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Validate"
          )}
        </Button>
      </div>
      {status === "valid" && discount > 0 && (
        <p className="text-sm text-green-500 flex items-center gap-1">
          <Check className="h-3 w-3" />
          {discount}% discount applied!
        </p>
      )}
      {status === "invalid" && (
        <p className="text-sm text-destructive">Invalid promo code</p>
      )}
    </div>
  );
}
