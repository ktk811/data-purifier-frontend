"use client"

import type React from "react"

import { useRef } from "react"
import { Cloud } from "lucide-react"
import toast from "react-hot-toast"

interface FileUploadAreaProps {
  setFileUploaded: (value: boolean) => void
  setDataProfile: (value: any) => void
  setTableData: (value: any) => void
  setIsLoading: (value: boolean) => void
}

export default function FileUploadArea({
  setFileUploaded,
  setDataProfile,
  setTableData,
  setIsLoading,
}: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(csv|xlsx|xls)$/i)) {
      toast.error("Please upload a CSV or Excel file")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("https://datapurifier.onrender.com/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      setDataProfile(data.profile)
      setTableData(data.preview)
      setFileUploaded(true)
      toast.success("File uploaded successfully!")
    } catch (error) {
      toast.error("Error uploading file")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
  }

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current = 0
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="w-full max-w-md p-12 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-100 transition-colors cursor-pointer text-center"
      >
        <Cloud size={48} className="mx-auto text-slate-400 mb-4" />
        <p className="text-slate-700 font-semibold mb-2">Drag & drop CSV or Excel file here, or click to browse</p>
        <p className="text-slate-500 text-sm">Supported formats: CSV, XLS, XLSX</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFile(e.target.files[0])
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  )
}
