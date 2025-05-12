import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PDF Converter - Convert PDF to Word, JPG, and More | PDFGadgets",
  description: "Free online PDF converter. Convert PDF to Word, JPG, and other formats. Split, merge, and compress PDFs. Fast, secure, and easy to use.",
  keywords: "PDF converter, PDF to Word, PDF to JPG, split PDF, merge PDF, compress PDF, online PDF tools",
  authors: [{ name: "PDFGadgets" }],
  creator: "PDFGadgets",
  publisher: "PDFGadgets",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pdfgadgets.webfalcons.pk/",
    title: "PDF Converter - Convert PDF to Word, JPG, and More | PDFGadgets",
    description: "Free online PDF converter. Convert PDF to Word, JPG, and other formats. Split, merge, and compress PDFs. Fast, secure, and easy to use.",
    siteName: "PDFGadgets",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Converter - Convert PDF to Word, JPG, and More | PDFGadgets",
    description: "Free online PDF converter. Convert PDF to Word, JPG, and other formats. Split, merge, and compress PDFs. Fast, secure, and easy to use.",
  },
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://pdfgadgets.webfalcons.pk/" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
