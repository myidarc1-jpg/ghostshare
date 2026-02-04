import { CopyTrackingButton } from "@/components/CopyTrackingButton"
import { SummaryCard } from "@/components/SummaryCard"
import { TrafficQualityChart } from "@/components/TrafficQualityChart"
import { db } from "@/lib/database"
import type { LinkStats } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function StatsPage({ params }: { params: { code: string } }) {
  const stats = await db.getStats(params.code)

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-2">Link Not Found</h1>
            <p className="text-slate-400">The GhostLink you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

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
            <p className="text-slate-400">Code: <code className="bg-slate-800 px-2 py-1 rounded">{params.code}</code></p>
          </div>
          <CopyTrackingButton code={params.code} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Clicks"
            value={stats.totalClicks}
            description="All link visits combined"
          />
          <SummaryCard
            title="Private Shares"
            value={stats.privateShares}
            description="From dark social apps"
            trend="up"
          />
          <SummaryCard
            title="Human Clicks"
            value={stats.humanClicks}
            description="Direct user visits"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrafficQualityChart
            humanClicks={stats.humanClicks}
            privateShares={stats.privateShares}
          />

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
            <div className="space-y-3">
              {Object.entries(stats.trackingData.sources).length > 0 ? (
                Object.entries(stats.trackingData.sources)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 capitalize">{source}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))
              ) : (
                <p className="text-slate-500 text-center py-8">No traffic sources recorded yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Clicks by Hour (Last 24 Hours)</h2>
          <div className="flex items-end gap-1 h-32">
            {stats.trackingData.hourly.map((count, index) => (
              <div
                key={index}
                className="flex-1 bg-indigo-500/80 rounded-t transition-all hover:bg-indigo-400"
                style={{ height: `${Math.max((count / Math.max(...stats.trackingData.hourly, 1)) * 100, 5)}%` }}
                title={`${count} clicks at ${index}:00`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>12 AM</span>
          </div>
        </div>

        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>Last updated: {new Date(stats.lastTrackedAt).toLocaleString()}</p>
        </footer>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"
export const revalidate = 0
