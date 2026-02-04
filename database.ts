import { promises as fs } from "fs"
import path from "path"

export interface Link {
  id: string
  code: string
  destinationUrl: string
  createdAt: string
  clicks: number
  shares: number
}

const DB_PATH = path.join(process.cwd(), "links.json")

export async function getLinks(): Promise<Link[]> {
  try {
    const content = await fs.readFile(DB_PATH, "utf-8")
    return JSON.parse(content) as Link[]
  } catch {
    return []
  }
}

export async function getLink(code: string): Promise<Link | null> {
  const links = await getLinks()
  return links.find(link => link.code === code) || null
}

export async function saveLink(code: string, destinationUrl: string): Promise<Link> {
  const links = await getLinks()
  
  const link: Link = {
    id: crypto.randomUUID(),
    code,
    destinationUrl,
    createdAt: new Date().toISOString(),
    clicks: 0,
    shares: 0
  }
  
  links.push(link)
  await fs.writeFile(DB_PATH, JSON.stringify(links, null, 2), "utf-8")
  
  return link
}

export async function updateStats(code: string, userAgent: string): Promise<Link | null> {
  const links = await getLinks()
  const linkIndex = links.findIndex(link => link.code === code)
  
  if (linkIndex === -1) return null
  
  const isBot = /WhatsApp|Telegram|Discord|Slack|Twitterbot/i.test(userAgent)
  
  if (isBot) {
    links[linkIndex].shares += 1
  } else {
    links[linkIndex].clicks += 1
  }
  
  await fs.writeFile(DB_PATH, JSON.stringify(links, null, 2), "utf-8")
  
  return links[linkIndex]
}
