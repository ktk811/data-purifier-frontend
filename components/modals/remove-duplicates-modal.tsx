"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"

interface RemoveDuplicatesModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function RemoveDuplicatesModal({ onClose, onSuccess }: RemoveDuplicatesModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("https://datapurifier.onrender.com/clean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: "remove_duplicates" }),
      })

      if (!response.ok) throw new Error("Operation failed")

      const data = await response.json()
      toast.success(`Removed ${data.removed_count || 0} duplicate rows.`)
      onSuccess()
      onClose()
    } catch (error) {
      toast.error("Error removing duplicates")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Remove Duplicates</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-700 mb-6">
            This will remove all duplicate rows from your dataset. Are you sure you want to continue?
          </p>
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
