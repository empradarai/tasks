import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "indigo" | "emerald" | "outline";
  className?: string;
}

const variants = {
  default: "bg-neutral-100 text-neutral-700",
  indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100",
  outline: "bg-white/80 text-neutral-600 ring-1 ring-inset ring-neutral-200 backdrop-blur-sm",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
