import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for individuals getting organized.",
    highlighted: false,
    cta: "Get started",
    href: "/register",
    features: [
      "Unlimited personal tasks",
      "Basic analytics dashboard",
      "Email welcome on signup",
      "Secure credential login",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/user/month",
    description: "For professionals who need more insight.",
    highlighted: true,
    cta: "Start free trial",
    href: "/register",
    features: [
      "Everything in Starter",
      "Advanced activity charts",
      "Priority email support",
      "Export & backups (soon)",
      "Custom task fields (soon)",
    ],
  },
  {
    name: "Team",
    price: "$29",
    period: "/user/month",
    description: "Collaborate with your whole organization.",
    highlighted: false,
    cta: "Contact sales",
    href: "/register",
    features: [
      "Everything in Pro",
      "Shared workspaces (soon)",
      "Role-based access (soon)",
      "SSO & SAML (soon)",
      "Dedicated success manager",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-neutral-200/80 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="indigo">Pricing</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Start free and upgrade when you grow. No hidden fees.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.highlighted
                  ? "border-indigo-200 bg-gradient-to-b from-indigo-50/80 to-white shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-600/20"
                  : "border-neutral-200/80 bg-white shadow-sm",
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-neutral-900">{plan.price}</span>
                <span className="text-sm text-neutral-500">{plan.period}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-neutral-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={cn(
                  "mt-8 block rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all",
                  plan.highlighted
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
                    : "border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50",
                )}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
