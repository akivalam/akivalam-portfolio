"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const ro = new ResizeObserver(([entry]) => {
        setContainerWidth(entry.contentRect.width);
      });
      ro.observe(node);
      setContainerWidth(node.offsetWidth);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Document
        file="/Malavika_Krishnaswamy_Resume.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            width={containerWidth}
            renderTextLayer={true}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
