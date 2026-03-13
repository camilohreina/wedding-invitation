import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center" style={{ background: "#1a1a2e" }}>
      <div className="mx-auto max-w-md">
        <p
          className="mb-3 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.4em]"
          style={{ color: "rgba(212,168,83,0.6)" }}
        >
          Camila & Santiago
        </p>
        <h1 className="mb-6 text-5xl font-light" style={{ color: "rgba(245,240,232,0.9)" }}>
          Invitacion no encontrada
        </h1>
        <p className="mb-8 font-[family-name:var(--font-montserrat)] text-sm font-light" style={{ color: "rgba(245,240,232,0.5)" }}>
          El enlace de invitacion que seguiste no es valido. Por favor verifica el enlace que recibiste.
        </p>
        <Link
          href="/"
          className="inline-block border border-gold-light/30 px-6 py-3 font-[family-name:var(--font-montserrat)] text-xs font-light uppercase tracking-[0.2em] transition-colors hover:bg-gold-light/10"
          style={{ color: "rgba(212,168,83,0.7)" }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
