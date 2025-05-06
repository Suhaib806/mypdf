import React from 'react';

const TrustedSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#9886fe] to-[#fdb712] py-20 rounded-2xl">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            The PDF software trusted by millions of users
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            PDF Gadgets is your ultimate toolkit for PDF manipulation. Transform, edit, and manage your PDFs with our powerful suite of tools. Experience seamless document handling with our user-friendly interface and advanced features.
          </p>
          <div className="mt-12">
            <button className="bg-white text-[#9886fe] hover:bg-black hover:text-white transition-colors duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection; 