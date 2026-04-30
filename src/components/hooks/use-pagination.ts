type UsePaginationArgs = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay: number;
};

type UsePaginationResult = {
  pages: number[];
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
};

export function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay,
}: UsePaginationArgs): UsePaginationResult {
  if (totalPages <= 0) {
    return {
      pages: [],
      showLeftEllipsis: false,
      showRightEllipsis: false,
    };
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const visibleCount = Math.max(1, paginationItemsToDisplay);

  if (totalPages <= visibleCount) {
    return {
      pages: Array.from({ length: totalPages }, (_, index) => index + 1),
      showLeftEllipsis: false,
      showRightEllipsis: false,
    };
  }

  const sideCount = Math.floor(visibleCount / 2);
  let start = Math.max(1, safeCurrentPage - sideCount);
  const end = Math.min(totalPages, start + visibleCount - 1);

  if (end - start + 1 < visibleCount) {
    start = Math.max(1, end - visibleCount + 1);
  }

  return {
    pages: Array.from({ length: end - start + 1 }, (_, index) => start + index),
    showLeftEllipsis: start > 1,
    showRightEllipsis: end < totalPages,
  };
}
