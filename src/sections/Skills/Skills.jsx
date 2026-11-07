import { useEffect, useRef, useState } from "react";

const iconProps = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
};

// `mark` is the short text shown inside each skill's badge.
const SKILL_CATEGORIES = [
    {
        title: "Backend Development",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="4" width="18" height="6" rx="1.5" />
                <rect x="3" y="14" width="18" height="6" rx="1.5" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
                <line x1="7" y1="17" x2="7.01" y2="17" />
            </svg>
        ),
        items: [
            { name: "Python", mark: "Py" },
            { name: "Flask", mark: "Fl" },
            { name: "REST APIs", mark: "API" },
        ],
    },
    {
        title: "Database",
        icon: (
            <svg {...iconProps}>
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
            </svg>
        ),
        items: [
            { name: "PostgreSQL", mark: "Pg" },
            { name: "MySQL", mark: "My" },
            { name: "SQL", mark: "SQL" },
        ],
    },
    {
        title: "Frontend Development",
        icon: (
            <svg {...iconProps}>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="18" x2="12" y2="21" />
            </svg>
        ),
        items: [
            { name: "HTML", mark: "H5" },
            { name: "CSS", mark: "C3" },
            { name: "JavaScript", mark: "JS" },
            { name: "React.js", mark: "Re" },
        ],
    },
    {
        title: "Tools",
        icon: (
            <svg {...iconProps}>
                <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
            </svg>
        ),
        items: [
            { name: "Git", mark: "Git" },
            { name: "GitHub", mark: "GH" },
            { name: "VS Code", mark: "VS" },
            { name: "Postman", mark: "Pm" },
        ],
    },
];

function Skills() {
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
        .skills,
        .skills *,
        .skills *::before,
        .skills *::after {
          box-sizing: border-box;
        }

        .skills {
          --skills-bg: var(--nav-bg, #FFFFFF);
          --skills-text: var(--nav-text, #171717);
          --skills-accent: var(--nav-accent, #84CC16);
          --skills-accent-dark: var(--nav-accent-dark, #65A30D);
          --skills-muted: rgba(23, 23, 23, 0.68);
          --skills-border: rgba(23, 23, 23, 0.08);
          --skills-surface: #FAFAFA;

          width: 100%;
          padding: 96px 0;
          background: var(--skills-bg);
          color: var(--skills-text);
          overflow: hidden;
          scroll-margin-top: var(--nav-height, 72px);
          text-align: left;
        }

        .skills__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- Header ---------- */
        .skills__header {
          max-width: 640px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .skills__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--skills-accent-dark);
        }

        .skills__eyebrow::before,
        .skills__eyebrow::after {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--skills-accent);
        }

        .skills__title {
          margin: 0 0 16px;
          font-size: clamp(1.9rem, 4vw, 2.9rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: var(--skills-text);
        }

        .skills__title span {
          color: var(--skills-accent-dark);
        }

        .skills__subtitle {
          margin: 0;
          font-size: clamp(0.97rem, 1.5vw, 1.05rem);
          line-height: 1.7;
          color: var(--skills-muted);
        }

        /* ---------- Cards grid ---------- */
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .skills__card {
          position: relative;
          min-width: 0;
          padding: 28px 24px 24px;
          overflow: hidden;
          background: var(--skills-bg);
          border: 1px solid var(--skills-border);
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(23, 23, 23, 0.05);
          transition: transform 0.35s ease, border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .skills__card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--skills-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .skills__card:hover {
          transform: translateY(-6px);
          border-color: rgba(132, 204, 22, 0.55);
          box-shadow: 0 18px 36px rgba(132, 204, 22, 0.2);
        }

        .skills__card:hover::before {
          transform: scaleX(1);
        }

        .skills__card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          margin-bottom: 20px;
          color: var(--skills-accent-dark);
          background: rgba(132, 204, 22, 0.14);
          border-radius: 14px;
          transition: background 0.35s ease, color 0.35s ease,
            transform 0.35s ease;
        }

        .skills__card:hover .skills__card-icon {
          color: var(--skills-text);
          background: var(--skills-accent);
          transform: scale(1.06) rotate(-4deg);
        }

        .skills__card-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--skills-text);
        }

        .skills__card-title::after {
          content: "";
          display: block;
          width: 36px;
          height: 3px;
          margin: 14px 0 18px;
          background: var(--skills-accent);
          border-radius: 2px;
        }

        /* ---------- Skill rows ---------- */
        .skills__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .skills__item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px 8px 8px;
          background: var(--skills-surface);
          border: 1px solid transparent;
          border-radius: 12px;
          transition: transform 0.3s ease, background 0.3s ease,
            border-color 0.3s ease;
        }

        .skills__item:hover {
          transform: translateX(4px);
          background: rgba(132, 204, 22, 0.1);
          border-color: rgba(132, 204, 22, 0.35);
        }

        .skills__mark {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          min-width: 38px;
          height: 34px;
          padding: 0 6px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.3px;
          color: var(--skills-text);
          background: var(--skills-bg);
          border: 1px solid var(--skills-border);
          border-radius: 9px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .skills__item:hover .skills__mark {
          background: var(--skills-accent);
          border-color: var(--skills-accent);
        }

        .skills__name {
          min-width: 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--skills-text);
          overflow-wrap: anywhere;
        }

        /* ---------- Entrance animation ---------- */
        .skills__header,
        .skills__card {
          opacity: 0;
        }

        .skills--visible .skills__header,
        .skills--visible .skills__card {
          opacity: 1;
        }

        .skills--visible .skills__header {
          animation: skills-rise 0.7s ease backwards;
        }

        /* "backwards" (not "both") so the card's hover transform still works
           after the entrance animation has finished */
        .skills--visible .skills__card {
          animation: skills-rise 0.7s ease backwards;
        }

        .skills--visible .skills__card:nth-child(1) { animation-delay: 0.15s; }
        .skills--visible .skills__card:nth-child(2) { animation-delay: 0.25s; }
        .skills--visible .skills__card:nth-child(3) { animation-delay: 0.35s; }
        .skills--visible .skills__card:nth-child(4) { animation-delay: 0.45s; }

        @keyframes skills-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 1100px) {
          .skills__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 992px) {
          .skills {
            padding: 80px 0;
          }

          .skills__header {
            margin-bottom: 48px;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .skills {
            padding: 56px 0;
          }

          .skills__container {
            padding: 0 20px;
          }

          .skills__header {
            margin-bottom: 36px;
          }

          .skills__eyebrow {
            margin-bottom: 12px;
            font-size: 0.78rem;
            letter-spacing: 2px;
          }

          .skills__eyebrow::before,
          .skills__eyebrow::after {
            width: 24px;
          }

          .skills__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
          }

          .skills__card {
            padding: 22px 18px 18px;
          }

          .skills__card-icon {
            width: 46px;
            height: 46px;
            margin-bottom: 16px;
          }

          .skills__card-title {
            font-size: 1.1rem;
          }

          .skills__card-title::after {
            margin: 12px 0 16px;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .skills *,
          .skills *::before {
            animation: none !important;
            transition: none !important;
          }

          .skills__header,
          .skills__card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

            <section
                id="skills"
                ref={sectionRef}
                className={`skills ${isVisible ? "skills--visible" : ""}`}
                aria-labelledby="skills-heading"
            >
                <div className="skills__container">
                    <div className="skills__header">
                        <p className="skills__eyebrow">Skills</p>

                        <h2 id="skills-heading" className="skills__title">
                            My <span>Technical</span> Skills
                        </h2>

                        <p className="skills__subtitle">
                            The languages, databases, frameworks and tools I use to design,
                            build and ship backend-driven applications.
                        </p>
                    </div>

                    <ul className="skills__grid" role="list">
                        {SKILL_CATEGORIES.map((category) => (
                            <li key={category.title} className="skills__card">
                                <div className="skills__card-icon">{category.icon}</div>

                                <h3 className="skills__card-title">{category.title}</h3>

                                <ul
                                    className="skills__list"
                                    role="list"
                                    aria-label={`${category.title} skills`}
                                >
                                    {category.items.map((skill) => (
                                        <li key={skill.name} className="skills__item">
                                            <span className="skills__mark" aria-hidden="true">
                                                {skill.mark}
                                            </span>
                                            <span className="skills__name">{skill.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Skills;