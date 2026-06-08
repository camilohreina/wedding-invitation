"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

export function GallerySection() {
  const { ref, isInView } = useInView()

  const images = [
    { src: "/images/fondo.webp", alt: "Decoracion de boda", className: "col-span-2 row-span-2" },
    { src: "/images/Foto-40.webp", alt: "Los novios", className: "col-span-1 row-span-1" },
    { src: "/images/Foto-234.webp", alt: "La ceremonia", className: "col-span-1 row-span-1" },
    { src: "/images/Foto-126.webp", alt: "El salón", className: "col-span-2 row-span-1" },
  ]

  return (
    <section ref={ref} className="bg-cream-dark px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Momentos
          </p>
          <h2 className="text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Galeria
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`${img.className} group relative overflow-hidden rounded-sm transition-all duration-1000 ${isInView ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
