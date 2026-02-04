import { Hero } from "@/components/Hero"
import { GhostLinkGenerator } from "@/components/GhostLinkGenerator"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold">GhostShare</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">How It Works</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a>
          </div>
        </nav>

        <Hero />

        <div className="max-w-2xl mx-auto mt-12">
          <GhostLinkGenerator />
        </div>

        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>&copy; 2025 GhostShare. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
