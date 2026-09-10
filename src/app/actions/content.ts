"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canPublishClubContent, canUseGallery } from "@/lib/auth/permissions";
import { getSession } from "@/lib/auth/session";
import {
  addMatch,
  addNews,
  addPhoto,
  deleteMatchRecord,
  deleteNewsRecord,
  deletePhotoRecord,
} from "@/lib/content/store";
import { GALLERY_TAGS, type ContentFormState, type GalleryTag } from "@/lib/content/types";
import { createClubClient } from "@/utils/supabase/club";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function readString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function refreshContent() {
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/matches");
}

export async function uploadPhotoAction(_prev: ContentFormState, formData: FormData): Promise<ContentFormState> {
  const session = await getSession();
  if (!canUseGallery(session) || !session) {
    return { error: "로그인 후 사진을 올릴 수 있습니다." };
  }

  const title = readString(formData, "title");
  const tag = readString(formData, "tag") as GalleryTag;
  const file = formData.get("photo");

  if (title.length < 1 || title.length > 80) {
    return { error: "제목은 1~80자로 입력해 주세요." };
  }
  if (!GALLERY_TAGS.includes(tag)) {
    return { error: "사진 분류를 선택해 주세요." };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { error: "사진 파일을 선택해 주세요." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "사진은 5MB 이하만 올릴 수 있습니다." };
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return { error: "JPG, PNG, WEBP, GIF 파일만 올릴 수 있습니다." };
  }

  const storagePath = `${session.id}/${crypto.randomUUID()}.${ext}`;
  const supabase = createClubClient();
  const { error: uploadError } = await supabase.storage.from("gallery").upload(storagePath, file, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return { error: "사진 업로드에 실패했습니다." };
  }

  try {
    await addPhoto({ memberId: session.id, title, tag, storagePath });
  } catch (error) {
    await supabase.storage.from("gallery").remove([storagePath]);
    return { error: error instanceof Error ? error.message : "사진 등록에 실패했습니다." };
  }

  refreshContent();
  redirect("/gallery");
}

export async function deletePhotoAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) return;

  const photoId = Number(readString(formData, "photoId"));
  if (!Number.isInteger(photoId)) return;

  const deleted = await deletePhotoRecord(session.id, photoId);
  const supabase = createClubClient();
  await supabase.storage.from("gallery").remove([deleted.storagePath]);
  refreshContent();
}

export async function createMatchAction(_prev: ContentFormState, formData: FormData): Promise<ContentFormState> {
  const session = await getSession();
  if (!canPublishClubContent(session) || !session) {
    return { error: "매니저 이상만 친선 경기를 등록할 수 있습니다." };
  }

  const opponent = readString(formData, "opponent");
  const venue = readString(formData, "venue");
  const note = readString(formData, "note");
  const kickoffLocal = readString(formData, "kickoffAt");

  if (!opponent || !venue || !kickoffLocal) {
    return { error: "상대, 일시, 장소를 모두 입력해 주세요." };
  }

  const kickoffAt = new Date(kickoffLocal);
  if (Number.isNaN(kickoffAt.getTime())) {
    return { error: "경기 일시가 올바르지 않습니다." };
  }

  try {
    await addMatch({
      memberId: session.id,
      opponent,
      kickoffAt: kickoffAt.toISOString(),
      venue,
      note,
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "등록에 실패했습니다." };
  }

  refreshContent();
  redirect("/matches");
}

export async function deleteMatchAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session || session.role !== "master") return;

  const matchId = Number(readString(formData, "matchId"));
  if (!Number.isInteger(matchId)) return;

  await deleteMatchRecord(session.id, matchId);
  refreshContent();
}

export async function createNewsAction(_prev: ContentFormState, formData: FormData): Promise<ContentFormState> {
  const session = await getSession();
  if (!canPublishClubContent(session) || !session) {
    return { error: "매니저 이상만 소식을 등록할 수 있습니다." };
  }

  const title = readString(formData, "title");
  const body = readString(formData, "body");

  if (title.length < 1 || title.length > 80) {
    return { error: "제목은 1~80자로 입력해 주세요." };
  }
  if (body.length < 1 || body.length > 2000) {
    return { error: "본문은 1~2000자로 입력해 주세요." };
  }

  try {
    await addNews({ memberId: session.id, title, body });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "등록에 실패했습니다." };
  }

  refreshContent();
  redirect("/");
}

export async function deleteNewsAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session || session.role !== "master") return;

  const newsId = Number(readString(formData, "newsId"));
  if (!Number.isInteger(newsId)) return;

  await deleteNewsRecord(session.id, newsId);
  refreshContent();
}

export async function voteAttendanceAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) return;

  const matchId = Number(readString(formData, "matchId"));
  const status = readString(formData, "status") as import("@/lib/content/types").AttendanceStatus;

  if (!Number.isInteger(matchId) || !["attending", "absent", "pending"].includes(status)) {
    return;
  }

  try {
    const { voteMatchAttendance } = await import("@/lib/content/store");
    await voteMatchAttendance(session.id, matchId, status);
  } catch (error) {
    console.error("Failed to vote:", error);
  }

  refreshContent();
}
