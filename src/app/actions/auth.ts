"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { MASTER_USERNAME, MANAGER_TITLES, parsePosition } from "@/lib/auth/constants";
import { verifyPassword } from "@/lib/auth/password";
import { clearSession, createSession, getSession, toSessionUser } from "@/lib/auth/session";
import { removeMemberPhoto, removeMemberPhotos, uploadMemberPhoto } from "@/lib/auth/avatar";
import { createPlayer, deleteOwnMember, getMemberByUsername, updateMemberGrade, updateOwnProfile } from "@/lib/auth/store";
import type { AuthFormState, Grade, GradeFormState, Position } from "@/lib/auth/types";

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{4,20}$/;

function readString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function readOptionalPhoto(formData: FormData): File | null {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return null;
  return file;
}

function parseOptionalPosition(raw: string, label: string): { value: Position | null; error?: string } {
  if (raw === "") return { value: null };
  const value = parsePosition(raw);
  if (!value) return { value: null, error: `${label}을 다시 선택해 주세요.` };
  return { value };
}

function validatePlayerFields(formData: FormData, values: Record<string, string>):
  | {
      fieldErrors: Record<string, string>;
      error?: string;
    }
  | {
      displayName: string;
      jerseyNumber: number;
      primaryPosition: Position;
      secondaryPosition: Position | null;
      secondaryPosition2: Position | null;
      heightCm: number;
      weightKg: number;
    } {
  const displayName = values.displayName;
  const jerseyNumber = Number(values.jerseyNumber);
  const heightCm = Number(values.heightCm);
  const weightKg = Number(values.weightKg);
  const primaryPosition = parsePosition(values.primaryPosition);
  const secondary = parseOptionalPosition(values.secondaryPosition, "부포지션1");
  const secondary2 = parseOptionalPosition(values.secondaryPosition2, "부포지션2");

  const fieldErrors: Record<string, string> = {};

  if (!displayName) {
    fieldErrors.displayName = "이름을 입력해 주세요.";
  }
  if (!Number.isInteger(jerseyNumber) || jerseyNumber < 1 || jerseyNumber > 99) {
    fieldErrors.jerseyNumber = "등번호는 1~99 사이 숫자로 입력해 주세요.";
  }
  if (!primaryPosition) {
    fieldErrors.primaryPosition = "주포지션을 선택해 주세요.";
  }
  if (secondary.error) fieldErrors.secondaryPosition = secondary.error;
  if (secondary2.error) fieldErrors.secondaryPosition2 = secondary2.error;

  const picked = [primaryPosition, secondary.value, secondary2.value].filter(Boolean);
  if (new Set(picked).size !== picked.length) {
    fieldErrors.primaryPosition = "주포지션과 부포지션은 서로 다르게 선택해 주세요.";
  }
  if (!Number.isInteger(heightCm) || heightCm < 100 || heightCm > 230) {
    fieldErrors.heightCm = "키는 100~230cm 사이로 입력해 주세요.";
  }
  if (!Number.isInteger(weightKg) || weightKg < 30 || weightKg > 180) {
    fieldErrors.weightKg = "몸무게는 30~180kg 사이로 입력해 주세요.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  return {
    displayName,
    jerseyNumber,
    primaryPosition: primaryPosition as Position,
    secondaryPosition: secondary.value,
    secondaryPosition2: secondary2.value,
    heightCm,
    weightKg,
  };
}

export async function loginAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const username = readString(formData, "username").toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "아이디와 비밀번호를 입력해 주세요." };
  }

  const member = await getMemberByUsername(username);
  if (!member || !(await verifyPassword(password, member.passwordHash))) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  await createSession(toSessionUser(member));
  redirect(member.role === "master" ? "/admin" : "/");
}

export async function signupAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const username = readString(formData, "username").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  
  const values = {
    username,
    displayName: readString(formData, "displayName"),
    jerseyNumber: readString(formData, "jerseyNumber"),
    heightCm: readString(formData, "heightCm"),
    weightKg: readString(formData, "weightKg"),
    primaryPosition: readString(formData, "primaryPosition"),
    secondaryPosition: readString(formData, "secondaryPosition"),
    secondaryPosition2: readString(formData, "secondaryPosition2"),
  };

  const fieldErrors: Record<string, string> = {};

  if (!USERNAME_PATTERN.test(username)) {
    fieldErrors.username = "아이디는 영문, 숫자, _ 를 사용해 4~20자로 입력해 주세요.";
  }
  if (username === MASTER_USERNAME) {
    fieldErrors.username = "사용할 수 없는 아이디입니다.";
  }
  if (password.length < 4) {
    fieldErrors.password = "비밀번호는 4자 이상이어야 합니다.";
  }
  if (password !== passwordConfirm) {
    fieldErrors.passwordConfirm = "비밀번호 확인이 일치하지 않습니다.";
  }

  const fields = validatePlayerFields(formData, values);
  if ("fieldErrors" in fields) {
    Object.assign(fieldErrors, fields.fieldErrors);
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values, error: "입력된 정보를 확인해 주세요." };
  }

  const photo = readOptionalPhoto(formData);
  let photoPath: string | null = null;
  try {
    if (photo) {
      photoPath = await uploadMemberPhoto(photo, username);
    }

    const member = await createPlayer({
      username,
      password,
      ...(fields as any),
      photoPath,
    });
    await createSession(toSessionUser({ ...member, username: member.username }));
  } catch (error) {
    if (photoPath) {
      await removeMemberPhoto(photoPath);
    }
    return { error: error instanceof Error ? error.message : "회원가입에 실패했습니다.", values };
  }

  revalidatePath("/squad");
  revalidatePath("/about");
  revalidatePath("/admin");
  redirect("/");
}

export async function updateProfileAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const session = await getSession();
  if (!session) {
    return { error: "로그인 후 정보를 수정할 수 있습니다." };
  }

  const values = {
    displayName: readString(formData, "displayName"),
    jerseyNumber: readString(formData, "jerseyNumber"),
    heightCm: readString(formData, "heightCm"),
    weightKg: readString(formData, "weightKg"),
    primaryPosition: readString(formData, "primaryPosition"),
    secondaryPosition: readString(formData, "secondaryPosition"),
    secondaryPosition2: readString(formData, "secondaryPosition2"),
  };

  const fields = validatePlayerFields(formData, values);
  if ("fieldErrors" in fields) {
    // Collect all field errors into a single string or just return the first one
    const errorMsg = Object.values(fields.fieldErrors)[0] || "입력된 정보를 확인해 주세요.";
    return { error: errorMsg, fieldErrors: fields.fieldErrors, values };
  }

  const photo = readOptionalPhoto(formData);
  let photoPath: string | null = null;

  try {
    if (photo) {
      photoPath = await uploadMemberPhoto(photo, String(session.id));
    }

    const updated = await updateOwnProfile({
      memberId: session.id,
      ...fields,
      photoPath,
    });

    await createSession(toSessionUser({ ...session, displayName: updated.displayName }));
  } catch (error) {
    if (photoPath) {
      await removeMemberPhoto(photoPath);
    }
    return { error: error instanceof Error ? error.message : "선수 정보 수정에 실패했습니다." };
  }

  revalidatePath("/squad");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/profile");
  return { success: "선수 정보를 저장했습니다." };
}

export async function withdrawAction(_prev: AuthFormState, _formData: FormData): Promise<AuthFormState> {
  const session = await getSession();
  if (!session) {
    return { error: "로그인 후 탈퇴할 수 있습니다." };
  }
  if (session.role === "master") {
    return { error: "운영자 계정은 탈퇴할 수 없습니다." };
  }

  try {
    const photoPaths = await deleteOwnMember(session.id);
    await removeMemberPhotos(photoPaths);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "회원 탈퇴에 실패했습니다." };
  }

  await clearSession();
  revalidatePath("/");
  revalidatePath("/squad");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/gallery");
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function updateGradeAction(_prev: GradeFormState, formData: FormData): Promise<GradeFormState> {
  const session = await getSession();
  if (!session || session.role !== "master") {
    return { error: "운영자만 등급을 변경할 수 있습니다." };
  }

  const memberId = Number(readString(formData, "memberId"));
  const gradeRaw = readString(formData, "grade");
  const grade: Grade | null =
    gradeRaw === "player" || MANAGER_TITLES.includes(gradeRaw as (typeof MANAGER_TITLES)[number])
      ? (gradeRaw as Grade)
      : null;

  if (!Number.isInteger(memberId) || !grade) {
    return { error: "등급 정보가 올바르지 않습니다." };
  }

  try {
    await updateMemberGrade(memberId, grade);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "등급 변경에 실패했습니다." };
  }

  revalidatePath("/admin");
  revalidatePath("/squad");
  revalidatePath("/about");
  return {};
}
