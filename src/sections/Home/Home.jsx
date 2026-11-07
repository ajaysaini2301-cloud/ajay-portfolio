import { useEffect, useState } from "react";

// ---- PROFILE IMAGE -------------------------------------------------------
// To use your own photo:
// 1. Save it as src/assets/profile.jpg
// 2. Uncomment the import below
// 3. Replace the PROFILE_IMAGE line with: const PROFILE_IMAGE = profileImg;
// import profileImg from "../../assets/profile.jpg";

const PLACEHOLDER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480">
  <rect width="400" height="480" fill="#F4F4F5"/>
  <circle cx="200" cy="180" r="76" fill="#D4D4D8"/>
  <path d="M60 480c0-96 62-160 140-160s140 64 140 160z" fill="#D4D4D8"/>
</svg>`;

const PROFILE_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  PLACEHOLDER_SVG
)}`;

const TECHNOLOGIES = [
  "Python",
  "Flask",
  "PostgreSQL",
  "MySQL",
  "React.js",
  "JavaScript",
];

function Home() {
  // Triggers the entrance animation after the first render
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <style>{`
        /* Fix: make every element inside the hero include padding/border in its width */
        .hero,
        .hero *,
        .hero *::before,
        .hero *::after {
          box-sizing: border-box;
        }

        .hero {
          --hero-bg: var(--nav-bg, #FFFFFF);
          --hero-text: var(--nav-text, #171717);
          --hero-accent: var(--nav-accent, #84CC16);
          --hero-accent-dark: var(--nav-accent-dark, #65A30D);
          --hero-muted: rgba(23, 23, 23, 0.68);

          display: flex;
          align-items: center;
          width: 100%;
          min-height: calc(100vh - var(--nav-height, 72px));
          background: var(--hero-bg);
          color: var(--hero-text);
          padding: 48px 0;
          overflow: hidden;
          scroll-margin-top: var(--nav-height, 72px);
          text-align: left;
        }

        .hero__container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          gap: 64px;
        }

        .hero__container > * {
          min-width: 0;
        }

        /* ---------- Left column ---------- */
        .hero__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--hero-accent-dark);
        }

        .hero__eyebrow::before {
          content: "";
          width: 36px;
          height: 2px;
          background: var(--hero-accent);
        }

        .hero__name {
          margin: 0;
          font-size: clamp(2.6rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1px;
          color: var(--hero-text);
          overflow-wrap: anywhere;
        }

        .hero__role {
          margin: 12px 0 0;
          font-size: clamp(1.3rem, 2.6vw, 1.9rem);
          font-weight: 600;
          color: var(--hero-accent-dark);
        }

        .hero__intro {
          max-width: 520px;
          margin: 20px 0 0;
          font-size: clamp(1rem, 1.6vw, 1.1rem);
          line-height: 1.75;
          color: var(--hero-muted);
        }

        /* Technology chips */
        .hero__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 28px 0 0;
          padding: 0;
          list-style: none;
        }

        .hero__tech-item {
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--hero-text);
          background: rgba(132, 204, 22, 0.12);
          border: 1px solid rgba(132, 204, 22, 0.35);
          border-radius: 999px;
          transition: background 0.3s ease, transform 0.3s ease,
            border-color 0.3s ease;
        }

        .hero__tech-item:hover {
          background: rgba(132, 204, 22, 0.25);
          border-color: var(--hero-accent);
          transform: translateY(-3px);
        }

        /* Buttons */
        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 36px;
        }

        .hero__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          padding: 14px 32px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          border-radius: 999px;
          border: 2px solid var(--hero-accent);
          transition: background 0.3s ease, color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .hero__btn--primary {
          color: var(--hero-text);
          background: var(--hero-accent);
        }

        .hero__btn--primary:hover,
        .hero__btn--primary:focus-visible {
          background: var(--hero-accent-dark);
          border-color: var(--hero-accent-dark);
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(132, 204, 22, 0.4);
        }

        .hero__btn--outline {
          color: var(--hero-text);
          background: transparent;
        }

        .hero__btn--outline:hover,
        .hero__btn--outline:focus-visible {
          background: var(--hero-accent);
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(132, 204, 22, 0.3);
        }

        .hero a:focus-visible {
          outline: 2px solid var(--hero-accent-dark);
          outline-offset: 3px;
        }

        /* ---------- Right column ---------- */
        .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Wrapper that sizes the photo, shape and badge together */
        .hero__media {
          position: relative;
          width: 78%;
          max-width: 360px;
          aspect-ratio: 5 / 6;
        }

        .hero__shape {
          position: absolute;
          inset: 0;
          background: var(--hero-accent);
          border-radius: 28px;
          transform: translate(22px, 22px) rotate(4deg);
          opacity: 0.9;
          transition: transform 0.5s ease;
        }

        .hero__frame {
          position: relative;
          width: 100%;
          height: 100%;
          margin: 0;
          overflow: hidden;
          background: #F4F4F5;
          border: 6px solid var(--hero-bg);
          border-radius: 28px;
          box-shadow: 0 24px 48px rgba(23, 23, 23, 0.14);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .hero__image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero__visual:hover .hero__frame {
          transform: translateY(-8px);
          box-shadow: 0 32px 60px rgba(23, 23, 23, 0.18);
        }

        .hero__visual:hover .hero__shape {
          transform: translate(14px, 14px) rotate(2deg);
        }

        /* Badge is anchored to the photo wrapper, so it stays put at every width */
        .hero__badge {
          position: absolute;
          left: -8%;
          bottom: 9%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          color: var(--hero-text);
          background: var(--hero-bg);
          border-radius: 999px;
          box-shadow: 0 10px 28px rgba(23, 23, 23, 0.14);
          animation: hero-float 4s ease-in-out infinite;
        }

        .hero__badge-dot {
          flex-shrink: 0;
          width: 10px;
          height: 10px;
          background: var(--hero-accent);
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(132, 204, 22, 0.25);
        }

        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ---------- Entrance animation ---------- */
        .hero__content > *,
        .hero__visual {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .hero--loaded .hero__content > *,
        .hero--loaded .hero__visual {
          opacity: 1;
          transform: translateY(0);
        }

        .hero--loaded .hero__content > *:nth-child(1) { transition-delay: 0.05s; }
        .hero--loaded .hero__content > *:nth-child(2) { transition-delay: 0.15s; }
        .hero--loaded .hero__content > *:nth-child(3) { transition-delay: 0.25s; }
        .hero--loaded .hero__content > *:nth-child(4) { transition-delay: 0.35s; }
        .hero--loaded .hero__content > *:nth-child(5) { transition-delay: 0.45s; }
        .hero--loaded .hero__content > *:nth-child(6) { transition-delay: 0.55s; }
        .hero--loaded .hero__visual { transition-delay: 0.3s; }

        /* ---------- Tablet ---------- */
        @media (max-width: 992px) {
          .hero {
            min-height: auto;
            padding: 48px 0 64px;
          }

          .hero__container {
            grid-template-columns: minmax(0, 1fr);
            gap: 56px;
            text-align: center;
          }

          /* Text first, image below (natural source order) */
          .hero__media {
            width: 60%;
            max-width: 320px;
          }

          .hero__content {
            align-items: center;
          }

          .hero__intro {
            margin-left: auto;
            margin-right: auto;
          }

          .hero__tech,
          .hero__actions {
            justify-content: center;
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 576px) {
          .hero {
            padding: 32px 0 56px;
          }

          .hero__container {
            padding: 0 20px;
            gap: 48px;
          }

          .hero__eyebrow {
            margin-bottom: 12px;
            font-size: 0.78rem;
            letter-spacing: 2px;
          }

          .hero__eyebrow::before {
            width: 24px;
          }

          .hero__name {
            font-size: 2.5rem;
            letter-spacing: -0.5px;
          }

          .hero__role {
            margin-top: 10px;
            font-size: 1.25rem;
          }

          .hero__intro {
            margin-top: 16px;
            font-size: 0.97rem;
            line-height: 1.7;
          }

          .hero__tech {
            gap: 8px;
            margin-top: 24px;
          }

          .hero__tech-item {
            padding: 6px 14px;
            font-size: 0.8rem;
          }

          /* Buttons stack vertically and stay inside the screen */
          .hero__actions {
            flex-direction: column;
            width: 100%;
            max-width: 360px;
            gap: 12px;
            margin-top: 28px;
          }

          .hero__btn {
            width: 100%;
            padding: 14px 24px;
          }

          .hero__media {
            width: 70%;
            max-width: 280px;
          }

          .hero__shape {
            border-radius: 22px;
            transform: translate(14px, 14px) rotate(4deg);
          }

          .hero__frame {
            border-width: 5px;
            border-radius: 22px;
          }

          .hero__badge {
            left: -6%;
            bottom: 8%;
            padding: 8px 14px;
            font-size: 0.75rem;
          }
        }

        /* ---------- Very small phones ---------- */
        @media (max-width: 360px) {
          .hero__container {
            padding: 0 16px;
          }

          .hero__name {
            font-size: 2.2rem;
          }

          .hero__media {
            width: 74%;
          }
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .hero *,
          .hero *::before {
            animation: none !important;
            transition: none !important;
          }

          .hero__content > *,
          .hero__visual {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section
        id="home"
        className={`hero ${isLoaded ? "hero--loaded" : ""}`}
        aria-labelledby="hero-heading"
      >
        <div className="hero__container">
          {/* Left column */}
          <div className="hero__content">
            <p className="hero__eyebrow">Hello, I&apos;m</p>

            <h1 id="hero-heading" className="hero__name">
              Ajay Saini
            </h1>

            <p className="hero__role">Backend Developer</p>

            <p className="hero__intro">
              I design and build reliable, scalable backend systems and clean
              APIs. I turn complex requirements into fast, secure and
              maintainable web applications, from database design to a
              polished user interface.
            </p>

            <ul className="hero__tech" aria-label="Technologies I work with">
              {TECHNOLOGIES.map((tech) => (
                <li key={tech} className="hero__tech-item">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="hero__actions">
              <a href="#projects" className="hero__btn hero__btn--primary">
                View My Work
              </a>
              <a href="#contact" className="hero__btn hero__btn--outline">
                Hire Me
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="hero__visual">
            <div className="hero__media">
              <div className="hero__shape" aria-hidden="true" />

              <figure className="hero__frame">
                <img
                  className="hero__image"
                  src={PROFILE_IMAGE}
                  alt="Portrait of Ajay Saini, Backend Developer"
                  width="400"
                  height="480"
                />
              </figure>

              <div className="hero__badge" aria-hidden="true">
                <span className="hero__badge-dot" />
                Available for work
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;