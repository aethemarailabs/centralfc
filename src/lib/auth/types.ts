export type MemberRole = "master" | "manager" | "player";

export type ManagerTitle = "회장" | "감독" | "총무" | "코치";

export const FIFA_POSITION_VALUES = [
  "GK",
  "SW",
  "CB",
  "LB",
  "RB",
  "DMF",
  "CMF",
  "AMF",
  "LMF",
  "RMF",
  "LWF",
  "RWF",
  "SS",
  "CF",
] as const;

export type Position = (typeof FIFA_POSITION_VALUES)[number];

export type PositionLine = "GK" | "DF" | "MF" | "FW";

export type Grade = "player" | ManagerTitle;

export type Member = {
  id: number;
  username: string;
  passwordHash: string;
  displayName: string;
  role: MemberRole;
  managerTitle: ManagerTitle | null;
  jerseyNumber: number | null;
  primaryPosition: Position | null;
  secondaryPosition: Position | null;
  secondaryPosition2: Position | null;
  heightCm: number | null;
  weightKg: number | null;
  photoPath: string | null;
  createdAt: string;
};

export type PublicMember = Omit<Member, "passwordHash">;

export type SessionUser = {
  id: number;
  username: string;
  displayName: string;
  role: MemberRole;
  managerTitle: ManagerTitle | null;
};

export type AuthFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  success?: string;
};

export type GradeFormState = {
  error?: string;
};
