import { createClubClient } from "@/utils/supabase/club";
import { galleryPublicUrl } from "@/lib/content/format";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function avatarPublicUrl(path: string | null | undefined): string {
  if (!path) return "";
  return galleryPublicUrl(path);
}

export async function uploadMemberPhoto(file: File, folder: string): Promise<string> {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("사진은 5MB 이하만 올릴 수 있습니다.");
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new Error("JPG, PNG, WEBP, GIF 파일만 올릴 수 있습니다.");
  }

  const storagePath = `avatars/${folder}/${crypto.randomUUID()}.${ext}`;
  const supabase = createClubClient();
  const { error } = await supabase.storage.from("gallery").upload(storagePath, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error("사진 업로드에 실패했습니다.");
  }

  return storagePath;
}

export async function removeMemberPhoto(path: string | null | undefined): Promise<void> {
  if (!path) return;
  await removeMemberPhotos([path]);
}

export async function removeMemberPhotos(paths: string[]): Promise<void> {
  const unique = [...new Set(paths.filter(Boolean))];
  if (unique.length === 0) return;
  const supabase = createClubClient();
  await supabase.storage.from("gallery").remove(unique);
}
