"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";
import Carousel from "@/pages/Carousel";
import { carouselData } from "@/data/keunggulanGMC";
import { kategoryCard } from "@/data/kategoryCard";
import { carouselData as productsData } from "@/data/product";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);


  // Products filtering states
  const [activeCategory, setActiveCategory] = useState("Semua Produk");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "name-asc" | "name-desc">("default");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchQuery]);

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
          setActiveCategory(category);
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
  }, []);

  // Filter products based on search query, category, and sorting
  const filteredProducts = productsData
    .filter((product) => {
      // Filter by Category
      const matchesCategory =
        activeCategory === "Semua Produk" ||
        (activeCategory === "Speaker" && product.prod_name.toLowerCase().includes("speaker"));

      // Filter by Search query
      const matchesSearch = product.prod_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.prod_name.localeCompare(b.prod_name);
      }
      if (sortBy === "name-desc") {
        return b.prod_name.localeCompare(a.prod_name);
      }
      return 0; // default order
    });


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
      <section className="relative py-24 px-6 md:px-12 z-20 bg-black overflow-x-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          {/* 2x2 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {kategoryCard.map((card, idx) => {
              // Map old anchor links so navigation still functions
              const anchorIds = ["speaker", "kipas", "kompor", "grill"];
              return (
                <div
                  key={idx}
                  id={anchorIds[idx]}
                  onClick={() => {
                    setActiveCategory("Speaker");
                    const prodListEl = document.getElementById("product-list");
                    if (prodListEl) {
                      prodListEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="relative overflow-hidden rounded-[24px] bg-[#131517] border border-white/5 p-8 sm:p-10 min-h-[200px] flex items-center justify-between transition-all duration-500 ease-out hover:bg-[#1c1f22] hover:border-white/10 group cursor-pointer shadow-lg scroll-mt-24"
                >
                  {/* Left: Text Content */}
                  <div className="flex-1 max-w-[65%] space-y-3 z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  {/* Right: Cropped Speaker Image peeking from the edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-[35%] overflow-hidden flex items-center justify-end pointer-events-none">
                    <div className="relative w-full h-[85%] translate-x-[25%] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:translate-x-[15%]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="180px"
                        className="object-contain object-left filter brightness-95"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* DAFTAR PRODUK (PRODUCT LIST) SECTION */}
      <section id="product-list" className="relative py-24 px-6 md:px-12 z-20 bg-[#0c0f12] border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">

          {/* Filter, Search, and Status Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16">
            {/* Left: Category Pills */}
            <div className="flex flex-wrap gap-2.5">
              {["Semua Produk", "Speaker", "Kipas", "Kompor", "Grill"].map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${isActive
                      ? "bg-white text-black shadow-md shadow-white/10"
                      : "bg-[#16181b] hover:bg-[#202326] text-neutral-400 hover:text-white"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Right: Search & Filter Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[280px]">
                <input
                  type="text"
                  placeholder="Cari produk"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-5 pr-12 rounded-full bg-[#16181b] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 text-sm transition-all duration-300"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
                </svg>
              </div>

              {/* Status pill & Filter button */}
              <div className="flex items-center gap-3 justify-end">
                {/* Product Count Pill */}
                <div className="h-11 px-6 rounded-full bg-[#16181b] border border-white/5 flex items-center justify-center text-xs font-bold text-neutral-400 tracking-wider">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"}
                </div>

                {/* Filter Trigger button */}
                <button
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className={`h-11 px-5 rounded-full border flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${showFiltersPanel
                    ? "bg-white border-white text-black"
                    : "bg-[#16181b] border-white/10 hover:border-white/30 text-white"
                    }`}
                >
                  <span>Filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-Filters / Sorting Panel (Smooth slide down effect) */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${showFiltersPanel ? "max-h-24 mb-10 opacity-100" : "max-h-0 mb-0 opacity-0 pointer-events-none"
              }`}
          >
            <div className="bg-[#16181b] border border-white/5 rounded-2xl p-4 flex flex-wrap items-center gap-6">
              <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase">Urutkan:</span>
              <div className="flex items-center gap-2">
                {[
                  { id: "default", label: "Default" },
                  { id: "name-asc", label: "Nama A - Z" },
                  { id: "name-desc", label: "Nama Z - A" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id as any)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${sortBy === option.id
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-neutral-400 hover:text-white border border-transparent"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col items-center w-full">
              {/* 3-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full">
                {filteredProducts.slice(0, visibleCount).map((product, idx) => (
                  <div key={idx} className="flex flex-col group">
                    {/* Card Tab Shape container */}
                    <div className="relative w-full aspect-[4/3] flex-shrink-0">
                      {/* The two decorative pills at the top left cutout */}
                      <div className="absolute top-[5%] left-[4%] flex gap-2 z-10 pointer-events-none">
                        <div className="w-12 h-[18px] bg-[#222428] rounded-full"></div>
                        <div className="w-18 h-[18px] bg-[#222428] rounded-full"></div>
                      </div>

                      {/* Clipped white container */}
                      <div
                        style={{ clipPath: "url(#folder-clip)" }}
                        className="w-full h-full bg-white relative flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.01] shadow-2xl"
                      >
                        {/* Hover lighting effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-50/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        {/* Product Image */}
                        <div className="relative w-[70%] h-[70%] transition-transform duration-500 ease-out group-hover:scale-105">
                          <Image
                            src={product.image}
                            alt={product.prod_name}
                            fill
                            sizes="(max-w-768px) 100vw, 33vw"
                            className="object-contain filter brightness-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_20px_40px_rgba(6,182,212,0.2)]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Product Metadata & Button */}
                    <div className="mt-6 flex flex-col space-y-4">
                      <h3 className="text-xl font-bold text-white tracking-wide leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {product.prod_name}
                      </h3>
                      <button className="w-full py-3.5 px-6 rounded-full border border-white/10 hover:border-white hover:bg-white/5 bg-[#0a0c0e] flex items-center justify-between transition-all duration-300 group/btn shadow-md">
                        <span className="text-xs sm:text-sm font-bold tracking-wider text-white">Lihat detail</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:bg-cyan-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {filteredProducts.length > visibleCount && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3 bg-white hover:bg-neutral-200 text-black text-sm font-extrabold tracking-wider uppercase rounded-full shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
                  >
                    Muat Lebih Banyak
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Elegant empty state */
            <div className="py-20 text-center bg-[#131517] border border-white/5 rounded-3xl flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Tidak Ada Produk</h3>
              <p className="text-sm text-neutral-400 max-w-sm">
                Maaf, saat ini tidak ada produk dalam kategori "{activeCategory}" yang cocok dengan pencarian Anda.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("Semua Produk");
                  setSearchQuery("");
                }}
                className="mt-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-white text-xs font-bold text-white transition-all duration-300"
              >
                Reset Filter
              </button>
            </div>
          )}

        </div>
      </section>

      {/* BRAND NEW FOOTER */}
      <FooterBar />

      {/* SVG Clip Path for Folder Shape Card */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="folder-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.18 
                     C 0,0.13 0.02,0.11 0.06,0.11 
                     L 0.52,0.11 
                     C 0.55,0.11 0.56,0.08 0.58,0.03 
                     C 0.59,0.01 0.61,0 0.65,0 
                     L 0.94,0 
                     C 0.98,0 1,0.02 1,0.08 
                     L 1,0.92 
                     C 1,0.98 0.98,1 0.94,1 
                     L 0.06,1 
                     C 0.02,1 0,0.98 0,0.92 
                     Z" />
          </clipPath>
        </defs>
      </svg>

    </div>
  );
}


