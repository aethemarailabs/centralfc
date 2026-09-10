import Link from "next/link";
import { redirect } from "next/navigation";
import UploadPhotoForm from "@/components/gallery/UploadPhotoForm";
import { canUseGallery } from "@/lib/auth/permissions";
import { getSession } from "@/lib/auth/session";

export default async function GalleryNew() {
  const session = await getSession();
  if (!canUseGallery(session)) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col bg-white min-h-screen pb-8">
      <div className="bg-central-navy px-4 py-4 sticky top-[64px] z-40">
        <h1 className="text-white font-extrabold text-lg">사진 등록</h1>
        <p className="text-white/70 text-xs mt-1">모든 회원이 사진을 올릴 수 있습니다</p>
      </div>
      <div className="px-4 py-6">
        <UploadPhotoForm />
        <p className="text-center mt-4">
          <Link href="/gallery" className="text-xs font-bold text-gray-500 underline">
            갤러리로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
