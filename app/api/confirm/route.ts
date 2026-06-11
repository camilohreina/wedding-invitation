import { sql } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json(
            { error: "Slug requerido" },
            { status: 400 }
        );
    }

    const result = await sql`
    SELECT
      slug,
      status,
      message,
      created_at
    FROM confirmations
    WHERE slug = ${slug}
    LIMIT 1
  `;

    if (result.length === 0) {
        return NextResponse.json({
            confirmed: false,
        });
    }

    return NextResponse.json({
        confirmed: true,
        data: result[0],
    });
}

export async function POST(req: Request) {
    const body = await req.json();

    const { slug, status, message, guest } = body;

    if (!slug || !status) {
        return NextResponse.json(
            { error: "Datos inválidos" },
            { status: 400 }
        );
    }

    await sql`
    INSERT INTO confirmations
    (slug, status, message, guest)
    VALUES
    (${slug}, ${status}, ${message}, ${guest})
    ON CONFLICT (slug)
    DO UPDATE SET
      status = EXCLUDED.status,
      message = EXCLUDED.message,
      guest = EXCLUDED.guest
  `;

    return NextResponse.json({ success: true });
}