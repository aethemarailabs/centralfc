import { createClubClient, getClubAppSecret } from "@/utils/supabase/club";
import type { FriendlyMatch, GalleryPhoto, GalleryTag, NewsPost } from "./types";

function rpcError(error: { message?: string } | null, fallback: string): never {
  throw new Error(error?.message || fallback);
}

export async function listPhotos(): Promise<GalleryPhoto[]> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_list_photos");
  if (error) rpcError(error, "갤러리를 불러오지 못했습니다.");
  return (data as GalleryPhoto[]) ?? [];
}

export async function addPhoto(input: {
  memberId: number;
  title: string;
  tag: GalleryTag;
  storagePath: string;
}): Promise<GalleryPhoto> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_add_photo", {
    p_secret: getClubAppSecret(),
    p_member_id: input.memberId,
    p_title: input.title,
    p_tag: input.tag,
    p_storage_path: input.storagePath,
  });
  if (error) rpcError(error, "사진 등록에 실패했습니다.");
  return data as GalleryPhoto;
}

export async function deletePhotoRecord(memberId: number, photoId: number): Promise<{ id: number; storagePath: string }> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_delete_photo", {
    p_secret: getClubAppSecret(),
    p_member_id: memberId,
    p_photo_id: photoId,
  });
  if (error) rpcError(error, "사진 삭제에 실패했습니다.");
  return data as { id: number; storagePath: string };
}

export async function listMatches(): Promise<FriendlyMatch[]> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_list_matches");
  if (error) rpcError(error, "경기 일정을 불러오지 못했습니다.");
  return (data as FriendlyMatch[]) ?? [];
}

export async function addMatch(input: {
  memberId: number;
  opponent: string;
  kickoffAt: string;
  venue: string;
  note: string;
}): Promise<FriendlyMatch> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_add_match", {
    p_secret: getClubAppSecret(),
    p_member_id: input.memberId,
    p_opponent: input.opponent,
    p_kickoff_at: input.kickoffAt,
    p_venue: input.venue,
    p_note: input.note,
  });
  if (error) rpcError(error, "친선 경기 등록에 실패했습니다.");
  return data as FriendlyMatch;
}

export async function deleteMatchRecord(memberId: number, matchId: number): Promise<void> {
  const supabase = createClubClient();
  const { error } = await supabase.rpc("club_delete_match", {
    p_secret: getClubAppSecret(),
    p_member_id: memberId,
    p_match_id: matchId,
  });
  if (error) rpcError(error, "경기 삭제에 실패했습니다.");
}

export async function listNews(): Promise<NewsPost[]> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_list_news");
  if (error) rpcError(error, "소식을 불러오지 못했습니다.");
  return (data as NewsPost[]) ?? [];
}

export async function addNews(input: { memberId: number; title: string; body: string }): Promise<NewsPost> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_add_news", {
    p_secret: getClubAppSecret(),
    p_member_id: input.memberId,
    p_title: input.title,
    p_body: input.body,
  });
  if (error) rpcError(error, "소식 등록에 실패했습니다.");
  return data as NewsPost;
}

export async function deleteNewsRecord(memberId: number, newsId: number): Promise<void> {
  const supabase = createClubClient();
  const { error } = await supabase.rpc("club_delete_news", {
    p_secret: getClubAppSecret(),
    p_member_id: memberId,
    p_news_id: newsId,
  });
  if (error) rpcError(error, "소식 삭제에 실패했습니다.");
}
