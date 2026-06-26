"use client"

import Image from "next/image"
import { MapPin, Clock, Church, PartyPopper } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

interface EventCardProps {
  icon: React.ReactNode
  title: string
  time: string
  location: string
  address: string
  mapUrl: string
  imageSrc: string
  imageAlt: string
  delay: string
  isInView: boolean
}

function EventCard({
  icon,
  title,
  time,
  location,
  address,
  mapUrl,
  imageSrc,
  imageAlt,
  delay,
  isInView,
}: EventCardProps) {
  return (
    <div
      className={`group overflow-hidden rounded-sm bg-card transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      style={{ transitionDelay: delay }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-sm bg-foreground/60 px-3 py-1.5 backdrop-blur-sm">
          {icon}
          <span className="font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-wider text-cream">
            {title}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="flex items-center gap-2 text-primary">
          <Clock className="h-4 w-4" />
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium">
            {time}
          </span>
        </div>

        <h3 className="text-2xl font-normal text-foreground">{location}</h3>

        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-normal leading-relaxed">
            {address}
          </span>
        </div>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 border border-primary/30 px-6 py-2.5 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Ver en mapa
        </a>
      </div>
    </div>
  )
}

export function EventDetailsSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="bg-cream-dark px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-medium  uppercase tracking-[0.4em] text-muted-foreground">
            Los detalles
          </p>
          <h2 className="mb-4 text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Ceremonia & Recepción
          </h2>
          <p className="mx-auto max-w-lg font-[family-name:var(--font-montserrat)] text-sm font-light text-muted-foreground">
            Acompáñanos en este día tan especial para celebrar nuestro amor
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <EventCard
            icon={<PartyPopper className="h-4 w-4 text-gold-light" />}
            title="Recepción"
            time="4:00 PM"
            location="Finca Las Vegas"
            address="Rozo, Valle del Cauca"
            mapUrl="https://maps.app.goo.gl/cm2WZwo3fhjBqedU9"
            imageSrc="/images/lugar.jpeg"
            imageAlt="Salón de recepción elegante"
            delay="200ms"
            isInView={isInView}
          />
          <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg h-[300px] md:h-[450px]">
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.8008870088047!2d-76.42021638835953!3d3.632883749971118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a002eea1e4091%3A0x8af3fe2882c1fdc1!2sFinca%20las%20vegas!5e0!3m2!1ses!2sco!4v1780932176601!5m2!1ses!2sco"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
