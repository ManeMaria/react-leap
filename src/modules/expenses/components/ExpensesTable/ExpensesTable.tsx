import dayjs from 'dayjs';
import { useMemo } from 'react';

import { parseExpenseCategoryLabel } from '../../utils';

import { Table, useTable, UseTableReturn } from '@/components/Table';
export const ExpensesTable = () => {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    data,
    loading,
    setOrder,
  }: UseTableReturn = useTable({
    endpoint: '/expense',
    entityName: 'expenses',
    mockServer: true,
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Value',
        accessor: 'value',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Category',
        accessor: 'category',
        Cell: ({ value }) => parseExpenseCategoryLabel(value),
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => dayjs(value).format('DD/MM'),
      },
    ],
    [],
  );

  return (
    <Table
      setPage={setPage}
      setPageSize={setPageSize}
      loadingData={loading}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      setOrder={setOrder}
      data={data || []}
      columns={columns}
      noDataText={'No expenses'}
      mt={8}
    />
  );
};
