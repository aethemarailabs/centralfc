import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import type { SessionUser } from "./types";

const COOKIE_NAME = "centralfc_session";
const MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    managerTitle: user.managerTitle,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const id = Number(payload.sub);
    if (!id) return null;

    return {
      id,
      username: String(payload.username ?? ""),
      displayName: String(payload.displayName ?? ""),
      role: payload.role === "master" || payload.role === "manager" ? payload.role : "player",
      managerTitle:
        payload.managerTitle === "회장" ||
        payload.managerTitle === "감독" ||
        payload.managerTitle === "총무" ||
        payload.managerTitle === "코치"
          ? payload.managerTitle
          : null,
    };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function toSessionUser(user: SessionUser): SessionUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    managerTitle: user.managerTitle,
  };
}
