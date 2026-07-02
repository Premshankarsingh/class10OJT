import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return env;
}

const env = loadEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DATA_DIR = path.join(__dirname, "..", "app", "data");

function readJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), "utf-8"));
}

function mapKeys(obj, mapping) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(v => mapKeys(v, mapping));
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    result[mapping[k] || k] = v;
  }
  return result;
}

const UUID_TABLES = new Set(["cms_messages", "cms_site_settings"]);
const INT_ID_TABLES = new Set([
  "cms_about_history", "cms_about_today", "cms_about_committees", "cms_contact",
]);

async function clearTable(table) {
  let filter;
  if (UUID_TABLES.has(table)) {
    filter = "00000000-0000-0000-0000-000000000000";
  } else if (INT_ID_TABLES.has(table)) {
    filter = "0";
  } else {
    filter = -1;
  }
  const { error } = await supabase.from(table).delete().neq("id", filter);
  if (error && error.code !== "PGRST116") {
    console.warn(`  Warning clearing ${table}: ${error.message}`);
  }
}

async function seed() {
  console.log("Seeding Supabase CMS data...\n");

  // 1. News
  console.log("Seeding news...");
  const newsData = readJson("news.json");
  const techNews = (newsData.technical || []).map(n => ({ ...n, category: "technical" }));
  const newsGenOffset = techNews.length;
  const genNews = (newsData.general || []).map((n, i) => ({ ...n, id: n.id + newsGenOffset, category: "general" }));
  const newsItems = [...techNews, ...genNews];
  if (newsItems.length > 0) {
    await clearTable("cms_news");
    const { error } = await supabase.from("cms_news").insert(newsItems);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${newsItems.length} news articles`);
  }

  // 2. Staff
  console.log("Seeding staff...");
  const staffData = readJson("staff.json");
  const techStaff = (staffData.technicalBranch?.members || []).map(s => ({ ...s, branch: "technical" }));
  const staffGenOffset = techStaff.length;
  const genStaff = (staffData.generalBranch?.members || []).map((s, i) => ({ ...s, id: s.id + staffGenOffset, branch: "general" }));
  const staffItems = [...techStaff, ...genStaff];
  if (staffItems.length > 0) {
    await clearTable("cms_staff_members");
    const { error } = await supabase.from("cms_staff_members").insert(staffItems);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${staffItems.length} staff members`);
  }
  const { error: staffMetaErr } = await supabase.from("cms_page_meta").upsert({
    section: "staff",
    title: staffData.title || "Our Staff",
    subtitle: staffData.subtitle || "",
    extra: {
      technicalLabel: staffData.technicalBranch?.label || "Technical Branch",
      technicalColor: staffData.technicalBranch?.bgColor || "#2C235A",
      generalLabel: staffData.generalBranch?.label || "General Branch",
      generalColor: staffData.generalBranch?.bgColor || "#F43755",
    },
  }, { onConflict: "section" });
  if (staffMetaErr) console.error("  Meta error:", staffMetaErr.message);
  else console.log("  Saved staff page meta");

  // 3. Facilities
  console.log("Seeding facilities...");
  const facilitiesData = readJson("facilities.json");
  const facilities = facilitiesData.facilities || [];
  if (facilities.length > 0) {
    await clearTable("cms_facilities");
    const { error } = await supabase.from("cms_facilities").insert(facilities);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${facilities.length} facilities`);
  }
  const { error: facMetaErr } = await supabase.from("cms_page_meta").upsert({
    section: "facilities",
    title: facilitiesData.title || "Our Facilities",
    subtitle: facilitiesData.subtitle || "",
    extra: {},
  }, { onConflict: "section" });
  if (facMetaErr) console.error("  Meta error:", facMetaErr.message);
  else console.log("  Saved facilities page meta");

  // 4. Gallery
  console.log("Seeding gallery...");
  const galleryData = readJson("gallery.json");
  const categories = galleryData.categories || [];
  if (categories.length > 0) {
    await clearTable("cms_gallery_categories");
    const catRows = categories.map(({ photos, ...cat }) => cat);
    const { error: catErr } = await supabase.from("cms_gallery_categories").insert(catRows);
    if (catErr) console.error("  Error:", catErr.message);
    else console.log(`  Inserted ${catRows.length} gallery categories`);
    // Insert photos (best-effort — table may not exist)
    const photoRows = [];
    for (const cat of categories) {
      if (cat.photos) {
        cat.photos.forEach((p, idx) => {
          photoRows.push({ id: Math.floor(Date.now() + idx + Math.random() * 10000), category_id: cat.id, src: p.src, alt: p.alt || "", order: idx });
        });
      }
    }
    if (photoRows.length > 0) {
      const { error: photoErr } = await supabase.from("cms_gallery_photos").insert(photoRows);
      if (photoErr) console.log(`  Note: gallery photos not saved (${photoErr.message})`);
      else console.log(`  Inserted ${photoRows.length} gallery photos`);
    }
  }
  const { error: galMetaErr } = await supabase.from("cms_page_meta").upsert({
    section: "gallery",
    title: galleryData.title || "GALLERY",
    subtitle: galleryData.subtitle || "",
    extra: {},
  }, { onConflict: "section" });
  if (galMetaErr) console.error("  Meta error:", galMetaErr.message);
  else console.log("  Saved gallery page meta");

  // 5. Message Cards
  console.log("Seeding message cards...");
  const messageCards = readJson("message-cards.json");
  if (messageCards.length > 0) {
    await clearTable("cms_message_cards");
    const { error } = await supabase.from("cms_message_cards").insert(messageCards);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${messageCards.length} message cards`);
  }

  // 6. Exam Portal
  console.log("Seeding exam portal...");
  const examData = readJson("exam-portal.json");
  const exams = examData.exams || [];
  if (exams.length > 0) {
    await clearTable("cms_exam_portals");
    const { error } = await supabase.from("cms_exam_portals").insert(exams);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${exams.length} exam entries`);
  }
  const { error: examMetaErr } = await supabase.from("cms_page_meta").upsert({
    section: "exam-portal",
    title: examData.title || "EXAM PORTAL",
    subtitle: examData.subtitle || "",
    extra: {},
  }, { onConflict: "section" });
  if (examMetaErr) console.error("  Meta error:", examMetaErr.message);
  else console.log("  Saved exam portal page meta");

  // 7. Banner
  console.log("Seeding banners...");
  const bannerData = readJson("home-banner.json");
  const bannerItems = (bannerData.images || []).map((img, i) => ({ ...img, order: i }));
  if (bannerItems.length > 0) {
    await clearTable("cms_banners");
    const { error } = await supabase.from("cms_banners").insert(bannerItems);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${bannerItems.length} banner slides`);
  }
  const { error: bannerMetaErr } = await supabase.from("cms_page_meta").upsert({
    section: "home-banner",
    title: "",
    subtitle: "",
    extra: { scrollInterval: bannerData.scrollInterval || 3000 },
  }, { onConflict: "section" });
  if (bannerMetaErr) console.error("  Meta error:", bannerMetaErr.message);
  else console.log("  Saved banner page meta");

  // 8. Messages
  console.log("Seeding messages...");
  const messagesData = readJson("messages.json");
  const messageDocs = Object.entries(messagesData).map(([role, data]) => ({
    role,
    ...mapKeys(data, { borderColor: "border_color" }),
  }));
  if (messageDocs.length > 0) {
    await clearTable("cms_messages");
    const { error } = await supabase.from("cms_messages").insert(messageDocs);
    if (error) console.error("  Error:", error.message);
    else console.log(`  Inserted ${messageDocs.length} messages`);
  }

  // 9. About History
  console.log("Seeding about history...");
  await clearTable("cms_about_history");
  const historyData = readJson("about-history.json");
  const { error: histErr } = await supabase.from("cms_about_history").insert({
    id: 1,
    ...mapKeys(historyData, {
      journeyTitle: "journey_title",
      journeyText: "journey_text",
      gurukulPrincipals: "gurukul_principals",
      modernPrincipals: "modern_principals",
    }),
  });
  if (histErr) console.error("  Error:", histErr.message);
  else console.log("  Inserted about history");

  // 10. About Today
  console.log("Seeding about today...");
  await clearTable("cms_about_today");
  const todayData = readJson("about-today.json");
  const { error: todayErr } = await supabase.from("cms_about_today").insert({ id: 1, ...todayData });
  if (todayErr) console.error("  Error:", todayErr.message);
  else console.log("  Inserted about today");

  // 11. About Committees
  console.log("Seeding about committees...");
  await clearTable("cms_about_committees");
  const committeesData = readJson("about-committees.json");
  const { error: comErr } = await supabase.from("cms_about_committees").insert({ id: 1, committees: committeesData });
  if (comErr) console.error("  Error:", comErr.message);
  else console.log("  Inserted about committees");

  // 12. Contact
  console.log("Seeding contact...");
  await clearTable("cms_contact");
  const contactData = readJson("contact.json");
  const { title: _t, subtitle: _s, ...contactClean } = mapKeys(contactData, {
    staffMembers: "staff_members",
    contactInfo: "contact_info",
  });
  const { error: contactErr } = await supabase.from("cms_contact").insert({
    id: 1,
    ...contactClean,
  });
  if (contactErr) console.error("  Error:", contactErr.message);
  else console.log("  Inserted contact");

  // 13. Site Settings (topbar)
  console.log("Seeding topbar...");
  const topbarData = readJson("topbar.json");
  const { error: topErr } = await supabase.from("cms_site_settings").upsert({
    type: "topbar",
    data: topbarData,
  }, { onConflict: "type" });
  if (topErr) console.error("  Error:", topErr.message);
  else console.log("  Inserted topbar settings");

  // 14. Site Settings (footer)
  console.log("Seeding footer...");
  const footerData = readJson("footer.json");
  const { error: footErr } = await supabase.from("cms_site_settings").upsert({
    type: "footer",
    data: footerData,
  }, { onConflict: "type" });
  if (footErr) console.error("  Error:", footErr.message);
  else console.log("  Inserted footer settings");

  // 15. Admin user
  console.log("\nChecking admin user...");
  const { data: existingAdmin } = await supabase.from("users").select("id").eq("email", "admin@school.com").maybeSingle();
  if (!existingAdmin) {
    const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
      email: "admin@school.com",
      password: "Admin@1234",
      email_confirm: true,
      user_metadata: { full_name: "Admin User" },
    });
    if (authErr) {
      console.error("  Error creating admin auth user:", authErr.message);
    } else {
      const { error: dbErr } = await supabase.from("users").insert({
        id: authUser.user.id,
        full_name: "Admin User",
        email: "admin@school.com",
        role: "admin",
        status: "approved",
      });
      if (dbErr) {
        console.error("  Error inserting admin user:", dbErr.message);
      } else {
        console.log("  Created admin user (admin@school.com / Admin@1234)");
      }
    }
  } else {
    console.log("  Admin user already exists");
  }

  console.log("\nSeed complete!");
}

seed().catch(console.error);
