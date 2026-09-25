import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function VideoScrollHero({ 
  videoSrc = "/videos/hero-luxury-fashion.mp4" 
}) {
  const [activeVideo, setActiveVideo] = useState(videoSrc);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Seamless continuous video autoplay and looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, [activeVideo]);

  return (
    <section className="relative w-full h-[540px] sm:h-[640px] lg:h-[720px] overflow-hidden bg-slate-950 flex flex-col justify-center items-center select-none">
      {/* Background Autoplaying & Seamlessly Repeating Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <video
          key={activeVideo}
          ref={videoRef}
          src={activeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center transition-opacity duration-700"
        />

        {/* Crisp Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/25 to-black/40 pointer-events-none" />
      </div>

      {/* Center Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Spring / Summer 2026 Collection</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-3xl">
          Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">Everyday Style</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto mb-8 font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Discover curated apparel, footwear, and luxury essentials tailored for modern comfort, elegance, and versatility.
        </p>

        <div className="flex items-center justify-center">
          <Button
            onClick={() => navigate("/shop/listing")}
            className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-9 py-6 rounded-xl text-sm shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop Collection
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
