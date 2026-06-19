"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HeaderBar from "@/components/HeaderBar";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const speakerTranslateY = -50 - (60 * easedP); // Slides up from -50% to -110%
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
    <div className="flex flex-col min-h-screen bg-[#030607] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
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
                transform: `translate(-50%, ${speakerTranslateY}%) scale(${speakerScale})`,
                pointerEvents: speakerOpacity < 0.1 ? "none" : "auto",
              }}
              className="absolute top-1/2 left-1/2 w-[65%] sm:w-[45%] md:w-[32vw] max-w-[380px] aspect-[4/5] z-20 transition-all duration-75"
            >
              <div className="relative w-full h-full flex items-center justify-center">
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
                transform: `translate(-50%, -50%) scale(${headlineScale}) translateY(${headlineTranslateY}px)`,
                pointerEvents: headlineOpacity < 0.05 ? "none" : "auto",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4 z-20 transition-all duration-75"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Jernih Kuat
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans mt-2">
                di Setiap Momen
              </h1>
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

      {/* PRODUCTS DISPLAY SECTION */}
      <section className="relative py-24 px-6 z-20 bg-[#030607]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase mb-3">PRODUCT PORTFOLIO</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Innovative Solutions for Every Corner of Your Home
            </p>
            <div className="w-12 h-1 bg-cyan-400 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Speaker Collection */}
            <div
              id="speaker"
              className="relative group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-cyan-950/20 to-neutral-900/10 p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/15 hover:shadow-xl scroll-mt-24"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-cyan-500/5 blur-[60px] opacity-50 z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1 space-y-4">
                  <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">High-Fidelity Audio</span>
                  <h3 className="text-2xl font-bold text-white leading-tight">GMC Speaker Collection</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Experience ultimate clarity and deep bass. Engineered for audiophiles who demand nothing but the absolute best sound signature.
                  </p>
                  <ul className="space-y-2 pt-2">
                    {["Active Subwoofer System", "Bluetooth 5.3 & Optical Input", "RGB Sync Ambient Lighting"].map((feat, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end items-center py-4 md:py-0">
                  <div className="relative w-40 h-44 flex items-center justify-center drop-shadow-[0_15px_30px_rgba(6,182,212,0.2)]">
                    <Image
                      src="/speaker.png"
                      alt="GMC Speaker"
                      width={140}
                      height={160}
                      className="object-contain filter brightness-115 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">Explore speaker series</span>
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Smart Cooling Fans */}
            <div
              id="kipas"
              className="relative group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-teal-950/20 to-neutral-900/10 p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/15 hover:shadow-xl scroll-mt-24"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-teal-500/5 blur-[60px] opacity-50 z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1 space-y-4">
                  <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">Silent & Powerful Breeze</span>
                  <h3 className="text-2xl font-bold text-white leading-tight">GMC Smart Cooling Fans</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Aerodynamic blades coupled with robust motors to deliver maximum airflow with minimal sound footprint.
                  </p>
                  <ul className="space-y-2 pt-2">
                    {["Whisper-Quiet Technology", "Multi-Speed Controls", "Energy Efficiency Certified"].map((feat, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end items-center py-4 md:py-0">
                  <div className="w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-xl group-hover:scale-105 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-cyan-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m0-12.728.707.707m11.314 11.314.707-.707M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">Explore fans series</span>
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cooker Collection */}
            <div
              id="kompor"
              className="relative group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-amber-950/20 to-neutral-900/10 p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/15 hover:shadow-xl scroll-mt-24"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-amber-500/5 blur-[60px] opacity-50 z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1 space-y-4">
                  <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">Precision Kitchen Technology</span>
                  <h3 className="text-2xl font-bold text-white leading-tight">GMC Induction & Gas Cookers</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Heat up your culinary imagination. Precision temperature control makes cooking an absolute pleasure every day.
                  </p>
                  <ul className="space-y-2 pt-2">
                    {["Rapid Heating Element", "Double Burner Safety Guard", "Easy-to-clean Tempered Glass"].map((feat, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end items-center py-4 md:py-0">
                  <div className="w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-xl group-hover:scale-105 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-amber-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">Explore cookers series</span>
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* BBQ Grills */}
            <div
              id="grill"
              className="relative group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-red-950/20 to-neutral-900/10 p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/15 hover:shadow-xl scroll-mt-24"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-red-500/5 blur-[60px] opacity-50 z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1 space-y-4">
                  <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">Premium Indoor Sizzle</span>
                  <h3 className="text-2xl font-bold text-white leading-tight">GMC Electric BBQ Grills</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Gather around for a perfect barbecue feast indoors. Smoke-reduced heating profiles and non-stick grid surfaces.
                  </p>
                  <ul className="space-y-2 pt-2">
                    {["Adjustable Heat Thermostat", "Non-stick Diecast Aluminum Plate", "Detachable Oil Drip Tray"].map((feat, index) => (
                      <li key={index} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end items-center py-4 md:py-0">
                  <div className="w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center backdrop-blur-xl group-hover:scale-105 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">Explore grill series</span>
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG KAMI SECTION */}
      <section id="tentang-kami" className="relative py-24 px-6 z-20 bg-[#030607] border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.01] p-10 flex flex-col justify-between aspect-square max-w-[450px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-transparent"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3b5cbd] to-[#1d3580] shadow-md">
                    <span className="text-[13px] font-black text-white leading-none">gmc</span>
                  </div>
                  <span className="text-xl font-bold tracking-tighter">GMC Indonesia</span>
                </div>
                <p className="mt-8 text-lg font-medium text-neutral-300 leading-relaxed">
                  "Menghadirkan harmoni suara dan inovasi peralatan rumah tangga terbaik ke setiap keluarga di seluruh Indonesia."
                </p>
              </div>

              <div className="relative z-10 border-t border-white/5 pt-6 mt-8 flex justify-between text-left">
                <div>
                  <h4 className="text-2xl font-black text-cyan-400">20+</h4>
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-bold mt-1">Tahun Pengalaman</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-cyan-400">100%</h4>
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-bold mt-1">Kualitas Indonesia</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-cyan-400">5JT+</h4>
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-bold mt-1">Pengguna Setia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">TENTANG KAMI</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Inovasi Elektronik Lokal Berkualitas Internasional
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Didirikan dengan komitmen untuk mempersembahkan produk elektronik terbaik bagi masyarakat Indonesia, GMC telah tumbuh menjadi salah satu merek peralatan rumah tangga terkemuka di tanah air. Mulai dari lini active speaker legendaris kami yang terkenal dengan dentuman bass super mantap, hingga kompor gas, kipas angin pintar, dan alat pemanggang listrik.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Kami percaya bahwa teknologi berkualitas tinggi tidak harus mahal. Dengan tim R&D lokal yang memahami kebutuhan keluarga Indonesia, setiap produk GMC dirancang untuk tahan lama, efisien, dan modern.
            </p>
            <div className="pt-4">
              <a
                href="#kontak"
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors duration-300 group"
              >
                HUBUNGI KAMI
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK SECTION */}
      <section id="kontak" className="relative py-24 px-6 z-20 bg-gradient-to-b from-[#030607] to-[#010203] border-t border-white/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase mb-3">KONTAK KAMI</h2>
            <p className="text-3xl font-bold tracking-tight text-white">Hubungi Kami Untuk Layanan & Penjualan</p>
            <p className="text-sm text-neutral-400 mt-3">Apakah Anda memiliki pertanyaan atau ingin menjadi agen kemitraan kami?</p>
          </div>

          {/* Form */}
          <form className="space-y-6 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama lengkap Anda"
                  className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Alamat Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan alamat email Anda"
                  className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Subjek Pesan</label>
              <input
                type="text"
                id="subject"
                placeholder="Bagaimana kami bisa membantu Anda?"
                className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold tracking-wider text-neutral-400 uppercase">Isi Pesan</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tuliskan pesan lengkap Anda di sini..."
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-white text-black font-bold text-sm tracking-wider hover:bg-neutral-200 active:scale-95 transition-all duration-300 shadow-md shadow-white/5"
            >
              KIRIM PESAN
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-white/5 bg-[#010203] z-20 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#3b5cbd] to-[#1d3580]">
              <span className="text-[11px] font-black text-white leading-none">gmc</span>
            </div>
            <span className="text-sm font-bold text-white tracking-tighter">GMC Electronics</span>
          </div>
          
          <p>© {new Date().getFullYear()} GMC Store. All rights reserved. Made in Indonesia.</p>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}


