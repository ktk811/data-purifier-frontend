import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch("http://localhost:5000/clean", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Flask backend error")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Clean error:", error)
    return NextResponse.json({ error: "Operation failed" }, { status: 500 })
  }
}
