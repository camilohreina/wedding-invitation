"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  guestName?: string
}

export function HeroSection({ guestName }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/images/hero-wedding.jpg"
          alt="Escenario elegante de boda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {guestName && (
          <p
            className="mb-6 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em] text-gold-light/80 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Querido(a) {guestName}
          </p>
        )}
        <p
          className="mb-4 font-[family-name:var(--font-montserrat)] text-sm font-light uppercase tracking-[0.4em] text-cream opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          Nos casamos
        </p>
        <h1
          className="mb-2 text-6xl font-light leading-tight text-cream opacity-0 animate-fade-in-up md:text-8xl lg:text-9xl"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          Camilo
        </h1>
        <p
          className="mb-2 font-[family-name:var(--font-montserrat)] text-lg font-light tracking-[0.3em] text-gold-light opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
        >
          &
        </p>
        <h1
          className="mb-8 text-6xl font-light leading-tight text-cream opacity-0 animate-fade-in-up md:text-8xl lg:text-9xl"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          Jennifer
        </h1>
        <div
          className="flex flex-col items-center gap-2 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
        >
          <div className="h-px w-16 bg-gold-light" />
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-light tracking-[0.3em] text-cream/80">
            26 de Septiembre, 2026
          </p>
          <div className="h-px w-16 bg-gold-light" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-cream/70" />
      </div>
    </section>
  )
}
