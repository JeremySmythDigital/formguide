import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for occasional form filling',
      features: [
        '3 forms per month',
        'Basic field detection',
        'PDF export',
        'Email support',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'For regular form filers and professionals',
      features: [
        'Unlimited forms',
        'Advanced AI guidance',
        'Multiple export formats',
        'Progress saving & history',
        'Priority support',
        'Custom validation rules',
      ],
      cta: 'Get Pro - $29/month',
      popular: true,
    },
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
            <Link href="/dashboard" className="text-white/70 hover:text-white transition">Dashboard</Link>
            <Link href="/pricing" className="text-white font-semibold">Pricing</Link>
            <Link href="/app" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
              Start Free
            </Link>
          </div>
        </nav>
      </header>

      {/* Pricing Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-white/60 text-lg">Start free, upgrade when you need more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-2 border-purple-500'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="text-purple-400 text-sm font-semibold mb-4">MOST POPULAR</div>
              )}
              <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-white/60">/{plan.period}</span>
              </div>
              <p className="text-white/60 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Free' ? '/app' : '/app'}
                className={`block w-full text-center py-3 rounded-xl font-semibold transition ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'What types of forms does FormGuide support?',
                a: 'We support any government form in PDF or image format. Immigration, tax, benefits, licenses - all forms are processed by our AI.',
              },
              {
                q: 'How does the AI detect fields?',
                a: 'We use Mistral AI to analyze your form document, identify fields, determine their types, and extract labels and instructions.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. All data is encrypted in transit and at rest. We don\'t store your form data on our servers - everything stays in your browser session.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your Pro subscription at any time. You\'ll continue to have access until the end of your billing period.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-white/60 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/50 text-sm">
          © 2024 FormGuide.ai. Government form assistance powered by AI.
        </div>
      </footer>
    </main>
  );
}