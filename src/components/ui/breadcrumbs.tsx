import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zeninsystems.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.label,
        ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium sm:text-sm">
          <li>
            <Link
              href="/"
              className={`inline-flex items-center gap-1 transition-colors ${
                light
                  ? "text-slate-300 hover:text-[#00B8D9]"
                  : "text-slate-500 hover:text-[#1877F2]"
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="inline-flex items-center gap-1.5">
                <ChevronRight
                  className={`h-3.5 w-3.5 ${
                    light ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      light
                        ? "text-slate-300 hover:text-[#00B8D9]"
                        : "text-slate-500 hover:text-[#1877F2]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className={
                      light
                        ? "font-semibold text-[#00B8D9]"
                        : "font-semibold text-[#0B1730]"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
