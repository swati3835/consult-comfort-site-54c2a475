import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  value?: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  imageSettings?: {
    src: string;
    x?: number;
    y?: number;
    height: number;
    width: number;
  };
}

/**
 * QR Code Generator Component
 * Generates QR codes that redirect to website
 */
const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value = 'https://www.kanthealthcare.com',
  size = 256,
  level = 'H',
  includeMargin = true,
  imageSettings = {
    src: '/assets/icon.jpeg',
    height: 50,
    width: 50
  }
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: includeMargin ? 2 : 0,
          color: {
            dark: '#001a3a', // Primary color
            light: '#ffffff'
          },
          errorCorrectionLevel: level
        },
        (error) => {
          if (error) console.error('QR Code generation error:', error);
        }
      );
    }
  }, [value, size, level, includeMargin]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = 'kant-healthcare-qr.png';
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-lg border-2 border-gold">
        <canvas ref={canvasRef} />
      </div>
      <button
        onClick={downloadQRCode}
        className="px-4 py-2 bg-gold hover:bg-gold/90 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Download QR Code
      </button>
      <p className="text-xs text-muted-foreground text-center max-w-xs">
        Scan this QR code to visit KANT Healthcare website
      </p>
    </div>
  );
};

/**
 * Get QR Code URL for embedding
 */
export const getQRCodeDataURL = async (value: string = 'https://www.kanthealthcare.com'): Promise<string> => {
  return QRCode.toDataURL(value, {
    width: 256,
    margin: 2,
    color: {
      dark: '#001a3a',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });
};

export default QRCodeGenerator;
