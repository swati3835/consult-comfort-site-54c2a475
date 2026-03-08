import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";
import icon from "../assets/icon.jpeg";

export const LetterheadDownload: React.FC = () => {
  const letterRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = () => {
    if (!letterRef.current) return;

    const opt = {
      margin: 0,
      filename: "KANT-Healthcare-Letterhead.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: {
        unit: "mm",
        format: [210, 297],
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all"] },
    };

    html2pdf().set(opt).from(letterRef.current).save();
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      {/* LETTER */}
      <div
        ref={letterRef}
        style={{
          width: "210mm",
          height: "297mm",
          background: "white",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Segoe UI, Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Top Accent */}
          <div
            style={{
              height: "8mm",
              background: "linear-gradient(90deg, #0f172a, #2563eb)",
            }}
          />

          {/* Header Centered */}
         {/* Header */}

{/* Header */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    padding: "20mm 25mm 10mm 25mm",
  }}
>
  {/* Left Logo */}
  <img
    src={icon}
    style={{
      width: 90,
      height: "auto",
    }}
  />

  {/* Center Title */}
  <div
    contentEditable
    suppressContentEditableWarning
    style={{
      textAlign: "center",
      marginBottom: "40px",
      fontSize: 32,
      fontWeight: 800,
      color: "#0f172a",
      whiteSpace: "nowrap", // 🔥 prevents line break
    }}
  >
    KANT's Healthcare
  </div>

  {/* Right Date */}
  <div
    style={{
      textAlign: "right",
      marginBottom: "20px",
      fontSize: 14,
      color: "#111827",
      minWidth: 200,
    }}
  >
    Date:
    <span style={{ marginLeft: 10 }}>
      ____________________
    </span>
  </div>
</div>

{/* Divider */}
<div
  style={{
    height: 2,
    background: "#e2e8f0",
    margin: "0 25mm 10mm 25mm",
  }}
/>

          {/* Content */}
          <div style={{ padding: "0 20mm" }}>
            <div
              contentEditable
              suppressContentEditableWarning
              style={{
                // border: "2px dashed #cbd5e1",
                borderRadius: 10,
                padding: 25,
                height: "140mm",
                overflow: "hidden",
              }}
            >
              
            </div>
          </div>

         
        </div>

        {/* Footer */}
        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            background: "#0f172a",
            color: "white",
            padding: "8mm 20mm",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          info@kanthealthcare.com | www.kanthealthcare.com | +91 74094 66222
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-8 text-center">
        <Button
          onClick={downloadAsPDF}
          className="bg-red-700 hover:bg-red-600 text-white py-5 text-base rounded-xl"
        >
          <Download className="mr-2 w-4 h-4" />
          Download Professional PDF
        </Button>
      </div>
    </div>
  );
};

export default LetterheadDownload;