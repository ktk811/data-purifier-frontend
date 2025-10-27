"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ColumnDetailsModalProps {
  dataProfile: any
  onClose: () => void
}

export default function ColumnDetailsModal({ dataProfile, onClose }: ColumnDetailsModalProps) {
  const columns = dataProfile?.columns || []

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-96 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Column Details</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Column Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Non-Null Count</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Data Type</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm text-slate-700">{col.name}</td>
                  <td className="px-6 py-3 text-sm text-slate-700">{col.non_null_count}</td>
                  <td className="px-6 py-3 text-sm text-slate-700">{col.dtype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
