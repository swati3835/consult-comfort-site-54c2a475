import React from 'react';

interface LetterheadProps {
  clinicLogoPath?: string;
  isPrinting?: boolean;
}

export const DigitalLetterhead: React.FC<LetterheadProps> = ({ 
  clinicLogoPath = '/assets/icon.jpeg',
  isPrinting = false,
}) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="w-full bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Top Blue Bar */}
      <div className="bg-blue-900 h-1.5"></div>
      
      {/* Header Section */}
      <div className="px-8 pt-6 pb-4 flex justify-between items-start border-b border-gray-200">
        {/* Left: Logo and Clinic Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0">
            <img 
              src={clinicLogoPath} 
              alt="KANT Healthcare Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-900 uppercase tracking-wide">
              KANT Healthcare
            </h2>
            <p className="text-xs text-gray-600 font-semibold">
              Licensed Medical Consultation Platform
            </p>
          </div>
        </div>

        {/* Right: Date */}
        <div className="text-right">
          <p className="text-sm text-gray-700 font-semibold">{dateStr}</p>
        </div>
      </div>

      {/* Content Area - Large Empty Space */}
      <div className="px-12 py-12 min-h-96">
        <div className="border-2 border-dashed border-gray-300 rounded p-8 min-h-80 flex items-start">
          <p className="text-gray-400 text-sm italic">
            Content goes here - Add your prescription, medical report, or consultation details
          </p>
        </div>
      </div>

      {/* Signature Area */}
      <div className="px-12 py-6 border-t border-gray-300">
        <div className="text-right mb-12">
          <p className="text-gray-700 text-sm mb-1">_________________</p>
          <p className="text-gray-700 text-xs font-semibold">Doctor Signature</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white px-8 py-4 mt-auto">
        <div className="flex justify-between items-center text-xs">
          <div className="space-y-1">
            <p>📧 info@kanthealthcare.com</p>
            <p>📱 +91 74094 66222</p>
          </div>
          <div className="text-center">
            <p className="font-bold">WWW.KANTHEALTHCARE.COM</p>
            <p className="text-xs">Licensed Medical Platform</p>
          </div>
          <div className="space-y-1 text-right">
            <p>📍 KANT Healthcare</p>
            <p>Your Health, Our Priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const exportLetterheadAsPDF = async (
  content: string,
  filename: string = 'kant-healthcare-document.pdf'
) => {
  try {
    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = document.createElement('div');
    element.innerHTML = content;
    
    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    await html2pdf().set(options).from(element).save();
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    return false;
  }
};

export default DigitalLetterhead;
