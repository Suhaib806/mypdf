import React from 'react';

const TrustedSection = () => {
  return (
    <section 
      className="w-full bg-blue-400 py-12 md:py-20 rounded-2xl"
      aria-labelledby="trusted-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            id="trusted-heading"
            className="text-2xl md:text-3xl lg:text-[42px] font-bold text-white mb-4 md:mb-8 leading-tight"
            itemProp="name"
          >
            The PDF software trusted by millions of users
          </h2>
          <p 
            className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"
            itemProp="description"
          >
            PDF Gadgets is your ultimate toolkit for PDF manipulation. Transform, edit, and manage your PDFs with our powerful suite of tools. Experience seamless document handling with our user-friendly interface and advanced features.
          </p>
          <div 
            className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12"
            role="list"
            aria-label="Trust indicators"
          >
            <div 
              className="flex flex-col items-center w-full sm:w-auto"
              role="listitem"
              itemScope
              itemType="https://schema.org/Thing"
            >
              <div 
                className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-2"
                aria-hidden="true"
              >
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
                </svg>
              </div>
              <span 
                className="text-white font-semibold text-sm md:text-base"
                itemProp="name"
              >
                ISO Certified
              </span>
            </div>
            <div 
              className="flex flex-col items-center w-full sm:w-auto"
              role="listitem"
              itemScope
              itemType="https://schema.org/Thing"
            >
              <div 
                className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-2"
                aria-hidden="true"
              >
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.96-7 10.69-3.87-1.73-7-6.02-7-10.69v-4.7l7-3.12z" fill="currentColor"/>
                  <path d="M12 6.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 2c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fill="currentColor"/>
                </svg>
              </div>
              <span 
                className="text-white font-semibold text-sm md:text-base"
                itemProp="name"
              >
                SSL Secure
              </span>
            </div>
            <div 
              className="flex flex-col items-center w-full sm:w-auto"
              role="listitem"
              itemScope
              itemType="https://schema.org/Thing"
            >
              <div 
                className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-2"
                aria-hidden="true"
              >
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/>
                  <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" fill="currentColor"/>
                </svg>
              </div>
              <span 
                className="text-white font-semibold text-sm md:text-base"
                itemProp="name"
              >
                PDF Association
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection; 