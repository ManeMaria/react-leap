import {
  Table as CTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Center,
  Spinner,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsFillArchiveFill } from 'react-icons/bs';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { useTable, useSortBy } from 'react-table';

import { PaginationBar } from '../PaginationBar';
import { SearchBar } from '../SearchBar';

import { TableP } from '.';

function renderTableBody({ data, loadingData, noDataText, rows, prepareRow }) {
  if (!data?.length && !loadingData)
    return (
      <Center position="absolute" left="50%" top="50%">
        <BsFillArchiveFill />
        <Text ml={4}>{noDataText}</Text>
      </Center>
    );
  if (loadingData)
    return (
      <Center>
        <Spinner position="absolute" left="50%" top="50%" size="lg" />
      </Center>
    );
  return rows.map((row, index) => {
    prepareRow(row);
    return (
      <Tr {...row.getRowProps()} key={index}>
        {row.cells.map((cell, index) => (
          <Td py={8} {...cell.getCellProps()} key={index}>
            {cell.render('Cell')}
          </Td>
        ))}
      </Tr>
    );
  });
}

export const Table = ({
  data,
  columns,
  page,
  setPage,
  setPageSize,
  totalPages,
  pageSize,
  loadingData,
  search = null,
  noDataText,
  activePagination = true,
  paginationBarProps = {},
  height = ['70vh', '65vh'],
  bgHeader = 'brand.500',
  colorHeader = 'white',
  setOrder = null,
  ...props
}: TableP) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable({ columns, data, manualSortBy: true, defaultCanSort: true }, useSortBy);

  useEffect(() => {
    if (setOrder && sortBy?.length) {
      const { id, desc } = sortBy[0];
      const ord = desc ? 'desc' : 'asc';
      setOrder({ column: id, ord });
    }
  }, [sortBy, setOrder]);

  return (
    <Flex direction="column" justifyContent="flex-start" w="100%">
      {search && <SearchBar search={search} />}
      <Box height={height}>
        <Flex
          w="100%"
          bg="white"
          mb={5}
          borderRadius="lg"
          maxHeight={height}
          overflowY="auto"
          {...props}
        >
          <CTable {...getTableProps()} h="100%" w="100%" height={height}>
            <Thead width="100%" bgColor={bgHeader} shadow="lg">
              {headerGroups.map((headerGroup, index) => (
                <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      py={5}
                      color={colorHeader}
                      key={index}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <chakra.span pl="4" d="inline-block">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <GoTriangleUp aria-label="sorted descending" />
                          ) : (
                            <GoTriangleDown aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()} position="relative">
              {renderTableBody({ data, loadingData, noDataText, rows, prepareRow })}
            </Tbody>
          </CTable>
        </Flex>
        {activePagination && (
          <PaginationBar
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setPage={setPage}
            totalPages={totalPages}
            {...paginationBarProps}
          />
        )}
      </Box>
    </Flex>
  );
};
