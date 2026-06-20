"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeaderBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinksLeft = [
    { name: "SPEAKER", href: "#speaker" },
    { name: "KIPAS", href: "#kipas" },
    { name: "KOMPOR", href: "#kompor" },
    { name: "GRILL", href: "#grill" },
  ];

  const navLinksRight = [
    { name: "PRODUK", href: "#product-list" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent py-6 border-none transition-all duration-500 ease-in-out"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left section: Logo & Main Navigation */}
          <div className="flex items-center gap-10 lg:gap-14">
            {/* GMC Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <Image
                src="/logo_icon.png"
                alt="GMC Icon"
                width={36}
                height={36}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/logo_text.png"
                alt="GMC Text"
                width={85}
                height={22}
                className="object-contain brightness-110"
              />
            </Link>

            {/* Left Nav Items */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinksLeft.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[12px] lg:text-[13px] font-bold tracking-widest text-white/80 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right section: Secondary Navigation & Search */}
          <div className="flex items-center gap-4 lg:gap-8">
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinksRight.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[12px] lg:text-[13px] font-bold tracking-widest text-white/80 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}
            </nav>

            {/* Search Icon (Typography & Icon rule: styled circle with magnifying glass inside) */}
            <button
              aria-label="Search"
              className="relative group p-2 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z"
                />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/85 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full justify-center px-10 space-y-8 text-center">
          <div className="flex flex-col gap-6">
            {[...navLinksLeft, ...navLinksRight].map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold tracking-widest text-white/80 hover:text-white transition-colors duration-300"
                style={{
                  transitionDelay: `${idx * 50}ms`,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transitionProperty: "transform, opacity",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
