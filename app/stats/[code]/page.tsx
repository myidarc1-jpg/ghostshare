import { CopyTrackingButton } from "@/components/CopyTrackingButton"
import { SummaryCard } from "@/components/SummaryCard"
import { TrafficQualityChart } from "@/components/TrafficQualityChart"
import { getLink } from "@/lib/database"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function StatsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const link = await getLink(code)

  if (!link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-2">Link Not Found</h1>
            <p className="text-slate-400">The GhostLink you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const totalClicks = link.clicks + link.shares

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold">GhostShare</span>
          </div>
        </nav>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-slate-400">Code: <code className="bg-slate-800 px-2 py-1 rounded">{code}</code></p>
          </div>
          <CopyTrackingButton code={code} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Clicks"
            value={totalClicks}
            description="All link visits combined"
          />
          <SummaryCard
            title="Private Shares"
            value={link.shares}
            description="From dark social apps"
            trend="up"
          />
          <SummaryCard
            title="Human Clicks"
            value={link.clicks}
            description="Direct user visits"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrafficQualityChart
            humanClicks={link.clicks}
            privateShares={link.shares}
          />

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Destination URL</h2>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <a href={link.destinationUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 break-all">
                {link.destinationUrl}
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>Created: {new Date(link.createdAt).toLocaleString()}</p>
        </footer>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"
export const revalidate = 0
