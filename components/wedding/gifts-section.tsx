"use client"

import { useInView } from "@/hooks/use-in-view"
import { Mail } from "lucide-react"

export function GiftsSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div
          className={`transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Regalos
          </p>
          <h2 className="mb-8 text-4xl font-light text-foreground md:text-5xl">
            Lluvia de Sobres
          </h2>
        </div>

        <div
          className={`mb-12 transition-all delay-200 duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <div className="mx-auto max-w-md border border-border bg-card p-10">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gold/30" />
              <Mail className="h-8 w-8 text-primary" strokeWidth={1} />
              <div className="h-px flex-1 bg-gold/30" />
            </div>

            <p className="mb-6 font-[family-name:var(--font-montserrat)] text-sm font-light leading-relaxed text-muted-foreground">
              Cada muestra de cariño nos ayudará a comenzar esta nueva etapa juntos.
              Gracias por acompañarnos con sus buenos deseos y detalles.
            </p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-[family-name:var(--font-montserrat)] text-[10px] font-light uppercase tracking-[0.2em] text-muted-foreground">
                ¡Gracias por ser parte de nuestra historia!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
