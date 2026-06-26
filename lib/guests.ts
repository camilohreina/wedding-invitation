export interface Guest {
  id: string
  name: string
  maxGuests: number // maximum number of people in this invitation
  confirmed?: boolean
  dueDate?: string // confirmation deadline, e.g. "14 julio 2026"
}

const GOOGLE_SHEETS_DATA_URL = process.env.GOOGLE_SHEETS_CSV_URL

// Guest list - used as fallback if the Google Sheet is not available
export const FALLBACK_GUESTS: Guest[] = [
  { id: "carlos-maria", name: "Carlos & Maria Hernandez", maxGuests: 2 },
]

export async function getGuests(): Promise<Guest[]> {
  if (!GOOGLE_SHEETS_DATA_URL) {
    console.warn("GOOGLE_SHEETS_CSV_URL no configurada")
    return FALLBACK_GUESTS
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_DATA_URL, {
      next: { revalidate: 5 }, // Cache de 5 segundos para pruebas
    })

    if (!response.ok) {
      throw new Error("Error al obtener datos de Google Sheets")
    }

    const data = await response.json()

    // Si los datos vienen como array, los usamos directamente
    // Si vienen dentro de una propiedad 'data' o 'guests', la extraemos
    const guestsArray = Array.isArray(data) ? data : (data.data || data.guests || [])

    if (guestsArray.length === 0) return FALLBACK_GUESTS

    // Mapeamos para asegurar que los tipos sean correctos (id string, maxGuests number)
    return guestsArray.map((g: any) => ({
      id: String(g.id || "").trim(),
      name: String(g.name || g.nombre || "").trim(),
      maxGuests: parseInt(g.maxGuests || g.invitados || 1, 10),
      dueDate: g.due_date ? String(g.due_date).trim() : undefined,
    }))
  } catch (error) {
    console.error("Error loading guests from JSON API:", error)
    return FALLBACK_GUESTS
  }
}

export async function getGuestById(id: string): Promise<Guest | undefined> {
  const guests = await getGuests()
  return guests.find((g) => g.id === id)
}

export async function getAllGuestIds(): Promise<string[]> {
  const guests = await getGuests()
  return guests.map((g) => g.id)
}


