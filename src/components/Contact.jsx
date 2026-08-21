import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../i18n/useLanguage";
import { CV } from "../data/cv";
import SectionHeading from "./ui/SectionHeading";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

function ContactDetailRow({ icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)]">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-[var(--ink)]">{value}</p>
        )}
      </div>
    </div>
  );
}

function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t.contact.validation.nameRequired;
    if (!form.email.trim()) {
      nextErrors.email = t.contact.validation.emailRequired;
    } else if (!form.email.toLowerCase().includes("@gmail.com")) {
      nextErrors.email = t.contact.validation.emailInvalid;
    }
    if (!form.message.trim()) nextErrors.message = t.contact.validation.messageRequired;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!IS_CONFIGURED) {
      setStatus("configMissing");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading eyebrow={t.contact.eyebrow} heading={t.contact.heading} body={t.contact.subheading} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {t.contact.detailsHeading}
          </h3>

          <ContactDetailRow
            label={t.contact.location}
            value={CV.location}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.3" />
              </svg>
            }
          />
          <ContactDetailRow
            label={t.social.email}
            value={CV.email}
            href={`mailto:${CV.email}`}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            }
          />
          <ContactDetailRow
            label={t.contact.phone}
            value={CV.phone}
            href={`tel:${CV.phone.replace(/[^\d+]/g, "")}`}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v4a2 2 0 01-2 2C9.5 21 3 14.5 3 6a2 2 0 012-2z" />
              </svg>
            }
          />
          <ContactDetailRow
            label={t.social.linkedin}
            value="linkedin.com/in/habiba-zulfiqar"
            href={CV.linkedin}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.03 21 14.1V21h-4v-6.05c0-1.44-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V21H9z" />
              </svg>
            }
          />
          <ContactDetailRow
            label="Behance"
            value="behance.net/habibazulfiqar2"
            href={CV.behance}
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 6h6.5a3 3 0 010 6H2M2 6v12M2 12h6.5a3 3 0 010 6H2M14 15.5c0 2 1.6 3.5 3.8 3.5 1.6 0 2.9-.7 3.6-2M14 14.2c.2-1.8 1.6-3.2 3.8-3.2 2.3 0 3.7 1.6 3.9 3.6H14zM14.5 7h5" />
              </svg>
            }
          />
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
              {t.contact.formName}
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder={t.contact.formNamePlaceholder}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1 text-xs text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
              {t.contact.formEmail}
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder={t.contact.formEmailPlaceholder}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
              {t.contact.formMessage}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={form.message}
              onChange={handleChange("message")}
              placeholder={t.contact.formMessagePlaceholder}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className="w-full resize-none rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-xs text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            {status === "sending" ? t.contact.sending : t.contact.send}
          </button>

          <div role="status" aria-live="polite">
            {status === "success" && (
              <p className="rounded-sm bg-green-50 px-4 py-2.5 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
                {t.contact.success}
              </p>
            )}
            {status === "error" && (
              <p className="rounded-sm bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-950 dark:text-red-300">
                {t.contact.error}
              </p>
            )}
            {status === "configMissing" && (
              <p className="rounded-sm bg-amber-50 px-4 py-2.5 text-sm text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                {t.contact.configMissing}{" "}
                <a href={`mailto:${CV.email}`} className="underline">
                  {CV.email}
                </a>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
