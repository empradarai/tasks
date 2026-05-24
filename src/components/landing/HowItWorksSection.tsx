import { Badge } from "@/components/ui/Badge";

const steps = [
  {
    step: "01",
    title: "Create your workspace",
    description: "Sign up in seconds with email. No lengthy onboarding or credit card.",
  },
  {
    step: "02",
    title: "Add and organize tasks",
    description: "Capture work with titles and descriptions. Mark done when you ship.",
  },
  {
    step: "03",
    title: "Track progress",
    description: "Use the dashboard to see completion rates and activity over time.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-gradient-to-b from-neutral-50 to-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">How it works</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Three simple steps from signup to shipped work.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <li key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-8 hidden h-px w-full bg-gradient-to-r from-indigo-200 to-transparent md:block"
                  aria-hidden
                />
              )}
              <div className="relative rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/20">
                  {item.step}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
