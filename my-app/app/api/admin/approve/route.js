import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const adminSupabase = await createAdminClient();
  const { data: adminUser } = await adminSupabase.from("users").select("role").eq("id", user.id).single();
  if (!adminUser || adminUser.role !== "admin") {
    return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
  }
  try {
    const { userId, action } = await request.json();
    if (!userId || !action) {
      return NextResponse.json({ success: false, error: "userId and action are required" }, { status: 400 });
    }
    if (action === "approve") {
      const { data: updatedUser, error: updateError } = await adminSupabase
        .from("users")
        .update({ status: "approved", approved_at: new Date().toISOString() })
        .eq("id", userId)
        .select("id, full_name, email, role, status, phone, gender, approved_at")
        .single();
      if (updateError || !updatedUser) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      const { error: authErr } = await adminSupabase.auth.admin.updateUserById(userId, { email_confirm: true });
      if (authErr) console.error("Failed to confirm user email:", authErr);
      return NextResponse.json({ success: true, message: "User approved", data: updatedUser });
    }
    if (action === "reject") {
      const { data: updatedUser, error: updateError } = await adminSupabase
        .from("users")
        .update({ status: "rejected" })
        .eq("id", userId)
        .select("id, full_name, email, role, status")
        .single();
      if (updateError || !updatedUser) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "User rejected", data: updatedUser });
    }
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function GET(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const adminSupabase = await createAdminClient();
  const { data: adminUser } = await adminSupabase.from("users").select("role").eq("id", user.id).single();
  if (!adminUser || adminUser.role !== "admin") {
    return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
  }
  try {
    const { status } = Object.fromEntries(new URL(request.url).searchParams);
    let query = adminSupabase.from("users").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    const { data: users } = await query;
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}