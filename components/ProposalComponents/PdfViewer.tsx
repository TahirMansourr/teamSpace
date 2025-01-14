// "use client";
// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// const PdfViewer = () => {
//   const [numPages, setNumPages] = useState<number>();
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url
//   ).toString();

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         file="https://4s3xhvuwco.ufs.sh/f/vkzXlP7sJFDUdk1oAPG0gk4GoIncx8TZOQWmavFDjU6pBJXV"
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// };

// export default PdfViewer;
