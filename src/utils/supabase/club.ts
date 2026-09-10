import { createClient } from "@supabase/supabase-js";

export function createClubClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase 환경 변수가 없습니다.");
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getClubAppSecret() {
  const secret = process.env.CLUB_APP_SECRET;
  if (!secret) {
    throw new Error("CLUB_APP_SECRET is not set");
  }
  return secret;
}
