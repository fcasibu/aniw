export const normalizePagination = (
  page?: string | number | null,
  maxPage?: number,
) => {
  const pageNum = Number(page);
  if (pageNum <= 0 || Number.isNaN(pageNum)) return 1;

  if (maxPage) return Math.min(pageNum, maxPage);

  return pageNum;
};
