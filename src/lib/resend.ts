import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set; skipping welcome email");
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  await resend.emails.send({
    from,
    to,
    subject: "Welcome to Tasks",
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thanks for signing up. Your account is ready — start managing your tasks anytime.</p>
      <p>Email confirmation will be added in a future update.</p>
    `,
  });
}
