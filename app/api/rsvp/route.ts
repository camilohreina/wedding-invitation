import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { guestId, name, attending, maxGuests, dietary, message } = body

    if (!name || !guestId) {
      return NextResponse.json(
        { error: "Datos del invitado requeridos" },
        { status: 400 }
      )
    }

    if (attending === undefined || attending === null) {
      return NextResponse.json(
        { error: "Por favor selecciona una opcion de asistencia" },
        { status: 400 }
      )
    }

    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    const rsvpData = {
      guestId,
      name,
      attending,
      maxGuests,
      isAttending: attending > 0 ? "Si" : "No",
      dietary: dietary || "Ninguna",
      message: message || "Sin mensaje",
      timestamp: new Date().toISOString(),
    }

    if (!GOOGLE_SHEETS_URL) {
      // Fallback: log to console if Google Sheets URL is not configured
      console.log("[RSVP] Confirmacion recibida:", rsvpData)

      return NextResponse.json({
        success: true,
        message: "Confirmacion registrada exitosamente",
      })
    }

    // Send data to Google Sheets via Apps Script Web App
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rsvpData),
    })

    if (!response.ok) {
      throw new Error("Error al enviar datos a Google Sheets")
    }

    return NextResponse.json({
      success: true,
      message: "Confirmacion registrada exitosamente",
    })
  } catch (error) {
    console.error("[RSVP] Error:", error)
    return NextResponse.json(
      { error: "Error al procesar la confirmacion" },
      { status: 500 }
    )
  }
}
