"use client"

import { useState } from "react"

interface EnvelopeProps {
  guestName: string
  onOpen: () => void
}

export function Envelope({ guestName, onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false)

  function handleOpen() {
    setIsOpening(true)
    // Wait for envelope animation to complete before triggering callback
    setTimeout(() => {
      onOpen()
    }, 1800)
  }

  return (
    <div
      data-envelope
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div
        className={`relative transition-all duration-[1500ms] ease-in-out ${isOpening
            ? "-translate-y-[120vh] scale-50 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
          }`}
      >
        {/* Envelope Container */}
        <div className="relative mx-auto h-[420px] w-[320px] md:h-[480px] md:w-[380px]">
          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "linear-gradient(145deg, #252545 0%, #1e1e38 50%, #1a1a30 100%)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}
          />

          {/* Envelope bottom flap (V shape) */}
          <div className="absolute inset-0 overflow-hidden rounded-sm">
            <svg viewBox="0 0 380 480" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bottomFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a4a" />
                  <stop offset="100%" stopColor="#1e1e38" />
                </linearGradient>
              </defs>
              <path
                d="M0,180 L190,360 L380,180 L380,480 L0,480 Z"
                fill="url(#bottomFlap)"
              />
              <path
                d="M0,180 L190,360 L380,180"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Top flap (triangle) */}
          <div
            className={`absolute left-0 right-0 top-0 origin-top transition-transform duration-700 ${isOpening ? "[transform:rotateX(180deg)]" : ""
              }`}
            style={{ zIndex: isOpening ? 0 : 20, perspective: "800px" }}
          >
            <svg viewBox="0 0 380 220" className="w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="topFlap" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#2a2a4a" />
                  <stop offset="100%" stopColor="#222240" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 L380,0 L190,200 Z"
                fill="url(#topFlap)"
              />
              <path
                d="M0,0 L190,200 L380,0"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Wax seal */}
          <div
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-[60%]"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24"
              style={{
                background: "radial-gradient(circle at 40% 35%, #3a3a5c, #252545 50%, #1a1a35 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.05) inset, 0 -2px 8px rgba(0,0,0,0.3) inset",
              }}
            >
              {/* Floral/lotus design */}
              <svg viewBox="0 0 48 48" className="h-10 w-10 md:h-12 md:w-12" fill="none">
                {/* Center circle */}
                <circle cx="24" cy="24" r="3" fill="rgba(255,255,255,0.15)" />
                {/* Petals */}
                <path d="M24 8 C28 14, 28 18, 24 21 C20 18, 20 14, 24 8Z" fill="rgba(255,255,255,0.12)" />
                <path d="M24 40 C28 34, 28 30, 24 27 C20 30, 20 34, 24 40Z" fill="rgba(255,255,255,0.12)" />
                <path d="M8 24 C14 20, 18 20, 21 24 C18 28, 14 28, 8 24Z" fill="rgba(255,255,255,0.12)" />
                <path d="M40 24 C34 20, 30 20, 27 24 C30 28, 34 28, 40 24Z" fill="rgba(255,255,255,0.12)" />
                {/* Diagonal petals */}
                <path d="M12 12 C17 14, 19 17, 20 21 C16 20, 13 17, 12 12Z" fill="rgba(255,255,255,0.08)" />
                <path d="M36 12 C31 14, 29 17, 28 21 C32 20, 35 17, 36 12Z" fill="rgba(255,255,255,0.08)" />
                <path d="M12 36 C17 34, 19 31, 20 27 C16 28, 13 31, 12 36Z" fill="rgba(255,255,255,0.08)" />
                <path d="M36 36 C31 34, 29 31, 28 27 C32 28, 35 31, 36 36Z" fill="rgba(255,255,255,0.08)" />
              </svg>
            </div>
          </div>

          {/* Couple initials */}
          <div className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2">
            <p
              className="text-center text-lg font-light tracking-[0.4em] md:text-xl"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {"C & J"}
            </p>
          </div>
        </div>

        {/* Guest name below envelope */}
        <div className="mt-10 text-center">
          <p
            className="mb-1 font-[family-name:var(--font-montserrat)] text-[10px] font-light uppercase tracking-[0.4em]"
            style={{ color: "rgba(212,168,83,0.6)" }}
          >
            Invitacion para
          </p>
          <p
            className="text-2xl font-light md:text-3xl"
            style={{ color: "rgba(245,240,232,0.9)" }}
          >
            {guestName}
          </p>
        </div>

        {/* Tap to open */}
        <button
          onClick={handleOpen}
          className="mx-auto mt-10 block cursor-pointer border-0 bg-transparent"
          aria-label="Abrir invitacion"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="animate-bounce font-[family-name:var(--font-montserrat)] text-[10px] font-light uppercase tracking-[0.3em]"
              style={{ color: "rgba(212,168,83,0.5)" }}
            >
              Toca para abrir
            </div>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="rgba(212,168,83,0.4)"
              strokeWidth="1.5"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
