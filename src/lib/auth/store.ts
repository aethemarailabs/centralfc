import { createClubClient, getClubAppSecret } from "@/utils/supabase/club";
import { parsePosition } from "./constants";
import { hashPassword } from "./password";
import type { Grade, Member, Position, PublicMember } from "./types";

type MemberRow = {
  id: number;
  username: string;
  displayName: string;
  role: Member["role"];
  managerTitle: Member["managerTitle"];
  jerseyNumber: number | null;
  primaryPosition: string | null;
  secondaryPosition: string | null;
  secondaryPosition2?: string | null;
  heightCm: number | null;
  weightKg: number | null;
  photoPath?: string | null;
  createdAt: string;
  passwordHash?: string;
};

function rpcError(error: { message?: string } | null, fallback: string): never {
  throw new Error(error?.message || fallback);
}

function toMember(row: MemberRow): Member {
  return {
    id: row.id,
    username: row.username,
    passwordHash: row.passwordHash ?? "",
    displayName: row.displayName,
    role: row.role,
    managerTitle: row.managerTitle,
    jerseyNumber: row.jerseyNumber,
    primaryPosition: parsePosition(row.primaryPosition ?? ""),
    secondaryPosition: parsePosition(row.secondaryPosition ?? ""),
    secondaryPosition2: parsePosition(row.secondaryPosition2 ?? ""),
    heightCm: row.heightCm,
    weightKg: row.weightKg,
    photoPath: row.photoPath ?? null,
    createdAt: row.createdAt,
  };
}

function toPublic(member: Member): PublicMember {
  const { passwordHash: _passwordHash, ...rest } = member;
  return rest;
}

export async function getMemberByUsername(username: string): Promise<Member | null> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_get_auth_member", {
    p_secret: getClubAppSecret(),
    p_username: username,
  });

  if (error) rpcError(error, "회원 조회에 실패했습니다.");
  if (!data) return null;
  return toMember(data as MemberRow);
}

export async function createPlayer(input: {
  username: string;
  password: string;
  displayName: string;
  jerseyNumber: number;
  primaryPosition: Position;
  secondaryPosition: Position | null;
  secondaryPosition2: Position | null;
  heightCm: number;
  weightKg: number;
  photoPath: string | null;
}): Promise<PublicMember> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_register_player", {
    p_username: input.username.toLowerCase(),
    p_password_hash: await hashPassword(input.password),
    p_display_name: input.displayName,
    p_jersey_number: input.jerseyNumber,
    p_primary_position: input.primaryPosition,
    p_secondary_position: input.secondaryPosition,
    p_secondary_position_2: input.secondaryPosition2,
    p_height_cm: input.heightCm,
    p_weight_kg: input.weightKg,
    p_photo_path: input.photoPath,
  });

  if (error) {
    if (error.message.includes("이미 사용 중인 아이디")) {
      throw new Error("이미 사용 중인 아이디입니다.");
    }
    rpcError(error, "회원가입에 실패했습니다.");
  }

  return toPublic(toMember(data as MemberRow));
}

export async function updateOwnProfile(input: {
  memberId: number;
  displayName: string;
  jerseyNumber: number;
  primaryPosition: Position;
  secondaryPosition: Position | null;
  secondaryPosition2: Position | null;
  heightCm: number;
  weightKg: number;
  photoPath: string | null;
}): Promise<PublicMember> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_update_own_profile", {
    p_secret: getClubAppSecret(),
    p_member_id: input.memberId,
    p_display_name: input.displayName,
    p_jersey_number: input.jerseyNumber,
    p_primary_position: input.primaryPosition,
    p_secondary_position: input.secondaryPosition,
    p_secondary_position_2: input.secondaryPosition2,
    p_height_cm: input.heightCm,
    p_weight_kg: input.weightKg,
    p_photo_path: input.photoPath,
  });

  if (error) rpcError(error, "선수 정보 수정에 실패했습니다.");
  return toPublic(toMember(data as MemberRow));
}

export async function listManagedMembers(): Promise<PublicMember[]> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_list_managed", {
    p_secret: getClubAppSecret(),
  });

  if (error) rpcError(error, "회원 목록을 불러오지 못했습니다.");
  return ((data as MemberRow[]) ?? []).map((row) => toPublic(toMember(row)));
}

export async function listRoster(): Promise<PublicMember[]> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_list_roster");

  if (error) rpcError(error, "선수단을 불러오지 못했습니다.");
  return ((data as MemberRow[]) ?? []).map((row) => toPublic(toMember(row)));
}

export async function updateMemberGrade(memberId: number, grade: Grade): Promise<PublicMember> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_update_member_grade", {
    p_secret: getClubAppSecret(),
    p_member_id: memberId,
    p_grade: grade,
  });

  if (error) rpcError(error, "등급 변경에 실패했습니다.");
  return toPublic(toMember(data as MemberRow));
}

export async function deleteOwnMember(memberId: number): Promise<string[]> {
  const supabase = createClubClient();
  const { data, error } = await supabase.rpc("club_delete_own_member", {
    p_secret: getClubAppSecret(),
    p_member_id: memberId,
  });

  if (error) rpcError(error, "회원 탈퇴에 실패했습니다.");
  const paths = (data as { photoPaths?: string[] } | null)?.photoPaths ?? [];
  return paths.filter((path) => typeof path === "string" && path.length > 0);
}
