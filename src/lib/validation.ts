/**
 * Contact form validation shared by the client form and the API route,
 * so both sides always enforce the same rules.
 */

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactInput = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 2000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();

  switch (field) {
    case "name": {
      if (!value) return "Please enter your name.";
      if (value.length < CONTACT_LIMITS.name.min) return "Name must be at least 2 characters.";
      if (value.length > CONTACT_LIMITS.name.max) return "Name must be 80 characters or fewer.";
      return undefined;
    }
    case "email": {
      if (!value) return "Please enter your email address.";
      if (value.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(value)) {
        return "Please enter a valid email address.";
      }
      return undefined;
    }
    case "subject": {
      if (!value) return "Please add a subject.";
      if (value.length < CONTACT_LIMITS.subject.min) return "Subject must be at least 3 characters.";
      if (value.length > CONTACT_LIMITS.subject.max) return "Subject must be 120 characters or fewer.";
      return undefined;
    }
    case "message": {
      if (!value) return "Please write a message.";
      if (value.length < CONTACT_LIMITS.message.min) {
        return `Message must be at least ${CONTACT_LIMITS.message.min} characters.`;
      }
      if (value.length > CONTACT_LIMITS.message.max) {
        return `Message must be ${CONTACT_LIMITS.message.max} characters or fewer.`;
      }
      return undefined;
    }
  }
}

export const CONTACT_FIELDS: ContactField[] = ["name", "email", "subject", "message"];

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateContactField(field, input[field] ?? "");
    if (error) errors[field] = error;
  }
  return errors;
}

/** Narrows an unknown request body to string fields without trusting its shape. */
export function parseContactBody(body: unknown): ContactInput & { company: string } {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const read = (key: string) => (typeof source[key] === "string" ? (source[key] as string) : "");

  return {
    name: read("name").trim(),
    email: read("email").trim(),
    subject: read("subject").replace(/[\r\n]+/g, " ").trim(),
    message: read("message").trim(),
    company: read("company"),
  };
}
