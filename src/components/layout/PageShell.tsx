interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  /** Wider main column for dashboards (e.g. tasks analytics). */
  wide?: boolean;
}

export function PageShell({ title, subtitle, children, headerAction, wide }: PageShellProps) {
  const maxWidth = wide ? "max-w-5xl" : "max-w-3xl";

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/40 via-neutral-50 to-neutral-50">
      <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className={`mx-auto flex ${maxWidth} flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6`}>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">{title}</h1>
            {subtitle && <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>}
          </div>
          {headerAction}
        </div>
      </header>
      <main className={`mx-auto ${maxWidth} px-4 py-6 sm:px-6 sm:py-8`}>{children}</main>
    </div>
  );
}
