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
  
    // {
    //   href: "/pdf-to-word",
    //   title: "Pdf to Word",
    //   description: "Convert your PDF documents to editable Word files. Preserve formatting and layouts.",
    //   imgSrc: "/pdf-word.svg",
    //   imgAlt: "PDF to Word illustration",
    //   bgColor: 'bg-[#62c2ac]'
    // },

    {
      href: "/image-to-pdf",
      title: "Image to pdf",
      description: "Convert images (JPG, PNG, etc.) into a single PDF document.",
      imgSrc: "/img-pdf.svg",
      imgAlt: "Image to PDF illustration",
      isLink: true,
      bgColor: 'bg-[#292a61]'
    },

    {
      href: "/pdf-to-jpg",
      title: "Pdf to JPG",
      description: "Convert your PDF pages into high-quality JPG images. Choose your preferred quality and resolution.",
      imgSrc: "/pdf-jpg.svg",
      imgAlt: "PDF to JPG illustration",
      bgColor: 'bg-[#fdb712]'
    },
    {
      href: "/powerpoint-to-pdf",
      title: "PowerPoint to PDF",
      description: "Convert your PowerPoint presentations to PDF format while preserving all formatting and layouts.",
      imgSrc: "/ppt-pdf.png",
      imgAlt: "PowerPoint to PDF illustration",
      bgColor: 'bg-[#62c2ac]'
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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

        {/* Products Flexbox - Centered with 3 columns */}
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
            {productData.map((product) => {
              const CardComponent = product.isLink === false ? 'a' : Link;

              return (
                <CardComponent
                  key={product.title}
                  href={product.href}
                  className={`block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] ${product.isLink === false ? 'cursor-pointer' : ''}`}
                >
                  <div className="flex flex-col h-full">
                    <div className={`w-full h-[200px] pt-6 px-6 rounded-t-3xl flex justify-center items-center ${product.bgColor}`}>
                      {product.imgSrc.endsWith('.svg') ? (
                        <img
                          src={product.imgSrc}
                          alt={product.imgAlt}
                          className="object-cover w-full h-full bg-white rounded-t-2xl"
                        />
                      ) : (
                        <Image
                          src={product.imgSrc}
                          alt={product.imgAlt}
                          width={300}
                          height={200}
                          className="object-cover w-full h-full rounded-t-2xl"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-6 flex flex-col gap-2 flex-grow">
                      <h3 className="text-2xl font-semibold text-black mb-2">
                        {product.title}
                      </h3>
                      <p className="text-base text-gray-600">
                        {product.description}
                      </p>
                      <div className="mt-auto pt-4">
                        <span className="inline-block text-white bg-black px-6 py-2.5 rounded-full hover:bg-[#9886fe] font-medium transition-colors duration-300">
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
      </div>
      <TrustedSection />
    </>
  );
};

export default Products;
