"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

type PhotoPickerProps = {
  currentUrl?: string;
  required?: boolean;
};

export default function PhotoPicker({ currentUrl, required = false }: PhotoPickerProps) {
  const [preview, setPreview] = useState(currentUrl ?? "");

  return (
    <div>
      <p className="block text-xs font-bold text-gray-700 mb-2">프로필 사진</p>
      <label className="flex items-center gap-4 cursor-pointer">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-central-gold bg-central-navy/5 shrink-0">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="프로필 미리보기" className="w-full h-full object-cover object-top" />
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center text-central-navy/50">
              <Camera className="w-6 h-6" />
            </span>
          )}
        </div>
        <div className="min-w-0">
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-central-navy text-white text-xs font-bold">
            {preview ? "사진 변경" : "사진 선택"}
          </span>
          <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
            선수카드에 표시됩니다. JPG, PNG, WEBP, GIF / 5MB 이하
            {required ? "" : " · 나중에 내 정보에서 등록할 수 있습니다"}
          </p>
        </div>
        <input
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={required}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            setPreview((prev) => {
              if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
              return url;
            });
          }}
        />
      </label>
    </div>
  );
}
