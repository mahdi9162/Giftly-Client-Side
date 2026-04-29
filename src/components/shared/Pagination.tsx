type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-4 md:mt-20">
      {/* Page info */}
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
        Viewing Page <span className="text-primary">{currentPage}</span> of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${
            currentPage === 1
              ? 'cursor-not-allowed bg-slate-100 text-slate-300'
              : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary hover:text-primary cursor-pointer'
          }`}
        >
          ← <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Numbers */}
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'scale-110 bg-primary text-white shadow-lg shadow-rose-200'
                    : 'border border-slate-100 bg-white text-slate-600 hover:bg-rose-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${
            currentPage === totalPages
              ? 'cursor-not-allowed bg-slate-100 text-slate-300'
              : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-primary hover:text-primary cursor-pointer'
          }`}
        >
          <span className="hidden sm:inline">Next</span> →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
