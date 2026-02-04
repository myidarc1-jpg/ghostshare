import { NextRequest, NextResponse } from "next/server";
import { getLink, updateStats } from "@/lib/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  
  try {
    const link = await getLink(code);
    
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
    
    const userAgent = request.headers.get("user-agent") || "";
    
    await updateStats(code, userAgent);
    
    return NextResponse.redirect(link.destinationUrl, 302);
  } catch (error) {
    console.error("Error tracking link:", error);
    return NextResponse.json({ error: "Failed to process link" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
