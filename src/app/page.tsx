import Image from "next/image";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Products from "@/components/products";
import VideoSection from "@/components/VideoSection";
import TrustedSection from "@/components/TrustedSection";

export default function Home() {
  return (
    <div className=" py-0 md:py-8" style={{ background: 'linear-gradient(#faf7f5, #fff)' }} >
<div className="px-0 md:px-10">
<Header/>
</div>
    
    <Hero/>
    {/* <VideoSection /> */}
    <Products/>
    <div className="px-4">
    <TrustedSection />
    </div>
    
    <Footer/>

    </div>
  );
}
