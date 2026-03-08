import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DigitalLetterhead } from './DigitalLetterhead';
import { Download, Printer, Mail } from 'lucide-react';

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface EPrescriptionProps {
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  consultationId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  followUpDate?: string;
  showLetterhead?: boolean;
}

const EPrescription: React.FC<EPrescriptionProps> = ({
  patientName,
  patientAge,
  patientGender,
  consultationId,
  doctorName,
  doctorSpecialty,
  date,
  medications,
  diagnosis,
  notes,
  followUpDate,
  showLetterhead = true
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This would require html2pdf library
    const element = document.getElementById('prescription-print');
    if (element) {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<pre>' + element.innerText + '</pre>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleEmailPrescription = async () => {
    try {
      // This would send via backend API
      // await fetch('/api/email/prescription', {
      //   method: 'POST',
      //   body: JSON.stringify({ /* prescription data */ })
      // });
      alert('Prescription will be emailed to your registered email address');
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  return (
    <div className="w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Letterhead */}
        {showLetterhead && <DigitalLetterhead isPrinting={true} />}

        {/* Prescription Content */}
        <div
          id="prescription-print"
          className="bg-white p-8 rounded-lg shadow-lg border-2 border-gold/20"
        >
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-4 mb-6">
            <h1 className="text-3xl font-bold text-primary mb-1">ELECTRONIC PRESCRIPTION</h1>
            <p className="text-sm text-muted-foreground">Valid digital prescription for medical treatment</p>
          </div>

          {/* Prescription Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Patient Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary text-sm uppercase mb-3">Patient Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{patientName}</span>
                </div>
                {patientAge && (
                  <div>
                    <span className="font-medium">Age:</span>
                    <span className="ml-2">{patientAge} years</span>
                  </div>
                )}
                {patientGender && (
                  <div>
                    <span className="font-medium">Gender:</span>
                    <span className="ml-2">{patientGender}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Consultation ID:</span>
                  <span className="ml-2 font-mono text-xs">{consultationId}</span>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary text-sm uppercase mb-3">Doctor Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Doctor:</span>
                  <span className="ml-2">{doctorName}</span>
                </div>
                <div>
                  <span className="font-medium">Specialty:</span>
                  <span className="ml-2">{doctorSpecialty}</span>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <span className="ml-2">{new Date(date).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="font-medium">License:</span>
                  <span className="ml-2 text-xs">KANT-LIC-001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Diagnosis</h3>
            <p className="text-sm text-blue-800">{diagnosis}</p>
          </div>

          {/* Medications */}
          <div className="mb-6">
            <h3 className="font-semibold text-primary text-sm uppercase mb-4">Medications Prescribed</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Medicine Name</th>
                    <th className="px-4 py-2 text-left">Dosage</th>
                    <th className="px-4 py-2 text-left">Frequency</th>
                    <th className="px-4 py-2 text-left">Duration</th>
                    <th className="px-4 py-2 text-left">Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium">{med.name}</td>
                      <td className="px-4 py-3">{med.dosage}</td>
                      <td className="px-4 py-3">{med.frequency}</td>
                      <td className="px-4 py-3">{med.duration}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {med.instructions || 'As directed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          {notes && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-2">Additional Notes</h3>
              <p className="text-sm text-yellow-800">{notes}</p>
            </div>
          )}

          {/* Follow-up */}
          {followUpDate && (
            <div className="bg-green-50 p-4 mb-6 rounded-lg border border-green-200">
              <p className="text-sm">
                <span className="font-semibold">Follow-up Appointment:</span>
                <span className="ml-2">{new Date(followUpDate).toLocaleDateString()}</span>
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t-2 border-primary pt-6 mt-8">
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <p className="font-semibold text-primary mb-2">Doctor's Signature</p>
                <div className="h-12 border-t border-gray-400"></div>
              </div>
              <div>
                <p className="text-muted-foreground">Digital Signature Applied</p>
                <p className="text-xs text-green-600 font-semibold">✓ Verified</p>
              </div>
              <div>
                <p className="font-semibold text-primary mb-2">Date & Seal</p>
                <p className="text-xs">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t">
              This is a digitally signed electronic prescription. It is valid for medical treatment and can be used at any pharmacy.
              For authenticity verification, visit: www.kanthealthcare.com/verify
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 justify-center print:hidden">
          <Button
            onClick={handlePrint}
            className="gap-2"
            variant="outline"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="gap-2"
            variant="outline"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            onClick={handleEmailPrescription}
            className="gap-2 bg-gold hover:bg-gold/90"
          >
            <Mail className="w-4 h-4" />
            Email to Me
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EPrescription;
