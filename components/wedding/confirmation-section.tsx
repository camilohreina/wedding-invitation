"use client"

import { useInView } from "@/hooks/use-in-view"

export function ConfirmationSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="rsvp" ref={ref} className="bg-cream-dark px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <div
          className={`transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Asistencia
          </p>
          <h2 className="mb-8 text-4xl font-light text-foreground md:text-5xl">
            Confirmar asistencia
          </h2>

          <div className="mx-auto max-w-xl">
            <p className="font-[family-name:var(--font-montserrat)] text-sm font-normal leading-relaxed text-muted-foreground">
              Con el propósito de cuidar cada detalle de nuestra celebración, nos comunicaremos telefónicamente para confirmar la asistencia de cada uno de nuestros invitados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
