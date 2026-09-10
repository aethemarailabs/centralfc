import Link from "next/link";
import { redirect } from "next/navigation";
import NewsForm from "@/components/news/NewsForm";
import { canPublishClubContent } from "@/lib/auth/permissions";
import { getSession } from "@/lib/auth/session";

export default async function NewsNew() {
  const session = await getSession();
  if (!canPublishClubContent(session)) {
    redirect(session ? "/" : "/login");
  }

  return (
    <div className="flex flex-col bg-white min-h-screen pb-8">
      <div className="bg-central-navy px-4 py-4 sticky top-[64px] z-40">
        <h1 className="text-white font-extrabold text-lg">최근 소식 등록</h1>
        <p className="text-white/70 text-xs mt-1">매니저·운영자만 등록할 수 있습니다</p>
      </div>
      <div className="px-4 py-6">
        <NewsForm />
        <p className="text-center mt-4">
          <Link href="/" className="text-xs font-bold text-gray-500 underline">
            홈으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
