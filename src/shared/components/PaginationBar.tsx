import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const generatePages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {generatePages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-500">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition 
              ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
