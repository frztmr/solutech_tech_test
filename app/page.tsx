"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";
import Carousel from "@/components/Carousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductList from "@/components/ProductList";
import { useAppDispatch } from "@/store/hooks";
import { setActiveCategory } from "@/store/productSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync url hash changes (from header bar clicks) to products category filter
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const categoryMap: { [key: string]: string } = {
          "#speaker": "Speaker",
          "#kipas": "Kipas",
          "#kompor": "Kompor",
          "#grill": "Grill"
        };
        const category = categoryMap[hash.toLowerCase()];
        if (category) {
          dispatch(setActiveCategory(category));
          const prodListEl = document.getElementById("product-list");
          if (prodListEl) {
            prodListEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Trigger on initial render if loaded with a hash
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [dispatch]);

  useEffect(() => {
    setIsLoaded(true);

    let active = true;
    const handleScroll = () => {
      if (!active) return;
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const scrollTop = -rect.top;
          const totalHeight = rect.height - window.innerHeight;
          if (totalHeight > 0) {
            const p = Math.min(Math.max(scrollTop / totalHeight, 0), 1);
            setProgress(p);
          }
        }
        active = true;
      });
      active = false;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cubic ease-in-out for fluid transition
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  const easedP = easeInOutCubic(progress);

  // Categories / Pills
  const pills = [
    { name: "Compact Speaker", href: "#speaker" },
    { name: "Multimedia Speaker", href: "#kipas" },
    { name: "Professional Line", href: "#kompor" },
    { name: "Powered Speaker", href: "#grill" },
  ];

  // Interpolation for pill coordinates (start at State 3 bottom row, end at State 1 scattered layout)
  const getPillStyle = (index: number, p: number) => {
    const coords = [
      { startLeft: 16, startTop: 86, endLeft: 23, endTop: 28 }, // Compact Speaker
      { startLeft: 38, startTop: 86, endLeft: 15, endTop: 59 }, // Multimedia Speaker
      { startLeft: 61, startTop: 86, endLeft: 73, endTop: 34 }, // Professional Line
      { startLeft: 84, startTop: 86, endLeft: 71, endTop: 63 }, // Powered Speaker
    ];

    const c = coords[index];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (isMobile) {
      const mobileCoords = [
        { startLeft: 6, startTop: 81, endLeft: 12, endTop: 26 },
        { startLeft: 6, startTop: 87, endLeft: 8, endTop: 66 },
        { startLeft: 52, startTop: 81, endLeft: 56, endTop: 28 },
        { startLeft: 52, startTop: 87, endLeft: 52, endTop: 68 },
      ];
      const mc = mobileCoords[index];
      const left = mc.startLeft + (mc.endLeft - mc.startLeft) * p;
      const top = mc.startTop + (mc.endTop - mc.startTop) * p;
      return {
        left: `${left}%`,
        top: `${top}%`,
      };
    }

    const left = c.startLeft + (c.endLeft - c.startLeft) * p;
    const top = c.startTop + (c.endTop - c.startTop) * p;
    return {
      left: `${left}vw`,
      top: `${top}vh`,
    };
  };

  // 1. Speaker Animation Styles (Swipes up and fades out)
  const speakerOpacity = Math.max(0, 1 - easedP * 2.2); // Fades out by p = 0.45
  const speakerTranslateY = -60 * easedP; // Slides up from 0 to -60vh
  const speakerScale = 1 - easedP * 0.15;

  // 2. Side Texts Animation Styles (Fades to up and fades out)
  const sideTextOpacity = Math.max(0, 1 - easedP * 2.5); // Fades out by p = 0.4
  const sideTextTranslateY = -25 * easedP; // Shifts up by 25vh

  // 3. Headline "Jernih Kuat di Setiap Momen" (Fades in from bottom)
  const headlineOpacity = Math.min(1, Math.max(0, (easedP - 0.25) / 0.55)); // Fades in between p = 0.25 and p = 0.8
  const headlineTranslateY = 20 * (1 - easedP); // Slides up into place by 20px
  const headlineScale = 0.95 + 0.05 * easedP;

  // Scroll notice helper
  const scrollNoticeOpacity = Math.max(0, 1 - progress * 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#030607] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ANIMATED STICKY HERO CONTAINER */}
      <div ref={containerRef} className="relative w-full h-[250vh] z-10">
        
        {/* Sticky viewport viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[url('/BG.png')] bg-cover bg-center flex flex-col justify-between">
          
          {/* Header Bar */}
          <HeaderBar />

          {/* Animating interactive layout */}
          <div className="relative flex-1 w-full h-full">

            {/* Scroll Indicator helper */}
            <div 
              style={{ opacity: scrollNoticeOpacity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 transition-opacity duration-300 pointer-events-none"
            >
              <span className="text-[10px] tracking-widest text-white/40 uppercase font-bold animate-pulse">Scroll Down to Transition</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white/40 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* STATE 2 & 3: Large Side Text Labels (Audio Performa & Presisi Tinggi) */}
            {/* Desktop Layout */}
            <div
              style={{
                opacity: sideTextOpacity,
                transform: `translateY(${sideTextTranslateY}vh)`,
                pointerEvents: sideTextOpacity < 0.05 ? "none" : "auto",
              }}
              className="absolute inset-0 z-10 hidden md:block transition-all duration-75"
            >
              {/* "Audio" */}
              <h2 className="absolute left-[19vw] top-[29vh] text-7xl lg:text-8xl font-black text-white tracking-tight select-none">
                Audio
              </h2>
              {/* "Performa" */}
              <h2 className="absolute left-[9vw] top-[46vh] text-7xl lg:text-8xl font-black text-white tracking-tight select-none">
                Performa
              </h2>

              {/* "Presisi" */}
              <h2 className="absolute right-[10vw] top-[39vh] text-7xl lg:text-8xl font-black text-white tracking-tight select-none">
                Presisi
              </h2>
              {/* "Tinggi" */}
              <h2 className="absolute right-[16vw] top-[56vh] text-7xl lg:text-8xl font-black text-white tracking-tight select-none">
                Tinggi
              </h2>
            </div>

            {/* Mobile Side Text Labels (compact layout) */}
            <div
              style={{
                opacity: sideTextOpacity,
                transform: `translateY(${sideTextTranslateY * 0.4}vh)`,
                pointerEvents: sideTextOpacity < 0.05 ? "none" : "auto",
              }}
              className="absolute inset-x-0 top-[22%] flex justify-between px-6 z-10 md:hidden transition-all duration-75"
            >
              <div className="text-left">
                <p className="text-3xl font-black text-white tracking-tight">Audio</p>
                <p className="text-3xl font-black text-white tracking-tight -mt-1">Performa</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white tracking-tight">Presisi</p>
                <p className="text-3xl font-black text-white tracking-tight -mt-1">Tinggi</p>
              </div>
            </div>

            {/* CENTERED SPEAKER (Swipes up on scroll) */}
            <div
              style={{
                opacity: speakerOpacity,
                transform: `translateY(${speakerTranslateY}vh) scale(${speakerScale})`,
                pointerEvents: speakerOpacity < 0.1 ? "none" : "auto",
              }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-75"
            >
              <div className="w-[65%] sm:w-[45%] md:w-[32vw] max-w-[380px] aspect-[4/5] relative flex items-center justify-center pointer-events-auto">
                <Image
                  src="/speaker.png"
                  alt="GMC Premium Speaker"
                  width={340}
                  height={420}
                  className="object-contain filter brightness-110 drop-shadow-[0_25px_60px_rgba(6,182,212,0.4)]"
                  priority
                />
              </div>
            </div>

            {/* SCATTERED HEADLINE (Fades in from bottom) */}
            <div
              style={{
                opacity: headlineOpacity,
                transform: `scale(${headlineScale}) translateY(${headlineTranslateY}px)`,
                pointerEvents: headlineOpacity < 0.05 ? "none" : "auto",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none transition-all duration-75"
            >
              <div className="max-w-4xl w-full pointer-events-auto">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans">
                  Jernih Kuat
                </h1>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans mt-2">
                  di Setiap Momen
                </h1>
              </div>
            </div>

            {/* PILLS: start in row, end scattered around headline */}
            {pills.map((pill, idx) => {
              const pillStyle = getPillStyle(idx, easedP);
              return (
                <a
                  key={pill.name}
                  href={pill.href}
                  style={pillStyle}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/10 bg-[#162327]/60 backdrop-blur-md text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-xl"
                >
                  {pill.name}
                </a>
              );
            })}

          </div>
        </div>
      </div>

      {/* KEUNGGULAN GMC CAROUSEL SECTION */}
      <Carousel />

      {/* Card Product Category */}
      <CategoryGrid />

      {/* Product List */}
      <ProductList />

      {/* BRAND NEW FOOTER */}
      <FooterBar />

    </div>
  );
}
