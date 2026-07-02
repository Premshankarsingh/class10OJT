import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function createFetchWithTimeout(timeoutMs = 2500) {
  return (url, options) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    return fetch(url, { ...options, signal: controller.signal })
      .finally(() => clearTimeout(timeoutId))
  }
}

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
      fetch: createFetchWithTimeout(8000),
    }
  )
}

export async function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll() { return [] },
        setAll() {},
      },
      auth: { autoRefreshToken: false, persistSession: false },
      fetch: createFetchWithTimeout(8000),
    }
  )
}