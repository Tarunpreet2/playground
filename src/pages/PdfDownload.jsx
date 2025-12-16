import React, { useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import { useSearchParams } from "react-router-dom";

function PdfDownload() {
  const [params] = useSearchParams();
  const [nameInput, setNameInput] = useState(params.get("name") || "PROD");

  const pdfSrc = useMemo(() => {
    const srcParam = params.get("src");
    // Default to the attached PDF placed in public/docs
    const base = process.env.PUBLIC_URL || "";
    const defaultPath = `${base}/docs/PROD.pdf`;
    // If src param provided, treat it as a path relative to PUBLIC_URL
    if (srcParam) {
      // Normalize: if it already includes PUBLIC_URL, use as-is; else prefix
      if (srcParam.startsWith(base)) return srcParam;
      return `${base}${srcParam.startsWith("/") ? srcParam : "/" + srcParam}`;
    }
    return defaultPath;
  }, [params]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfSrc;
    // Ensure .pdf extension even if user omits it
    const sanitized = nameInput.trim().replace(/\s+/g, "_");
    a.download = sanitized.endsWith(".pdf") ? sanitized : `${sanitized}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="container" style={{ padding: 20 }}>
      <BackButton />
      <br />
      <br />
      <h1>PDF Download</h1>
      <p>
        Downloads the attached PDF with a dynamic file name. Default PDF: <code>PROD.pdf</code>
        placed under <code>public/docs/</code>.
      </p>

      <section style={{ marginTop: 16 }}>
        <label htmlFor="pdf-name">Desired file name</label>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input
            id="pdf-name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter file name (without .pdf)"
            style={{ padding: 10, borderRadius: 8, border: "1px solid #cfd8dc", flex: 1 }}
          />
          <button onClick={handleDownload} style={{ padding: "10px 16px", borderRadius: 8 }}>
            Download PDF
          </button>
        </div>
        <p style={{ marginTop: 8, color: "#546e7a" }}>
          You can also pass query params: <code>?name=Invoice_123&src=/docs/PROD.pdf</code>
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Preview Link (fallback)</h2>
        <p>
          If direct download is blocked, you can right-click and "Save link as":
        </p>
        <a href={pdfSrc} download={nameInput.endsWith(".pdf") ? nameInput : `${nameInput}.pdf`}>
          {nameInput.endsWith(".pdf") ? nameInput : `${nameInput}.pdf`}
        </a>
      </section>
    </div>
  );
}

export default PdfDownload;
