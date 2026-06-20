"use client";

import Image from "next/image";
import { carouselData as productsData } from "@/data/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setActiveCategory,
  setSearchQuery,
  setSortBy,
  setShowFiltersPanel,
  incrementVisibleCount,
} from "@/store/productSlice";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const {
    activeCategory,
    searchQuery,
    sortBy,
    showFiltersPanel,
    visibleCount,
  } = useAppSelector((state) => state.product);

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

  return (
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
                  onClick={() => dispatch(setActiveCategory(category))}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
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
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
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
                onClick={() => dispatch(setShowFiltersPanel(!showFiltersPanel))}
                className={`h-11 px-5 rounded-full border flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  showFiltersPanel
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
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showFiltersPanel ? "max-h-24 mb-10 opacity-100" : "max-h-0 mb-0 opacity-0 pointer-events-none"
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
                  onClick={() => dispatch(setSortBy(option.id as any))}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    sortBy === option.id
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
                  onClick={() => dispatch(incrementVisibleCount(6))}
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
                dispatch(setActiveCategory("Semua Produk"));
                dispatch(setSearchQuery(""));
              }}
              className="mt-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-white text-xs font-bold text-white transition-all duration-300 cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

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
    </section>
  );
}
