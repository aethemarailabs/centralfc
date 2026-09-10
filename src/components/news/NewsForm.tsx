"use client";

import { useActionState } from "react";
import { createNewsAction } from "@/app/actions/content";
import type { ContentFormState } from "@/lib/content/types";

const initialState: ContentFormState = {};
const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky";

export default function NewsForm() {
  const [state, formAction, pending] = useActionState(createNewsAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-xs font-bold text-gray-700 mb-1">
          제목
        </label>
        <input id="title" name="title" type="text" maxLength={80} placeholder="예: 이번 주 아침 훈련 안내" className={fieldClass} required />
      </div>
      <div>
        <label htmlFor="body" className="block text-xs font-bold text-gray-700 mb-1">
          내용
        </label>
        <textarea id="body" name="body" rows={8} maxLength={2000} placeholder="회원에게 전할 소식을 적어 주세요." className={fieldClass} required />
      </div>
      {state.error ? <p className="text-xs font-bold text-red-500">{state.error}</p> : null}
      <button type="submit" disabled={pending} className="w-full py-3.5 bg-central-navy text-white text-sm font-bold rounded-xl disabled:opacity-60">
        {pending ? "등록 중..." : "소식 등록"}
      </button>
    </form>
  );
}
