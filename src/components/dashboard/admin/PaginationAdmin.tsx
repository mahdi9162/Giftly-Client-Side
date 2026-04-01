import Link from 'next/link';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
};

const Pagination = ({ currentPage, totalPages, getPageHref }: PaginationProps) => {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-12 flex flex-col items-center gap-4 md:mt-20">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
        Viewing Page <span className="text-primary">{currentPage}</span> of {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous */}
        <Link
          href={getPageHref(currentPage - 1)}
          className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${
            currentPage === 1
              ? 'pointer-events-none bg-slate-100 text-slate-300'
              : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary hover:text-primary'
          }`}
        >
          ← <span className="hidden sm:inline">Previous</span>
        </Link>

        {/* Page Numbers */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = currentPage === pageNum;

            return (
              <Link
                key={pageNum}
                href={getPageHref(pageNum)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'scale-110 bg-primary text-white shadow-lg shadow-rose-200'
                    : 'border border-slate-100 bg-white text-slate-600 hover:bg-rose-50'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next */}
        <Link
          href={getPageHref(currentPage + 1)}
          className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${
            currentPage === totalPages
              ? 'pointer-events-none bg-slate-100 text-slate-300'
              : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary hover:text-primary'
          }`}
        >
          <span className="hidden sm:inline">Next</span> →
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
