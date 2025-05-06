import React from 'react';
import PowerPointToPdf from '@/components/powerpoint-to-pdf/PowerPointToPdf';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PowerPointToPdfPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Header />
      <main className="flex-grow py-12 min-w-lg">
        <PowerPointToPdf />
      </main>
      <Footer />
    </div>
  );
} 