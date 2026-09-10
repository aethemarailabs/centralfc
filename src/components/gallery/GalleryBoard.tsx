"use client";

import { useState } from "react";
import { deletePhotoAction } from "@/app/actions/content";
import { formatDate, galleryPublicUrl } from "@/lib/content/format";
import { GALLERY_TAGS, type GalleryPhoto } from "@/lib/content/types";

type Props = {
  photos: GalleryPhoto[];
  canDeleteIds: number[];
};

export default function GalleryBoard({ photos, canDeleteIds }: Props) {
  const [tag, setTag] = useState("전체");
  const visible = tag === "전체" ? photos : photos.filter((photo) => photo.tag === tag);
  const deletable = new Set(canDeleteIds);

  return (
    <>
      <div className="border-b border-gray-100 bg-white sticky top-[120px] z-30">
        <div className="flex px-4 py-3 gap-2 overflow-x-auto hide-scrollbar">
          {["전체", ...GALLERY_TAGS].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
              className={
                tag === item
                  ? "px-4 py-1.5 bg-central-sky text-white text-sm font-bold rounded-full whitespace-nowrap"
                  : "px-4 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap"
              }
            >
              {item}
            </button>
          ))}
        </div>
        <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium">총 {visible.length}장의 순간들</div>
      </div>

      {visible.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-sm font-bold text-gray-900">등록된 사진이 없습니다</p>
          <p className="text-xs text-gray-500 mt-1">로그인한 회원이 사진을 올리면 이곳에 모입니다.</p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 gap-3">
          {visible.map((photo) => (
            <article key={photo.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col">
              <div className="aspect-square bg-gray-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={galleryPublicUrl(photo.storagePath)} alt={photo.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {photo.tag}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{photo.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1">
                  {photo.authorName} · {formatDate(photo.createdAt)}
                </p>
                {deletable.has(photo.id) ? (
                  <form action={deletePhotoAction} className="mt-2">
                    <input type="hidden" name="photoId" value={photo.id} />
                    <button type="submit" className="text-[11px] font-bold text-red-500">
                      삭제
                    </button>
                  </form>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
