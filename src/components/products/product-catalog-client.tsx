"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, CheckCircle2, ArrowRight, Filter } from "lucide-react";
import type { ParsedProduct } from "@/lib/db/queries";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
  isCoreSolution: boolean;
}

interface ProductCatalogClientProps {
  products: ParsedProduct[];
  categories: CategoryOption[];
}

export function ProductCatalogClient({
  products,
  categories,
}: ProductCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        selectedCategory === "ALL" || p.categorySlug === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div>
      {/* FILTER & SEARCH BAR */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xs sm:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, systems, or specifications..."
            aria-label="Search B2B product catalog"
            className="min-h-[48px] w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] py-2.5 pr-4 pl-10 text-base text-[#172033] transition focus:border-[#1877F2] focus:bg-white focus:outline-none sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="hidden h-4 w-4 shrink-0 text-[#64748B] sm:block" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter products by category"
            className="min-h-[48px] w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-base font-medium text-[#0B1730] transition focus:border-[#1877F2] focus:outline-none sm:w-auto sm:text-sm"
          >
            <option value="ALL">All Categories ({products.length})</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUCT CARDS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center sm:p-12">
          <h3 className="text-lg font-bold text-[#0B1730]">
            No Matching Catalog Records Found
          </h3>
          <p className="mt-2 text-sm text-[#64748B]">
            Try clearing your filter or request a custom BOQ quotation directly from our
            engineering desk.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="touch-btn min-h-[48px] rounded-xl border border-[#E2E8F0] px-5 py-2.5 text-xs font-semibold text-[#0B1730] hover:bg-slate-50"
            >
              Reset Filters
            </button>
            <QuoteModalTrigger
              buttonText="Request Custom BOQ Quote"
              variant="primary"
              size="sm"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="app-card group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#1877F2] hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#0B1730]">
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-[#0B1730]/85 px-3 py-1 text-[11px] font-semibold text-[#00B8D9] backdrop-blur-xs">
                  {product.categoryName}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                  {product.shortDescription}
                </p>

                {product.features.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-[#E2E8F0] pt-3">
                    {product.features.slice(0, 3).map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs text-[#172033]"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1877F2]" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
                  <Link
                    href={`/products/item/${product.slug}`}
                    className="touch-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-1 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase transition hover:border-[#1877F2] hover:bg-white"
                  >
                    <span>Specs</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </Link>

                  <QuoteModalTrigger
                    buttonText="Quote"
                    variant="primary"
                    size="sm"
                    productId={product.id}
                    productSlug={product.slug}
                    preselectedTopicName={product.name}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
