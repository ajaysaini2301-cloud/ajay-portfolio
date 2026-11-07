// ---- FOOTER DETAILS (placeholders) ---------------------------------------
// Fill these in. Empty ("") shows a muted "(placeholder)" item that is not a link.
const FOOTER_CONTACT = {
  email: "", // e.g. yourname@example.com
  github: "", // full URL, e.g. https://github.com/your-username
  linkedin: "", // full URL, e.g. https://www.linkedin.com/in/your-profile
};

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: FOOTER_CONTACT.github,
    icon: (
      <svg {...iconProps}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: FOOTER_CONTACT.linkedin,
    icon: (
      <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const mailIcon = (
  <svg {...iconProps}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

function Footer() {
  const { email } = FOOTER_CONTACT;

  return (
    <>
      <style>{`
        .footer,
        .footer *,
        .footer *::before,
        .footer *::after {
          box-sizing: border-box;
        }

        .footer {
          --footer-bg: var(--nav-bg, #FFFFFF);
          --footer-text: var(--nav-text, #171717);
          --footer-accent: var(--nav-accent, #84CC16);
          --footer-accent-dark: var(--nav-accent-dark, #65A30D);
          --footer-muted: rgba(23, 23, 23, 0.68);
          --footer-border: rgba(23, 23, 23, 0.1);

          position: relative;
          width: 100%;
          background: var(--footer-bg);
          color: var(--footer-text);
          border-top: 1px solid var(--footer-border);
          text-align: left;
        }

        /* Short green accent on the top border */
        .footer::before {
          content: "";
          position: absolute;
          top: -1px;
          left: max(24px, calc((100% - 1200px) / 2 + 24px));
          width: 64px;
          height: 3px;
          background: var(--footer-accent);
          border-radius: 0 0 3px 3px;
        }

        .footer__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 0;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1.2fr);
          gap: 48px;
        }

        .footer__grid > * {
          min-width: 0;
        }

        /* ---------- Brand ---------- */
        .footer__logo {
          display: inline-block;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--footer-text);
          text-decoration: none;
          white-space: nowrap;
        }

        .footer__logo span {
          color: var(--footer-accent);
        }

        .footer__about {
          max-width: 360px;
          margin: 16px 0 0;
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--footer-muted);
        }

        /* ---------- Column headings ---------- */
        .footer__heading {
          margin: 0 0 20px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--footer-text);
        }

        .footer__heading::after {
          content: "";
          display: block;
          width: 28px;
          height: 3px;
          margin-top: 10px;
          background: var(--footer-accent);
          border-radius: 2px;
        }

        /* ---------- Quick links ---------- */
        .footer__links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .footer__link {
          position: relative;
          display: inline-block;
          padding: 2px 0;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--footer-muted);
          text-decoration: none;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .footer__link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 2px;
          background: var(--footer-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .footer__link:hover,
        .footer__link:focus-visible {
          color: var(--footer-accent-dark);
          transform: translateX(4px);
        }

        .footer__link:hover::after,
        .footer__link:focus-visible::after {
          transform: scaleX(1);
        }

        /* ---------- Connect: email + social ---------- */
        .footer__email {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          max-width: 100%;
          margin: 0 0 20px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--footer-muted);
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 0.3s ease;
        }

        .footer__email svg {
          flex-shrink: 0;
          color: var(--footer-accent-dark);
        }

        a.footer__email:hover,
        a.footer__email:focus-visible {
          color: var(--footer-accent-dark);
        }

        .footer__email--empty {
          font-style: italic;
          opacity: 0.75;
        }

        .footer__social {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          color: var(--footer-accent-dark);
          text-decoration: none;
          background: rgba(132, 204, 22, 0.14);
          border: 1px solid transparent;
          border-radius: 12px;
          transition: background 0.3s ease, color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease;
        }

        a.footer__social-link:hover,
        a.footer__social-link:focus-visible {
          color: var(--footer-text);
          background: var(--footer-accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 18px rgba(132, 204, 22, 0.35);
        }

        /* Placeholder state: no URL yet */
        .footer__social-link--empty {
          opacity: 0.55;
          cursor: not-allowed;
          background: transparent;
          border: 1px dashed rgba(23, 23, 23, 0.3);
        }

        .footer__note {
          margin: 12px 0 0;
          font-size: 0.8rem;
          font-style: italic;
          color: var(--footer-muted);
        }

        .footer a:focus-visible {
          outline: 2px solid var(--footer-accent-dark);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* ---------- Bottom bar ---------- */
        .footer__bottom {
          margin-top: 48px;
          padding: 22px 0 26px;
          border-top: 1px solid var(--footer-border);
          text-align: center;
        }

        .footer__copy {
          margin: 0;
          font-size: 0.875rem;
          color: var(--footer-muted);
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 992px) {
          .footer__container {
            padding-top: 56px;
          }

          .footer__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 40px 32px;
          }

          .footer__brand {
            grid-column: 1 / -1;
          }

          .footer__about {
            max-width: 520px;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .footer::before {
            left: 20px;
          }

          .footer__container {
            padding: 48px 20px 0;
          }

          .footer__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 36px;
          }

          .footer__heading {
            margin-bottom: 16px;
          }

          /* Keep the six links compact: two per row */
          .footer__links {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px 16px;
          }

          .footer__bottom {
            margin-top: 40px;
            padding: 20px 0 24px;
          }

          .footer__copy {
            font-size: 0.82rem;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .footer *,
          .footer *::before,
          .footer *::after {
            transition: none !important;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <a href="#home" className="footer__logo" aria-label="Ajay Saini, back to top">
                AJAY <span>SAINI</span>
              </a>
              <p className="footer__about">
                Backend Developer passionate about building reliable APIs and
                scalable backend systems.
              </p>
            </div>

            {/* Quick links */}
            <nav className="footer__nav" aria-label="Footer navigation">
              <h2 className="footer__heading">Quick Links</h2>
              <ul className="footer__links" role="list">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div className="footer__connect">
              <h2 className="footer__heading">Connect</h2>

              {email ? (
                <a href={`mailto:${email}`} className="footer__email">
                  {mailIcon}
                  {email}
                </a>
              ) : (
                <p className="footer__email footer__email--empty">
                  {mailIcon}
                  Your email address (placeholder)
                </p>
              )}

              <ul className="footer__social" role="list">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    {social.href ? (
                      <a
                        href={social.href}
                        className="footer__social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} (opens in a new tab)`}
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ) : (
                      <span
                        className="footer__social-link footer__social-link--empty"
                        role="link"
                        aria-disabled="true"
                        aria-label={`${social.label} link coming soon`}
                        title={`${social.label} link coming soon`}
                      >
                        {social.icon}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {SOCIAL_LINKS.some((social) => !social.href) && (
                <p className="footer__note">Social links coming soon.</p>
              )}
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copy">
              &copy; 2026 Ajay Saini. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;