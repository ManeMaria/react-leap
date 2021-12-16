import dayjs from 'dayjs';
import { useMemo } from 'react';

import { parseIncomeSourceLabel } from '../../utils';

import { Table, useTable, UseTableReturn } from '@/components/Table';

export const IncomesTable = () => {
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
    endpoint: '/income',
    entityName: 'incomes',
    mockServer: true,
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Source',
        accessor: 'source',
        Cell: ({ value }) => parseIncomeSourceLabel(value),
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => dayjs(value).format('DD/MM'),
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
        Cell: ({ value }) => dayjs(value).format('DD/MM hh:mm:ss'),
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
      setOrder={setOrder}
      pageSize={pageSize}
      totalPages={totalPages}
      data={data || []}
      columns={columns}
      noDataText={'No incomes'}
      mt={8}
    />
  );
};
