const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const sendWhatsApp = require('../services/twilio');

const prisma = new PrismaClient();

// Initialize Razorpay with validation
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error(
    '❌ RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not configured properly. Please add your Razorpay test/live keys to backend/.env file'
  );
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Create Razorpay order
router.post(
  '/razorpay/order',
  body('amount').isFloat({ min: 50 }),
  body('type').isIn(['consultation', 'second-opinion', 'document-upload']),
  body('refId').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({
          message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to backend/.env file.',
          code: 'RAZORPAY_NOT_CONFIGURED',
        });
      }

      const { amount, type, refId } = req.body;

      // Razorpay expects amount in paise
      const options = {
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `${type}_${refId}`,
        notes: { type, refId },
      };

      const order = await razorpay.orders.create(options);

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (err) {
      console.error('Razorpay order error:', err);
      const description = err?.error?.description || err?.message || 'Unknown error';
      res.status(500).json({
        message: 'Failed to create payment order: ' + description,
        code: 'RAZORPAY_ORDER_ERROR',
      });
    }
  }
);

// Verify Razorpay payment
router.post(
  '/razorpay/verify',
  body('orderId').notEmpty(),
  body('paymentId').notEmpty(),
  body('signature').notEmpty(),
  body('type').isIn(['consultation', 'second-opinion', 'document-upload']),
  body('refId').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { orderId, paymentId, signature, type, refId } = req.body;

      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (expectedSignature !== signature) {
        return res.status(400).json({ message: 'Invalid payment signature', code: 'INVALID_SIGNATURE' });
      }

      // Update record based on type
      if (type === 'consultation') {
        await prisma.consultation.update({
          where: { id: refId },
          data: { paymentStatus: 'paid', paymentId: paymentId, paymentMethod: 'razorpay' },
        });
        const c = await prisma.consultation.findUnique({ where: { id: refId }, include: { doctor: true } });
        try {
          await sendWhatsApp({
            to: c.phone,
            body: `Hi ${c.patientName}, your booking for Dr. ${c.doctor.name} on ${c.date} at ${c.timeSlot} is confirmed. Reference: ${c.id}`,
          });
        } catch (e) {}
      } else if (type === 'second-opinion') {
        await prisma.secondOpinion.update({
          where: { id: refId },
          data: { paymentStatus: 'paid', paymentId: paymentId, paymentMethod: 'razorpay' },
        });
        const s = await prisma.secondOpinion.findUnique({ where: { id: refId } });
        try {
          await sendWhatsApp({
            to: s.phone,
            body: `Your second opinion request has been successfully submitted. Our doctors will review your reports shortly. Reference: ${s.id}`,
          });
        } catch (e) {}
      } else if (type === 'document-upload') {
        await prisma.documentUpload.update({
          where: { id: refId },
          data: { paymentStatus: 'paid', paymentId: paymentId, paymentMethod: 'razorpay' },
        });
      }

      res.json({ success: true });
    } catch (err) {
      console.error('Razorpay verify error:', err);
      res.status(500).json({ message: 'Verification failed' });
    }
  }
);

module.exports = router;
