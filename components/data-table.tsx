"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps {
  data: any
  isLoading: boolean
}

export default function DataTable({ data, isLoading }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        <p className="mt-4 text-slate-600">Loading data...</p>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return <Card className="p-8 text-center text-slate-600">No data to display</Card>
  }

  const columns = Object.keys(data[0])
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const paginatedData = data.slice(startIdx, endIdx)

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                  {columns.map((col) => (
                    <td key={`${idx}-${col}`} className="px-6 py-3 text-sm text-slate-700">
                      {String(row[col] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing {startIdx + 1} to {Math.min(endIdx, data.length)} of {data.length} rows
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="px-3 py-2 text-sm text-slate-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
