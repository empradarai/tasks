type AlertVariant = "error" | "success" | "info";

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-green-200 bg-green-50 text-green-800",
  info: "border-neutral-200 bg-neutral-50 text-neutral-800",
};

export function Alert({ variant = "info", children }: AlertProps) {
  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${variantClasses[variant]}`}>
      {children}
    </div>
  );
}
