import { FIFA_POSITION_VALUES, type Grade, type ManagerTitle, type Position, type PositionLine } from "./types";

export type PositionOption = {
  value: Position;
  label: string;
  name: string;
  line: PositionLine;
};

export const POSITIONS: PositionOption[] = [
  { value: "GK", label: "GK 골키퍼", name: "골키퍼", line: "GK" },
  { value: "SW", label: "SW 스위퍼", name: "스위퍼", line: "DF" },
  { value: "CB", label: "CB 센터백", name: "센터백", line: "DF" },
  { value: "LB", label: "LB 왼쪽 풀백", name: "왼쪽 풀백", line: "DF" },
  { value: "RB", label: "RB 오른쪽 풀백", name: "오른쪽 풀백", line: "DF" },
  { value: "DMF", label: "DMF 수비형 미드필더", name: "수비형 미드필더", line: "MF" },
  { value: "CMF", label: "CMF 중앙 미드필더", name: "중앙 미드필더", line: "MF" },
  { value: "AMF", label: "AMF 공격형 미드필더", name: "공격형 미드필더", line: "MF" },
  { value: "LMF", label: "LMF 왼쪽 미드필더", name: "왼쪽 미드필더", line: "MF" },
  { value: "RMF", label: "RMF 오른쪽 미드필더", name: "오른쪽 미드필더", line: "MF" },
  { value: "LWF", label: "LWF 왼쪽 윙포워드", name: "왼쪽 윙포워드", line: "FW" },
  { value: "RWF", label: "RWF 오른쪽 윙포워드", name: "오른쪽 윙포워드", line: "FW" },
  { value: "SS", label: "SS 세컨드 스트라이커", name: "세컨드 스트라이커", line: "FW" },
  { value: "CF", label: "CF 센터 포워드", name: "센터 포워드", line: "FW" },
];

export const POSITION_GROUPS: { line: PositionLine; label: string; options: PositionOption[] }[] = [
  { line: "GK", label: "골키퍼", options: POSITIONS.filter((item) => item.line === "GK") },
  { line: "DF", label: "수비", options: POSITIONS.filter((item) => item.line === "DF") },
  { line: "MF", label: "미드필더", options: POSITIONS.filter((item) => item.line === "MF") },
  { line: "FW", label: "공격", options: POSITIONS.filter((item) => item.line === "FW") },
];

export const MANAGER_TITLES: ManagerTitle[] = ["회장", "감독", "코치", "총무"];

export const GRADES: { value: Grade; label: string }[] = [
  { value: "player", label: "선수" },
  ...MANAGER_TITLES.map((title) => ({ value: title, label: title })),
];

export const MASTER_USERNAME = "admin";

export function isPosition(value: string): value is Position {
  return (FIFA_POSITION_VALUES as readonly string[]).includes(value);
}

export function parsePosition(value: string): Position | null {
  return isPosition(value) ? value : null;
}

export function positionLabel(position: Position | null): string {
  if (!position) return "-";
  return POSITIONS.find((item) => item.value === position)?.label ?? position;
}

export function positionName(position: Position | null): string {
  if (!position) return "-";
  return POSITIONS.find((item) => item.value === position)?.name ?? position;
}

export function positionLine(position: Position | null): PositionLine | null {
  if (!position) return null;
  return POSITIONS.find((item) => item.value === position)?.line ?? null;
}

export function gradeLabel(role: string, managerTitle: string | null): string {
  if (role === "master") return "운영자";
  if (role === "manager" && managerTitle) return managerTitle;
  return "선수";
}
