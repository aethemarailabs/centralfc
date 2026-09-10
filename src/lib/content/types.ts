export const GALLERY_TAGS = ["단체 사진", "경기 스케치", "행사 및 회식"] as const;

export type GalleryTag = (typeof GALLERY_TAGS)[number];

export type GalleryPhoto = {
  id: number;
  memberId: number;
  authorName: string;
  title: string;
  tag: GalleryTag;
  storagePath: string;
  createdAt: string;
};

export type FriendlyMatch = {
  id: number;
  createdBy: number;
  opponent: string;
  kickoffAt: string;
  venue: string;
  note: string | null;
  createdAt: string;
};

export type NewsPost = {
  id: number;
  createdBy: number;
  authorName: string;
  title: string;
  body: string;
  createdAt: string;
};

export type ContentFormState = {
  error?: string;
};

export type AttendanceStatus = "attending" | "absent" | "pending";

export type MatchAttendance = {
  matchId: number;
  memberId: number;
  status: AttendanceStatus;
  updatedAt: string;
  displayName: string;
  photoPath: string | null;
  primaryPosition: string;
};
