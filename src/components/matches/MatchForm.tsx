"use client";

import { useActionState } from "react";
import { createMatchAction } from "@/app/actions/content";
import type { ContentFormState } from "@/lib/content/types";

const initialState: ContentFormState = {};
const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky";

export default function MatchForm() {
  const [state, formAction, pending] = useActionState(createMatchAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="opponent" className="block text-xs font-bold text-gray-700 mb-1">
          상대 팀
        </label>
        <input id="opponent" name="opponent" type="text" maxLength={60} placeholder="예: 평촌 유나이티드" className={fieldClass} required />
      </div>
      <div>
        <label htmlFor="kickoffAt" className="block text-xs font-bold text-gray-700 mb-1">
          경기 일시
        </label>
        <input id="kickoffAt" name="kickoffAt" type="datetime-local" className={fieldClass} required />
      </div>
      <div>
        <label htmlFor="venue" className="block text-xs font-bold text-gray-700 mb-1">
          장소
        </label>
        <input id="venue" name="venue" type="text" maxLength={80} placeholder="예: 평촌 중앙공원 운동장" className={fieldClass} required />
      </div>
      <div>
        <label htmlFor="note" className="block text-xs font-bold text-gray-700 mb-1">
          메모
        </label>
        <textarea id="note" name="note" rows={3} maxLength={200} placeholder="집합 시간, 유니폼 등 (선택)" className={fieldClass} />
      </div>
      {state.error ? <p className="text-xs font-bold text-red-500">{state.error}</p> : null}
      <button type="submit" disabled={pending} className="w-full py-3.5 bg-central-navy text-white text-sm font-bold rounded-xl disabled:opacity-60">
        {pending ? "등록 중..." : "친선 경기 등록"}
      </button>
    </form>
  );
}
