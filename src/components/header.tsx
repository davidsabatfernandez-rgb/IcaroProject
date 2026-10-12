"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navigation } from "@/data/content";
import { Wordmark, Arrow } from "./ui";
import { EnquiryLink } from "./enquiry-link";
export function Header() {
  const [open, setOpen] = useState(false);
  const isHome = usePathname() === "/";
  const destination = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;
  return (
    <header className="header">
      <a
        className="logo-link"
        href={isHome ? "#inicio" : "/#inicio"}
        title="Volver al inicio"
        onClick={() => setOpen(false)}
      >
        <Wordmark />
      </a>
      <nav className="desktop-nav" aria-label="Principal">
        {navigation.map((n) => (
          <Link key={n.href} href={destination(n.href)}>
            {n.label}
          </Link>
        ))}
      </nav>
      <EnquiryLink className="header-cta" interest="coaching" source="header">
        Empieza tu preparación <Arrow diagonal />
      </EnquiryLink>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen(!open)}
      >
        <span className={open ? "cross" : ""} />
        <span className={open ? "cross" : ""} />
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Navegación móvil"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={destination(n.href)}
              onClick={() => setOpen(false)}
            >
              {n.label}
              <Arrow diagonal />
            </Link>
          ))}
          <EnquiryLink interest="coaching" source="header-mobile">
            Empieza tu preparación <Arrow diagonal />
          </EnquiryLink>
        </nav>
      )}
    </header>
  );
}
