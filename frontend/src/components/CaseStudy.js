"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ImageComponent from "@/components/ImageComponent";
import { ChartNoAxesCombined, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

async function getCaseStudies() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/casestudy`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return { success: false, message: error.message, data: [] };
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="w-full h-48 bg-white/10 rounded-xl mb-5" />
      <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
      <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
      <div className="h-4 bg-white/10 rounded w-full mb-2" />
      <div className="h-4 bg-white/10 rounded w-5/6 mb-6" />
      <div className="flex gap-3 mb-6">
        <div className="h-8 bg-white/10 rounded-full w-24" />
        <div className="h-8 bg-white/10 rounded-full w-20" />
      </div>
      <div className="h-10 bg-white/10 rounded-xl w-full" />
    </div>
  );
}

const CaseStudy = ({ isHomepage = false }) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      const result = await getCaseStudies();
      if (result.success) {
        setCaseStudies(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };
    fetchCaseStudies();
  }, []);

  const totalCaseStudies = caseStudies.length;
  const totalPages = Math.ceil(totalCaseStudies / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCaseStudies = caseStudies.slice(indexOfFirstItem, indexOfLastItem);
  const caseStudiesToShow = isHomepage ? caseStudies.slice(0, 3) : paginatedCaseStudies;

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div
      id="case-study"
      className={`relative overflow-hidden ${isHomepage ? "py-20" : "min-h-screen py-20"}`}
    >
      <FloatingShapes />

      <div className="relative z-10 xl:container xl:mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Our Work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Case{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Studies
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {loading ? (
              "Loading partnerships..."
            ) : (
              <>
                A showcase of{" "}
                <span className="text-purple-400 font-semibold">
                  {totalCaseStudies} successful partnerships
                </span>{" "}
                and measurable results.
              </>
            )}
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[...Array(isHomepage ? 3 : 6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
              <span className="text-pink-400 text-2xl">!</span>
            </div>
            <p className="text-gray-400 text-lg">
              Failed to load case studies:{" "}
              <span className="text-pink-400">{error}</span>
            </p>
          </motion.div>
        )}

        {/* Cards Grid */}
        {!loading && !error && (
          <>
            {caseStudiesToShow.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="text-center py-20"
              >
                <p className="text-gray-400 text-lg">No case studies found.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {caseStudiesToShow.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.slug}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    custom={index % 3}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="group relative flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:bg-white/8 transition-colors duration-300"
                  >
                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Thumbnail */}
                    {caseStudy.caseStudyThumbnail && (
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 to-transparent z-10" />
                        <ImageComponent
                          imageName={caseStudy.caseStudyThumbnail}
                          alt={caseStudy.title}
                          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Industry badge over thumbnail */}
                        {caseStudy.industry && (
                          <span className="absolute top-3 right-3 z-20 text-xs px-3 py-1 bg-black/40 backdrop-blur-sm text-purple-300 rounded-full border border-purple-500/30 font-medium">
                            {caseStudy.industry}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      {/* Brand Logo + Title row */}
                      <div className="flex items-center gap-3 mb-4">
                        {caseStudy.brandLogo && (
                          <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center p-1.5">
                            <ImageComponent
                              imageName={caseStudy.brandLogo}
                              altName={caseStudy.title}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        )}
                        <h3 className="text-white text-lg font-bold leading-snug group-hover:text-purple-300 transition-colors duration-300">
                          {caseStudy.title}
                        </h3>
                      </div>

                      {/* Industry (fallback if no thumbnail) */}
                      {caseStudy.industry && !caseStudy.caseStudyThumbnail && (
                        <span className="self-start text-xs px-3 py-1 mb-4 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 font-medium">
                          {caseStudy.industry}
                        </span>
                      )}

                      {/* Key Result */}
                      {caseStudy.keyResults && (
                        <div className="flex-1 mb-5">
                          <div className="flex items-center gap-2 text-purple-400 mb-2">
                            <ChartNoAxesCombined className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">
                              Key Result
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                            {caseStudy.keyResults}
                          </p>
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        href={`/casestudies/${caseStudy.slug}`}
                        className="mt-auto group/btn flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
                      >
                        Read Case Study
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>

                    {/* Bottom glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All CTA (homepage) */}
            {isHomepage && totalCaseStudies > 3 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                className="text-center mt-6"
              >
                <Link
                  href="/casestudies"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                  View All Case Studies
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

            {/* Pagination */}
            {!isHomepage && totalPages > 1 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                className="flex justify-center items-center gap-4 mt-10"
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-gray-300 text-sm px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                  Page{" "}
                  <span className="text-purple-400 font-semibold">
                    {currentPage}
                  </span>{" "}
                  of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CaseStudy;
