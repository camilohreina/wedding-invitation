"use client"

import { useInView } from "@/hooks/use-in-view"
import { Church, Music, UtensilsCrossed, Heart, DoorClosedLocked, Users } from "lucide-react"

const TIMELINE_EVENTS = [
  {
    time: "4:00 PM",
    title: "Recepción de invitados",
    description: "Ubicación para ceremonia",
    icon: Users,
  },
  {
    time: "4:50 PM",
    title: "Cierre de puertas",
    description: "Finca Las Vegas",
    icon: DoorClosedLocked,
  },
  {
    time: "5:00 PM",
    title: "Ceremonia religiosa",
    description: "Finca Las Vegas",
    icon: Church,
  },
  {
    time: "6:00 PM",
    title: "Coctel de Bienvenida",
    description: "Si no puedes asistir a la ceremonia, te esperamos desde esta hora.",
    icon: Music,
  },
  {
    time: "7:00 PM",
    title: "Recepción",
    description: "Salon Principal",
    icon: UtensilsCrossed,
  },
  {
    time: "1:00 AM",
    title: "Fin de la celebración",
    description: "",
    icon: Heart,
  },
]

export function TimelineSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 text-center">
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            El programa
          </p>
          <h2 className="text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Itinerario
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />

          <div className="flex flex-col gap-12">
            {TIMELINE_EVENTS.map((event, i) => {
              const Icon = event.icon
              return (
                <div
                  key={event.title}
                  className={`relative flex items-start gap-6 transition-all duration-1000 md:gap-0 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Icon circle */}
                  <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                      }`}
                  >
                    <span className="font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.2em] text-primary">
                      {event.time}
                    </span>
                    <h3 className="mt-1 text-xl font-light text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-montserrat)] text-xs font-light text-muted-foreground">
                      {event.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
