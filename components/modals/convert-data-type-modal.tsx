"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"

interface ConvertDataTypeModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function ConvertDataTypeModal({ onClose, onSuccess }: ConvertDataTypeModalProps) {
  const [selectedColumn, setSelectedColumn] = useState("")
  const [newType, setNewType] = useState("numeric")
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = async () => {
    if (!selectedColumn) {
      toast.error("Please select a column")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("https://datapurifier.onrender.com/clean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "convert_type",
          params: {
            column: selectedColumn,
            new_type: newType,
          },
        }),
      })

      if (!response.ok) throw new Error("Operation failed")

      toast.success("Data type converted successfully")
      onSuccess()
      onClose()
    } catch (error) {
      toast.error("Error converting data type")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Convert Data Type</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Select Column</label>
            <input
              type="text"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              placeholder="Enter column name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">New Type</label>
            <div className="space-y-2">
              {["numeric", "datetime", "string"].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={newType === type}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={isLoading} className="bg-slate-900 hover:bg-slate-800 text-white">
            {isLoading ? "Applying..." : "Apply"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
