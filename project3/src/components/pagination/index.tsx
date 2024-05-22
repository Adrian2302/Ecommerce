import "./styles.scss";
import React from "react";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={
          currentPage === 1
            ? "pagination__page-button-border--disabled"
            : "pagination__page-button-border"
        }
        aria-label="Previous page button"
      >
        <img src={prev} alt="Previous page button"></img>
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={
            page === currentPage
              ? "pagination__page-button pagination__page-button--active"
              : "pagination__page-button pagination__page-button--color pagination__page-button--semi-bold"
          }
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages || totalPages === 0
            ? "pagination__page-button-border--disabled"
            : "pagination__page-button-border"
        }
        aria-label="Next page button"
      >
        <img src={next} alt="Next page button"></img>
      </button>
    </div>
  );
};

export default Pagination;
