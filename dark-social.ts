export interface CrawlerInfo {
  name: string;
  userAgentPatterns: string[];
}

export const DARK_SOCIAL_BOTS: CrawlerInfo[] = [
  { name: "WhatsApp", userAgentPatterns: ["WhatsApp"] },
  { name: "Discord", userAgentPatterns: ["Discordbot", "Discord"] },
  { name: "Telegram", userAgentPatterns: ["TelegramBot", "Telegram"] },
  { name: "Slack", userAgentPatterns: ["Slackbot", "Slack-LinkExpanding"] },
  { name: "Facebook", userAgentPatterns: ["facebookexternalhit", "Facebot"] },
  { name: "Twitter", userAgentPatterns: ["Twitterbot"] },
  { name: "LinkedIn", userAgentPatterns: ["LinkedInBot"] },
];

export function detectCrawler(userAgent: string): { isCrawler: boolean; source?: string } {
  const ua = userAgent.toLowerCase();

  for (const bot of DARK_SOCIAL_BOTS) {
    for (const pattern of bot.userAgentPatterns) {
      if (ua.includes(pattern.toLowerCase())) {
        return { isCrawler: true, source: bot.name };
      }
    }
  }

  return { isCrawler: false };
}

export function extractRefererDomain(referer: string): string | null {
  try {
    const url = new URL(referer);
    return url.hostname;
  } catch {
    return null;
  }
}