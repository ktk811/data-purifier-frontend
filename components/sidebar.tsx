"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import DataProfileSection from "./sections/data-profile-section"
import CleaningOperationsSection from "./sections/cleaning-operations-section"
import DownloadSection from "./sections/download-section"

interface SidebarProps {
  fileUploaded: boolean
  dataProfile: any
  isLoading: boolean
  onDataUpdate: () => void
}

export default function Sidebar({ fileUploaded, dataProfile, isLoading, onDataUpdate }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    dataProfile: true,
    cleaning: false,
    download: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="w-96 bg-slate-900 text-white overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">Data Purifier</h1>
        <p className="text-slate-400 text-sm mt-1">Clean and transform your data</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Data Profile Section */}
        <div className="space-y-2">
          <button
            onClick={() => toggleSection("dataProfile")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              fileUploaded ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-800/50 opacity-50 cursor-not-allowed"
            }`}
            disabled={!fileUploaded}
          >
            <span className="font-semibold">Data Profile</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${expandedSections.dataProfile ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.dataProfile && fileUploaded && <DataProfileSection dataProfile={dataProfile} />}
        </div>

        {/* Cleaning Operations Section */}
        <div className="space-y-2">
          <button
            onClick={() => toggleSection("cleaning")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              fileUploaded ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-800/50 opacity-50 cursor-not-allowed"
            }`}
            disabled={!fileUploaded}
          >
            <span className="font-semibold">Cleaning Operations</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${expandedSections.cleaning ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.cleaning && fileUploaded && (
            <CleaningOperationsSection isLoading={isLoading} onDataUpdate={onDataUpdate} />
          )}
        </div>

        {/* Download Section */}
        <div className="space-y-2">
          <button
            onClick={() => toggleSection("download")}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              fileUploaded ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-800/50 opacity-50 cursor-not-allowed"
            }`}
            disabled={!fileUploaded}
          >
            <span className="font-semibold">Download</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${expandedSections.download ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.download && fileUploaded && <DownloadSection isLoading={isLoading} />}
        </div>
      </div>
    </div>
  )
}
