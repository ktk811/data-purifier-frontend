"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ColumnDetailsModal from "../modals/column-details-modal"

interface DataProfileSectionProps {
  dataProfile: any
}

export default function DataProfileSection({ dataProfile }: DataProfileSectionProps) {
  const [showColumnDetails, setShowColumnDetails] = useState(false)

  return (
    <div className="space-y-3 pl-3">
      <div className="bg-slate-800 rounded-lg p-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Total Rows</span>
          <span className="font-semibold">{dataProfile?.total_rows || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Total Columns</span>
          <span className="font-semibold">{dataProfile?.total_columns || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Missing Values</span>
          <span className="font-semibold">{dataProfile?.missing_percentage?.toFixed(2) || 0}%</span>
        </div>
      </div>
      <Button
        onClick={() => setShowColumnDetails(true)}
        variant="outline"
        className="w-full text-slate-900 border-slate-600 hover:bg-slate-800 hover:text-white"
      >
        Show Column Details
      </Button>
      {showColumnDetails && (
        <ColumnDetailsModal dataProfile={dataProfile} onClose={() => setShowColumnDetails(false)} />
      )}
    </div>
  )
}
