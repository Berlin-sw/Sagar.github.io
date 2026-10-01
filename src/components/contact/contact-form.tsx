"use client";

import { AnimatePresence, m } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  validateContact,
  validateContactField,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/validation";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submitting = status.state === "submitting";

  function handleChange(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }));
    }
    if (status.state === "success" || status.state === "error") setStatus({ state: "idle" });
  }

  function handleBlur(field: ContactField) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateContactField(field, values[field]) }));
  }

  function focusField(field: ContactField) {
    formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    const firstInvalid = CONTACT_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    const honeypot = new FormData(event.currentTarget).get("company");
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: typeof honeypot === "string" ? honeypot : "" }),
      });
      const data: { error?: string; errors?: ContactErrors } = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          const invalid = CONTACT_FIELDS.find((field) => data.errors?.[field]);
          if (invalid) focusField(invalid);
        }
        setStatus({ state: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }

      setValues(EMPTY);
      setErrors({});
      setTouched({});
      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: "Couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="contact-form-status"
      className="relative rounded-2xl border border-border bg-bg-elevated/80 p-5 sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name.max}
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email.max}
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id="subject" label="Subject" error={errors.subject} className="sm:col-span-2">
          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={CONTACT_LIMITS.subject.max}
            value={values.subject}
            onChange={(event) => handleChange("subject", event.target.value)}
            onBlur={() => handleBlur("subject")}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            placeholder="Internship opportunity, collaboration, question…"
            className={inputClass(Boolean(errors.subject))}
          />
        </Field>

        <Field
          id="message"
          label="Message"
          error={errors.message}
          className="sm:col-span-2"
          hint={
            <span className={cn("tabular-nums", values.message.length > CONTACT_LIMITS.message.max && "text-danger")}>
              {values.message.length}/{CONTACT_LIMITS.message.max}
            </span>
          }
        >
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={CONTACT_LIMITS.message.max}
            value={values.message}
            onChange={(event) => handleChange("message", event.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="Tell me a little about what you have in mind…"
            className={cn(inputClass(Boolean(errors.message)), "h-auto resize-y py-3")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">All fields are required.</p>
        <button type="submit" disabled={submitting} className={buttonStyles({ className: "w-full sm:w-auto" })}>
          {submitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send message
            </>
          )}
        </button>
      </div>

      <div id="contact-form-status" role="status" aria-live="polite" className="empty:hidden">
        <AnimatePresence mode="wait">
          {status.state === "success" ? (
            <m.p
              key="success"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-fg"
            >
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
              Thanks for reaching out! Your message has been sent and I&apos;ll get back to you soon.
            </m.p>
          ) : null}
          {status.state === "error" ? (
            <m.div
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-fg"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
              <p>
                {status.message} You can also email me directly at{" "}
                <a href={`mailto:${fallbackEmail}`} className="font-medium text-accent underline-offset-4 hover:underline">
                  {fallbackEmail}
                </a>
                .
              </p>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block h-11 w-full rounded-lg border bg-bg px-3.5 text-sm text-fg shadow-sm transition-[border-color,box-shadow] placeholder:text-fg-subtle/70",
    "focus:outline-none focus-visible:outline-none focus:ring-4",
    invalid
      ? "border-danger/70 focus:border-danger focus:ring-danger/15"
      : "border-border-strong focus:border-accent focus:ring-accent/15",
  );
}

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: ContactField;
  label: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {hint ? <span className="text-xs text-fg-subtle">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
