import { useEffect, useRef, useState } from "react";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const SERVICES = [
  {
    title: "Backend Development",
    description:
      "Building reliable server-side applications with Python and Flask, including REST APIs and clean, maintainable business logic.",
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
    title: "Database Design",
    description:
      "Designing well-structured PostgreSQL and MySQL databases, from schema design to query optimization for fast, dependable data access.",
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    title: "API Development & Integration",
    description:
      "Developing clear, well-structured REST APIs and integrating third-party APIs so your applications connect and work together smoothly.",
    icon: (
      <svg {...iconProps}>
        <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
        <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
      </svg>
    ),
  },
  {
    title: "Web Application Development",
    description:
      "Creating responsive web applications with React.js and JavaScript that connect cleanly to the backend and work across devices.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="18" x2="12" y2="21" />
      </svg>
    ),
  },
];

function Services() {
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
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .services,
        .services *,
        .services *::before,
        .services *::after {
          box-sizing: border-box;
        }

        .services {
          --services-bg: var(--nav-bg, #FFFFFF);
          --services-text: var(--nav-text, #171717);
          --services-accent: var(--nav-accent, #84CC16);
          --services-accent-dark: var(--nav-accent-dark, #65A30D);
          --services-muted: rgba(23, 23, 23, 0.68);
          --services-border: rgba(23, 23, 23, 0.08);

          width: 100%;
          padding: 96px 0;
          background: var(--services-bg);
          color: var(--services-text);
          overflow: hidden;
          scroll-margin-top: var(--nav-height, 72px);
          text-align: left;
        }

        .services__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- Header ---------- */
        .services__header {
          max-width: 640px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .services__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--services-accent-dark);
        }

        .services__eyebrow::before,
        .services__eyebrow::after {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--services-accent);
        }

        .services__title {
          margin: 0 0 16px;
          font-size: clamp(1.9rem, 4vw, 2.9rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: var(--services-text);
        }

        .services__title span {
          color: var(--services-accent-dark);
        }

        .services__subtitle {
          margin: 0;
          font-size: clamp(0.97rem, 1.5vw, 1.05rem);
          line-height: 1.7;
          color: var(--services-muted);
        }

        /* ---------- Cards grid ---------- */
        .services__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .services__card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 28px 24px 28px;
          overflow: hidden;
          background: var(--services-bg);
          border: 1px solid var(--services-border);
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(23, 23, 23, 0.05);
          transition: transform 0.35s ease, border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .services__card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--services-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .services__card:hover {
          transform: translateY(-6px);
          border-color: rgba(132, 204, 22, 0.55);
          box-shadow: 0 18px 36px rgba(132, 204, 22, 0.2);
        }

        .services__card:hover::before {
          transform: scaleX(1);
        }

        .services__card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .services__card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          color: var(--services-accent-dark);
          background: rgba(132, 204, 22, 0.14);
          border-radius: 16px;
          transition: background 0.35s ease, color 0.35s ease,
            transform 0.35s ease;
        }

        .services__card:hover .services__card-icon {
          color: var(--services-text);
          background: var(--services-accent);
          transform: scale(1.06) rotate(-4deg);
        }

        .services__card-number {
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1;
          color: rgba(23, 23, 23, 0.12);
          transition: color 0.35s ease;
        }

        .services__card:hover .services__card-number {
          color: var(--services-accent-dark);
        }

        .services__card-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--services-text);
        }

        .services__card-title::after {
          content: "";
          display: block;
          width: 36px;
          height: 3px;
          margin: 14px 0 16px;
          background: var(--services-accent);
          border-radius: 2px;
        }

        .services__card-text {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--services-muted);
        }

        /* ---------- Entrance animation ---------- */
        .services__header,
        .services__card {
          opacity: 0;
        }

        .services--visible .services__header,
        .services--visible .services__card {
          opacity: 1;
          /* "backwards" (not "both") so the hover transform still works
             after the entrance animation finishes */
          animation: services-rise 0.7s ease backwards;
        }

        .services--visible .services__card:nth-child(1) { animation-delay: 0.15s; }
        .services--visible .services__card:nth-child(2) { animation-delay: 0.25s; }
        .services--visible .services__card:nth-child(3) { animation-delay: 0.35s; }
        .services--visible .services__card:nth-child(4) { animation-delay: 0.45s; }

        @keyframes services-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 1100px) {
          .services__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 992px) {
          .services {
            padding: 80px 0;
          }

          .services__header {
            margin-bottom: 48px;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .services {
            padding: 56px 0;
          }

          .services__container {
            padding: 0 20px;
          }

          .services__header {
            margin-bottom: 36px;
          }

          .services__eyebrow {
            margin-bottom: 12px;
            font-size: 0.78rem;
            letter-spacing: 2px;
          }

          .services__eyebrow::before,
          .services__eyebrow::after {
            width: 24px;
          }

          .services__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
          }

          .services__card {
            padding: 22px 20px 24px;
          }

          .services__card-top {
            margin-bottom: 18px;
          }

          .services__card-icon {
            width: 50px;
            height: 50px;
          }

          .services__card-title {
            font-size: 1.1rem;
          }

          .services__card-title::after {
            margin: 12px 0 14px;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .services *,
          .services *::before {
            animation: none !important;
            transition: none !important;
          }

          .services__header,
          .services__card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section
        id="services"
        ref={sectionRef}
        className={`services ${isVisible ? "services--visible" : ""}`}
        aria-labelledby="services-heading"
      >
        <div className="services__container">
          <div className="services__header">
            <p className="services__eyebrow">Services</p>

            <h2 id="services-heading" className="services__title">
              What I Can <span>Do</span> For You
            </h2>

            <p className="services__subtitle">
              From server-side logic and database design to APIs and responsive
              web applications, here is how I can help bring your project to
              life.
            </p>
          </div>

          <ul className="services__grid" role="list">
            {SERVICES.map((service, index) => (
              <li key={service.title} className="services__card">
                <div className="services__card-top">
                  <div className="services__card-icon">{service.icon}</div>
                  <span className="services__card-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-text">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Services;