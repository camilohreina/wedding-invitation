"use client"

import { useState } from "react"
import type { Guest } from "@/lib/guests"
import { Envelope } from "@/components/wedding/envelope"
import { FloatingNav } from "@/components/wedding/floating-nav"
import { HeroSection } from "@/components/wedding/hero-section"
import { WelcomeSection } from "@/components/wedding/welcome-section"
import { CountdownSection } from "@/components/wedding/countdown-section"
import { CoupleSection } from "@/components/wedding/couple-section"
import { EventDetailsSection } from "@/components/wedding/event-details-section"
import { TimelineSection } from "@/components/wedding/timeline-section"
import { DressCodeSection } from "@/components/wedding/dress-code-section"
import { GiftsSection } from "@/components/wedding/gifts-section"
import { GallerySection } from "@/components/wedding/gallery-section"
import { RsvpSection } from "@/components/wedding/rsvp-section"
import { ConfirmationSection } from "@/components/wedding/confirmation-section"
import { OrnamentalDivider } from "@/components/wedding/ornamental-divider"
import { Footer } from "@/components/wedding/footer"

interface InvitationClientProps {
  guest: Guest
}

export function InvitationClient({ guest }: InvitationClientProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)

  return (
    <>
      {!envelopeOpen && (
        <Envelope guestName={guest.name} onOpen={() => setEnvelopeOpen(true)} />
      )}

      <main
        className={`min-h-screen transition-opacity duration-1000 ${envelopeOpen ? "opacity-100" : "opacity-0"
          }`}
      >
        <FloatingNav />
        <HeroSection guestName={guest.name} />
        <WelcomeSection guestName={guest.name} />
        <CountdownSection />

        <section id="nosotros">
          <CoupleSection />
        </section>

        <OrnamentalDivider />

        <section id="regalos">
          <GiftsSection />
        </section>


        <OrnamentalDivider />

        <section id="detalles">
          <EventDetailsSection />
        </section>

        <TimelineSection />

        <OrnamentalDivider />

        <DressCodeSection />

        <OrnamentalDivider />

        <section id="galeria">
          <GallerySection />
        </section>

        <OrnamentalDivider />

        {/* <ConfirmationSection /> */}

        <section id="rsvp">
          <RsvpSection guest={guest} />
        </section>

        <Footer />
      </main>
    </>
  )
}
