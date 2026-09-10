import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, ImageIcon, Newspaper, Users } from "lucide-react";
import MemberGradeList from "@/components/admin/MemberGradeList";
import { getSession } from "@/lib/auth/session";
import { listManagedMembers } from "@/lib/auth/store";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.role !== "master") {
    redirect("/");
  }

  const members = await listManagedMembers();
  const playerCount = members.filter((member) => member.role === "player").length;
  const managerCount = members.filter((member) => member.role === "manager").length;

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-20">
      <div className="bg-central-navy px-4 py-4 sticky top-[64px] z-40 text-white">
        <h1 className="font-extrabold text-lg">운영자 대시보드</h1>
        <p className="text-xs text-white/70 mt-1">모든 데이터 추가·삭제가 가능합니다</p>
      </div>

      <div className="px-4 pt-4 grid grid-cols-3 gap-2">
        <Link href="/gallery/new" className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <ImageIcon className="w-4 h-4 mx-auto text-central-sky" />
          <span className="block text-[11px] font-bold text-gray-900 mt-1">사진 등록</span>
        </Link>
        <Link href="/matches/new" className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <CalendarDays className="w-4 h-4 mx-auto text-central-sky" />
          <span className="block text-[11px] font-bold text-gray-900 mt-1">경기 등록</span>
        </Link>
        <Link href="/news/new" className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <Newspaper className="w-4 h-4 mx-auto text-central-sky" />
          <span className="block text-[11px] font-bold text-gray-900 mt-1">소식 등록</span>
        </Link>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-xs font-bold text-gray-500">선수</span>
          <span className="text-xl font-black text-central-sky">{playerCount}명</span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-xs font-bold text-gray-500">매니저</span>
          <span className="text-xl font-black text-central-navy">{managerCount}명</span>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-central-sky" /> 회원 등급 관리
            </h2>
          </div>
          <MemberGradeList members={members} />
        </div>
      </div>
    </div>
  );
}
