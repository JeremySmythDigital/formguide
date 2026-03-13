import Link from 'next/link';

export default function Dashboard() {
  // Mock data - in production, this would come from Supabase
  const recentForms = [
    { id: '1', name: 'IRS Form 1040', status: 'completed', date: '2024-01-15', fields: 42 },
    { id: '2', name: 'USCIS I-485', status: 'in_progress', date: '2024-01-14', fields: 78 },
    { id: '3', name: 'SSA Application', status: 'draft', date: '2024-01-13', fields: 23 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xl font-bold text-white">FormGuide.ai</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-white font-semibold">Dashboard</Link>
            <Link href="/pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
            <Link href="/app" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
              New Form
            </Link>
          </div>
        </nav>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Forms Processed', value: '3', color: 'text-purple-400' },
            { label: 'Fields Filled', value: '143', color: 'text-blue-400' },
            { label: 'Time Saved', value: '45min', color: 'text-green-400' },
            { label: 'Plan', value: 'Free', color: 'text-yellow-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Forms */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Recent Forms</h2>
            <Link href="/app" className="text-purple-400 hover:text-purple-300 text-sm">
              Upload New Form →
            </Link>
          </div>
          <div className="divide-y divide-white/10">
            {recentForms.map((form) => (
              <div key={form.id} className="p-6 flex justify-between items-center hover:bg-white/5 transition">
                <div>
                  <h3 className="text-white font-medium">{form.name}</h3>
                  <p className="text-white/50 text-sm">{form.fields} fields • {form.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      form.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : form.status === 'in_progress'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {form.status === 'completed' ? 'Completed' : form.status === 'in_progress' ? 'In Progress' : 'Draft'}
                  </span>
                  <Link href={`/app?session=${form.id}`} className="text-purple-400 hover:text-purple-300">
                    Continue →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Need More Forms?</h3>
          <p className="text-white/70 mb-6">Upgrade to Pro for unlimited forms and advanced features.</p>
          <Link href="/pricing" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition inline-block">
            View Plans
          </Link>
        </div>
      </section>
    </main>
  );
}