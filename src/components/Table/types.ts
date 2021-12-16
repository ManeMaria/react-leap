import { Dispatch, SetStateAction } from 'react';

type Column = {
  Header: string;
  accessor: string;
  Cell?: (props: any) => JSX.Element | undefined | string;
};

export type OrderObject = {
  ord: string;
  column: string;
};

export type ColumnsTable = Column[];

export type SearchFunc = (query: string) => void;

export type OrderFunc = ({ ord, column }: OrderObject) => void;

export type TableP = {
  data: Array<Record<string, unknown>>;
  columns: ColumnsTable;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  page: number;
  pageSize: number;
  totalPages: number;
  loadingData?: boolean;
  search?: SearchFunc | null;
  setOrder?: OrderFunc | null;
  noDataText?: string;
  activePagination?: boolean;
  paginationBarProps?: { [field: string]: any };
  height?: string[];
  colorHeader?: string;
  bgHeader?: string;
  [field: string]: any;
};

export type UseTableReturn = Omit<TableP, 'columns' | 'noDataText' | 'loadingData'> & {
  loading: boolean;
  query: string;
};

export type UseTableProps = {
  endpoint: string;
  entityName: string;
  mockServer?: boolean;
  nameSearch?: string;
  nameLimit?: string;
  nameOffset?: string;
  nameOrder?: string;
};
