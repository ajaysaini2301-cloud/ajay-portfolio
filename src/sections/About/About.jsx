import { useEffect, useRef, useState } from "react";

const PARAGRAPHS = [
    "I'm Ajay Saini, a Backend Developer who enjoys turning complex requirements into reliable, well-structured systems. I work mainly with Python and Flask, backed by PostgreSQL and MySQL, and I use React.js and JavaScript when a project needs a solid frontend connection.",
    "My day-to-day work covers designing RESTful APIs, modeling relational databases, writing server-side business logic, and connecting everything to the interface users see. I focus on code that is easy to read, easy to test and easy to extend.",
    "When I build an API, I start with the data: a clear schema, sensible relationships and efficient queries. From there I define predictable endpoints, validate every input, handle errors gracefully and keep security in mind from the first line, so the system stays fast and dependable as it grows.",
];

const HIGHLIGHTS = ["Clean APIs", "Solid data models", "Maintainable code"];

const iconProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
};

const INFO_CARDS = [
    {
        label: "Role",
        value: "Backend Developer",
        icon: (
            <svg {...iconProps}>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        label: "Core Stack",
        value: "Python & Flask",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="4" width="18" height="6" rx="1.5" />
                <rect x="3" y="14" width="18" height="6" rx="1.5" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
                <line x1="7" y1="17" x2="7.01" y2="17" />
            </svg>
        ),
    },
    {
        label: "Databases",
        value: "PostgreSQL & MySQL",
        icon: (
            <svg {...iconProps}>
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
            </svg>
        ),
    },
    {
        label: "Frontend",
        value: "React.js & JavaScript",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="18" x2="12" y2="21" />
            </svg>
        ),
    },
];

function About() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
        .about,
        .about *,
        .about *::before,
        .about *::after {
          box-sizing: border-box;
        }

        .about {
          --about-bg: var(--nav-bg, #FFFFFF);
          --about-text: var(--nav-text, #171717);
          --about-accent: var(--nav-accent, #84CC16);
          --about-accent-dark: var(--nav-accent-dark, #65A30D);
          --about-muted: rgba(23, 23, 23, 0.68);
          --about-border: rgba(23, 23, 23, 0.08);

          width: 100%;
          padding: 96px 0;
          background: var(--about-bg);
          color: var(--about-text);
          overflow: hidden;
          scroll-margin-top: var(--nav-height, 72px);
          text-align: left;
        }

        .about__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          align-items: center;
          gap: 64px;
        }

        .about__container > * {
          min-width: 0;
        }

        /* ---------- Left column ---------- */
        .about__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--about-accent-dark);
        }

        .about__eyebrow::before {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--about-accent);
        }

        .about__title {
          margin: 0 0 24px;
          font-size: clamp(1.9rem, 4vw, 2.9rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: var(--about-text);
        }

        .about__title span {
          color: var(--about-accent-dark);
        }

        .about__text {
          margin: 0 0 16px;
          font-size: clamp(0.97rem, 1.5vw, 1.05rem);
          line-height: 1.8;
          color: var(--about-muted);
        }

        .about__highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 28px 0 0;
          padding: 0;
          list-style: none;
        }

        .about__highlight {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--about-text);
          background: rgba(132, 204, 22, 0.12);
          border: 1px solid rgba(132, 204, 22, 0.35);
          border-radius: 999px;
          transition: background 0.3s ease, transform 0.3s ease,
            border-color 0.3s ease;
        }

        .about__highlight::before {
          content: "";
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          background: var(--about-accent);
          border-radius: 50%;
        }

        .about__highlight:hover {
          background: rgba(132, 204, 22, 0.25);
          border-color: var(--about-accent);
          transform: translateY(-3px);
        }

        /* ---------- Right column: cards ---------- */
        .about__cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .about__card {
          position: relative;
          min-width: 0;
          padding: 28px 22px 24px;
          overflow: hidden;
          background: var(--about-bg);
          border: 1px solid var(--about-border);
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(23, 23, 23, 0.05);
          transition: transform 0.35s ease, border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .about__card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--about-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .about__card:hover {
          transform: translateY(-6px);
          border-color: rgba(132, 204, 22, 0.55);
          box-shadow: 0 18px 36px rgba(132, 204, 22, 0.2);
        }

        .about__card:hover::before {
          transform: scaleX(1);
        }

        .about__card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          margin-bottom: 18px;
          color: var(--about-accent-dark);
          background: rgba(132, 204, 22, 0.14);
          border-radius: 14px;
          transition: background 0.35s ease, color 0.35s ease,
            transform 0.35s ease;
        }

        .about__card:hover .about__card-icon {
          color: var(--about-text);
          background: var(--about-accent);
          transform: scale(1.06) rotate(-4deg);
        }

        .about__card-label {
          margin: 0 0 6px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--about-muted);
        }

        .about__card-value {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.35;
          color: var(--about-text);
          overflow-wrap: anywhere;
        }

        /* ---------- Entrance animation ---------- */
        .about__content > * {
          opacity: 0;
          transform: translateY(28px);
        }

        /* Cards are only hidden here; their slide-up comes from the
           about-rise keyframes, so :hover can control transform afterwards */
        .about__card {
          opacity: 0;
        }

        .about--visible .about__content > * {
          opacity: 1;
          transform: translateY(0);
        }

        .about--visible .about__card {
          opacity: 1;
        }

        .about__content > * {
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .about--visible .about__content > *:nth-child(1) { transition-delay: 0.05s; }
        .about--visible .about__content > *:nth-child(2) { transition-delay: 0.15s; }
        .about--visible .about__content > *:nth-child(3) { transition-delay: 0.25s; }
        .about--visible .about__content > *:nth-child(4) { transition-delay: 0.35s; }
        .about--visible .about__content > *:nth-child(5) { transition-delay: 0.45s; }
        .about--visible .about__content > *:nth-child(6) { transition-delay: 0.55s; }

        /* Cards keep their hover transitions, so the entrance delay is
           applied only to opacity and transform via a separate animation */
        .about--visible .about__card {
                    animation: about-rise 0.7s ease backwards;
        }

        .about--visible .about__card:nth-child(1) { animation-delay: 0.2s; }
        .about--visible .about__card:nth-child(2) { animation-delay: 0.3s; }
        .about--visible .about__card:nth-child(3) { animation-delay: 0.4s; }
        .about--visible .about__card:nth-child(4) { animation-delay: 0.5s; }

        @keyframes about-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 992px) {
          .about {
            padding: 80px 0;
          }

          .about__container {
            grid-template-columns: minmax(0, 1fr);
            gap: 48px;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .about {
            padding: 56px 0;
          }

          .about__container {
            padding: 0 20px;
            gap: 40px;
          }

          .about__eyebrow {
            margin-bottom: 12px;
            font-size: 0.78rem;
            letter-spacing: 2px;
          }

          .about__eyebrow::before {
            width: 24px;
          }

          .about__title {
            margin-bottom: 18px;
          }

          .about__highlights {
            gap: 8px;
            margin-top: 22px;
          }

          .about__highlight {
            padding: 6px 14px;
            font-size: 0.8rem;
          }

          .about__cards {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .about__card {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            column-gap: 16px;
            align-items: center;
            padding: 20px;
          }

          .about__card-icon {
            grid-row: span 2;
            width: 44px;
            height: 44px;
            margin-bottom: 0;
          }

          .about__card-label {
            align-self: end;
          }

          .about__card-value {
            align-self: start;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .about *,
          .about *::before {
            animation: none !important;
            transition: none !important;
          }

          .about__content > *,
          .about__card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

            <section
                id="about"
                ref={sectionRef}
                className={`about ${isVisible ? "about--visible" : ""}`}
                aria-labelledby="about-heading"
            >
                <div className="about__container">
                    {/* Left column */}
                    <div className="about__content">
                        <p className="about__eyebrow">About Me</p>

                        <h2 id="about-heading" className="about__title">
                            Building <span>reliable backends</span> that power great products
                        </h2>

                        {PARAGRAPHS.map((text) => (
                            <p key={text.slice(0, 24)} className="about__text">
                                {text}
                            </p>
                        ))}

                        <ul className="about__highlights" aria-label="What I focus on">
                            {HIGHLIGHTS.map((item) => (
                                <li key={item} className="about__highlight">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right column */}
                    <ul className="about__cards" aria-label="Professional information">
                        {INFO_CARDS.map((card) => (
                            <li key={card.label} className="about__card">
                                <div className="about__card-icon">{card.icon}</div>
                                <h3 className="about__card-label">{card.label}</h3>
                                <p className="about__card-value">{card.value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default About;