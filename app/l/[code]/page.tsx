import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/database";
import { detectCrawler, extractRefererDomain } from "@/lib/dark-social";

export default async function RedirectPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "unknown";
  const referer = headersList.get("referer") || "";

  const link = await db.getLink(code);

  if (!link) {
    redirect("/");
  }

  const { isCrawler, source } = detectCrawler(userAgent);
  const refererDomain = extractRefererDomain(referer);

  await db.updateStats(code, isCrawler, source || refererDomain || "direct");

  redirect(link.originalUrl);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;