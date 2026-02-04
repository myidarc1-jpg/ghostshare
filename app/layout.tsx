import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GhostShare - Track Your Dark Social Shares",
  description: "The first tool that reveals what's happening in private messaging apps like WhatsApp, Discord, and Telegram. Stop guessing, start tracking your dark social traffic.",
  openGraph: {
    title: "GhostShare - Track Your Dark Social Shares",
    description: "Reveal hidden shares in private apps. Track WhatsApp, Discord, and Telegram traffic in real-time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostShare - Track Your Dark Social Shares",
    description: "Reveal hidden shares in private apps. Track WhatsApp, Discord, and Telegram traffic in real-time.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
