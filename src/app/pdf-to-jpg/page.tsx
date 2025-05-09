"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import PdfToJpgConverter from '@/components/pdf-to-jpg/PdfToJpgConverter';

export default function PdfToJpgPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Convert PDF to JPG
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your PDF pages into high-quality JPG images
            </p>
          </div>

          <div className="mt-8 mb-0 space-y-4 rounded-xl p-4 sm:p-6 lg:p-8  bg-white">
            <PdfToJpgConverter />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 