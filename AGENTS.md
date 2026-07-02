# Project: Saraswati School CMS (Next.js + Supabase)

## Architecture
- **Framework**: Next.js 16 App Router
- **Auth & DB**: Supabase (auth + PostgreSQL)
- **UI**: MUI (Material UI), SCSS (Gilroy font)
- **CMS Admin**: `app/cms/` (12 sections), dynamic API route `app/api/cms/[section]/route.js`

## Supabase Setup
- **Tables**: 15+ tables (`supabase-schema.sql`) — `users`, `cms_news`, `cms_staff_members`, `cms_facilities`, `cms_gallery_categories`, `cms_gallery_photos`, `cms_message_cards`, `cms_exam_portals`, `cms_banners`, `cms_messages`, `cms_about_history`, `cms_about_today`, `cms_about_committees`, `cms_contact`, `cms_site_settings`, `cms_page_meta`
- **RLS**: Public read + authenticated write on all CMS tables; user-scoped on `users`
- **JSON fallback**: `app/data/*.json` files when Supabase is down

## CMS Fully Done
- All 12 CMS sections: news, staff, facilities, gallery, home, messages, about (3 tabs), contact, exam-portal, topbar-footer, users, dashboard
- Image upload (`/api/cms/upload`) with drag-and-drop
- Auth: login, signup (pending approval), forgot/reset password
- Admin dashboard: approve/reject pending users
- CMS users: add/remove editor accounts
- Topbar & footer on public site: live from CMS data
- Homepage: banner slider, message cards, news section (all live from CMS)

## CMS Data Flow (CRUD)
- Admin saves form -> `POST /api/cms/[section]` -> Supabase (delete-all + insert strategy, or upsert for messages/settings)
- Public pages -> `GET /api/cms/[section]` -> Supabase (with JSON fallback)

## What's Missing / Partially Done
1. **Public pages — DONE (connected to CMS):**
   - `app/(home)/HistoryPage.jsx` — fetches from `/api/cms/about-history`
   - `app/(home)/SchoolToday.jsx` — fetches from `/api/cms/about-today`
   - `app/(home)/CommitteesPage.jsx` — fetches from `/api/cms/about-committees`
   - `app/(home)/Examportal.jsx` — fetches from `/api/cms/exam-portal`
   - `app/(home)/Gallery.jsx` — fetches from `/api/cms/gallery`
   - `app/(home)/ContactPage.jsx` — fetches from `/api/cms/contact`
   - Currently NOT rendered on main homepage (awaiting route/page creation)
2. **Still hardcoded/placeholder** (not connected to CMS):
   - `app/(static-page)/about-us/page.jsx` — lorem ipsum
   - `app/(static-page)/faqs/page.jsx` — lorem ipsum
   - `app/(static-page)/privacy-policy/page.jsx` — lorem ipsum
   - `app/(static-page)/terms-condition/page.jsx` — lorem ipsum
   - `app/(static-page)/notification/page.jsx` — hardcoded

2. **Missing public pages** (routes referenced but no page exists):
   - `/news` (from "View More News" button)
   - `/staff` (sidebar link exists)
   - `/facilities` (sidebar link exists)
   - `/message/:id` (detail pages)
   - `/gallery/*` (category detail pages)
   - `/exam-portal/*` (exam detail pages)

3. **CMS Users save bug**: "Save" button sends `action: "save"` but API only handles `addEditor`/`removeEditor`

4. **Dead/legacy files**:
   - `app/auth/otp/index.jsx` — uses old `next/router`, wrong imports
   - `app/auth/Header/header.tsx` — empty file
   - `src/context/AppContext.js` / `ContextWrapper.js` — dummy/boilerplate only
   - `src/data/index.jsx` — demo data, unused

## Key Commands
- `npm run dev` — development server
- Check `package.json` for build/lint commands
