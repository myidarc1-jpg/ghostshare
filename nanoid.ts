import { customAlphabet } from "nanoid"

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz"
const nanoid = customAlphabet(alphabet, 7)

export function generateShortCode(length: number = 7): string {
  return nanoid()
}

export function isValidCode(code: string): boolean {
  return /^[2-9A-HJ-NP-Za-hj-kmnp-z]{7}$/.test(code)
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}
