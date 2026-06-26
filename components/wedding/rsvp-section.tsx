"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Check, Loader2, Clock, CalendarX } from "lucide-react"
import type { Guest } from "@/lib/guests"

/**
 * Parses a Spanish-locale date string like "14 julio 2026" into a Date.
 * Returns null if the string cannot be parsed.
 */
function parseSpanishDate(dateStr: string): Date | null {
  const MONTHS: Record<string, number> = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  }
  const parts = dateStr.trim().toLowerCase().split(/\s+/)
  if (parts.length !== 3) return null
  const day = parseInt(parts[0], 10)
  const month = MONTHS[parts[1]]
  const year = parseInt(parts[2], 10)
  if (isNaN(day) || month === undefined || isNaN(year)) return null
  // Deadline is end-of-day on the due date
  return new Date(year, month, day, 23, 59, 59)
}

type RsvpStatus = "idle" | "loading" | "success" | "error"

interface RsvpSectionProps {
  guest: Guest
}

export function RsvpSection({ guest }: RsvpSectionProps) {
  const { ref, isInView } = useInView()
  const [attendance, setAttendance] = useState<string>("")
  const [eventStatus, setEventStatus] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<RsvpStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Check on mount if the guest has already confirmed
  useEffect(() => {
    async function checkConfirmation() {
      try {
        const res = await fetch(`/api/confirm?slug=${guest.id}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.confirmed) {
          // Restore attendance so the success message renders correctly
          const guests = data.data?.guest
          setAttendance(guests != null ? String(guests) : "1")
          setStatus("success")
        }
      } catch {
        // silently ignore — just show the form
      }
    }
    checkConfirmation()
  }, [guest.id])

  // Build attendance options dynamically based on maxGuests
  function getAttendanceOptions() {
    const options: { value: string; label: string }[] = [
      { value: "0", label: "No podre asistir" },
    ]

    if (guest.maxGuests === 1) {
      options.unshift({ value: "1", label: "Confirmo mi asistencia" })
    } else {
      for (let i = 1; i <= guest.maxGuests; i++) {
        if (i === 1) {
          options.unshift({ value: "1", label: "Asiste 1 persona" })
        } else {
          options.unshift({ value: String(i), label: `Asisten ${i} personas` })
        }
      }
      // Reverse so it goes from max to 1, then 0
      const going = options.filter((o) => o.value !== "0").reverse()
      options.length = 0
      options.push(...going, { value: "0", label: "No podremos asistir" })
    }

    return options
  }

  const attendanceOptions = getAttendanceOptions()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (attendance === "") {
      setErrorMessage("Por favor selecciona una opcion.")
      return
    }

    setStatus("loading")
    setErrorMessage("")


    console.log(JSON.stringify({
      guestId: guest.id,
      name: guest.name,
      attending: parseInt(attendance),
      maxGuests: guest.maxGuests,
      eventStatus,
      message,
    }))

    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: guest.id,
          guest: parseInt(attendance),
          status: eventStatus,
          message,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al confirmar asistencia")
      }

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Ocurrio un error. Intenta de nuevo."
      )
    }
  }

  // ── Due-date logic ──────────────────────────────────────────────────────
  const deadlineDate = guest.dueDate ? parseSpanishDate(guest.dueDate) : null
  const now = new Date()
  const deadlinePassed = deadlineDate !== null && now > deadlineDate
  // ────────────────────────────────────────────────────────────────────────

  if (status === "success") {
    const isAttending = parseInt(attendance) > 0

    return (
      <section id="rsvp" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-4 text-4xl font-light text-foreground md:text-5xl">
            {isAttending ? "Confirmado" : "Recibido"}
          </h2>
          <p className="mb-2 font-[family-name:var(--font-montserrat)] text-sm font-light text-muted-foreground">
            {isAttending
              ? `Gracias ${guest.name}. ${parseInt(attendance) === 1
                ? "Te esperamos"
                : `Los esperamos (${attendance} personas)`
              } con mucha alegria el 26 de septiembre de 2026.`
              : `Lamentamos que no puedas asistir, ${guest.name}. Te tendremos presente en nuestro dia especial.`}
          </p>
        </div>
      </section>
    )
  }

  // ── Deadline expired & not confirmed → block the form ───────────────────
  if (deadlinePassed) {
    return (
      <section id="rsvp" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CalendarX className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mb-3 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Confirmación
          </p>
          <h2 className="mb-6 text-4xl font-light text-foreground md:text-5xl">
            {guest.name}
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-sm font-normal leading-relaxed text-muted-foreground">
            El plazo para confirmar tu asistencia venció el{" "}
            <span className="font-medium text-foreground">{guest.dueDate}</span>.
            Lamentablemente ya no es posible registrar tu confirmación, tu lugar será
            reasignado.{" "}
            ¡Gracias por ser parte de este momento tan especial para nosotros!
          </p>
          <h2 className="mt-14 text-5xl font-light text-foreground md:text-7xl">
            ¡Gracias!
          </h2>
        </div>
      </section>
    )
  }
  // ────────────────────────────────────────────────────────────────────────

  const eventStatusOptions = [
    { value: "CEREMONIA", label: "Asistiré a la ceremonia religiosa y fiesta" },
    { value: "FIESTA", label: "Solo asistiré a la fiesta" },
  ]

  return (
    <section id="rsvp" ref={ref} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-lg">
        <div
          className={`mb-12 text-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <p className="mb-4 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Confirmación
          </p>
          <h2 className="mb-2 text-4xl font-light text-foreground md:text-5xl">
            {guest.name}
          </h2>
          <p className="mb-4 font-[family-name:var(--font-montserrat)] text-sm font-light text-muted-foreground">
            {guest.maxGuests === 1
              ? "Tienes 1 lugar reservado"
              : `Tienes ${guest.maxGuests} lugares reservados`}
          </p>
          <div className="mx-auto max-w-xl">
            <p className="font-[family-name:var(--font-montserrat)] text-sm font-normal leading-relaxed text-muted-foreground">
              Con el propósito de cuidar cada detalle de nuestra celebración, también nos comunicaremos telefónicamente para confirmar la asistencia de cada uno de nuestros invitados.
            </p>
          </div>

          {/* Due-date notice */}
          {guest.dueDate && !deadlinePassed && (
            <div className="mt-6 flex items-start gap-3 rounded-none border border-primary/30 bg-primary/5 px-4 py-3 text-left">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="font-[family-name:var(--font-montserrat)] text-xs font-normal leading-relaxed text-foreground">
                Por favor confirma tu asistencia antes del{" "}
                <span className="font-semibold">{guest.dueDate}</span>.{" "}
                Después de esa fecha tu lugar podría ser reasignado.
              </p>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-6 transition-all delay-200 duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          {/* Attendance selector */}
          <div className="flex flex-col gap-3">
            <label className="font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.15em] text-foreground">
              Asistencia
            </label>
            <div className="flex flex-col gap-2">
              {attendanceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 transition-all ${attendance === option.value
                    ? option.value === "0"
                      ? "border-muted-foreground/40 bg-muted"
                      : "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                    }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={option.value}
                    checked={attendance === option.value}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${attendance === option.value
                      ? option.value === "0"
                        ? "border-muted-foreground bg-muted-foreground"
                        : "border-primary bg-primary"
                      : "border-border"
                      }`}
                  >
                    {attendance === option.value && (
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span
                    className={`font-[family-name:var(--font-montserrat)] text-sm font-light ${option.value === "0" ? "text-muted-foreground" : "text-foreground"
                      }`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Only show eventStatus + message if attending */}
          {attendance !== "" && attendance !== "0" && (
            <>
              <div className="flex flex-col gap-3">
                <label className="font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                  ¿A qué parte del evento asistirás?
                </label>
                <div className="flex flex-col gap-2">
                  {eventStatusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 transition-all ${eventStatus === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                        }`}
                    >
                      <input
                        type="radio"
                        name="eventStatus"
                        value={option.value}
                        checked={eventStatus === option.value}
                        onChange={(e) => setEventStatus(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${eventStatus === option.value
                          ? "border-primary bg-primary"
                          : "border-border"
                          }`}
                      >
                        {eventStatus === option.value && (
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <span className="font-[family-name:var(--font-montserrat)] text-sm font-light text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.15em] text-foreground"
                >
                  Mensaje para los novios
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Escribe un mensaje especial..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none border border-border bg-card px-4 py-3 font-[family-name:var(--font-montserrat)] text-sm font-light text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                />
              </div>
            </>
          )}

          {errorMessage && (
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 flex items-center justify-center gap-2 bg-primary px-8 py-4 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : attendance === "0" ? (
              "Enviar Respuesta"
            ) : (
              "Confirmar Asistencia"
            )}
          </button>
        </form>

        <h2 className="mt-14 text-center text-5xl font-light text-foreground  md:text-7xl">
          ¡Te Esperamos!
        </h2>
      </div>

    </section>
  )
}
