"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"

interface StandardizeTextModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function StandardizeTextModal({ onClose, onSuccess }: StandardizeTextModalProps) {
  const [caseOption, setCaseOption] = useState("lower")
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = async () => {
    if (selectedColumns.length === 0) {
      toast.error("Please select at least one column")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("https://datapurifier.onrender.com/clean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "standardize_text",
          params: {
            case: caseOption,
            columns: selectedColumns,
          },
        }),
      })

      if (!response.ok) throw new Error("Operation failed")

      toast.success("Text standardized successfully")
      onSuccess()
      onClose()
    } catch (error) {
      toast.error("Error standardizing text")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Standardize Text</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Case</label>
            <div className="space-y-2">
              {[
                { value: "lower", label: "lowercase" },
                { value: "upper", label: "UPPERCASE" },
                { value: "title", label: "Title Case" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="case"
                    value={opt.value}
                    checked={caseOption === opt.value}
                    onChange={(e) => setCaseOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Select Columns</label>
            <input
              type="text"
              placeholder="Enter column names (comma-separated)"
              onChange={(e) => setSelectedColumns(e.target.value.split(",").map((c) => c.trim()))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
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
