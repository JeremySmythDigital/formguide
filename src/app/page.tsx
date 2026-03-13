import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xl font-bold text-white">FormGuide.ai</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition">Dashboard</Link>
            <Link href="/pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
            <Link href="/app" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
              Start Free
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Navigate Government Forms
            <span className="text-purple-400"> with AI Confidence</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Upload any government form. Our AI detects every field, guides you through each section, 
            and validates your answers before you submit. No more rejected applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/app" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-600/30">
              Try Free Now
            </Link>
            <Link href="#how-it-works" className="border border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl text-lg font-semibold transition">
              See How It Works
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
            <div className="text-white/70">Forms Processed</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">99%</div>
            <div className="text-white/70">Accuracy Rate</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">10min</div>
            <div className="text-white/70">Avg. Time Saved</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: 1, title: 'Upload Form', desc: 'Upload PDF or image of any government form', icon: '📄' },
            { step: 2, title: 'AI Detection', desc: 'AI identifies all fields and their types', icon: '🔍' },
            { step: 3, title: 'Guided Filling', desc: 'Step-by-step guidance for each field', icon: '✏️' },
            { step: 4, title: 'Export', desc: 'Download your completed form', icon: '✅' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white/5">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Smart Field Detection', desc: 'AI automatically identifies text fields, checkboxes, dates, and more from any form.' },
            { title: 'Context-Aware Guidance', desc: 'Get field-specific help explaining what information is needed and common mistakes to avoid.' },
            { title: 'Real-Time Validation', desc: 'Instant validation catches errors before submission.' },
            { title: 'Progress Saving', desc: 'Save your progress and continue later from any device.' },
            { title: 'Multiple Export Formats', desc: 'Export as PDF, JSON, or pre-filled templates.' },
            { title: 'Bank-Level Security', desc: 'Your data is encrypted and never shared.' },
          ].map((f, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-white/60 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Fill Forms with Confidence?</h2>
        <p className="text-white/70 mb-8">Start with 3 free forms per month. No credit card required.</p>
        <Link href="/app" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-600/30 inline-block">
          Start Free Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/50 text-sm">
          © 2024 FormGuide.ai. Government form assistance powered by AI.
        </div>
      </footer>
    </main>
  );
}