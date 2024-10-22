import { useEffect, useState } from 'react';

export type UsePaginationProps = {
  refetch: () => void;
};

export const usePagination = ({ refetch }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  return {
    currentPage,
    handleLoadMore,
  };
};
