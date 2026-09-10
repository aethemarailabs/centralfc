"use client";

import { useActionState } from "react";
import { updateGradeAction } from "@/app/actions/auth";
import { GRADES, gradeLabel, positionLabel } from "@/lib/auth/constants";
import type { GradeFormState, PublicMember } from "@/lib/auth/types";

const initialState: GradeFormState = {};

function GradeRow({ member }: { member: PublicMember }) {
  const [state, formAction, pending] = useActionState(updateGradeAction, initialState);
  const currentGrade = member.role === "manager" && member.managerTitle ? member.managerTitle : "player";

  return (
    <li className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-900">{member.displayName}</span>
            <span className="bg-central-navy text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
              {gradeLabel(member.role, member.managerTitle)}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            @{member.username}
            {member.jerseyNumber ? ` · ${member.jerseyNumber}번` : ""}
            {` · 주 ${positionLabel(member.primaryPosition)}`}
            {member.secondaryPosition ? ` · 부1 ${positionLabel(member.secondaryPosition)}` : ""}
            {member.secondaryPosition2 ? ` · 부2 ${positionLabel(member.secondaryPosition2)}` : ""}
          </p>
        </div>
      </div>

      <form action={formAction} className="mt-3 flex items-center gap-2">
        <input type="hidden" name="memberId" value={member.id} />
        <select
          name="grade"
          defaultValue={currentGrade}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-xs outline-none focus:border-central-sky"
        >
          {GRADES.map((grade) => (
            <option key={grade.value} value={grade.value}>
              {grade.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="px-3 py-2 bg-central-sky text-white text-xs font-bold rounded-lg disabled:opacity-60"
        >
          {pending ? "변경 중" : "변경"}
        </button>
      </form>
      {state.error ? <p className="text-[11px] font-bold text-red-500 mt-2">{state.error}</p> : null}
    </li>
  );
}

export default function MemberGradeList({ members }: { members: PublicMember[] }) {
  if (members.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm font-bold text-gray-900">등록된 선수가 없습니다</p>
        <p className="text-xs text-gray-500 mt-1">선수 회원가입이 완료되면 이곳에 목록이 나타납니다.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-gray-100">
      {members.map((member) => (
        <GradeRow key={member.id} member={member} />
      ))}
    </ul>
  );
}
