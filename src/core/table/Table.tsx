import React from "react"
import { useTable } from "react-table"
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"

export const Table = React.memo(
  (props: { data: any; cols: any; onRowClick?: any }) => {
    const { data, cols, onRowClick } = props

    const columns = React.useMemo(() => cols, [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    })

    return (
      <>
        <ChakraTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, z) => (
                  <Th key={z} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, rowI) => {
              prepareRow(row)
              return (
                <Tr
                  key={rowI}
                  {...row.getRowProps()}
                  onClick={() => {
                    onRowClick && onRowClick(row.original)
                  }}
                >
                  {row.cells.map((cell, cellI) => {
                    return (
                      <Td key={cellI} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </ChakraTable>
      </>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.data === nextProps.data
  }
)
