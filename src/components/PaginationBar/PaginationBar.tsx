import Pagination from '@choc-ui/paginator';
import { Dispatch, SetStateAction } from 'react';

export type PaginationBarProps = {
  page: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  pageSizeOptions?: number[];
};

export const PaginationBar = ({
  page,
  setPageSize,
  pageSize,
  setPage,
  totalPages,
  pageSizeOptions = [15, 30, 50],
  ...restProps
}: PaginationBarProps) => {
  return (
    <Pagination
      total={totalPages}
      paginationProps={{ display: 'flex' }}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      showSizeChanger
      current={page}
      pageNeighbours={1}
      onShowSizeChange={(_, newPageSize) => {
        setPageSize(Number(newPageSize));
      }}
      onChange={(actualPage: any) => {
        setPage(actualPage);
      }}
      {...restProps}
    />
  );
};
