import type { SessionUser } from "./types";

export function canUseGallery(session: SessionUser | null): boolean {
  return session !== null;
}

export function canPublishClubContent(session: SessionUser | null): boolean {
  return session?.role === "manager" || session?.role === "master";
}

export function canModerateAll(session: SessionUser | null): boolean {
  return session?.role === "master";
}

export function canDeletePhoto(session: SessionUser | null, memberId: number): boolean {
  if (!session) return false;
  return session.role === "master" || session.id === memberId;
}
