import Icon from "./Icon";

interface PaginationProps {
  dataPerPage: number;
  dataLength: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  onPageChange,
  dataLength,
  dataPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(dataLength / dataPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      onPageChange(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 10;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

    if (
      totalPages > maxVisiblePages &&
      endPage - startPage < maxVisiblePages - 1
    ) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  if (!dataLength) {
    return null;
  }

  return (
    <div className="flex gap-3 justify-center mt-10">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="text-gray-700 border disabled:bg-transparent flex justify-center items-center p-2 hover:bg-gray-100 rounded-md h-8 w-8"
      >
        <Icon name="Left" />
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          disabled={dataLength <= dataPerPage}
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`${
            currentPage === pageNumber
              ? "bg-gray-200 text-gray-800"
              : "text-gray-700"
          } border disabled:bg-transparent flex justify-center items-center p-2 hover:bg-gray-100 rounded-md px-3 h-8 w-8`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="text-gray-700 border disabled:bg-transparent flex justify-center items-center p-2 hover:bg-gray-100 rounded-md h-8 w-8"
      >
        <Icon name="Right" />
      </button>
    </div>
  );
};

export default Pagination;
