import React from 'react';
import PowerPointToPdf from '@/components/powerpoint-to-pdf/PowerPointToPdf';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PowerPointToPdfPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Convert PowerPoint to PDF
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your PowerPoint presentations into PDF files while preserving all formatting and layouts.
            </p>
          </div>
          <PowerPointToPdf />
        </div>
      </main>
      <Footer />
    </div>
  );
} 