import { type NextRequest, NextResponse } from "next/server"

const MOCK_CREDENTIALS = {
  email: "admin@mathletes.com",
  password: "mathletes2025",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock authentication - for testing only
    // TODO: Replace with actual database authentication using Neon
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
