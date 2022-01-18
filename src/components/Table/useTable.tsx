import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getPaginatedData, getCount } from './api';

import { UseTableReturn, UseTableProps, OrderObject } from '.';

export const useTable = ({
  endpoint,
  entityName,
  mockServer = true,
  nameSearch = 'search',
  nameLimit = 'limit',
  nameOffset = 'offset',
  nameOrder = 'order',
}: UseTableProps): UseTableReturn => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [order, setOrder] = useState<OrderObject>({ ord: '', column: '' });
  const [query, setQuery] = useState('');
  const [data, setData] = useState<any>([]);

  const {
    data: paginatedData,
    isLoading: loadingPaginationData,
    error: errorPaginationData,
  } = useQuery(
    [
      'getPaginatedData',
      endpoint,
      nameSearch,
      nameLimit,
      nameOffset,
      nameOrder,
      query,
      mockServer,
      page,
      pageSize,
      order,
    ],
    () =>
      getPaginatedData({
        page,
        pageSize,
        endpoint,
        nameSearch,
        query,
        nameLimit,
        nameOffset,
        mockServer,
        nameOrder,
        order,
      }),
  );

  const {
    data: count,
    isLoading: loadingCount,
    error: errorCount,
  } = useQuery(['count', mockServer, endpoint, query], () => getCount({ mockServer, endpoint }));

  useEffect(() => {
    if (!errorPaginationData && paginatedData) {
      if (entityName && paginatedData[entityName]) {
        setData(paginatedData[entityName]);
        return;
      }

      if (paginatedData) {
        setData(paginatedData);
        return;
      }
    }

    setData([]);
  }, [paginatedData, entityName, errorPaginationData]);

  useEffect(() => {
    if (!errorCount && (count || count === 0)) {
      setTotalPages(count);
    }
  }, [count, errorCount]);

  function search(query: string) {
    setQuery(query);
    setPage(1);
  }

  const loading = loadingPaginationData || loadingCount;

  return {
    page,
    pageSize,
    totalPages,
    loading,
    search,
    query,
    data,
    setPage,
    setOrder,
    setPageSize,
  };
};
