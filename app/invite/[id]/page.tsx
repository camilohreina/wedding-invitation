import { notFound } from "next/navigation"
import { getGuestById, getAllGuestIds } from "@/lib/guests"
import type { Metadata } from "next"
import { InvitationClient } from "./invitation-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = await getAllGuestIds()
  return ids.map((id) => ({ id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const guest = await getGuestById(id)

  if (!guest) {
    return { title: "Invitacion no encontrada" }
  }

  const title = `Camilo & Jennifer - Invitacion para ${guest.name}`
  const description = `${guest.name}, estas cordialmente invitado(a) a la boda de Camilo & Jennifer. 26 de Septiembre, 2026.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `/api/og?name=${encodeURIComponent(guest.name)}`,
          width: 1200,
          height: 630,
          alt: `Invitacion de boda para ${guest.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?name=${encodeURIComponent(guest.name)}`],
    },
  }
}

export default async function InvitePage({ params }: PageProps) {
  const { id } = await params
  const guest = await getGuestById(id)

  if (!guest) {
    notFound()
  }

  return <InvitationClient guest={guest} />
}
