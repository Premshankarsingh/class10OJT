
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
export async function POST(request) {
  try {
    const { fullName, email, password, phone, gender } = await request.json();
    if (!fullName || !email || !password) {
      return NextResponse.json({ success: false, error: "Full name, email, and password are required" }, { status: 400 });
    }
    const supabase = await createAdminClient();
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (authError) {
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      full_name: fullName,
      email,
      phone,
      gender,
      role: "editor",
      status: "pending",
    });
    if (dbError) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      message: "Registration successful. Please wait for admin approval.",
      data: { user: { id: authData.user.id, email, fullName, status: "pending" } },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}