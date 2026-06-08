"use client"

import { useInView } from "@/hooks/use-in-view"

interface WelcomeSectionProps {
  guestName?: string
}

export function WelcomeSection({ guestName }: WelcomeSectionProps) {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="px-4 py-20 text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        {guestName && (
          <p
            className={`mb-6 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em] text-muted-foreground transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "100ms" }}
          >
            Querido(a) {guestName}
          </p>
        )}
        <p
          className={`mb-4 font-[family-name:var(--font-montserrat)] text-sm font-light uppercase tracking-[0.4em] text-foreground transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          Nos casamos
        </p>
        <h1
          className={`mb-2 font-[family-name:var(--font-great-vibes)] text-7xl font-normal leading-tight text-foreground transition-all duration-1000 md:text-8xl lg:text-9xl ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          style={{ transitionDelay: "600ms" }}
        >
          Jennifer
        </h1>
        <p
          className={`mb-2 font-[family-name:var(--font-great-vibes)]  text-lg font-light tracking-[0.3em] text-gold transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          style={{ transitionDelay: "900ms" }}
        >
          &
        </p>
        <h1
          className={`mb-8 font-[family-name:var(--font-great-vibes)] text-7xl font-normal leading-tight text-foreground transition-all duration-1000 md:text-8xl lg:text-9xl ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          style={{ transitionDelay: "1200ms" }}
        >
          Camilo
        </h1>
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          style={{ transitionDelay: "1600ms" }}
        >
          <div className="h-px w-16 bg-gold" />
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-light tracking-[0.3em] text-muted-foreground">
            26 de Septiembre, 2026
          </p>
          <div className="h-px w-16 bg-gold" />
        </div>
      </div>
    </section>
  )
}
