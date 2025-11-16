// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const accessKey = process.env.WEB_3_FORMS;
  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Missing WEB_3_FORMS access key." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body || {};
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: accessKey, name, email, subject, message }),
    });

    // Some providers return JSON even on non-2xx, some don’t—handle both.
    let data: any = null;
    try {
      data = await r.json();
    } catch {
      /* ignore */
    }

    if (r.ok && data?.success) {
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    }

    return NextResponse.json(
      {
        success: false,
        message:
          data?.message ??
          `Failed to send message. Status ${r.status} ${r.statusText}`,
      },
      { status: r.status || 500 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
