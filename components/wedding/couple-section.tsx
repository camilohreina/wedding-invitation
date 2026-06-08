"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

export function CoupleSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* <div className="mb-16 text-center">
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Nuestra historia
          </p>
          <h2 className="text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Sobre Nosotros
          </h2>
        </div> */}

        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">


          <div
            className={`w-full md:flex-1 text-center transition-all delay-300 duration-1000 md:text-left ${isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
          >
            <blockquote className="mb-8 border-l-2 border-gold/40 pl-6">
              <p className="text-2xl font-light italic leading-relaxed text-foreground md:text-3xl">
                {'"El amor no se mira, se siente, y aun mas cuando ella esta junto a mi."'}
              </p>
            </blockquote>
            <p className="mb-6 font-[family-name:var(--font-montserrat)] text-sm font-light leading-relaxed text-muted-foreground">
              Desde el primer momento en que nos conocimos, supimos que nuestras
              vidas estaban destinadas a unirse. Despues de anos de amor,
              risas y aventuras juntos, estamos emocionados de dar el siguiente
              paso en nuestro camino.
            </p>
            <p className="font-[family-name:var(--font-montserrat)] text-sm font-light leading-relaxed text-muted-foreground">
              Queremos compartir este dia tan especial con las personas que mas
              amamos. Tu presencia hara de nuestra boda un momento inolvidable.
            </p>
          </div>
          <div
            className={`w-full md:flex-1 transition-all duration-1000 ${isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm">
              <Image
                src="/images/couple.jpg"
                alt="Foto de la pareja"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
