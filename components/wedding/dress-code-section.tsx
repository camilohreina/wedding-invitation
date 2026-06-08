"use client"

import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

export function DressCodeSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div
          className={`transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-medium  uppercase tracking-[0.4em] text-muted-foreground">
            Vestimenta
          </p>
          <h2 className="mb-8 text-4xl font-light text-foreground md:text-5xl">
            Codigo de Vestimenta
          </h2>
        </div>

        <div
          className={`mb-12 transition-all delay-200 duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <div className="mx-auto max-w-md border border-border bg-card p-10">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gold/30" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-8 w-8 text-primary"
              >
                <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" />
                <path d="M12 2v4" />
                <path d="M8 6l4 4 4-4" />
              </svg>
              <div className="h-px flex-1 bg-gold/30" />
            </div>

            <h3 className="mb-4 text-3xl font-light text-foreground">
              Formal Elegante
            </h3>

            <p className="mb-6 font-[family-name:var(--font-montserrat)] text-sm font-light leading-relaxed text-muted-foreground">
              Te invitamos a vestir de manera formal y elegante para esta
              ocasion tan especial.
            </p>

            <div className="my-8 border-t border-border pt-6">
              <p className="font-[family-name:var(--font-montserrat)] text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground">
                Evita usar los siguientes colores y sus tonalidades
              </p>
            </div>
            <div className="my-6 flex justify-center">
              <Image src="/images/baile.png" alt="Dress code" width={200} height={200} className="object-contain opacity-80" />
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full border border-border bg-white" title="Blanco" />
                  <div className="h-8 w-8 rounded-full border border-border bg-[#ebe0d0]" title="Arena" />
                  <div className="h-8 w-8 rounded-full border border-border bg-[#7B89C7]" title="Morazul" />
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
