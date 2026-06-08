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
          src="/images/Foto-83.jpg"
          alt="Escenario elegante de boda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Gradient overlay placed outside parallax to ensure seamless transition */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent z-10" />



      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-foreground/60" />
      </div>
    </section>
  )
}
