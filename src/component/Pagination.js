import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxItemsPerFetch,
  itemsPerPage,
  handleItemsPerPageChange,
}) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const getDisplayPages = () => {
    const displayPages = [];
    const maxDisplayPages = 8;

    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);

    if (endPage - startPage + 1 < maxDisplayPages) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      displayPages.push(i);
    }

    return displayPages;
  };

  return (
    <div className="pagination-wrapper">
      <div className="items-per-page">
        <label>Items per page:</label>
        <input
          type="number"
          min="1"
          max={maxItemsPerFetch}
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(e.target.value)}
        />
       
      </div>
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className={`pagination-button ${
              currentPage === 1 ? "disabled" : ""
            }`}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {getDisplayPages().map((page) => (
            <button
              key={page}
              className={`pagination-button ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`pagination-button ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
