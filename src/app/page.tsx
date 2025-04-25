import Image from "next/image";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Products from "@/components/products";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <div className="px-10 py-8" style={{ background: 'linear-gradient(#faf7f5, #fff)' }} >

    <Header/>
    <Hero/>
    <VideoSection />
    <Products/>
    <Footer/>

    </div>
  );
}
