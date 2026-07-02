import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const adminSupabase = await createAdminClient();
  const { data: dbUser } = await adminSupabase.from("users").select("*").eq("id", user.id).single();
  if (!dbUser) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({
    success: true,
    data: { id: dbUser.id, fullName: dbUser.full_name, email: dbUser.email, role: dbUser.role, status: dbUser.status, phone: dbUser.phone, gender: dbUser.gender, approvedAt: dbUser.approved_at },
  });
}