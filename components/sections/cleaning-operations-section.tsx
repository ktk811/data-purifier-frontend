"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import RemoveDuplicatesModal from "../modals/remove-duplicates-modal"
import HandleMissingValuesModal from "../modals/handle-missing-values-modal"
import StandardizeTextModal from "../modals/standardize-text-modal"
import ConvertDataTypeModal from "../modals/convert-data-type-modal"

interface CleaningOperationsSectionProps {
  isLoading: boolean
  onDataUpdate: () => void
}

export default function CleaningOperationsSection({ isLoading, onDataUpdate }: CleaningOperationsSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const operations = [
    { id: "duplicates", label: "Remove Duplicates" },
    { id: "missing", label: "Handle Missing Values" },
    { id: "text", label: "Standardize Text" },
    { id: "type", label: "Convert Data Type" },
  ]

  return (
    <div className="space-y-2 pl-3">
      {operations.map((op) => (
        <Button
          key={op.id}
          onClick={() => setActiveModal(op.id)}
          disabled={isLoading}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white"
        >
          {op.label}
        </Button>
      ))}

      {activeModal === "duplicates" && (
        <RemoveDuplicatesModal onClose={() => setActiveModal(null)} onSuccess={onDataUpdate} />
      )}
      {activeModal === "missing" && (
        <HandleMissingValuesModal onClose={() => setActiveModal(null)} onSuccess={onDataUpdate} />
      )}
      {activeModal === "text" && <StandardizeTextModal onClose={() => setActiveModal(null)} onSuccess={onDataUpdate} />}
      {activeModal === "type" && <ConvertDataTypeModal onClose={() => setActiveModal(null)} onSuccess={onDataUpdate} />}
    </div>
  )
}
