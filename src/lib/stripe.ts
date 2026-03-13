import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover' as any,
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