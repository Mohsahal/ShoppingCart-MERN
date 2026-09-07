import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function VideoScrollHero({ 
  videoSrc = "/videos/hero-luxury-fashion.mp4",
  audioSrc = "/audio/luxury-soundtrack.mp3"
}) {
  const [activeVideo, setActiveVideo] = useState(videoSrc);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const isAudioActiveRef = useRef(false);
  const navigate = useNavigate();

  // Video autoplay & seamless continuous looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, [activeVideo]);

  // Audio Manager: comprehensive automated background audio playback and scroll sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;
    audio.loop = true;

    const playAudio = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = sectionRef.current?.offsetHeight || 600;

      if (scrollY < heroHeight * 0.45) {
        audio.volume = 1.0;
        audio.play().then(() => {
          isAudioActiveRef.current = true;
        }).catch(() => {
          // Autoplay policy waiting for user interaction
        });
      }
    };

    // 1. Attempt immediate autoplay on load
    playAudio();

    // 2. Universal automated unlocker on any document-level user interaction
    const unlockAudio = () => {
      if (audio) {
        playAudio();
      }
    };

    const interactionEvents = [
      "pointerdown",
      "mousedown",
      "mouseup",
      "click",
      "touchstart",
      "touchend",
      "keydown",
      "keyup",
      "mousemove",
      "wheel",
      "focus"
    ];

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { passive: true });
      document.addEventListener(evt, unlockAudio, { passive: true });
    });

    // 3. Scroll listener: Turn audio OFF when scrolling down, turn ON when scrolling back up
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = sectionRef.current?.offsetHeight || 600;

      if (scrollY > heroHeight * 0.45) {
        // Scrolled down past hero -> turn audio OFF
        if (!audio.paused) {
          audio.pause();
        }
      } else {
        // Scrolled back up to hero -> turn audio back ON
        if (audio.paused && isAudioActiveRef.current) {
          audio.play().catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio);
        document.removeEventListener(evt, unlockAudio);
      });
      window.removeEventListener("scroll", handleScroll);
      if (audio) {
        audio.pause();
      }
    };
  }, [audioSrc]);

  const handleHeroInteraction = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.volume = 1.0;
      audio.play().then(() => {
        isAudioActiveRef.current = true;
      }).catch(() => {});
    }
  };

  return (
    <section 
      ref={sectionRef}
      onClick={handleHeroInteraction}
      onPointerDown={handleHeroInteraction}
      onMouseEnter={handleHeroInteraction}
      className="relative w-full h-[540px] sm:h-[640px] lg:h-[720px] overflow-hidden bg-slate-950 flex flex-col justify-center items-center select-none"
    >
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

      {/* Synchronized Repeating Luxury Audio Element (Hidden & Automated) */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        playsInline
        preload="auto"
      />

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
