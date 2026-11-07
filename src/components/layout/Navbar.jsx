import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const MOBILE_BREAKPOINT = 768;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close menu with Escape key, and when resizing to desktop width
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --nav-bg: #FFFFFF;
          --nav-text: #171717;
          --nav-accent: #84CC16;
          --nav-accent-dark: #65A30D;
          --nav-height: 72px;
        }

        html {
          scroll-behavior: smooth;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: var(--nav-bg);
          color: var(--nav-text);
          border-bottom: 1px solid rgba(23, 23, 23, 0.08);
          box-shadow: 0 2px 12px rgba(23, 23, 23, 0.04);
        }

        .navbar__container {
          max-width: 1200px;
          height: var(--nav-height);
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          box-sizing: border-box;
        }

        /* Logo */
        .navbar__logo {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--nav-text);
          text-decoration: none;
          white-space: nowrap;
        }

        .navbar__logo span {
          color: var(--nav-accent);
        }

        /* Links */
        .navbar__menu {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar__link {
          position: relative;
          display: inline-block;
          padding: 8px 14px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--nav-text);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .navbar__link::after {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 2px;
          height: 2px;
          background: var(--nav-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .navbar__link:hover,
        .navbar__link:focus-visible {
          color: var(--nav-accent-dark);
        }

        .navbar__link:hover::after,
        .navbar__link:focus-visible::after {
          transform: scaleX(1);
        }

        /* Hire Me button */
        .navbar__cta {
          display: inline-block;
          padding: 10px 22px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--nav-text);
          background: var(--nav-accent);
          border: 2px solid var(--nav-accent);
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.3s ease, transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .navbar__cta:hover,
        .navbar__cta:focus-visible {
          background: var(--nav-accent-dark);
          border-color: var(--nav-accent-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(132, 204, 22, 0.35);
        }

        .navbar__cta--mobile {
          display: none;
        }

        /* Focus outlines for accessibility */
        .navbar a:focus-visible,
        .navbar__toggle:focus-visible {
          outline: 2px solid var(--nav-accent-dark);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* Hamburger */
        .navbar__toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          box-sizing: border-box;
        }

        .navbar__bar {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--nav-text);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .navbar__toggle.open .navbar__bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .navbar__toggle.open .navbar__bar:nth-child(2) {
          opacity: 0;
        }
        .navbar__toggle.open .navbar__bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Tablet and mobile */
        @media (max-width: 768px) {
          .navbar__toggle {
            display: flex;
          }

          .navbar__cta--desktop {
            display: none;
          }

          .navbar__menu {
            position: absolute;
            top: var(--nav-height);
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 0 24px;
            background: var(--nav-bg);
            border-bottom: 1px solid rgba(23, 23, 23, 0.08);
            box-shadow: 0 12px 24px rgba(23, 23, 23, 0.08);
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
            transition: max-height 0.4s ease, opacity 0.3s ease,
              padding 0.3s ease, visibility 0.4s;
          }

          .navbar__menu.open {
            max-height: 500px;
            opacity: 1;
            padding: 12px 24px 24px;
            visibility: visible;
          }

          .navbar__link {
            display: block;
            padding: 14px 4px;
            font-size: 1.05rem;
            border-bottom: 1px solid rgba(23, 23, 23, 0.06);
          }

          .navbar__link::after {
            left: 4px;
            right: auto;
            width: 40px;
            bottom: 8px;
          }

          .navbar__cta--mobile {
            display: block;
            margin-top: 16px;
            text-align: center;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          :root {
            --nav-height: 64px;
          }

          .navbar__container {
            padding: 0 16px;
          }

          .navbar__logo {
            font-size: 1.15rem;
            letter-spacing: 1px;
          }

          .navbar__menu {
            padding: 0 16px;
          }

          .navbar__menu.open {
            padding: 8px 16px 20px;
          }
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .navbar *,
          .navbar *::after {
            transition: none !important;
          }
        }
      `}</style>

      <header className="navbar">
        <nav className="navbar__container" aria-label="Main navigation">
          {/* Logo */}
          <a href="#home" className="navbar__logo" onClick={closeMenu}>
            AJAY <span>SAINI</span>
          </a>

          {/* Navigation links */}
          <ul id="primary-menu" className={`navbar__menu ${isOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar__link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="navbar__cta navbar__cta--mobile"
                onClick={closeMenu}
              >
                Hire Me
              </a>
            </li>
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className="navbar__cta navbar__cta--desktop">
            Hire Me
          </a>

          {/* Hamburger button */}
          <button
            type="button"
            className={`navbar__toggle ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="primary-menu"
          >
            <span className="navbar__bar" />
            <span className="navbar__bar" />
            <span className="navbar__bar" />
          </button>
        </nav>
      </header>
    </>
  );
}

export default Navbar;