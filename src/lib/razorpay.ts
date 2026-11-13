// Razorpay Integration - Test Mode
// To use in production:
// 1. Sign up at https://razorpay.com
// 2. Get API keys from Dashboard > Settings > API Keys
// 3. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local
// 4. Install: npm install razorpay

export interface PaymentOrder {
  amount: number; // in paise (multiply INR by 100)
  currency: string;
  receipt: string;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Platform commission: 10%
export const PLATFORM_COMMISSION_RATE = 0.10;

export function calculatePlatformFee(projectBudget: number): { studentAmount: number; platformFee: number } {
  const platformFee = Math.round(projectBudget * PLATFORM_COMMISSION_RATE);
  const studentAmount = projectBudget - platformFee;
  return { studentAmount, platformFee };
}

// Demo payment flow - works without Razorpay API keys
export async function createDemoPayment(fromUserId: string, toUserId: string, amount: number, context: string) {
  const { studentAmount, platformFee } = calculatePlatformFee(amount);
  // In demo mode, we just record the payment
  return {
    id: `pay_${Date.now()}`,
    fromUserId,
    toUserId,
    amount: studentAmount,
    platformFee,
    status: 'completed',
    context,
    createdAt: new Date(),
  };
}

// Real Razorpay integration (requires API keys)
// Install razorpay: npm install razorpay
// Then uncomment below:

/*
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(amount: number, receipt: string) {
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt,
  });
  return order;
}

export async function verifyRazorpayPayment(paymentData: PaymentVerification) {
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${paymentData.razorpay_order_id}|${paymentData.razorpay_payment_id}`)
    .digest('hex');
  return expectedSignature === paymentData.razorpay_signature;
}
*/

export const RAZORPAY_CONFIG = {
  keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo_key',
  currency: 'INR',
  name: 'LearnWorks',
  description: 'Micro-Internship Payment',
  theme: { color: '#4f46e5' },
};
