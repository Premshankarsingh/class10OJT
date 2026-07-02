import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${new URL(request.url).origin}/auth/reset-password`,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
