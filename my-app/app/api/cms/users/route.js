import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const { data: currentUser } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "editor")) {
    return NextResponse.json({ success: false, error: "Not authorized" }, { status: 403 });
  }

  try {
    const { data: allUsers } = await supabase.from("users").select("*").eq("status", "approved");

    const admins = (allUsers || []).filter(u => u.role === "admin").map(u => ({
      id: u.id,
      fullName: u.full_name,
      email: u.email,
    }));
    const editors = (allUsers || []).filter(u => u.role === "editor").map(u => ({
      id: u.id,
      fullName: u.full_name,
      email: u.email,
    }));

    return NextResponse.json({
      success: true,
      data: { admins, editors },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const { data: currentUser } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
  }

  try {
    const body = await request.json();

    if (body.action === "addEditor") {
      if (!body.email || !body.fullName) {
        return NextResponse.json({ success: false, error: "Email and name required" }, { status: 400 });
      }

      const { data: existing } = await supabase.from("users").select("id").eq("email", body.email).maybeSingle();
      if (existing) {
        return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 });
      }

      const adminSupabase = await createAdminClient();
      const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email: body.email,
        password: body.password || "Editor@1234",
        email_confirm: true,
        user_metadata: { full_name: body.fullName },
      });
      if (authError) {
        return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
      }

      const { error: dbError } = await supabase.from("users").insert({
        id: authData.user.id,
        full_name: body.fullName,
        email: body.email,
        role: "editor",
        status: "approved",
      });
      if (dbError) {
        await adminSupabase.auth.admin.deleteUser(authData.user.id);
        return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
      }

      const { data: allUsers } = await supabase.from("users").select("*").eq("status", "approved");
      return NextResponse.json({
        success: true,
        data: {
          admins: (allUsers || []).filter(u => u.role === "admin").map(u => ({ id: u.id, fullName: u.full_name, email: u.email })),
          editors: (allUsers || []).filter(u => u.role === "editor").map(u => ({ id: u.id, fullName: u.full_name, email: u.email })),
        },
      });
    }

    if (body.action === "removeEditor") {
      if (!body.id) {
        return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
      }

      const adminSupabase = await createAdminClient();
      const { error: authError } = await adminSupabase.auth.admin.deleteUser(body.id);
      if (authError) {
        return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
      }

      const { error: dbError } = await supabase.from("users").delete().eq("id", body.id);
      if (dbError) throw dbError;

      const { data: allUsers } = await supabase.from("users").select("*").eq("status", "approved");
      return NextResponse.json({
        success: true,
        data: {
          admins: (allUsers || []).filter(u => u.role === "admin").map(u => ({ id: u.id, fullName: u.full_name, email: u.email })),
          editors: (allUsers || []).filter(u => u.role === "editor").map(u => ({ id: u.id, fullName: u.full_name, email: u.email })),
        },
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
