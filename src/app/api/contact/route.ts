import { parseContactBody, validateContact } from "@/lib/validation";

/*
 * Sends contact form submissions by email through Resend (https://resend.com).
 * Configure in .env.local / Vercel project settings (server-only, never exposed):
 *   RESEND_API_KEY      – Resend API key
 *   CONTACT_TO_EMAIL    – inbox that receives messages
 *   CONTACT_FROM_EMAIL  – optional verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 */

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 };

// Best-effort, per-instance limiter. Serverless instances don't share memory,
// so use a shared store (e.g. Upstash Redis) if stricter limits are needed.
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(key) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  if (timestamps.length >= RATE_LIMIT.max) {
    recentSubmissions.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  recentSubmissions.set(key, timestamps);
  return false;
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "Your message is too long." }, 413);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Unsupported request format." }, 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const input = parseContactBody(body);

  // Honeypot filled in: pretend success so bots don't retry.
  if (input.company) return json({ ok: true });

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return json({ error: "Please fix the highlighted fields.", errors }, 422);
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return json({ error: "You've sent several messages recently. Please try again later." }, 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return json({ error: "The contact form isn't connected yet." }, 503);
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `Portfolio: ${input.subject}`,
        text: [`Name: ${input.name}`, `Email: ${input.email}`, `Subject: ${input.subject}`, "", input.message].join("\n"),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[contact] Email provider responded with ${response.status}`);
      return json({ error: "Your message couldn't be sent right now." }, 502);
    }
  } catch (error) {
    console.error("[contact] Failed to reach email provider", error instanceof Error ? error.message : error);
    return json({ error: "Your message couldn't be sent right now." }, 502);
  }

  return json({ ok: true });
}
