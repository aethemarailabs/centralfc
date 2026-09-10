import Link from "next/link";
import { Camera } from "lucide-react";
import GalleryBoard from "@/components/gallery/GalleryBoard";
import { canDeletePhoto, canUseGallery } from "@/lib/auth/permissions";
import { getSession } from "@/lib/auth/session";
import { listPhotos } from "@/lib/content/store";

export default async function Gallery() {
  const session = await getSession();
  const photos = await listPhotos();
  const canDeleteIds = photos.filter((photo) => canDeletePhoto(session, photo.memberId)).map((photo) => photo.id);

  return (
    <div className="flex flex-col bg-white min-h-screen pb-20 relative">
      <div className="bg-central-navy px-4 py-4 sticky top-[64px] z-40">
        <h1 className="text-white font-extrabold text-lg">갤러리</h1>
        <p className="text-white/70 text-xs font-medium mt-0.5">Central FC (평촌 중앙 FC)</p>
      </div>

      <GalleryBoard photos={photos} canDeleteIds={canDeleteIds} />

      {canUseGallery(session) ? (
        <Link
          href="/gallery/new"
          className="fixed bottom-20 right-4 w-14 h-14 bg-central-sky text-white rounded-full flex items-center justify-center z-50"
          aria-label="사진 등록"
        >
          <Camera className="w-6 h-6" />
        </Link>
      ) : (
        <Link
          href="/login"
          className="fixed bottom-20 right-4 px-4 h-12 bg-central-navy text-white text-xs font-bold rounded-full flex items-center z-50"
        >
          로그인 후 등록
        </Link>
      )}
    </div>
  );
}
