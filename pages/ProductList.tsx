"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductList(activeCategory: string) {

    
    const [showFiltersPanel, setShowFiltersPanel] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"default" | "name-asc" | "name-desc">("default");



    useEffect(() => {
        setVisibleCount(6);
    }, [activeCategory, searchQuery]);
    return (

        

    )
}