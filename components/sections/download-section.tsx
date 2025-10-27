"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import toast from "react-hot-toast"

interface DownloadSectionProps {
  isLoading: boolean
}

export default function DownloadSection({ isLoading }: DownloadSectionProps) {
  const handleDownload = async (format: "csv" | "xlsx") => {
    try {
      const response = await fetch(`/api/download?format=${format}`)
      if (!response.ok) throw new Error("Download failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `data.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success(`Downloaded as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error("Error downloading file")
      console.error(error)
    }
  }

  return (
    <div className="space-y-2 pl-3">
      <Button
        onClick={() => handleDownload("csv")}
        disabled={isLoading}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white"
      >
        <Download size={16} className="mr-2" />
        Download as CSV
      </Button>
      <Button
        onClick={() => handleDownload("xlsx")}
        disabled={isLoading}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white"
      >
        <Download size={16} className="mr-2" />
        Download as Excel
      </Button>
    </div>
  )
}
