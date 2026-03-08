# Consult Comfort - Complete Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Frontend Components](#frontend-components)
6. [Backend API](#backend-api)
7. [Database Schema](#database-schema)
8. [Authentication & Security](#authentication--security)
9. [Payment Integration](#payment-integration)
10. [Services](#services)
11. [Setup & Installation](#setup--installation)
12. [Configuration](#configuration)
13. [Development Workflow](#development-workflow)
14. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Consult Comfort** is a modern, full-stack healthcare consultation and second opinion platform that enables patients to:

- **Book doctor consultations** via video or voice calls
- **Request medical second opinions** by uploading documents
- **Securely upload medical documents** for storage and review
- **Make secure payments** through Stripe
- **Receive automatic notifications** via WhatsApp

### Key Features

✅ Real-time doctor slot management with no double-booking  
✅ Multi-service offering (consultations, second opinions, document uploads)  
✅ Secure payment processing with Stripe  
✅ WhatsApp notifications via Twilio  
✅ Admin dashboard for managing consultations  
✅ JWT-based authentication for protected routes  
✅ File upload validation and secure storage  
✅ Responsive design with modern UI (shadcn/ui + TailwindCSS)

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React/TS)                   │
│  - Pages (Booking, Consultation, Second Opinion, Admin)  │
│  - Components (Forms, Cards, Dialogs, UI Elements)       │
│  - State Management (React Router, React Query)          │
└────────────┬────────────────────────────────────────────┘
             │ HTTP/REST
             ↓
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                 │
│  - Routes (Consultation, Payment, Admin, Second Opinion) │
│  - Services (Chatbot, Twilio WhatsApp)                   │
│  - Models (Doctor, Consultation, Booking, Payment)       │
│  - Middleware (Auth, Validation)                         │
└────────────┬────────────────────────────────────────────┘
             │ SQL
             ↓
┌─────────────────────────────────────────────────────────┐
│         DATABASE (PostgreSQL + Prisma ORM)              │
│  - Doctors, TimeSlots, Consultations, Payments, Leads   │
└─────────────────────────────────────────────────────────┘

External Services:
├─ Stripe (Payments)
└─ Twilio (WhatsApp Notifications)
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18+ | UI Library |
| TypeScript | Latest | Type Safety |
| Vite | Latest | Build Tool |
| TailwindCSS | 3+ | Styling |
| shadcn/ui | Latest | UI Components |
| React Router | 6+ | Navigation |
| React Query | 5+ | Data Fetching |
| Zod | Latest | Schema Validation |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 16+ | Runtime |
| Express | 4.18+ | Web Framework |
| PostgreSQL | 12+ | Database |
| Prisma | 5+ | ORM |
| Stripe | 13+ | Payment Processing |
| Twilio | 4+ | WhatsApp API |
| JWT | 9+ | Authentication |
| Multer | 1.4+ | File Upload |
| bcryptjs | 2.4+ | Password Hashing |

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-reload
- **Vitest** - Unit testing

---

## Project Structure

```
consult-comfort-site-54c2a475/
├── src/                              # Frontend source
│   ├── pages/
│   │   ├── Index.tsx                 # Home page
│   │   ├── About.tsx                 # About page
│   │   ├── Services.tsx              # Services listing
│   │   ├── Doctors.tsx               # Doctor directory
│   │   ├── Contact.tsx               # Contact page
│   │   ├── Book.tsx                  # Legacy booking (deprecated)
│   │   ├── BookNow.tsx               # Service selection & pricing
│   │   ├── Consultation.tsx          # Consultation booking form
│   │   ├── SecondOpinion.tsx         # Second opinion form
│   │   ├── DocumentUpload.tsx        # Document upload form
│   │   ├── NotFound.tsx              # 404 page
│   │   └── admin/
│   │       ├── DoctorLogin.tsx       # Doctor authentication
│   │       └── DoctorDashboard.tsx   # Doctor portal
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navigation header
│   │   │   ├── Footer.tsx            # Footer
│   │   │   └── Layout.tsx            # Main layout wrapper
│   │   ├── booking/
│   │   │   ├── DepartmentStep.tsx    # Department selection
│   │   │   ├── DoctorStep.tsx        # Doctor selection
│   │   │   ├── DateTimeStep.tsx      # Date/time picker
│   │   │   ├── ConsultationTypeStep.tsx  # Consultation type
│   │   │   ├── PatientInfoStep.tsx   # Patient details form
│   │   │   ├── PaymentStep.tsx       # Payment processing
│   │   │   └── ConfirmationStep.tsx  # Booking confirmation
│   │   ├── ConsentForm.jsx           # Patient consent modal
│   │   ├── DigitalLetterhead.tsx     # Medical letterhead template
│   │   ├── EPrescription.tsx         # E-prescription display
│   │   ├── DoctorCard.jsx            # Doctor profile card
│   │   ├── MarketingChatbot.tsx      # Chatbot widget
│   │   ├── QRCodeGenerator.tsx       # QR code generator
│   │   ├── NavLink.tsx               # Navigation link component
│   │   ├── LetterheadDownload.tsx    # Letterhead download
│   │   └── ui/                       # shadcn/ui components
│   ├── data/
│   │   └── clinic-data.ts            # Doctor & department data
│   ├── hooks/
│   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   └── use-toast.ts              # Toast notification hook
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── assets/                       # Images & static files
│   ├── App.tsx                       # Main app component
│   ├── App.css                       # Global styles
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Base styles
├── backend/                          # Backend source
│   ├── index.js                      # Express app initialization
│   ├── routes/
│   │   ├── consultation.js           # Consultation booking API
│   │   ├── secondOpinion.js          # Second opinion API
│   │   ├── payment.js                # Stripe payment API
│   │   ├── doctor.js                 # Doctor management API
│   │   ├── admin.js                  # Admin dashboard API
│   │   ├── chatbot.js                # Chatbot API
│   │   └── prescription.js           # Prescription management API
│   ├── models/
│   │   ├── Consultation.js           # Consultation model
│   │   ├── Doctor.js                 # Doctor model
│   │   └── SecondOpinion.js          # Second opinion model
│   ├── services/
│   │   ├── chatbotService.js         # Chatbot logic & NLP
│   │   └── twilio.js                 # WhatsApp notifications
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Migration history
│   ├── uploads/                      # User uploaded files
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Example .env file
│   ├── package.json                  # Dependencies
│   └── README.md                     # Backend setup guide
├── server/                           # Alternative backend setup
│   ├── index.js                      # JSON DB server
│   ├── db.json                       # JSON database
│   ├── prisma/
│   │   └── schema.prisma             # Alternative schema
│   └── package.json                  # Dependencies
├── public/                           # Static files
│   └── robots.txt                    # SEO robots file
├── index.html                        # HTML entry point
├── package.json                      # Frontend dependencies
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # TailwindCSS configuration
├── tailwind.config.ts                # TailwindCSS configuration
├── eslint.config.js                  # ESLint configuration
├── postcss.config.js                 # PostCSS configuration
├── vitest.config.ts                  # Vitest configuration
├── components.json                   # shadcn/ui configuration
├── DOCUMENTATION.md                  # This file
└── README.md                         # Project README

```

---

## Frontend Components

### Pages

#### **Index.tsx** (Home Page)
- Hero section with CTA buttons
- Services overview
- Doctor showcase
- Statistics section
- Features highlight

#### **About.tsx**
- Company mission & vision
- Core values
- Team/company information
- CTA sections

#### **Services.tsx**
- Voice call consultation details
- Video call consultation details
- Specialty-based services
- Pricing information
- Feature comparison

#### **Doctors.tsx**
- Doctor directory
- Filter by specialty
- Doctor profiles with qualifications
- Book appointment CTA

#### **BookNow.tsx**
- Service selection
- Price comparison
- Feature listing
- Service packages (consultation, second opinion, board review)

#### **Book.tsx** (Legacy)
- Step-based booking form
- Department selection
- Doctor selection
- Date/time picking
- Patient information
- Payment processing

#### **Consultation.tsx**
- Consultation booking form
- Doctor selection
- Slot management
- Patient details collection
- Stripe payment integration

#### **SecondOpinion.tsx**
- Medical document submission form
- Case description
- Document upload interface
- Payment processing
- Confirmation

#### **DocumentUpload.tsx**
- Multi-step document upload
- Document type selection
- File validation
- Review and payment
- Confirmation with tracking

#### **DoctorLogin.tsx** (Admin)
- Doctor authentication
- Email & password login
- JWT token generation
- Session management

#### **DoctorDashboard.tsx** (Admin)
- View consultations
- Manage appointments
- Upload prescriptions
- Generate e-prescriptions
- View patient details

### Layout Components

#### **Header.tsx**
- Navigation menu
- Logo
- Links to main pages
- Mobile menu
- Authentication status

#### **Footer.tsx**
- Company information
- Quick links
- Contact information
- Social media links

#### **Layout.tsx**
- Wrapper component
- Header + Footer integration
- Page transitions

### Booking Form Steps

#### **DepartmentStep.tsx**
- Select medical department
- Displays available departments
- Validates selection

#### **DoctorStep.tsx**
- Select doctor from department
- Shows doctor profiles
- Displays availability
- Validates selection

#### **DateTimeStep.tsx**
- Calendar date picker
- Time slot selection
- Shows doctor availability
- Prevents past date selection

#### **ConsultationTypeStep.tsx**
- Choose between voice/video
- Shows type-specific details
- Price display

#### **PatientInfoStep.tsx**
- Collect patient details
- Name, email, phone, DOB
- Gender, medical history
- Consent form

#### **PaymentStep.tsx**
- Stripe payment form
- Amount display
- Card details collection
- Payment processing

#### **ConfirmationStep.tsx**
- Booking confirmation
- Appointment details
- Booking ID
- Next steps

### UI Components (shadcn)

shadcn/ui pre-built components:
- **Button** - CTA & action buttons
- **Card** - Content containers
- **Dialog** - Modal windows
- **Form** - Form wrapper with validation
- **Input** - Text inputs
- **Select** - Dropdown selections
- **Checkbox** - Multiple selections
- **Badge** - Status indicators
- **Accordion** - Expandable content
- **Alert** - Notifications
- **Carousel** - Image sliders
- **Calendar** - Date picker
- **Toast** - Notifications
- **Avatar** - User profile pictures
- **Breadcrumb** - Navigation path

---

## Backend API

### Base URL
```
http://localhost:5000/api
```

### Routes Overview

#### **Consultation Routes** (`/api/consultation`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/doctors` | Fetch all doctors | No |
| GET | `/slots` | Get available slots | No |
| POST | `/book` | Book consultation | No |
| GET | `/:id` | Get consultation details | No |

**Example: Book Consultation**
```javascript
POST /api/consultation/book
{
  "doctorId": "doc-123",
  "patientName": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "date": "2026-03-15",
  "time": "10:00",
  "consultationType": "video",
  "department": "cardiology"
}
```

#### **Second Opinion Routes** (`/api/secondOpinion`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/submit` | Submit second opinion request | No |
| GET | `/:id` | Get second opinion status | No |
| GET | `/admin` | List all second opinions | JWT |
| PUT | `/:id/complete` | Mark as completed | JWT |

**Example: Submit Second Opinion**
```javascript
POST /api/secondOpinion/submit
Content-Type: multipart/form-data

{
  "patientName": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "caseDescription": "Recent cardiac symptoms",
  "documents": [file1, file2]
}
```

#### **Payment Routes** (`/api/payment`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/stripe/create-intent` | Create Stripe payment intent | No |
| POST | `/stripe/confirm` | Confirm Stripe payment | No |
| POST | `/verify` | Verify payment | No |

**Example: Create Payment Intent**
```javascript
POST /api/payment/stripe/create-intent
{
  "amount": 50000,
  "type": "consultation",
  "refId": "consultation-123"
}
```

#### **Admin Routes** (`/api/admin`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/login` | Doctor login | No |
| GET | `/second-opinions` | List second opinions | JWT |
| GET | `/consultations` | List consultations | JWT |
| PUT | `/:id/prescription` | Add prescription | JWT |

**Example: Doctor Login**
```javascript
POST /api/admin/login
{
  "email": "doctor@example.com",
  "password": "securepassword"
}
```

#### **Chatbot Routes** (`/api/chatbot`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/message` | Send chatbot message | No |

**Example: Send Message**
```javascript
POST /api/chatbot/message
{
  "message": "How to book consultation?",
  "name": "John Doe",
  "phone": "+919876543210"
}
```

---

## Database Schema

### **Doctor Model**
```prisma
model Doctor {
  id              String          @id @default(uuid())
  doctorId        String          @unique
  name            String
  specialty       String?
  department      String?
  image           String?
  experience      String?
  qualifications  String?
  bio             String?
  specialisms     String[]
  email           String          @unique
  password        String          # Hashed
  licenseNumber   String          @unique
  phone           String?
  consultations   Consultation[]
  slots           TimeSlot[]
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
}
```

### **TimeSlot Model**
```prisma
model TimeSlot {
  id        String   @id @default(uuid())
  doctorId  String
  doctor    Doctor   @relation(fields: [doctorId], references: [doctorId], onDelete: Cascade)
  date      String   # YYYY-MM-DD
  time      String   # HH:MM
  isBooked  Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@unique([doctorId, date, time])
  @@index([doctorId])
}
```

### **Consultation Model**
```prisma
model Consultation {
  id              String   @id @default(uuid())
  doctorId        String
  doctor          Doctor   @relation(fields: [doctorId], references: [doctorId], onDelete: Cascade)
  patientName     String
  phone           String
  email           String?
  date            String
  time            String
  consultationType String  # "voice" | "video"
  status          String   @default("pending")
  notes           String?
  prescription    String?
  paymentId       String?
  paymentStatus   String   @default("pending")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### **SecondOpinion Model**
```prisma
model SecondOpinion {
  id              String   @id @default(uuid())
  patientName     String
  email           String
  phone           String
  caseDescription String?
  documents       String[] # File paths
  status          String   @default("pending")
  review          String?
  reviewedBy      String?  # Doctor ID
  paymentId       String?
  paymentStatus   String   @default("pending")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### **Lead Model**
```prisma
model Lead {
  id        String   @id @default(uuid())
  name      String?
  phone     String?
  email     String?
  message   String?
  intent    String?
  sessionId String?
  source    String   # "chatbot" | "form" | "direct"
  createdAt DateTime @default(now())
}
```

### **Payment Model**
```prisma
model Payment {
  id            String   @id @default(uuid())
  stripeId      String   @unique
  amount        Float
  currency      String   @default("INR")
  type          String   # "consultation" | "second-opinion" | "document-upload"
  refId         String
  status        String   @default("pending")
  paymentMethod String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## Authentication & Security

### JWT Authentication

**Implementation:**
- Issued on doctor login
- Stored in localStorage (frontend)
- Sent in `Authorization: Bearer <token>` header
- Verified on protected routes

**Protected Routes:**
- `GET /api/admin/second-opinions`
- `GET /api/admin/consultations`
- `PUT /api/admin/:id/prescription`

### Password Security

- Hashed using **bcryptjs** (10 salt rounds)
- Never stored in plaintext
- Compared using timing-safe comparison

### File Upload Security

- **Allowed types:** PDF, JPEG, PNG, DOC, DOCX
- **Max size:** 5MB per file, 20MB total
- **Validation:** Extension + MIME type check
- **Storage:** `/backend/uploads` directory

### CORS Configuration

```javascript
Allowed Origins:
- http://localhost:5173 (Frontend dev)
- http://localhost:8080 (Alternative)
- ${process.env.FRONTEND_URL}
```

---

## Payment Integration

### Stripe Setup

**Configuration:**
- Secret Key: `STRIPE_SECRET_KEY`
- Publishable Key: `STRIPE_PUBLISHABLE_KEY`
- API Version: 2024-06-20

**Payment Flow:**

```
1. Frontend → Backend: Create Payment Intent
   POST /api/payment/stripe/create-intent
   { amount, type, refId }

2. Backend → Stripe: Create Intent
   Returns: { clientSecret }

3. Frontend: Show Stripe payment form
   Use clientSecret for payment

4. Frontend → Backend: Confirm Payment
   POST /api/payment/stripe/confirm
   { paymentIntentId }

5. Backend → Database: Update payment status
   Update relevant consultation/secondOpinion record

6. Backend → Frontend: Return confirmation
```

**Test Cards:**

| Card Number | Type | Result |
|------------|------|--------|
| 4242 4242 4242 4242 | Visa | Success |
| 4000 0000 0000 0002 | Visa | Declined |
| 5555 5555 5555 4444 | Mastercard | Success |

---

## Services

### ChatBot Service (`backend/services/chatbotService.js`)

**Functionality:**
- Intent detection from user messages
- Automated response generation
- Lead capture from conversations
- Suggestion-based navigation

**Intents Detected:**
- `GREETING` - Hello, Hi, etc.
- `SERVICES` - Ask about services
- `BOOKING` - Want to book
- `DOCTORS` - Ask about doctors
- `PRICING` - Ask about costs
- `CONTACT` - Contact information
- `LOCATION` - Location details
- `THANK_YOU` - Gratitude expressions
- `GENERAL` - General questions

**Example Intent Response:**
```javascript
{
  message: "Great! You can book an appointment...",
  buttons: [
    { text: 'Book Consultation', action: 'NAVIGATE_CONSULTATION' },
    { text: 'Get Second Opinion', action: 'NAVIGATE_SECOND_OPINION' }
  ],
  suggestions: ['Tell me about consultation', 'How much does it cost?']
}
```

### Twilio WhatsApp Service (`backend/services/twilio.js`)

**Functionality:**
- Send appointment confirmations via WhatsApp
- Send payment receipts
- Send reminders
- Two-way messaging support

**Configuration:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+1415xxxxxx
```

**Example:**
```javascript
sendWhatsApp(
  "+919876543210",
  "Your appointment is confirmed for March 15, 2026 at 10:00 AM"
);
```

---

## Setup & Installation

### Prerequisites

- **Node.js** v16 or higher
- **PostgreSQL** v12 or higher
- **npm** or **yarn**
- **Git**

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd consult-comfort-site-54c2a475
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 4: Setup Environment Variables

**Frontend** (`.env` in root):
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUB_KEY=pk_test_xxxx
```

**Backend** (`.backend/.env`):
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/consult_comfort

# Server
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=xxxx
TWILIO_WHATSAPP_FROM=whatsapp:+1415xxxxxx

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 5: Setup Database

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Open Prisma Studio (optional)
npx prisma studio
```

### Step 6: Start Development Servers

**Terminal 1 - Backend (port 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (port 5173):**
```bash
npm run dev
```

### Step 7: Access Application

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Prisma Studio:** http://localhost:5555 (if running)

---

## Configuration

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
```

### TypeScript Configuration (`tsconfig.json`)

- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Path aliases configured

### TailwindCSS Configuration (`tailwind.config.ts`)

- Custom color palette (gold, primary, secondary)
- Extended theme for healthcare branding
- Dark mode support
- Custom animations

### Prisma Configuration (`backend/prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

## Development Workflow

### Project Commands

**Frontend:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Watch mode tests
```

**Backend:**
```bash
npm run dev          # Start with nodemon
npm start            # Start normally
npx prisma studio   # Open Prisma Studio
npx prisma migrate  # Run migrations
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature"

# Push to remote
git push origin feature/feature-name

# Create pull request
```

### Code Standards

- **ESLint** enabled for code quality
- **TypeScript** for type safety
- **Prettier** for code formatting
- **Component naming:** PascalCase for components
- **Function naming:** camelCase for functions
- **Constants:** UPPER_SNAKE_CASE

### Testing

**Unit Tests:**
```bash
npm run test
```

**Test Watch Mode:**
```bash
npm run test:watch
```

**Test File Structure:**
```
src/
├── components/
│   └── Button.tsx
│   └── Button.test.ts
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. **Database Connection Error**

**Error:**
```
Error: No database URL found
```

**Solution:**
- Check `.env` file exists in `backend/` directory
- Verify `DATABASE_URL` is set correctly
- Ensure PostgreSQL is running
- Test connection: `psql -U postgres -h localhost`

#### 2. **Prisma Studio Won't Open**

**Error:**
```
Error: No database URL found
```

**Solution:**
```bash
cd backend
npx prisma studio
```

Ensure you're in the `backend` directory where `.env` is located.

#### 3. **Stripe Payment Not Working**

**Error:**
```
STRIPE_SECRET_KEY is not configured
```

**Solution:**
- Add real Stripe keys to `.env`
- Keys should start with `sk_test_` (secret) and `pk_test_` (public)
- Restart backend server after updating `.env`

#### 4. **Frontend Can't Connect to Backend**

**Error:**
```
Failed to fetch / CORS error
```

**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_BACKEND_URL` in frontend `.env`
- Verify CORS configuration in `backend/index.js`

#### 5. **Module Not Found**

**Error:**
```
Cannot find module '@/components/...'
```

**Solution:**
- Path aliases are configured in `tsconfig.json`
- Ensure proper import path: `@/components/name`
- Restart dev server after changes

#### 6. **Port Already in Use**

**Error:**
```
EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Or change PORT in backend/.env
PORT=5001
```

#### 7. **File Upload Not Working**

**Error:**
```
File size exceeds limit
```

**Solution:**
- Max file size: 5MB per file
- Max total size: 20MB
- Allowed formats: PDF, JPEG, PNG, DOC, DOCX

#### 8. **WhatsApp Messages Not Sending**

**Error:**
```
Twilio credentials missing
```

**Solution:**
- Add Twilio credentials to `.env`:
  ```
  TWILIO_ACCOUNT_SID=ACxxxx
  TWILIO_AUTH_TOKEN=xxxx
  TWILIO_WHATSAPP_FROM=whatsapp:+1415xxxxxx
  ```
- Verify phone numbers have correct country codes

---

## API Response Format

### Success Response
```javascript
{
  success: true,
  data: { /* response data */ },
  message: "Operation successful"
}
```

### Error Response
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable error message"
  }
}
```

### Validation Error Response
```javascript
{
  errors: [
    {
      field: "email",
      message: "Invalid email format"
    }
  ]
}
```

---

## Environment Variables Reference

### Frontend Variables
| Variable | Type | Description | Required |
|----------|------|-------------|----------|
| `VITE_BACKEND_URL` | URL | Backend API base URL | Yes |
| `VITE_STRIPE_PUB_KEY` | String | Stripe publishable key | Yes |

### Backend Variables
| Variable | Type | Description | Required |
|----------|------|-------------|----------|
| `DATABASE_URL` | URL | PostgreSQL connection string | Yes |
| `PORT` | Number | Express server port | No (default: 5000) |
| `NODE_ENV` | String | Development or production | No |
| `JWT_SECRET` | String | Secret for JWT signing | Yes |
| `STRIPE_SECRET_KEY` | String | Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | String | Stripe public key | Yes |
| `TWILIO_ACCOUNT_SID` | String | Twilio account ID | No |
| `TWILIO_AUTH_TOKEN` | String | Twilio auth token | No |
| `TWILIO_WHATSAPP_FROM` | String | Twilio WhatsApp number | No |
| `FRONTEND_URL` | URL | Frontend URL for CORS | No |

---

## Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading components with React.lazy()
- Image optimization with next-gen formats
- CSS minification with PostCSS
- Bundle size monitoring with Vite

### Backend
- Database query optimization with Prisma
- Connection pooling with PostgreSQL
- Caching with Redis (optional)
- Rate limiting on public endpoints
- Compression with gzip

---

## Security Best Practices

1. **Never commit `.env` files** - Use `.env.example`
2. **Keep dependencies updated** - `npm audit`, `npm update`
3. **Use HTTPS in production** - SSL/TLS certificates
4. **Validate all inputs** - Server-side validation required
5. **Hash passwords** - Never store plaintext passwords
6. **Sanitize file uploads** - Scan for malware
7. **Implement rate limiting** - Prevent brute force
8. **Use secure headers** - Helmet.js for Express
9. **Rotate secrets regularly** - JWT secret, API keys
10. **Monitor logs** - Track suspicious activities

---

## Support & Contact

For issues or questions:
- **Documentation**: Review this file
- **Backend Readme**: `backend/README.md`
- **Server Setup**: `backend/SETUP.md`
- **Issue Tracker**: Create GitHub issue
- **Email**: contact@kanthealth.com

---

## License

This project is proprietary. All rights reserved.

---

**Last Updated:** February 27, 2026  
**Version:** 1.0.0
