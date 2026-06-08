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
          background: "linear-gradient(135deg, #F6F1EB 0%, #D8C8BC 50%, #F6F1EB 100%)",
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
          <div style={{ width: "60px", height: "1px", background: "#B3947A" }} />
          <div
            style={{
              color: "#B3947A",
              fontSize: "18px",
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            Nos Casamos
          </div>
          <div style={{ width: "60px", height: "1px", background: "#B3947A" }} />
        </div>

        {/* Couple names */}
        <div
          style={{
            color: "#6F5648",
            fontSize: "72px",
            fontWeight: 300,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Jennifer & Camilo
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
          <div style={{ width: "40px", height: "1px", background: "#B3947A" }} />
          <div
            style={{
              color: "#B3947A",
              fontSize: "16px",
              letterSpacing: "4px",
            }}
          >
            26 de Septiembre, 2026
          </div>
          <div style={{ width: "40px", height: "1px", background: "#B3947A" }} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "30px",
            background: "#B3947A",
            opacity: 0.5,
            margin: "12px 0",
          }}
        />

        {/* Guest name */}
        <div
          style={{
            color: "#B3947A",
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
            color: "#6F5648",
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
