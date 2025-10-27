import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Forward to Flask backend
    const flaskFormData = new FormData()
    flaskFormData.append("file", file)

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: flaskFormData,
    })

    if (!response.ok) {
      throw new Error("Flask backend error")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
