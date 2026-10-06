"use client";
import { useState } from "react";
import { navigation } from "@/data/content";
import { Wordmark, Arrow } from "./ui";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a
        className="logo-link"
        href="#inicio"
        title="Volver al inicio"
        onClick={() => setOpen(false)}
      >
        <Wordmark />
      </a>
      <nav className="desktop-nav" aria-label="Principal">
        {navigation.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contacto">
        Empezar <Arrow diagonal />
      </a>
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
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
              <Arrow diagonal />
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)}>
            Cuéntame tu objetivo <Arrow diagonal />
          </a>
        </nav>
      )}
    </header>
  );
}
