"use client"
import FileUploadArea from "./file-upload-area"
import DataDisplay from "./data-display"

interface MainContentProps {
  fileUploaded: boolean
  setFileUploaded: (value: boolean) => void
  dataProfile: any
  setDataProfile: (value: any) => void
  tableData: any
  setTableData: (value: any) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export default function MainContent({
  fileUploaded,
  setFileUploaded,
  dataProfile,
  setDataProfile,
  tableData,
  setTableData,
  isLoading,
  setIsLoading,
}: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto">
      {!fileUploaded ? (
        <FileUploadArea
          setFileUploaded={setFileUploaded}
          setDataProfile={setDataProfile}
          setTableData={setTableData}
          setIsLoading={setIsLoading}
        />
      ) : (
        <DataDisplay
          dataProfile={dataProfile}
          tableData={tableData}
          setDataProfile={setDataProfile}
          setTableData={setTableData}
          isLoading={isLoading}
        />
      )}
    </main>
  )
}
