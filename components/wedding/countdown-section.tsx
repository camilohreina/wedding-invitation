"use client"

import { useEffect, useState } from "react"

function calculateTimeLeft() {
  const weddingDate = new Date("2026-09-26T16:00:00")
  const now = new Date()
  const difference = weddingDate.getTime() - now.getTime()

  if (difference <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
  }

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / (1000 * 60)) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  }
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: "Dias", value: timeLeft.dias },
    { label: "Horas", value: timeLeft.horas },
    { label: "Minutos", value: timeLeft.minutos },
    { label: "Segundos", value: timeLeft.segundos },
  ]

  return (
    <section className="bg-cream-dark px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
          Cuenta regresiva
        </p>
        <h2 className="mb-12 text-4xl font-normal text-foreground md:text-5xl">
          Faltan
        </h2>
        <div className="flex items-center  justify-center gap-4 md:gap-8">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex gap-4 md:gap-8">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-normal text-foreground md:text-6xl lg:text-7xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-2 font-[family-name:var(--font-montserrat)] text-[10px] font-normal uppercase tracking-[0.3em] text-muted-foreground">
                  {unit.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-3xl font-normal text-muted-foreground/40 md:text-5xl">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
