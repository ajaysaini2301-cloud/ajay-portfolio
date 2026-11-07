import { useEffect, useRef, useState } from "react";

// ---- PROJECT DATA --------------------------------------------------------
// liveUrl / githubUrl: paste your real links between the quotes.
//   Empty ("") shows a muted "coming soon" button.
// image: to use a real screenshot, import it at the top of this file, e.g.
//   import clinicImg from "../../assets/clinic.png";
//   and set image: clinicImg
// tech: please check these match what you actually used.
const PROJECTS = [
  {
    title: "Clinic Management System",
    description:
      "A management system for handling clinic records and day-to-day operations, built around a structured database and a clean backend.",
    tech: ["Python", "Flask", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    image: null,
  },
  {
    title: "Todo App",
    description:
      "A simple, responsive task manager for adding, completing and organizing everyday tasks.",
    tech: ["React.js", "JavaScript", "CSS"],
    liveUrl: "",
    githubUrl: "https://github.com/ajaysaini2301-cloud/todo-app",
    image: null,
  },
  {
    title: "Typing Test",
    description:
      "An interactive typing test that helps users practice and check their typing skills in the browser.",
    tech: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://typing-test-7iiy.vercel.app/",
    githubUrl: "https://github.com/ajaysaini2301-cloud/typing-test",
    image: null,
  },
  {
    title: "Calculator",
    description:
      "A clean, responsive calculator for everyday arithmetic, built with a focus on simple and clear UI.",
    tech: ["JavaScript", "HTML", "CSS"],
    liveUrl: "",
    githubUrl: "",
    image: null,
  },
];

// Built-in screenshot placeholder (browser window illustration)
const PLACEHOLDER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">
  <rect width="640" height="400" fill="#F4F4F5"/>
  <rect x="64" y="52" width="512" height="296" rx="14" fill="#FFFFFF" stroke="#E4E4E7" stroke-width="2"/>
  <path d="M64 66a14 14 0 0 1 14-14h484a14 14 0 0 1 14 14v26H64z" fill="#E4E4E7"/>
  <circle cx="90" cy="72" r="6" fill="#84CC16"/>
  <circle cx="110" cy="72" r="6" fill="#D4D4D8"/>
  <circle cx="130" cy="72" r="6" fill="#D4D4D8"/>
  <rect x="96" y="124" width="200" height="16" rx="8" fill="#D4D4D8"/>
  <rect x="96" y="156" width="300" height="10" rx="5" fill="#E4E4E7"/>
  <rect x="96" y="178" width="260" height="10" rx="5" fill="#E4E4E7"/>
  <rect x="96" y="222" width="110" height="34" rx="17" fill="#84CC16"/>
  <rect x="420" y="124" width="130" height="132" rx="12" fill="#ECFCCB"/>
</svg>`;

const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  PLACEHOLDER_SVG
)}`;

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const ExternalIcon = () => (
  <svg {...iconProps}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CodeIcon = () => (
  <svg {...iconProps}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// Renders a real link when a URL exists, otherwise a muted "coming soon" button
function ProjectButton({ url, label, title, variant, icon }) {
  const className = `projects__btn projects__btn--${variant}`;

  if (!url) {
    return (
      <span
        className={`${className} projects__btn--disabled`}
        role="link"
        aria-disabled="true"
        title={`${label} link coming soon`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} for ${title} (opens in a new tab)`}
    >
      {icon}
      {label}
    </a>
  );
}

function Projects() {
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
        .projects,
        .projects *,
        .projects *::before,
        .projects *::after {
          box-sizing: border-box;
        }

        .projects {
          --projects-bg: var(--nav-bg, #FFFFFF);
          --projects-text: var(--nav-text, #171717);
          --projects-accent: var(--nav-accent, #84CC16);
          --projects-accent-dark: var(--nav-accent-dark, #65A30D);
          --projects-muted: rgba(23, 23, 23, 0.68);
          --projects-border: rgba(23, 23, 23, 0.08);

          width: 100%;
          padding: 96px 0;
          background: var(--projects-bg);
          color: var(--projects-text);
          overflow: hidden;
          scroll-margin-top: var(--nav-height, 72px);
          text-align: left;
        }

        .projects__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- Header ---------- */
        .projects__header {
          max-width: 640px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .projects__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--projects-accent-dark);
        }

        .projects__eyebrow::before,
        .projects__eyebrow::after {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--projects-accent);
        }

        .projects__title {
          margin: 0 0 16px;
          font-size: clamp(1.9rem, 4vw, 2.9rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: var(--projects-text);
        }

        .projects__title span {
          color: var(--projects-accent-dark);
        }

        .projects__subtitle {
          margin: 0;
          font-size: clamp(0.97rem, 1.5vw, 1.05rem);
          line-height: 1.7;
          color: var(--projects-muted);
        }

        /* ---------- Cards grid ---------- */
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .projects__card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          background: var(--projects-bg);
          border: 1px solid var(--projects-border);
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(23, 23, 23, 0.05);
          transition: transform 0.35s ease, border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .projects__card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          width: 100%;
          height: 4px;
          background: var(--projects-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .projects__card:hover {
          transform: translateY(-6px);
          border-color: rgba(132, 204, 22, 0.55);
          box-shadow: 0 18px 36px rgba(132, 204, 22, 0.2);
        }

        .projects__card:hover::before {
          transform: scaleX(1);
        }

        /* Screenshot */
        .projects__thumb {
          position: relative;
          margin: 0;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #F4F4F5;
          border-bottom: 1px solid var(--projects-border);
        }

        .projects__image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .projects__card:hover .projects__image {
          transform: scale(1.05);
        }

        /* Body */
        .projects__body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 26px 26px 28px;
        }

        .projects__card-title {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--projects-text);
        }

        .projects__card-title::after {
          content: "";
          display: block;
          width: 36px;
          height: 3px;
          margin: 14px 0 16px;
          background: var(--projects-accent);
          border-radius: 2px;
        }

        .projects__text {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--projects-muted);
        }

        /* Tech badges */
        .projects__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
        }

        .projects__tech-item {
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--projects-text);
          background: rgba(132, 204, 22, 0.12);
          border: 1px solid rgba(132, 204, 22, 0.35);
          border-radius: 999px;
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease;
        }

        .projects__tech-item:hover {
          background: rgba(132, 204, 22, 0.25);
          border-color: var(--projects-accent);
          transform: translateY(-2px);
        }

        /* Buttons (pushed to the bottom so rows line up) */
        .projects__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
          padding-top: 24px;
        }

        .projects__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 24px;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          border-radius: 999px;
          border: 2px solid var(--projects-accent);
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease;
        }

        .projects__btn--primary {
          color: var(--projects-text);
          background: var(--projects-accent);
        }

        .projects__btn--outline {
          color: var(--projects-text);
          background: transparent;
        }

        .projects__btn--primary:not(.projects__btn--disabled):hover,
        .projects__btn--primary:not(.projects__btn--disabled):focus-visible {
          background: var(--projects-accent-dark);
          border-color: var(--projects-accent-dark);
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(132, 204, 22, 0.4);
        }

        .projects__btn--outline:not(.projects__btn--disabled):hover,
        .projects__btn--outline:not(.projects__btn--disabled):focus-visible {
          background: var(--projects-accent);
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(132, 204, 22, 0.3);
        }

        /* Placeholder state: no link yet */
        .projects__btn--disabled {
          opacity: 0.55;
          cursor: not-allowed;
          user-select: none;
        }

        .projects a:focus-visible {
          outline: 2px solid var(--projects-accent-dark);
          outline-offset: 3px;
        }

        /* ---------- Entrance animation ---------- */
        .projects__header,
        .projects__card {
          opacity: 0;
        }

        .projects--visible .projects__header,
        .projects--visible .projects__card {
          opacity: 1;
          /* "backwards" (not "both") so the hover transform still works
             after the entrance animation finishes */
          animation: projects-rise 0.7s ease backwards;
        }

        .projects--visible .projects__card:nth-child(1) { animation-delay: 0.15s; }
        .projects--visible .projects__card:nth-child(2) { animation-delay: 0.25s; }
        .projects--visible .projects__card:nth-child(3) { animation-delay: 0.35s; }
        .projects--visible .projects__card:nth-child(4) { animation-delay: 0.45s; }

        @keyframes projects-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 992px) {
          .projects {
            padding: 80px 0;
          }

          .projects__header {
            margin-bottom: 48px;
          }

          .projects__grid {
            gap: 24px;
          }

          .projects__body {
            padding: 22px 20px 24px;
          }

          .projects__card-title {
            font-size: 1.15rem;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .projects {
            padding: 56px 0;
          }

          .projects__container {
            padding: 0 20px;
          }

          .projects__header {
            margin-bottom: 36px;
          }

          .projects__eyebrow {
            margin-bottom: 12px;
            font-size: 0.78rem;
            letter-spacing: 2px;
          }

          .projects__eyebrow::before,
          .projects__eyebrow::after {
            width: 24px;
          }

          .projects__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
          }

          .projects__body {
            padding: 20px 18px 22px;
          }

          .projects__actions {
            gap: 10px;
          }

          .projects__btn {
            flex: 1 1 0;
            min-width: 0;
            padding: 11px 14px;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .projects *,
          .projects *::before {
            animation: none !important;
            transition: none !important;
          }

          .projects__header,
          .projects__card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className={`projects ${isVisible ? "projects--visible" : ""}`}
        aria-labelledby="projects-heading"
      >
        <div className="projects__container">
          <div className="projects__header">
            <p className="projects__eyebrow">Projects</p>

            <h2 id="projects-heading" className="projects__title">
              My <span>Recent</span> Projects
            </h2>

            <p className="projects__subtitle">
              A selection of projects that show how I plan, build and polish
              web applications, from backend logic to the interface.
            </p>
          </div>

          <ul className="projects__grid" role="list">
            {PROJECTS.map((project) => (
              <li key={project.title} className="projects__card">
                <figure className="projects__thumb">
                  <img
                    className="projects__image"
                    src={project.image || PLACEHOLDER_IMAGE}
                    alt={`${project.title} screenshot`}
                    width="640"
                    height="400"
                    loading="lazy"
                  />
                </figure>

                <div className="projects__body">
                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__text">{project.description}</p>

                  <ul
                    className="projects__tech"
                    role="list"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.tech.map((tech) => (
                      <li key={tech} className="projects__tech-item">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="projects__actions">
                    <ProjectButton
                      url={project.liveUrl}
                      label="Live Demo"
                      title={project.title}
                      variant="primary"
                      icon={<ExternalIcon />}
                    />
                    <ProjectButton
                      url={project.githubUrl}
                      label="GitHub"
                      title={project.title}
                      variant="outline"
                      icon={<CodeIcon />}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Projects;