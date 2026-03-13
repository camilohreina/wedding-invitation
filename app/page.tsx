import { redirect } from "next/navigation"

// The main page redirects to a demo invitation.
// In production, each guest receives their unique link: /invite/[id]
export default function HomePage() {
  redirect("/invite/carlos-maria")
}
