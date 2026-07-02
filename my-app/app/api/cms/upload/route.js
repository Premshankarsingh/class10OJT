import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "cms");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${timestamp}_${sanitizedName}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/cms/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
