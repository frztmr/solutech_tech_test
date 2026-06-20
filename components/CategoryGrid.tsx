"use client";

import Image from "next/image";
import { kategoryCard } from "@/data/kategoryCard";
import { useAppDispatch } from "@/store/hooks";
import { setActiveCategory } from "@/store/productSlice";

export default function CategoryGrid() {
  const dispatch = useAppDispatch();
  const anchorIds = ["speaker", "kipas", "kompor", "grill"];

  return (
    <section className="relative py-24 px-6 md:px-12 z-20 bg-black overflow-x-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* 2x2 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {kategoryCard.map((card, idx) => (
            <div
              key={idx}
              id={anchorIds[idx]}
              onClick={() => {
                dispatch(setActiveCategory("Speaker"));
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
          ))}
        </div>
      </div>
    </section>
  );
}
