import Image from "next/image";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Products from "@/components/products";
import VideoSection from "@/components/VideoSection";
import TrustedSection from "@/components/TrustedSection";

export default function Home() {
  return (
    <main className="py-0 md:py-8" style={{ background: 'linear-gradient(#faf7f5, #fff)' }} role="main">
      <div className="px-0 md:px-10">
        <Header />
      </div>
      
      <section aria-label="Hero section">
        <Hero />
      </section>

      {/* <section aria-label="Video demonstration">
        <VideoSection />
      </section> */}

      <section aria-label="Our products">
        <Products />
      </section>

      <section aria-label="Trusted by users" className="px-4">
        <TrustedSection />
      </section>
      
      <Footer />
    </main>
  );
}
