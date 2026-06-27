import React from 'react'
import Card from './Card'
import Loader from './Loader'
import EmptyState from './EmptyState'
import { useTheme } from '../../context/ThemeContext'

export default function DataTable({ columns = [], data = [], loading = false, emptyMessage = 'No matching records found.' }) {
  const { theme } = useTheme()

  if (loading) {
    return (
      <Card title="Records">
        <Loader />
      </Card>
    )
  }

  if (!data.length) {
    return (
      <Card title="Records">
        <EmptyState message={emptyMessage} />
      </Card>
    )
  }

  return (
    <Card title="Records" className="overflow-hidden">
      <div className="table-responsive" data-theme={theme}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key || column.accessor || column.title} scope="col">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((column) => (
                  <td key={`${row.id || rowIndex}-${column.key || column.accessor || column.title}`}>
                    {column.render ? column.render(row, rowIndex) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
