import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database";
import { generateShortCode, isValidUrl } from "@/lib/nanoid";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !isValidUrl(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    let code: string;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      code = generateShortCode();
      const existing = await db.getLink(code);
      if (!existing) break;
      attempts++;
    } while (attempts < maxAttempts);

    const link = await db.createLink(code, url);
    const ghostLink = new URL(`/l/${code}`, request.url).toString();
    const statsLink = new URL(`/stats/${code}`, request.url).toString();

    return NextResponse.json({
      code,
      ghostLink,
      statsLink,
      originalUrl: link.originalUrl,
      createdAt: link.createdAt
    });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";