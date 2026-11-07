import { useEffect, useRef, useState } from "react";

// ---- CONTACT DETAILS (placeholders) --------------------------------------
// Fill these in. Empty ("") shows a muted "(placeholder)" row that is not a link.
const CONTACT = {
  email: "", // e.g. yourname@example.com
  whatsapp: "", // number with country code, e.g. +91 98765 43210
  github: "", // full URL, e.g. https://github.com/your-username
  linkedin: "", // full URL, e.g. https://www.linkedin.com/in/your-profile
};

// ---- FORM BACKEND --------------------------------------------------------
// Leave empty until you have a backend. Then paste its URL here; the form will
// POST { name, email, subject, message } as JSON to it.
const FORM_ENDPOINT = "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INITIAL_VALUES = { name: "", email: "", subject: "", message: "" };

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: CONTACT.email,
    display: CONTACT.email,
    href: CONTACT.email ? `mailto:${CONTACT.email}` : "",
    placeholder: "Your email address",
    icon: (
      <svg {...iconProps}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    display: CONTACT.whatsapp,
    href: CONTACT.whatsapp
      ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`
      : "",
    placeholder: "Your WhatsApp number",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: CONTACT.github,
    display: stripProtocol(CONTACT.github),
    href: CONTACT.github,
    placeholder: "Your GitHub profile",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: CONTACT.linkedin,
    display: stripProtocol(CONTACT.linkedin),
    href: CONTACT.linkedin,
    placeholder: "Your LinkedIn profile",
    external: true,
    icon: (
      <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Please enter a subject.";
  else if (subject.length < 3)
    errors.subject = "Subject must be at least 3 characters.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}

// One labelled input or textarea with its error message
function Field({ id, label, type = "text", value, error, onChange, ...rest }) {
  const Control = type === "textarea" ? "textarea" : "input";
  const errorId = `${id}-error`;

  return (
    <div className="contact__field">
      <label htmlFor={id} className="contact__label">
        {label} <span aria-hidden="true">*</span>
      </label>
      <Control
        id={id}
        name={id.replace("contact-", "")}
        type={type === "textarea" ? undefined : type}
        rows={type === "textarea" ? 5 : undefined}
        className={`contact__control ${error ? "contact__control--error" : ""}`}
        value={value}
        onChange={onChange}
        aria-required="true"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className="contact__error">
          {error}
        </p>
      )}
    </div>
  );
}

function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: "success" | "error" | "info", text }
  const [isSending, setIsSending] = useState(false);

  // Play the entrance animation when the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!node || reduceMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error as soon as the user edits it
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (status) setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return;

    const foundErrors = validate(values);
    setErrors(foundErrors);

    const firstInvalid = Object.keys(foundErrors)[0];
    if (firstInvalid) {
      setStatus({
        type: "error",
        text: "Please fix the highlighted fields and try again.",
      });
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    // No backend connected yet: be honest, do not pretend the message was sent
    if (!FORM_ENDPOINT) {
      setStatus({
        type: "info",
        text: "Your details look good, but this form isn’t connected to a backend yet, so nothing was sent. Please use the contact details on the left for now.",
      });
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setValues(INITIAL_VALUES);
      setStatus({
        type: "success",
        text: "Thank you! Your message has been sent.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: "Something went wrong and your message wasn’t sent. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <style>{`
        .contact,
        .contact *,
        .contact *::before,
        .contact *::after {
          box-sizing: border-box;
        }

        .contact {
          --contact-bg: var(--nav-bg, #FFFFFF);
          --contact-text: var(--nav-text, #171717);
          --contact-accent: var(--nav-accent, #84CC16);
          --contact-accent-dark: var(--nav-accent-dark, #65A30D);
          --contact-muted: rgba(23, 23, 23, 0.68);
          --contact-border: rgba(23, 23, 23, 0.08);
          --contact-field-border: rgba(23, 23, 23, 0.16);
          --contact-danger: #B91C1C;

          width: 100%;
          padding: 96px 0;
          background: var(--contact-bg);
          color: var(--contact-text);
          overflow: hidden;
          scroll-margin-top: var(--nav-height, 72px);
          text-align: left;
        }

        .contact__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- Header ---------- */
        .contact__header {
          max-width: 640px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .contact__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--contact-accent-dark);
        }

        .contact__eyebrow::before,
        .contact__eyebrow::after {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--contact-accent);
        }

        .contact__title {
          margin: 0 0 16px;
          font-size: clamp(1.9rem, 4vw, 2.9rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: var(--contact-text);
        }

        .contact__title span {
          color: var(--contact-accent-dark);
        }

        .contact__subtitle {
          margin: 0;
          font-size: clamp(0.97rem, 1.5vw, 1.05rem);
          line-height: 1.7;
          color: var(--contact-muted);
        }

        /* ---------- Two-column layout ---------- */
        .contact__layout {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          align-items: start;
          gap: 40px;
        }

        .contact__layout > * {
          min-width: 0;
        }

        /* ---------- Left: contact info ---------- */
        .contact__info-title {
          margin: 0 0 20px;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--contact-text);
        }

        .contact__info-title::after {
          content: "";
          display: block;
          width: 36px;
          height: 3px;
          margin-top: 14px;
          background: var(--contact-accent);
          border-radius: 2px;
        }

        .contact__list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .contact__item {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
          padding: 16px 18px;
          color: inherit;
          text-decoration: none;
          background: var(--contact-bg);
          border: 1px solid var(--contact-border);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(23, 23, 23, 0.05);
          transition: transform 0.35s ease, border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        a.contact__item:hover,
        a.contact__item:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(132, 204, 22, 0.55);
          box-shadow: 0 14px 30px rgba(132, 204, 22, 0.2);
        }

        .contact__item-icon {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          color: var(--contact-accent-dark);
          background: rgba(132, 204, 22, 0.14);
          border-radius: 14px;
          transition: background 0.35s ease, color 0.35s ease,
            transform 0.35s ease;
        }

        a.contact__item:hover .contact__item-icon,
        a.contact__item:focus-visible .contact__item-icon {
          color: var(--contact-text);
          background: var(--contact-accent);
          transform: scale(1.06) rotate(-4deg);
        }

        .contact__item-text {
          min-width: 0;
        }

        .contact__item-label {
          display: block;
          margin-bottom: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--contact-muted);
        }

        .contact__item-value {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.4;
          color: var(--contact-text);
          overflow-wrap: anywhere;
        }

        /* Placeholder state: no details added yet */
        .contact__item--empty {
          opacity: 0.6;
          box-shadow: none;
          border-style: dashed;
        }

        .contact__item--empty .contact__item-value {
          font-weight: 500;
          font-style: italic;
          color: var(--contact-muted);
        }

        /* ---------- Right: form ---------- */
        .contact__form-card {
          padding: 32px;
          background: var(--contact-bg);
          border: 1px solid var(--contact-border);
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(23, 23, 23, 0.05);
        }

        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact__row {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 220px), 1fr)
          );
          gap: 20px;
        }

        .contact__field {
          min-width: 0;
        }

        .contact__label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--contact-text);
        }

        .contact__label span {
          color: var(--contact-accent-dark);
        }

        .contact__control {
          display: block;
          width: 100%;
          padding: 13px 16px;
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--contact-text);
          background: var(--contact-bg);
          border: 1.5px solid var(--contact-field-border);
          border-radius: 12px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        textarea.contact__control {
          min-height: 140px;
          resize: vertical;
        }

        .contact__control:hover {
          border-color: rgba(132, 204, 22, 0.6);
        }

        .contact__control:focus {
          outline: none;
          border-color: var(--contact-accent-dark);
          box-shadow: 0 0 0 4px rgba(132, 204, 22, 0.22);
        }

        .contact__control--error,
        .contact__control--error:hover {
          border-color: var(--contact-danger);
        }

        .contact__control--error:focus {
          border-color: var(--contact-danger);
          box-shadow: 0 0 0 4px rgba(185, 28, 28, 0.15);
        }

        .contact__error {
          margin: 6px 0 0;
          font-size: 0.82rem;
          line-height: 1.4;
          color: var(--contact-danger);
        }

        /* Status banner */
        .contact__status {
          margin: 0;
          padding: 14px 16px;
          font-size: 0.92rem;
          line-height: 1.55;
          border-radius: 12px;
          border: 1px solid transparent;
        }

        .contact__status--success {
          color: #3F6212;
          background: rgba(132, 204, 22, 0.16);
          border-color: rgba(132, 204, 22, 0.5);
        }

        .contact__status--error {
          color: var(--contact-danger);
          background: rgba(185, 28, 28, 0.07);
          border-color: rgba(185, 28, 28, 0.3);
        }

        .contact__status--info {
          color: var(--contact-text);
          background: rgba(23, 23, 23, 0.05);
          border-color: var(--contact-field-border);
        }

        /* Submit button (same style as the Hero buttons) */
        .contact__submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
          padding: 14px 32px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--contact-text);
          background: var(--contact-accent);
          border: 2px solid var(--contact-accent);
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact__submit:hover:not(:disabled),
        .contact__submit:focus-visible {
          background: var(--contact-accent-dark);
          border-color: var(--contact-accent-dark);
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(132, 204, 22, 0.4);
        }

        .contact__submit:disabled {
          opacity: 0.65;
          cursor: wait;
        }

        .contact a:focus-visible,
        .contact__submit:focus-visible {
          outline: 2px solid var(--contact-accent-dark);
          outline-offset: 3px;
        }

        /* ---------- Entrance animation ---------- */
        .contact__header,
        .contact__info,
        .contact__form-card {
          opacity: 0;
        }

        .contact--visible .contact__header,
        .contact--visible .contact__info,
        .contact--visible .contact__form-card {
          opacity: 1;
          /* "backwards" so hover transforms still work after it finishes */
          animation: contact-rise 0.7s ease backwards;
        }

        .contact--visible .contact__info { animation-delay: 0.15s; }
        .contact--visible .contact__form-card { animation-delay: 0.3s; }

        @keyframes contact-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- Tablet (still two columns) ---------- */
        @media (max-width: 992px) {
          .contact {
            padding: 80px 0;
          }

          .contact__header {
            margin-bottom: 48px;
          }

          .contact__layout {
            gap: 28px;
          }

          .contact__form-card {
            padding: 26px 22px;
          }

          .contact__item {
            gap: 14px;
            padding: 14px;
          }

          .contact__item-icon {
            width: 44px;
            height: 44px;
          }
        }

        /* ---------- Single column ---------- */
        @media (max-width: 768px) {
          .contact__layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 40px;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .contact {
            padding: 56px 0;
          }

          .contact__container {
            padding: 0 20px;
          }

          .contact__header {
            margin-bottom: 36px;
          }

          .contact__eyebrow {
            margin-bottom: 12px;
            font-size: 0.78rem;
            letter-spacing: 2px;
          }

          .contact__eyebrow::before,
          .contact__eyebrow::after {
            width: 24px;
          }

          .contact__form-card {
            padding: 22px 18px;
          }

          .contact__row {
            gap: 20px;
          }

          .contact__submit {
            align-self: stretch;
            width: 100%;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .contact *,
          .contact *::before {
            animation: none !important;
            transition: none !important;
          }

          .contact__header,
          .contact__info,
          .contact__form-card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className={`contact ${isVisible ? "contact--visible" : ""}`}
        aria-labelledby="contact-heading"
      >
        <div className="contact__container">
          <div className="contact__header">
            <p className="contact__eyebrow">Contact</p>

            <h2 id="contact-heading" className="contact__title">
              Let’s <span>Work</span> Together
            </h2>

            <p className="contact__subtitle">
              Have a project in mind or want to discuss an opportunity? Send me
              a message and let’s talk about how I can help.
            </p>
          </div>

          <div className="contact__layout">
            {/* Left column: contact information */}
            <div className="contact__info">
              <h3 className="contact__info-title">Contact Information</h3>

              <ul className="contact__list" role="list">
                {CONTACT_ITEMS.map((item) => {
                  const content = (
                    <>
                      <span className="contact__item-icon">{item.icon}</span>
                      <span className="contact__item-text">
                        <span className="contact__item-label">
                          {item.label}
                        </span>
                        <span className="contact__item-value">
                          {item.value
                            ? item.display
                            : `${item.placeholder} (placeholder)`}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          className="contact__item"
                          href={item.href}
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          aria-label={`${item.label}: ${item.display}`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="contact__item contact__item--empty">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right column: form */}
            <div className="contact__form-card">
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="contact__row">
                  <Field
                    id="contact-name"
                    label="Full Name"
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                  <Field
                    id="contact-email"
                    label="Email Address"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </div>

                <Field
                  id="contact-subject"
                  label="Subject"
                  value={values.subject}
                  error={errors.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                />

                <Field
                  id="contact-message"
                  label="Message"
                  type="textarea"
                  value={values.message}
                  error={errors.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                />

                {status && (
                  <p
                    className={`contact__status contact__status--${status.type}`}
                    role={status.type === "error" ? "alert" : "status"}
                  >
                    {status.text}
                  </p>
                )}

                <button
                  type="submit"
                  className="contact__submit"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;