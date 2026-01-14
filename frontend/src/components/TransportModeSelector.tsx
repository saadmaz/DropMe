import { cn } from "@/lib/utils";

type TransportMode = "trishaw" | "car" | "van";

interface TransportModeSelectorProps {
  value: TransportMode;
  onChange: (mode: TransportMode) => void;
}

const modes = [
  {
    id: "trishaw" as TransportMode,
    label: "Trishaw",
    multiplier: "1×",
    icon: (
      <svg viewBox="0 0 64 64" className="w-8 h-8" fill="currentColor">
        <circle cx="14" cy="48" r="8" strokeWidth="3" stroke="currentColor" fill="none"/>
        <circle cx="50" cy="48" r="8" strokeWidth="3" stroke="currentColor" fill="none"/>
        <path d="M22 48h20M14 40V28c0-4 3-8 8-8h12l8 12v16" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 20v12h16" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "car" as TransportMode,
    label: "Car",
    multiplier: "2×",
    icon: (
      <svg viewBox="0 0 64 64" className="w-8 h-8" fill="currentColor">
        <circle cx="16" cy="46" r="6" strokeWidth="3" stroke="currentColor" fill="none"/>
        <circle cx="48" cy="46" r="6" strokeWidth="3" stroke="currentColor" fill="none"/>
        <path d="M10 40V32l6-12h32l6 12v8a4 4 0 01-4 4H14a4 4 0 01-4-4z" strokeWidth="3" stroke="currentColor" fill="none" strokeLinejoin="round"/>
        <path d="M16 20l4-8h24l4 8" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="32" x2="54" y2="32" strokeWidth="2" stroke="currentColor"/>
      </svg>
    ),
  },
  {
    id: "van" as TransportMode,
    label: "Van",
    multiplier: "3×",
    icon: (
      <svg viewBox="0 0 64 64" className="w-8 h-8" fill="currentColor">
        <circle cx="16" cy="48" r="6" strokeWidth="3" stroke="currentColor" fill="none"/>
        <circle cx="48" cy="48" r="6" strokeWidth="3" stroke="currentColor" fill="none"/>
        <path d="M6 42V22a4 4 0 014-4h30v24H10" strokeWidth="3" stroke="currentColor" fill="none" strokeLinejoin="round"/>
        <path d="M40 18h10l8 10v14a4 4 0 01-4 4h-14V18z" strokeWidth="3" stroke="currentColor" fill="none" strokeLinejoin="round"/>
        <line x1="40" y1="18" x2="40" y2="42" strokeWidth="2" stroke="currentColor"/>
        <rect x="14" y="24" width="8" height="8" rx="1" strokeWidth="2" stroke="currentColor" fill="none"/>
        <rect x="26" y="24" width="8" height="8" rx="1" strokeWidth="2" stroke="currentColor" fill="none"/>
      </svg>
    ),
  },
];

export function TransportModeSelector({ value, onChange }: TransportModeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">Transport Mode</label>
      <div className="grid grid-cols-3 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
              value === mode.id
                ? "border-primary bg-primary/10 text-primary shadow-glow"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            <div className="mb-2">{mode.icon}</div>
            <span className="font-medium text-sm">{mode.label}</span>
            <span className={cn(
              "text-xs mt-1 px-2 py-0.5 rounded-full",
              value === mode.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {mode.multiplier}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export type { TransportMode };
