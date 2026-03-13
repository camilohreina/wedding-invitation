import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name") || "Invitado Especial"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #1a1a2e 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "#d4a853" }} />
          <div
            style={{
              color: "#d4a853",
              fontSize: "18px",
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            Nos Casamos
          </div>
          <div style={{ width: "60px", height: "1px", background: "#d4a853" }} />
        </div>

        {/* Couple names */}
        <div
          style={{
            color: "#f5f0e8",
            fontSize: "72px",
            fontWeight: 300,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Camila & Santiago
        </div>

        {/* Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "20px 0",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#d4a853" }} />
          <div
            style={{
              color: "#d4a853",
              fontSize: "16px",
              letterSpacing: "4px",
            }}
          >
            15 de Noviembre, 2026
          </div>
          <div style={{ width: "40px", height: "1px", background: "#d4a853" }} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "30px",
            background: "#d4a853",
            opacity: 0.5,
            margin: "12px 0",
          }}
        />

        {/* Guest name */}
        <div
          style={{
            color: "#f5f0e8",
            fontSize: "22px",
            fontWeight: 300,
            opacity: 0.9,
            marginBottom: "4px",
          }}
        >
          Estimado(a)
        </div>
        <div
          style={{
            color: "#d4a853",
            fontSize: "32px",
            fontWeight: 400,
          }}
        >
          {name}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
