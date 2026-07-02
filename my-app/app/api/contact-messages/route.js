import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

const NO_CACHE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, data: data || [] }, { headers: NO_CACHE });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_CACHE });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Name, email, subject, and message are required" }, { status: 400, headers: NO_CACHE });
    }

    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone, subject, message })
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201, headers: NO_CACHE });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_CACHE });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400, headers: NO_CACHE });
    }

    const supabase = await createAdminClient();
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true }, { headers: NO_CACHE });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_CACHE });
  }
}
