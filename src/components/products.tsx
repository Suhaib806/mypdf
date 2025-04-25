import React from "react";
import Link from "next/link";
import Image from "next/image";

const Products = () => {
  const productData = [
    {
      href: "/merge-pdf",
      title: "Merge Pdf",
      description: "Combine multiple PDF files into a single document. Organize and merge your PDFs easily.",
      imgSrc: "/merge.jpeg",
      imgAlt: "Merge PDF illustration",
      bgColor: 'bg-[#fdb712]'
    },
    {
      href: "/split-pdf",
      title: "Split Pdf",
      description: "Separate PDF pages into multiple documents. Extract specific page ranges as needed.",
      imgSrc: "/split.jpeg",
      imgAlt: "Split PDF illustration",
      bgColor: 'bg-[#f0127a]'
    },
    {
      href: "/pdf-to-word",
      title: "Pdf to Word",
      description: "Convert your PDF documents to editable Word files. Preserve formatting and layouts.",
      imgSrc: "/pdf-word.svg",
      imgAlt: "PDF to Word illustration",
      bgColor: 'bg-[#62c2ac]'
    },
    {
      href: "#",
      title: "Pdf to Excel",
      description: "Transform your PDF tables and data into Excel spreadsheets for easy analysis.",
      imgSrc: "/pdf-excel.jpeg",
      imgAlt: "PDF to Excel illustration",
      isLink: false,
      bgColor: 'bg-[#6457a4]'
    },
    {
      href: "#",
      title: "Image to pdf",
      description: "Convert images (JPG, PNG, etc.) into a single PDF document.",
      imgSrc: "/img-pdf.svg",
      imgAlt: "Image to PDF illustration",
      isLink: false,
      bgColor: 'bg-[#292a61]'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Features Section */}
      <div className="text-center mb-16">
        <h2 className="text-[18px] leading-[31px] font-semibold text-[#9886fe] tracking-wide ">Features</h2>
        <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold text-black px-4 md:px-8 mt-2">
          Your essential productivity toolkit
        </h1>
        <p className="mt-4 text-[18px] text-gray-800 font-normal max-w-xl mx-auto">
          Simplify project planning, streamline collaboration, and boost productivity all with TaskHub task management solution.
        </p>
      </div>

      {/* Products Grid - Changed to vertical stack */}
      <div className="space-y-12">
        {productData.map((product, index) => {
          const isImageLeft = index % 2 === 0;
          const CardComponent = product.isLink === false ? 'a' : Link;

          return (
            <CardComponent
              key={product.title}
              href={product.href}
              className={`block rounded-lg    overflow-hidden ${product.isLink === false ? 'cursor-pointer' : ''}`}
            >
              <div className={`flex flex-col md:flex-row gap-5 items-center ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 pt-6 md:px-10 md:pt-10 rounded-3xl flex justify-center items-center ${product.bgColor}`}>
                  <Image
                    src={product.imgSrc}
                    alt={product.imgAlt}
                    width={500}
                    height={200}
                    className="object-cover bg-center bg-white rounded-t-2xl"
                  /> 
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col gap-2 justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-2">
                    {product.title}
                  </h3>
                  <p className="text-base text-gray-600">
                    {product.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-white bg-black px-6 py-2.5  mt-8 rounded-full hover:bg-[#9886fe] font-medium">
                      Get Started &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </CardComponent>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
