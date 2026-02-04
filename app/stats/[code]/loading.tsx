export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-8">
          <div className="h-10 w-24 bg-slate-800 rounded animate-pulse" />
          <div className="h-8 w-8 bg-indigo-500/50 rounded-lg animate-pulse" />
        </nav>

        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-slate-800 rounded animate-pulse" />
            <div className="h-5 w-32 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-10 w-40 bg-slate-800 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 space-y-3">
              <div className="h-5 w-24 bg-slate-800 rounded animate-pulse" />
              <div className="h-10 w-20 bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="h-6 w-32 bg-slate-800 rounded animate-pulse mb-4" />
            <div className="h-[300px] bg-slate-800/50 rounded animate-pulse" />
          </div>
          <div className="glass-card p-6 space-y-3">
            <div className="h-6 w-32 bg-slate-800 rounded animate-pulse" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-slate-800/50 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
