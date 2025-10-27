import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const format = request.nextUrl.searchParams.get("format") || "csv"

    const response = await fetch(`http://localhost:5000/download?format=${format}`)

    if (!response.ok) {
      throw new Error("Flask backend error")
    }

    const blob = await response.blob()
    return new NextResponse(blob, {
      headers: {
        "Content-Type":
          format === "xlsx" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv",
        "Content-Disposition": `attachment; filename="data.${format}"`,
      },
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
