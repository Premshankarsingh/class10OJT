import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 401 });
    }
    const adminSupabase = await createAdminClient();
    const { data: userData } = await adminSupabase.from("users").select("*").eq("id", data.user.id).single();
    if (!userData || userData.status !== "approved") {
      await supabase.auth.signOut();
      return NextResponse.json({ success: false, error: "Account not approved. Please wait for admin approval." }, { status: 403 });
    }
    return NextResponse.json({
      success: true,
      data: { user: { id: userData.id, email: userData.email, fullName: userData.full_name, role: userData.role } },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}