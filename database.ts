import { promises as fs } from "fs"
import path from "path"
import type { GhostLink, LinkStats, Database } from "./types"

export interface DatabaseAdapter {
  createLink(code: string, originalUrl: string): Promise<GhostLink>
  getLink(code: string): Promise<GhostLink | null>
  updateStats(code: string, isPrivateShare: boolean, source?: string): Promise<void>
  getStats(code: string): Promise<LinkStats | null>
}

export class MockDatabaseAdapter implements DatabaseAdapter {
  private dbPath: string
  private dbCache: Database | null = null
  private lock: Promise<unknown> = Promise.resolve()

  constructor(dbPath: string) {
    this.dbPath = path.resolve(dbPath)
  }

  private async readDatabase(): Promise<Database> {
    if (this.dbCache !== null) return this.dbCache
    try {
      const content = await fs.readFile(this.dbPath, "utf-8")
      this.dbCache = JSON.parse(content) as Database
      return this.dbCache
    } catch (error) {
      this.dbCache = { links: {}, stats: {} }
      return this.dbCache
    }
  }

  private async writeDatabase(db: Database): Promise<void> {
    this.dbCache = db
    await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2), "utf-8")
  }

  async createLink(code: string, originalUrl: string): Promise<GhostLink> {
    const lock = this.lock
    const task = (async () => {
      await lock
      const db = await this.readDatabase()
      const now = new Date().toISOString()
      const link: GhostLink = {
        id: crypto.randomUUID(),
        code,
        originalUrl,
        createdAt: now
      }
      db.links[code] = link
      db.stats[code] = {
        code,
        humanClicks: 0,
        privateShares: 0,
        totalClicks: 0,
        lastTrackedAt: now,
        trackingData: {
          sources: {},
          hourly: new Array(24).fill(0),
          daily: new Array(7).fill(0)
        }
      }
      await this.writeDatabase(db)
      return link
    })()
    this.lock = task
    return task
  }

  async getLink(code: string): Promise<GhostLink | null> {
    const db = await this.readDatabase()
    return db.links[code] || null
  }

  async updateStats(code: string, isPrivateShare: boolean, source?: string): Promise<void> {
    const lock = this.lock
    const task = (async () => {
      await lock
      const db = await this.readDatabase()
      const stats = db.stats[code]
      if (!stats) return

      const now = new Date()
      const hourIndex = now.getHours()
      const dayIndex = now.getDay()

      if (isPrivateShare) {
        stats.privateShares += 1
        stats.trackingData.hourly[hourIndex] += 1
        stats.trackingData.daily[dayIndex] += 1
        if (source) {
          stats.trackingData.sources[source] = (stats.trackingData.sources[source] || 0) + 1
        }
      } else {
        stats.humanClicks += 1
        stats.trackingData.hourly[hourIndex] += 1
        stats.trackingData.daily[dayIndex] += 1
        if (source) {
          stats.trackingData.sources[source] = (stats.trackingData.sources[source] || 0) + 1
        }
      }

      stats.totalClicks = stats.humanClicks + stats.privateShares
      stats.lastTrackedAt = now.toISOString()
      await this.writeDatabase(db)
    })()
    this.lock = task
    return task
  }

  async getStats(code: string): Promise<LinkStats | null> {
    const db = await this.readDatabase()
    return db.stats[code] || null
  }
}

export const db = new MockDatabaseAdapter("./src/data/database.json")

export class SupabaseDatabaseAdapter implements DatabaseAdapter {
  async createLink(_code: string, _originalUrl: string): Promise<GhostLink> {
    throw new Error("Not implemented yet - Phase 2+")
  }
  async getLink(_code: string): Promise<GhostLink | null> {
    throw new Error("Not implemented yet - Phase 2+")
  }
  async updateStats(_code: string, _isPrivateShare: boolean, _source?: string): Promise<void> {
    throw new Error("Not implemented yet - Phase 2+")
  }
  async getStats(_code: string): Promise<LinkStats | null> {
    throw new Error("Not implemented yet - Phase 2+")
  }
}
