import React, { use } from "react";
import ImageComponent from "@/components/ImageComponent";
import FloatingShapes from "@/components/FloatingShapes";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import {
  Building2,
  ChartNoAxesCombined,
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";

async function getCaseStudy(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/casestudy/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch case study:", res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}

export default function Page({ params }) {
  const { slug } = use(params);
  const caseStudyData = use(getCaseStudy(slug));

  if (!caseStudyData || !caseStudyData.success) {
    return (
      <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
        <FloatingShapes />
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-purple-400 text-3xl font-bold">?</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Case Study Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            Sorry, we couldn&apos;t find the case study you&apos;re looking for.
          </p>
          <Link
            href="/casestudies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const caseStudy = caseStudyData.data;

  return (
    <div className="relative overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10 xl:container xl:mx-auto px-4 py-16 min-h-screen">
        {/* Back link */}
        <Link
          href="/casestudies"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300 mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Case Studies
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Case Study Details
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {caseStudy.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Key Results Card */}
            {caseStudy.keyResults && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <ChartNoAxesCombined className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Key Results</h2>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                  {caseStudy.keyResults}
                </p>
              </div>
            )}

            {/* Thumbnail */}
            {caseStudy.caseStudyThumbnail && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent z-10 pointer-events-none" />
                <ImageComponent
                  imageName={caseStudy.caseStudyThumbnail}
                  altName={caseStudy.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Description Card */}
            {caseStudy.description && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-5">
                  Description
                </h2>
                <div
                  className="prose text-white prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white max-w-none rendered-html"
                  dangerouslySetInnerHTML={{ __html: caseStudy.description }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 self-start lg:sticky lg:top-24">
            {/* Client Details Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-lg font-bold text-white">Client Details</h2>
              </div>

              {/* Brand Logo */}
              {caseStudy.brandLogo && (
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center p-3">
                    <ImageComponent
                      imageName={caseStudy.brandLogo}
                      altName={caseStudy.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Details List */}
              <div className="flex flex-col divide-y divide-white/5">
                {caseStudy.brandTitle && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-400 font-medium">
                      Client
                    </span>
                    <span className="text-sm text-white font-semibold text-right">
                      {caseStudy.brandTitle}
                    </span>
                  </div>
                )}

                {caseStudy.industry && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-400 font-medium">
                      Industry
                    </span>
                    <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 font-medium">
                      {caseStudy.industry}
                    </span>
                  </div>
                )}

                {caseStudy.founder && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Founder
                    </span>
                    <span className="text-sm text-white text-right">
                      {caseStudy.founder}
                    </span>
                  </div>
                )}

                {caseStudy.businessStarted && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Since
                    </span>
                    <span className="text-sm text-white text-right">
                      {caseStudy.businessStarted}
                    </span>
                  </div>
                )}
              </div>

              {/* Visit Website CTA */}
              {caseStudy.brandWebsite && (
                <a
                  href={caseStudy.brandWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Back CTA Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Interested in similar results for your business?
              </p>
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl border border-purple-500/40 text-purple-300 text-sm font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
