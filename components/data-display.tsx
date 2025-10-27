"use client"

import { Card } from "@/components/ui/card"
import DataTable from "./data-table"

interface DataDisplayProps {
  dataProfile: any
  tableData: any
  setDataProfile: (value: any) => void
  setTableData: (value: any) => void
  isLoading: boolean
}

export default function DataDisplay({ dataProfile, tableData, isLoading }: DataDisplayProps) {
  const stats = [
    {
      label: "Total Rows",
      value: dataProfile?.total_rows || 0,
    },
    {
      label: "Total Columns",
      value: dataProfile?.total_columns || 0,
    },
    {
      label: "Missing Values (%)",
      value: dataProfile?.missing_percentage?.toFixed(2) || "0",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Data Profile</h2>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 bg-white">
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Preview</h2>
        <DataTable data={tableData} isLoading={isLoading} />
      </div>
    </div>
  )
}
