const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const Stripe = require('stripe');
const sendWhatsApp = require('../services/twilio');

const prisma = new PrismaClient();

// Initialize Stripe with validation
if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_xxx') {
  console.error('❌ STRIPE_SECRET_KEY is not configured properly. Please add your real Stripe secret key to .env file');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20'
});

// Create Stripe payment intent
router.post('/stripe/create-intent',
  body('amount').isFloat({ min: 100 }),
  body('type').isIn(['consultation', 'second-opinion', 'document-upload']),
  body('refId').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      // Validate Stripe key is configured
      if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_xxx') {
        return res.status(500).json({ 
          message: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to .env file.',
          code: 'STRIPE_NOT_CONFIGURED'
        });
      }

      const { amount, type, refId } = req.body;
      
      // Validate amount is at least 50 INR (0.5 USD equivalent)
      if (amount < 50) {
        return res.status(400).json({ 
          message: 'Minimum amount is 50 INR' 
        });
      }

      const intent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'inr',
        metadata: { type, refId }
      });
      res.json({ clientSecret: intent.client_secret });
    } catch (err) {
      console.error('Stripe error details:', {
        message: err.message,
        type: err.type,
        code: err.code,
        statusCode: err.statusCode,
        stripeKeyConfigured: !!process.env.STRIPE_SECRET_KEY
      });
      
      // Provide specific error messages
      if (err.type === 'StripeInvalidRequestError') {
        res.status(400).json({ 
          message: 'Invalid payment request: ' + err.message,
          code: err.code
        });
      } else if (err.type === 'StripeAuthenticationError') {
        res.status(500).json({ 
          message: 'Stripe authentication failed. Invalid API key.',
          code: 'STRIPE_AUTH_ERROR'
        });
      } else {
        res.status(500).json({ 
          message: 'Failed to create payment intent: ' + err.message,
          code: err.code || 'UNKNOWN_ERROR'
        });
      }
    }
  }
);

// Verify Stripe payment
router.post('/stripe/verify',
  body('paymentIntentId').notEmpty(),
  body('type').isIn(['consultation', 'second-opinion', 'document-upload']),
  body('refId').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { paymentIntentId, type, refId } = req.body;
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (intent.status !== 'succeeded') {
        return res.status(400).json({ message: 'Payment not completed' });
      }

      // Update record based on type
      if (type === 'consultation') {
        await prisma.consultation.update({
          where: { id: refId },
          data: { paymentStatus: 'paid', paymentId: paymentIntentId, paymentMethod: 'stripe' }
        });
        const c = await prisma.consultation.findUnique({ where: { id: refId }, include: { doctor: true } });
        try {
          await sendWhatsApp({
            to: c.phone,
            body: `Hi ${c.patientName}, your booking for Dr. ${c.doctor.name} on ${c.date} at ${c.timeSlot} is confirmed. Reference: ${c.id}`
          });
        } catch (e) {}
      } else if (type === 'second-opinion') {
        await prisma.secondOpinion.update({
          where: { id: refId },
          data: { paymentStatus: 'paid', paymentId: paymentIntentId, paymentMethod: 'stripe' }
        });
        const s = await prisma.secondOpinion.findUnique({ where: { id: refId } });
        try {
          await sendWhatsApp({
            to: s.phone,
            body: `Your second opinion request has been successfully submitted. Our doctors will review your reports shortly. Reference: ${s.id}`
          });
        } catch (e) {}
      }

      res.json({ success: true });
    } catch (err) {
      console.error('Stripe verify error:', err);
      res.status(500).json({ message: 'Verification failed' });
    }
  }
);

module.exports = router;
