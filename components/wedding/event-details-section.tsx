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
      className={`group overflow-hidden rounded-sm bg-card transition-all duration-1000 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
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
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-light">
            {time}
          </span>
        </div>

        <h3 className="text-2xl font-light text-foreground">{location}</h3>

        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="font-[family-name:var(--font-montserrat)] text-xs font-light leading-relaxed">
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
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Los detalles
          </p>
          <h2 className="mb-4 text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Ceremonia & Recepcion
          </h2>
          <p className="mx-auto max-w-lg font-[family-name:var(--font-montserrat)] text-sm font-light text-muted-foreground">
            Acompananos en este dia tan especial para celebrar nuestro amor
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <EventCard
            icon={<Church className="h-4 w-4 text-gold-light" />}
            title="Ceremonia"
            time="4:00 PM"
            location="Parroquia San Jose"
            address="Calle 80 #45-12, Barrio El Poblado, Medellin, Colombia"
            mapUrl="https://maps.google.com/?q=Parroquia+San+Jose+Medellin"
            imageSrc="/images/ceremony.jpg"
            imageAlt="Iglesia decorada para la ceremonia"
            delay="0ms"
            isInView={isInView}
          />
          <EventCard
            icon={<PartyPopper className="h-4 w-4 text-gold-light" />}
            title="Recepcion"
            time="6:30 PM"
            location="Hacienda Los Olivos"
            address="Km 5 Via Las Palmas, Envigado, Antioquia, Colombia"
            mapUrl="https://maps.google.com/?q=Hacienda+Los+Olivos+Envigado"
            imageSrc="/images/venue.jpg"
            imageAlt="Salon de recepcion elegante"
            delay="200ms"
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  )
}
