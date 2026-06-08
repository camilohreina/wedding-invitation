import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <Heart className="mx-auto mb-4 h-5 w-5 text-gold-light" />
        <p className="mb-2 text-3xl font-light text-cream">
          {"Camilo & Jennifer"}
        </p>
        <p className="mb-6 font-[family-name:var(--font-montserrat)] text-xs font-light tracking-[0.3em] text-cream/60">
          26 de Septiembre, 2026
        </p>
        <div className="h-px w-16 mx-auto bg-gold-light/30 mb-6" />
        <p className="font-[family-name:var(--font-montserrat)] text-[10px] font-light tracking-wider text-cream/40">
          Hecho con amor
        </p>
      </div>
    </footer>
  )
}
