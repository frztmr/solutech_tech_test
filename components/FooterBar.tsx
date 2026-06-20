"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterBar() { 

    
    return <footer className="relative bg-black pt-20 pb-12 px-6 md:px-12 border-t border-white/5 z-20">
        <div className="max-w-7xl mx-auto">

            {/* Upper Footer: Branding & Link Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

                {/* Branding Column */}
                <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-white">
                        TEKNOLOGI <span className="text-neutral-500">LOKAL,</span><br />
                        STANDAR GLOBAL
                    </h2>
                </div>

                {/* Links Columns */}
                <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-8">
                    {/* Column 1: Kategori */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-xs font-extrabold tracking-widest text-white uppercase">Kategori</h4>
                        <div className="flex flex-col space-y-2.5">
                            {["Speaker", "Kipas", "Kompor", "Grill"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveCategory(item);
                                        const prodListEl = document.getElementById("product-list");
                                        if (prodListEl) {
                                            prodListEl.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="text-sm font-semibold text-neutral-400 hover:text-white transition-colors duration-300"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-xs font-extrabold tracking-widest text-white uppercase">Company</h4>
                        <div className="flex flex-col space-y-2.5">
                            {[
                                { name: "About Us", href: "#" },
                                { name: "Produk", href: "#product-list" },
                                { name: "Event", href: "#" },
                                { name: "Contact Us", href: "#" }
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.href.startsWith("#")) {
                                            e.preventDefault();
                                            const el = document.getElementById(link.href.substring(1));
                                            if (el) {
                                                el.scrollIntoView({ behavior: "smooth" });
                                            }
                                        }
                                    }}
                                    className="text-sm font-semibold text-neutral-400 hover:text-white transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Middle Row: Logo & Social Media Icons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 pb-4">
                {/* GMC Logo */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo_icon.png"
                        alt="GMC Icon"
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <span className="text-lg font-black text-white tracking-tighter">GMC</span>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-6">
                    {/* Instagram */}
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                    {/* TikTok */}
                    <a
                        href="#"
                        aria-label="TikTok"
                        className="text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </a>
                    {/* Shopee */}
                    <a
                        href="#"
                        aria-label="Shopee"
                        className="text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </a>
                    {/* Tokopedia */}
                    <a
                        href="#"
                        aria-label="Tokopedia"
                        className="text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 0 0-10 10v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a10 10 0 0 0-10-10z" />
                            <circle cx="8.5" cy="11.5" r="1.5" />
                            <circle cx="15.5" cy="11.5" r="1.5" />
                            <path d="M10 15s1 1 2 1 2-1 2-1" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Separation line */}
            <div className="border-t border-white/10 my-6"></div>

            {/* Lower Row: Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-semibold">
                <p>© 2026. GMC Elektronik. All Rights Reserved</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy & Cookies policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>

        </div>
    </footer>
};