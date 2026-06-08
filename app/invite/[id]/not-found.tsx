import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center" style={{ background: "#F6F1EB" }}>
      <div className="mx-auto max-w-md">
        <p
          className="mb-3 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.4em]"
          style={{ color: "#B3947A" }}
        >
          Jennifer & Camilo
        </p>
        <h1 className="mb-6 text-5xl font-[family-name:var(--font-great-vibes)]" style={{ color: "#6F5648" }}>
          Invitación no encontrada
        </h1>
        <p className="mb-8 font-[family-name:var(--font-montserrat)] text-sm font-normal text-muted-foreground" style={{ color: "#B3947A" }}>
          El enlace de invitación que seguiste no es válido. Por favor verifica el enlace que recibiste.
        </p>
        <Link
          href="/"
          className="inline-block border border-gold-light/30 px-6 py-3 font-[family-name:var(--font-montserrat)] text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-gold-light/10"
          style={{ color: "#B3947A" }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
