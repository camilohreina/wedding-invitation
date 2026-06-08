"use client"

import { useEffect, useState } from "react"

const NAV_ITEMS = [
  { label: "Inicio", href: "#" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Detalles", href: "#detalles" },
  { label: "Galeria", href: "#galeria" },
  { label: "Confirmar", href: "#rsvp" },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-foreground/90 py-3 shadow-lg backdrop-blur-md"
        : "bg-transparent py-5"
        }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <a
          href="#"
          className="text-lg font-light text-cream transition-opacity hover:opacity-80"
        >
          {"Jennifer & Camilo"}
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-[family-name:var(--font-montserrat)] text-[11px] font-light uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#rsvp"
          className="border border-gold-light/40 px-4 py-1.5 font-[family-name:var(--font-montserrat)] text-[10px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold-light/10 md:hidden"
        >
          RSVP
        </a>
      </div>
    </nav>
  )
}
