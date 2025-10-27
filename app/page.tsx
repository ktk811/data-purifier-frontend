"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"

export default function Home() {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [dataProfile, setDataProfile] = useState<any>(null)
  const [tableData, setTableData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        fileUploaded={fileUploaded}
        dataProfile={dataProfile}
        isLoading={isLoading}
        onDataUpdate={() => {
          // Trigger data refresh after operations
        }}
      />
      <MainContent
        fileUploaded={fileUploaded}
        setFileUploaded={setFileUploaded}
        dataProfile={dataProfile}
        setDataProfile={setDataProfile}
        tableData={tableData}
        setTableData={setTableData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Toaster position="top-right" />
    </div>
  )
}
