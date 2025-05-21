import React from "react";
import Link from "next/link";
import Image from "next/image";
import TrustedSection from "./TrustedSection";

const Products = () => {
  const productData = [
    {
      href: "/merge-pdf",
      title: "Merge Pdf",
      description: "Combine multiple PDF files into a single document. Organize and merge your PDFs easily.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      bgColor: 'bg-[#fdb712]'
    },
    {
      href: "/split-pdf",
      title: "Split Pdf",
      description: "Separate PDF pages into multiple documents. Extract specific page ranges as needed.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      bgColor: 'bg-[#f0127a]'
    },
    {
      href: "/image-to-pdf",
      title: "Image to pdf",
      description: "Convert images (JPG, PNG, etc.) into a single PDF document.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-[#292a61]'
    },
    {
      href: "/pdf-to-jpg",
      title: "Pdf to JPG",
      description: "Convert your PDF pages into high-quality JPG images. Choose your preferred quality and resolution.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-[#fdb712]'
    },
    {
      href: "/powerpoint-to-pdf",
      title: "PowerPoint to PDF",
      description: "Convert your PowerPoint presentations to PDF format while preserving all formatting and layouts.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      bgColor: 'bg-[#62c2ac]'
    },
    {
      href: "/word-to-pdf",
      title: "Word to Pdf",
      description: "Convert your Word documents to PDF files format while preserving all formatting and layouts.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-[#bbf451]'
    },
    {
      href: "/add-watermark",
      title: "Add a watermark to PDF",
      description: "Add a custom image to PDF files Choose its position, transparency, and Size",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      bgColor: 'bg-[#292a61]'
    },
    {
      href: "/compress-pdf",
      title: "Compress Pdf",
      description: "Compress PDF files to reduce their size while maintaining high quality. Optimize your PDF documents for better performance and storage.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      bgColor: 'bg-[#62c2ac]'
    },
    {
      href: "/unlock-pdf",
      title: "Unlock Pdf",
      description: "Unlock PDF files with a password. Protect your PDF documents with a password to prevent unauthorized access.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
        </svg>
      ),
      bgColor: 'bg-[#fdb712]'
    },
  ];

  return (
    <>
      <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-[18px] leading-[31px] font-semibold text-black tracking-wide">Features</h2>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold text-blue-600 px-4 md:px-8 mt-2">
            Your essential productivity toolkit
          </h1>
          <p className="mt-4 text-[18px] text-gray-800 font-normal max-w-xl mx-auto">
            Simplify project planning, streamline collaboration, and boost productivity all with TaskHub task management solution.
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
            {productData.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className="block w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform transition-all duration-500 group-hover:scale-105"></div>
                  <div className="relative p-8 h-full text-center md:text-left">
                    <div className={`w-16 h-16 ${product.bgColor} rounded-2xl flex items-center justify-center text-white mb-6 transform transition-transform duration-500 group-hover:scale-110 mx-auto md:mx-0`}>
                      {product.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
