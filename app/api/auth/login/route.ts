import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendDiscordNotification } from "@/lib/notifications/discord";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      // 400 에러 알림
      await sendDiscordNotification({
        type: "API_ERROR",
        statusCode: 400,
        message: "Missing email or password",
        endpoint: "/api/auth/login",
        timestamp: new Date().toISOString(),
        additionalInfo: { email: email || "not provided" },
      });

      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // 401 에러 알림
      await sendDiscordNotification({
        type: "AUTH_ERROR",
        statusCode: 401,
        message: error.message,
        endpoint: "/api/auth/login",
        timestamp: new Date().toISOString(),
        additionalInfo: { email },
      });

      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: data.user,
        session: data.session,
      },
      { status: 200 }
    );
  } catch (error) {
    // 500 에러 알림
    await sendDiscordNotification({
      type: "SERVER_ERROR",
      statusCode: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      endpoint: "/api/auth/login",
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined,
    });

    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
