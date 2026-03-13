# FormGuide.ai

AI-powered government form assistant.

## Features

- **Form Upload**: Upload PDF or image of any government form
- **AI Field Detection**: Mistral AI identifies all form fields automatically
- **Guided Filling**: Step-by-step wizard with field-specific guidance
- **Validation**: Real-time validation catches errors before submission
- **Progress Saving**: Save your progress and continue later
- **Export**: Download filled forms as JSON or PDF

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: Mistral AI for form parsing
- **Payments**: Stripe for Pro subscriptions
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your API keys
4. Run development server: `npm run dev`

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT