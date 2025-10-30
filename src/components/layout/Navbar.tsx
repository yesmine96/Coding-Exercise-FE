import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import type { NavLink } from "../../types/nav";

const navLinks: NavLink[] = [
  { label: "Calendar", href: "/" },
  { label: "Add event", href: "/calendar/add" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    // Close mobile menu on window resize or Escape key press
    const DESKTOP_BREAKPOINT = 768;

    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) closeMenu();
    };
    window.addEventListener("resize", handleResize);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKey);
    };
  }, [closeMenu]);

  return (
    <header
      className={clsx(
        "bg-secondary text-white shadow-md z-50 fixed w-full",
        isOpen ? "h-screen" : "h-auto"
      )}
    >
      <nav className=" w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8">
          <Link to="/" className="flex items-center">
            <Logo className="xl:w-72 w-54" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 text-xl font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={toggleMenu}
            className="relative w-8 h-6 flex flex-col justify-between items-center focus:outline-none md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={clsx(
                "block bg-primary w-full h-0.5 transition-transform duration-300",
                { "rotate-45 absolute top-1/2 -translate-y-1/2": isOpen }
              )}
            />

            <span
              className={clsx(
                "block bg-primary w-full h-0.5 transition-all duration-300",
                { hidden: isOpen }
              )}
            />

            <span
              className={clsx(
                "block bg-primary w-full h-0.5 transition-transform duration-300",
                { "-rotate-45 absolute top-1/2 -translate-y-1/2": isOpen }
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden bg-secondary",
          isOpen ? "h-full opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 text-xl font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={closeMenu}
              className="block text-gray-200 hover:text-gray-400 border-t border-gray-800 py-4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
