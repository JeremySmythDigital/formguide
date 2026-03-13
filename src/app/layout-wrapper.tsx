import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FormGuide.ai - AI-Powered Government Form Assistance',
  description: 'Navigate government forms with AI confidence. Upload any form, get guided through each field, and submit error-free applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}