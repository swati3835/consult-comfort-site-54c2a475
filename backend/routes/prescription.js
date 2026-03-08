const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /api/prescription/create - Doctor creates a prescription
router.post(
  '/create',
  [
    body('patientName').notEmpty().withMessage('Patient name required'),
    body('consultationId').notEmpty().withMessage('Consultation ID required'),
    body('doctorName').notEmpty().withMessage('Doctor name required'),
    body('doctorSpecialty').notEmpty().withMessage('Doctor specialty required'),
    body('diagnosis').notEmpty().withMessage('Diagnosis required'),
    body('medications').isArray().withMessage('Medications must be an array'),
    body('medications.*.name').notEmpty().withMessage('Medication name required'),
    body('medications.*.dosage').notEmpty().withMessage('Dosage required'),
    body('medications.*.frequency').notEmpty().withMessage('Frequency required'),
    body('medications.*.duration').notEmpty().withMessage('Duration required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        patientName,
        patientAge,
        patientGender,
        patientEmail,
        consultationId,
        doctorName,
        doctorId,
        doctorSpecialty,
        diagnosis,
        medications,
        notes,
        followUpDate
      } = req.body;

      // Create prescription record
      const prescription = await prisma.prescription.create({
        data: {
          patientName,
          patientAge: patientAge ? parseInt(patientAge) : null,
          patientGender,
          patientEmail,
          consultationId,
          doctorName,
          doctorId,
          doctorSpecialty,
          diagnosis,
          medications: JSON.stringify(medications), // Store as JSON string
          notes,
          followUpDate: followUpDate ? new Date(followUpDate) : null,
          status: 'active',
          createdAt: new Date()
        }
      });

      // If patient email provided, trigger email notification
      if (patientEmail) {
        try {
          // Email sending can be handled by a separate service
          // For now, we'll add it to a queue or send it directly
          // This would typically use nodemailer or SendGrid
          console.log(`Prescription created for ${patientName} - Email will be sent to ${patientEmail}`);
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Don't fail the API call if email fails
        }
      }

      res.json({
        success: true,
        prescription: {
          id: prescription.id,
          patientName: prescription.patientName,
          consultationId: prescription.consultationId,
          createdAt: prescription.createdAt,
          status: prescription.status
        }
      });
    } catch (err) {
      console.error('Error creating prescription:', err);
      res.status(500).json({ message: 'Failed to create prescription' });
    }
  }
);

// GET /api/prescription/:id - Get prescription details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await prisma.prescription.findUnique({
      where: { id }
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Parse medications from JSON
    const parsedPrescription = {
      ...prescription,
      medications: JSON.parse(prescription.medications)
    };

    res.json(parsedPrescription);
  } catch (err) {
    console.error('Error fetching prescription:', err);
    res.status(500).json({ message: 'Failed to fetch prescription' });
  }
});

// GET /api/prescription/consultation/:consultationId - Get prescriptions for consultation
router.get('/consultation/:consultationId', async (req, res) => {
  try {
    const { consultationId } = req.params;

    const prescriptions = await prisma.prescription.findMany({
      where: { consultationId },
      orderBy: { createdAt: 'desc' }
    });

    const parsedPrescriptions = prescriptions.map(p => ({
      ...p,
      medications: JSON.parse(p.medications)
    }));

    res.json(parsedPrescriptions);
  } catch (err) {
    console.error('Error fetching prescriptions:', err);
    res.status(500).json({ message: 'Failed to fetch prescriptions' });
  }
});

// GET /api/prescription/patient/:patientEmail - Get all prescriptions for patient
router.get('/patient/:patientEmail', async (req, res) => {
  try {
    const { patientEmail } = req.params;

    const prescriptions = await prisma.prescription.findMany({
      where: { patientEmail },
      orderBy: { createdAt: 'desc' }
    });

    const parsedPrescriptions = prescriptions.map(p => ({
      ...p,
      medications: JSON.parse(p.medications)
    }));

    res.json(parsedPrescriptions);
  } catch (err) {
    console.error('Error fetching prescriptions:', err);
    res.status(500).json({ message: 'Failed to fetch prescriptions' });
  }
});

// PUT /api/prescription/:id - Update prescription status or details
router.put(
  '/:id',
  [
    body('status').optional().isIn(['active', 'fulfilled', 'expired']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const updateData = {};
      if (status) updateData.status = status;
      if (notes) updateData.notes = notes;

      const prescription = await prisma.prescription.update({
        where: { id },
        data: updateData
      });

      res.json({
        success: true,
        prescription: {
          ...prescription,
          medications: JSON.parse(prescription.medications)
        }
      });
    } catch (err) {
      console.error('Error updating prescription:', err);
      res.status(500).json({ message: 'Failed to update prescription' });
    }
  }
);

// DELETE /api/prescription/:id - Delete prescription (soft delete via status)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await prisma.prescription.update({
      where: { id },
      data: { status: 'expired' }
    });

    res.json({
      success: true,
      message: 'Prescription deleted'
    });
  } catch (err) {
    console.error('Error deleting prescription:', err);
    res.status(500).json({ message: 'Failed to delete prescription' });
  }
});

// POST /api/prescription/:id/email - Send prescription via email
router.post('/:id/email', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipientEmail } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({ message: 'Recipient email required' });
    }

    const prescription = await prisma.prescription.findUnique({
      where: { id }
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Email service would be called here
    // For now, we'll just log it
    console.log(`Prescription ${id} will be sent to ${recipientEmail}`);

    // Update prescription to mark email sent
    await prisma.prescription.update({
      where: { id },
      data: { emailSentAt: new Date() }
    });

    res.json({
      success: true,
      message: 'Prescription email queued for sending'
    });
  } catch (err) {
    console.error('Error sending prescription email:', err);
    res.status(500).json({ message: 'Failed to send prescription email' });
  }
});

module.exports = router;
