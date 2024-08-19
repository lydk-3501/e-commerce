import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const maxVisiblePages = 5;

    const startPage = Math.max(
        1,
        Math.min(
            currentPage - Math.floor(maxVisiblePages / 2),
            totalPages - maxVisiblePages + 1
        )
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const updateUrlParam = (page: number) => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('page', page.toString());
        window.history.pushState({}, '', `${url.pathname}?${params}`);
    };

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
            updateUrlParam(page);
        }
    };

    return (
        <nav
            className="inline-flex space-x-px rounded-md border-none"
            aria-label="Pagination"
        >
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-2 text-gray-400 hover:bg-gray-50 rounded-l-md"
            >
                <img
                    className="h-3 w-3 rotate-90"
                    src="../../../../public/images/toggle-icon.svg"
                />
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => handlePageChange(1)}
                        className="px-4 py-2 text-[14.4px] text-gray-900 bg-gray-50 hover:bg-gray-100 rounded"
                    >
                        1
                    </button>
                    {startPage > 2 && (
                        <span className="px-4 py-2 text-[14.4px] text-gray-700 bg-gray-50">
                            ...
                        </span>
                    )}
                </>
            )}

            {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-[14.4px] ${
                        page === currentPage
                            ? 'bg-gradient-to-b from-yellow-400 to-orange-400 font-semibold text-white'
                            : 'text-black bg-gray-50 hover:bg-gray-100'
                    } rounded`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="px-4 py-2 text-[14.4px] text-gray-700 bg-gray-50">
                            ...
                        </span>
                    )}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-4 py-2 text-[14.4px] text-gray-900 bg-gray-50 hover:bg-gray-100 rounded"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-2 text-gray-400 hover:bg-gray-50 rounded-r-md"
            >
                <img
                    className="h-3 w-3 rotate-90 -scale-y-100"
                    src="../../../../public/images/toggle-icon.svg"
                />
            </button>
        </nav>
    );
};

export default Pagination;
