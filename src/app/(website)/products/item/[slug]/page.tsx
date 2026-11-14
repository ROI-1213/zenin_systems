import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Layers, Cpu, ArrowLeft } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs
              items={[
                { label: "Products & Solutions", href: "/products" },
                { label: product.categoryName, href: `/products#${product.categorySlug}` },
                { label: product.name },
              ]}
              light
            />

            <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                  {product.categoryName}
                </span>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                  {product.shortDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <QuoteModalTrigger
                    buttonText="Request a Quote for This System"
                    variant="cyan"
                    size="lg"
                    productId={product.id}
                    productSlug={product.slug}
                    preselectedTopicName={product.name}
                  />
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Catalog</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-[#142B49] shadow-2xl">
                  {product.featuredImage && (
                    <Image
                      src={product.featuredImage}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* OVERVIEW, FEATURES, SPECS & APPLICATIONS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-7">
              <div>
                <h2 className="text-2xl font-bold text-[#0B1730]">System Overview</h2>
                <p className="mt-3 text-base leading-relaxed text-[#64748B]">
                  {product.description}
                </p>
              </div>

              {product.features.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#0B1730]">Key Features</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {product.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4 text-sm text-[#172033]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.applications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#0B1730]">
                    Industrial Applications
                  </h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {product.applications.map((app) => (
                      <li
                        key={app}
                        className="flex items-center gap-2.5 rounded-xl border border-[#E2E8F0] p-3.5 text-sm font-medium text-[#0B1730]"
                      >
                        <Layers className="h-4 w-4 shrink-0 text-[#0095B0]" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.technicalSpecifications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#0B1730]">
                    Architecture & Technical Parameters
                  </h2>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#E2E8F0]">
                    <table className="w-full text-left text-sm">
                      <tbody className="divide-y divide-[#E2E8F0]">
                        {product.technicalSpecifications.map((spec) => (
                          <tr key={spec.label}>
                            <th className="w-1/3 bg-[#F5F8FC] px-4 py-3 font-semibold text-[#0B1730]">
                              {spec.label}
                            </th>
                            <td className="px-4 py-3 text-[#64748B]">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {product.integrationCapabilities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#0B1730]">
                    Integration Capabilities
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.integrationCapabilities.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#1877F2]/25 bg-[#1877F2]/5 px-3 py-1.5 text-xs font-semibold text-[#1877F2]"
                      >
                        <Cpu className="h-3.5 w-3.5" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* EMBEDDED AUTO-ATTRIBUTED QUOTE FORM */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6 shadow-md sm:p-7">
                <h2 className="text-lg font-bold text-[#0B1730]">
                  Request a Quote for This Solution
                </h2>
                <p className="mt-1 mb-5 text-xs text-[#64748B]">
                  Your enquiry is automatically linked to{" "}
                  <strong className="text-[#0B1730]">{product.name}</strong>.
                </p>
                <EnquiryForm
                  productId={product.id}
                  productSlug={product.slug}
                  preselectedTopicName={product.name}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Related Products & Systems
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/item/${rel.slug}`}
                  className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 transition hover:border-[#1877F2] hover:shadow-md"
                >
                  <span className="text-xs font-bold text-[#1877F2]">
                    {rel.categoryName}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                    {rel.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs text-[#64748B]">
                    {rel.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
