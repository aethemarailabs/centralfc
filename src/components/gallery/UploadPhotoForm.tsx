"use client";

import { useActionState } from "react";
import { uploadPhotoAction } from "@/app/actions/content";
import { GALLERY_TAGS, type ContentFormState } from "@/lib/content/types";

const initialState: ContentFormState = {};
const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky";

export default function UploadPhotoForm() {
  const [state, formAction, pending] = useActionState(uploadPhotoAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-xs font-bold text-gray-700 mb-1">
          제목
        </label>
        <input id="title" name="title" type="text" maxLength={80} placeholder="예: 아침 훈련 단체 사진" className={fieldClass} required />
      </div>
      <div>
        <label htmlFor="tag" className="block text-xs font-bold text-gray-700 mb-1">
          분류
        </label>
        <select id="tag" name="tag" className={fieldClass} required defaultValue="">
          <option value="" disabled>
            선택
          </option>
          {GALLERY_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="photo" className="block text-xs font-bold text-gray-700 mb-1">
          사진
        </label>
        <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className={fieldClass} required />
        <p className="text-[11px] text-gray-400 mt-1">JPG, PNG, WEBP, GIF · 5MB 이하</p>
      </div>
      {state.error ? <p className="text-xs font-bold text-red-500">{state.error}</p> : null}
      <button type="submit" disabled={pending} className="w-full py-3.5 bg-central-navy text-white text-sm font-bold rounded-xl disabled:opacity-60">
        {pending ? "올리는 중..." : "사진 등록"}
      </button>
    </form>
  );
}
