import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALL_SECTIONS = [
  "news", "staff", "facilities", "gallery", "message-cards",
  "exam-portal", "messages", "home-banner",
  "about-history", "about-today", "about-committees", "contact",
  "topbar", "footer",
];

const NO_CACHE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

async function getJsonFallback(section) {
  const jsonFiles = {
    news: "news.json", staff: "staff.json", facilities: "facilities.json",
    gallery: "gallery.json", "message-cards": "message-cards.json",
    "exam-portal": "exam-portal.json", messages: "messages.json",
    "home-banner": "home-banner.json", "about-history": "about-history.json",
    "about-today": "about-today.json", "about-committees": "about-committees.json",
    contact: "contact.json", topbar: "topbar.json", footer: "footer.json",
  };
  const filename = jsonFiles[section];
  if (!filename) return null;
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "app", "data", filename);
    const data = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(data);

    if (section === "home-banner") return json.images || [];
    if (section === "news") {
      return {
        technical: (json.technical || []).map(n => ({ ...n, category: "technical" })),
        general: (json.general || []).map(n => ({ ...n, category: "general" })),
      };
    }
    return json;
  } catch {
    return null;
  }
}

function cleanItem(item) {
  if (!item || typeof item !== "object") return item;
  const { created_at, ...rest } = item;
  return rest;
}

export async function GET(request, { params }) {
  const { section } = await params;

  if (section === "_list") {
    return NextResponse.json({ sections: ALL_SECTIONS }, { headers: NO_CACHE });
  }

  if (!ALL_SECTIONS.includes(section)) {
    return NextResponse.json({ success: false, error: "Section not found" }, { status: 404, headers: NO_CACHE });
  }

  // Try Supabase first
  try {
    const supabase = await createClient();
    let data;

    switch (section) {
      case "news": {
        const { data: rows, error } = await supabase.from("cms_news").select("*").order("order").order("id");
        if (error) throw error;
        const technical = rows.filter(r => r.category === "technical");
        const general = rows.filter(r => r.category !== "technical");
        data = {};
        if (technical.length) data.technical = technical.map(cleanItem);
        if (general.length) data.general = general.map(cleanItem);
        if (!technical.length && !general.length) data = rows.map(cleanItem);
        break;
      }
      case "staff": {
        const { data: rows, error } = await supabase.from("cms_staff_members").select("*").order("order").order("id");
        if (error) throw error;
        const technical = rows.filter(r => r.branch === "technical");
        const general = rows.filter(r => r.branch !== "technical");
        data = {
          title: "Our Staff",
          subtitle: "",
          technicalBranch: { label: "Technical Branch", bgColor: "#2C235A", members: technical.map(cleanItem) },
          generalBranch: { label: "General Branch", bgColor: "#F43755", members: general.map(cleanItem) },
        };
        // Merge page meta
        const { data: meta } = await supabase.from("cms_page_meta").select("*").eq("section", "staff").maybeSingle();
        if (meta) {
          data.title = meta.title || data.title;
          data.subtitle = meta.subtitle || data.subtitle;
          if (meta.extra?.technicalLabel) data.technicalBranch.label = meta.extra.technicalLabel;
          if (meta.extra?.generalLabel) data.generalBranch.label = meta.extra.generalLabel;
          if (meta.extra?.technicalColor) data.technicalBranch.bgColor = meta.extra.technicalColor;
          if (meta.extra?.generalColor) data.generalBranch.bgColor = meta.extra.generalColor;
        }
        break;
      }
      case "facilities": {
        const { data: rows, error } = await supabase.from("cms_facilities").select("*").order("order").order("id");
        if (error) throw error;
        data = { facilities: rows.map(cleanItem), title: "Our Facilities", subtitle: "" };
        const { data: meta } = await supabase.from("cms_page_meta").select("*").eq("section", "facilities").maybeSingle();
        if (meta) {
          data.title = meta.title || data.title;
          data.subtitle = meta.subtitle || data.subtitle;
        }
        break;
      }
      case "gallery": {
        const { data: cats, error } = await supabase.from("cms_gallery_categories").select("*").order("order").order("id");
        if (error) throw error;
        // Match photos by category_id BEFORE stripping id via cleanItem
        const { data: photos } = await supabase.from("cms_gallery_photos").select("*").order("order").order("id");
        const categories = cats.map(c => {
          const catPhotos = photos ? photos.filter(p => p.category_id === c.id).map(cleanItem) : [];
          return { ...cleanItem(c), photos: catPhotos };
        });
        data = { title: "GALLERY", subtitle: "", categories };
        const { data: meta } = await supabase.from("cms_page_meta").select("*").eq("section", "gallery").maybeSingle();
        if (meta) {
          data.title = meta.title || data.title;
          data.subtitle = meta.subtitle || data.subtitle;
        }
        break;
      }
      case "message-cards": {
        const { data: rows, error } = await supabase.from("cms_message_cards").select("*").order("order").order("id");
        if (error) throw error;
        data = rows.map(cleanItem);
        break;
      }
      case "exam-portal": {
        const { data: rows, error } = await supabase.from("cms_exam_portals").select("*").order("order").order("id");
        if (error) throw error;
        data = { exams: rows.map(cleanItem), title: "EXAM PORTAL", subtitle: "" };
        const { data: meta } = await supabase.from("cms_page_meta").select("*").eq("section", "exam-portal").maybeSingle();
        if (meta) {
          data.title = meta.title || data.title;
          data.subtitle = meta.subtitle || data.subtitle;
        }
        break;
      }
      case "messages": {
        const { data: rows, error } = await supabase.from("cms_messages").select("*");
        if (error) throw error;
        data = {};
        for (const row of rows) {
          data[row.role] = cleanItem(row);
        }
        break;
      }
      case "home-banner": {
        const { data: rows, error } = await supabase.from("cms_banners").select("*").order("order");
        if (error) throw error;
        data = { images: rows.map(cleanItem), scrollInterval: 3000 };
        const { data: meta } = await supabase.from("cms_page_meta").select("*").eq("section", "home-banner").maybeSingle();
        if (meta?.extra?.scrollInterval) data.scrollInterval = meta.extra.scrollInterval;
        break;
      }
      case "about-history": {
        const { data: rows, error } = await supabase.from("cms_about_history").select("*").limit(1);
        if (error) throw error;
        data = rows?.[0] ? cleanItem(rows[0]) : null;
        break;
      }
      case "about-today": {
        const { data: rows, error } = await supabase.from("cms_about_today").select("*").limit(1);
        if (error) throw error;
        data = rows?.[0] ? cleanItem(rows[0]) : null;
        break;
      }
      case "about-committees": {
        const { data: rows, error } = await supabase.from("cms_about_committees").select("*").limit(1);
        if (error) throw error;
        data = rows?.[0]?.committees || null;
        break;
      }
      case "contact": {
        const { data: rows, error } = await supabase.from("cms_contact").select("*").limit(1);
        if (error) throw error;
        data = rows?.[0] ? { ...cleanItem(rows[0]) } : null;
        break;
      }
      case "topbar": {
        const { data: rows, error } = await supabase.from("cms_site_settings").select("data").eq("type", "topbar").maybeSingle();
        if (error) throw error;
        data = rows?.data || null;
        break;
      }
      case "footer": {
        const { data: rows, error } = await supabase.from("cms_site_settings").select("data").eq("type", "footer").maybeSingle();
        if (error) throw error;
        data = rows?.data || null;
        break;
      }
      default:
        data = null;
    }

    if (data !== null && data !== undefined) {
      return NextResponse.json({ success: true, data }, { headers: NO_CACHE });
    }
  } catch (err) {
    console.warn(`Supabase GET failed for ${section}, falling back to JSON:`, err.message);
  }

  // Fallback to JSON files
  const fallback = await getJsonFallback(section);
  if (fallback) return NextResponse.json({ success: true, data: fallback }, { headers: NO_CACHE });
  return NextResponse.json({ success: true, data: null }, { headers: NO_CACHE });
}

export async function POST(request, { params }) {
  const { section } = await params;

  if (!ALL_SECTIONS.includes(section)) {
    return NextResponse.json({ success: false, error: "Section not found" }, { status: 404, headers: NO_CACHE });
  }

  try {
    const supabase = await createClient();
    const body = await request.json();

    if (section === "news") {
      const items = [
        ...(body.technical || []).map(n => ({ ...n, category: "technical" })),
        ...(body.general || []).map(n => ({ ...n, category: "general" })),
      ];
      const { error: delErr } = await supabase.from("cms_news").delete().neq("id", -1);
      if (delErr) throw delErr;
      if (items.length > 0) {
        const { error: insErr } = await supabase.from("cms_news").insert(items);
        if (insErr) throw insErr;
      }
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "staff") {
      const { error: delErr } = await supabase.from("cms_staff_members").delete().neq("id", -1);
      if (delErr) throw delErr;
      const members = [
        ...(body.technicalBranch?.members || []).map(m => ({ ...m, branch: "technical" })),
        ...(body.generalBranch?.members || []).map(m => ({ ...m, branch: "general" })),
      ];
      if (members.length > 0) {
        const { error: insErr } = await supabase.from("cms_staff_members").insert(members);
        if (insErr) throw insErr;
      }
      const { error: metaErr } = await supabase.from("cms_page_meta").upsert({
        section: "staff",
        title: body.title || "Our Staff",
        subtitle: body.subtitle || "",
        extra: {
          technicalLabel: body.technicalBranch?.label || "Technical Branch",
          technicalColor: body.technicalBranch?.bgColor || "#2C235A",
          generalLabel: body.generalBranch?.label || "General Branch",
          generalColor: body.generalBranch?.bgColor || "#F43755",
        },
      }, { onConflict: "section" });
      if (metaErr) throw metaErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "facilities") {
      const items = body.facilities || [];
      const { error: delErr } = await supabase.from("cms_facilities").delete().neq("id", -1);
      if (delErr) throw delErr;
      if (items.length > 0) {
        const { error: insErr } = await supabase.from("cms_facilities").insert(items);
        if (insErr) throw insErr;
      }
      const { error: metaErr } = await supabase.from("cms_page_meta").upsert({
        section: "facilities",
        title: body.title || "Our Facilities",
        subtitle: body.subtitle || "",
        extra: {},
      }, { onConflict: "section" });
      if (metaErr) throw metaErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "gallery") {
      const items = body.categories || [];
      const { error: delErr } = await supabase.from("cms_gallery_categories").delete().neq("id", -1);
      if (delErr) throw delErr;
      if (items.length > 0) {
        const categoryRows = items.map(({ photos: _p, ...cat }) => cat);
        const { error: insErr } = await supabase.from("cms_gallery_categories").insert(categoryRows);
        if (insErr) throw insErr;
      }
      // cms_gallery_photos operations are best-effort (table may not exist)
      await supabase.from("cms_gallery_photos").delete().neq("id", -1).catch(() => {});
      if (items.length > 0) {
        const photoRows = [];
        items.forEach(cat => {
          if (cat.photos?.length > 0) {
            cat.photos.forEach((p, idx) => {
              photoRows.push({ id: Math.floor(Date.now() + idx + Math.random() * 10000), category_id: cat.id, src: p.src, alt: p.alt || "", order: idx });
            });
          }
        });
        if (photoRows.length > 0) {
          await supabase.from("cms_gallery_photos").insert(photoRows).catch(() => {});
        }
      }
      const { error: metaErr } = await supabase.from("cms_page_meta").upsert({
        section: "gallery",
        title: body.title || "GALLERY",
        subtitle: body.subtitle || "",
        extra: {},
      }, { onConflict: "section" });
      if (metaErr) throw metaErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "exam-portal") {
      const items = body.exams || [];
      const { error: delErr } = await supabase.from("cms_exam_portals").delete().neq("id", -1);
      if (delErr) throw delErr;
      if (items.length > 0) {
        const { error: insErr } = await supabase.from("cms_exam_portals").insert(items);
        if (insErr) throw insErr;
      }
      const { error: metaErr } = await supabase.from("cms_page_meta").upsert({
        section: "exam-portal",
        title: body.title || "EXAM PORTAL",
        subtitle: body.subtitle || "",
        extra: {},
      }, { onConflict: "section" });
      if (metaErr) throw metaErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "message-cards") {
      const items = Array.isArray(body) ? body : body.items || [];
      const { error: delErr } = await supabase.from("cms_message_cards").delete().neq("id", -1);
      if (delErr) throw delErr;
      if (items.length > 0) {
        const { error: insErr } = await supabase.from("cms_message_cards").insert(items);
        if (insErr) throw insErr;
      }
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "home-banner") {
      const items = body.images || [];
      const { error: delErr } = await supabase.from("cms_banners").delete().neq("id", -1);
      if (delErr) throw delErr;
      if (items.length > 0) {
        const { error: insErr } = await supabase.from("cms_banners").insert(items);
        if (insErr) throw insErr;
      }
      const { error: metaErr } = await supabase.from("cms_page_meta").upsert({
        section: "home-banner",
        title: "",
        subtitle: "",
        extra: { scrollInterval: body.scrollInterval || 3000 },
      }, { onConflict: "section" });
      if (metaErr) throw metaErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "messages") {
      const roles = ["principal", "chairman", "coordinator", "vicePrincipal"];
      for (const role of roles) {
        if (body[role]) {
          const { error: upsertErr } = await supabase.from("cms_messages").upsert({
            role,
            ...body[role],
          }, { onConflict: "role" });
          if (upsertErr) throw upsertErr;
        }
      }
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    const singletonSections = ["about-history", "about-today", "about-committees", "contact"];
    if (singletonSections.includes(section)) {
      const tableMap = {
        "about-history": "cms_about_history",
        "about-today": "cms_about_today",
        "about-committees": "cms_about_committees",
        contact: "cms_contact",
      };
      const table = tableMap[section];
      const { error: delErr } = await supabase.from(table).delete().neq("id", -1);
      if (delErr) throw delErr;

      let payload = body;
      if (section === "about-committees") payload = { committees: body };
      payload.id = 1;

      const { error: insErr } = await supabase.from(table).insert(payload);
      if (insErr) throw insErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }

    if (section === "topbar" || section === "footer") {
      const { error: upsertErr } = await supabase.from("cms_site_settings").upsert({
        type: section,
        data: body,
      }, { onConflict: "type" });
      if (upsertErr) throw upsertErr;
      return NextResponse.json({ success: true, message: "Data saved successfully", timestamp: Date.now() }, { headers: NO_CACHE });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE });
  }
}
