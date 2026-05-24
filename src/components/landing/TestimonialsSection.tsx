import { Badge } from "@/components/ui/Badge";

const testimonials = [
  {
    quote:
      "We replaced three tools with Tasks. The dashboard alone saved our PM hours every week.",
    author: "Sarah Chen",
    role: "Product Lead, Northline",
  },
  {
    quote:
      "Clean UI, fast updates, and I actually trust the per-user data model. Exactly what we needed.",
    author: "Marcus Webb",
    role: "Founder, Stacklane",
  },
  {
    quote:
      "Onboarding took five minutes. My team was tracking sprint work the same afternoon.",
    author: "Elena Ruiz",
    role: "Engineering Manager, Brightform",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-indigo-50/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">Testimonials</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Loved by productive teams
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm"
            >
              <p className="text-neutral-700 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-neutral-100 pt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-neutral-900">{item.author}</span>
                  <span className="mt-0.5 block text-sm text-neutral-500">{item.role}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
