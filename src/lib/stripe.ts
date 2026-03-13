import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Lazy-loaded server-side Stripe client
let stripeClient: Stripe | null = null;

function getStripeServer(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      // Return a mock for build/development
      console.warn('Stripe not configured. Using mock client.');
      return new Stripe('sk_test_placeholder', { apiVersion: '2026-02-25.clover' as any });
    }
    stripeClient = new Stripe(key, { apiVersion: '2026-02-25.clover' as any });
  }
  return stripeClient;
}

export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    return getStripeServer()[prop as keyof Stripe];
  }
});

// Client-side Stripe
let stripePromise: Promise<any>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

// Pricing plans
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['3 forms per month', 'Basic field detection', 'PDF export'],
    maxForms: 3,
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    features: ['Unlimited forms', 'AI guidance', 'Priority support', 'Advanced validation', 'Multiple export formats'],
    maxForms: -1,
  },
};

export async function createCheckoutSession(priceId: string, customerId?: string) {
  const response = await fetch('/api/stripe/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, customerId }),
  });
  return response.json();
}