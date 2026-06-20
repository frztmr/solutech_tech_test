"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { carouselData } from "@/data/keunggulanGMC";


export default function Carousel() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [cardWidth, setCardWidth] = useState(380);
    const cardGap = 32;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardWidth(320);
            } else {
                setCardWidth(380);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const handlePrev = () => {
        const newIndex = (activeIndex - 1 + carouselData.length) % carouselData.length;
        setActiveIndex(newIndex);
        setIsTransitioning(true);
        setTimeout(() => {
            setDisplayIndex(newIndex);
            setIsTransitioning(false);
        }, 250);
    };

    const handleNext = () => {
        const newIndex = (activeIndex + 1) % carouselData.length;
        setActiveIndex(newIndex);
        setIsTransitioning(true);
        setTimeout(() => {
            setDisplayIndex(newIndex);
            setIsTransitioning(false);
        }, 250);
    };



    return (

        <section className="relative py-24 px-6 md:px-12 bg-[#020506] overflow-hidden z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div className="flex-1 space-y-4">
                        <span className="inline-block bg-white text-black text-[11px] font-extrabold tracking-wider px-3.5 py-1 rounded-[6px] uppercase">
                            Keunggulan GMC
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug max-w-3xl">
                            Dirancang dengan teknologi akustik dan material berkualitas untuk menghasilkan suara presisi, jernih, dan seimbang di setiap frekuensi.
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3 self-end md:self-auto">
                        <button
                            onClick={handlePrev}
                            className="w-11 h-11 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 focus:outline-none"
                            aria-label="Previous Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="w-11 h-11 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300 focus:outline-none"
                            aria-label="Next Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-8 items-center">

                    {/* Left Side Column: Title and Description */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col justify-center min-h-[200px]">
                        <div className={`transition-all duration-300 transform ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                            <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight select-none">
                                {carouselData[displayIndex].title}
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed mt-6">
                                {carouselData[displayIndex].deskripsi}
                            </p>
                        </div>
                    </div>

                    {/* Right Side Column: Centered Sliding Cards Track */}
                    <div className="col-span-12 lg:col-span-7 py-4 overflow-hidden relative">
                        <div className="w-full overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={{
                                    transform: `translateX(calc(50% - ${cardWidth / 2}px - ${activeIndex * (cardWidth + cardGap)}px))`,
                                    gap: `${cardGap}px`
                                }}
                            >
                                {carouselData.map((item, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <div
                                            key={idx}
                                            className={`relative flex-shrink-0 transition-all duration-500 rounded-[32px] overflow-hidden flex items-center justify-center ${isActive
                                                ? 'scale-100 opacity-100 shadow-2xl shadow-cyan-500/10'
                                                : 'scale-95 opacity-30'
                                                }`}
                                            style={{
                                                width: `${cardWidth}px`,
                                                height: `${cardWidth}px`,
                                                backgroundImage: item.withBackground && item.imageBackground ? `url('${item.imageBackground}')` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundColor: item.withBackground && item.imageBackground ? 'transparent' : '#0e2226',
                                                background: item.withBackground && item.imageBackground ? undefined : 'linear-gradient(135deg, #0e272b 0%, #040e10 100%)',
                                                border: isActive ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.03)'
                                            }}
                                        >
                                            {/* Inner Content Card (speaker image) */}
                                            <div className={`relative w-[75%] h-[75%] flex items-center justify-center transition-transform duration-500 ${isActive ? 'scale-100 hover:scale-105' : 'scale-90'}`}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-w-640px) 240px, 280px"
                                                    className="object-contain filter brightness-105 drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>

    )
}