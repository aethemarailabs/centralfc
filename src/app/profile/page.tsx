import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile/ProfileForm";
import { getSession } from "@/lib/auth/session";
import { getMemberByUsername } from "@/lib/auth/store";

export default async function Profile() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const member = await getMemberByUsername(session.username);
  if (!member) {
    redirect("/login");
  }

  const { passwordHash: _passwordHash, ...publicMember } = member;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-28">
      <div className="border-b border-gray-100 bg-white px-4 py-4">
        <h1 className="text-base font-bold text-gray-900">내 정보</h1>
        <p className="mt-0.5 text-xs text-gray-500">선수카드에 보이는 이름, 사진, 포지션을 수정할 수 있습니다.</p>
      </div>
      <div className="px-4 py-6">
        <ProfileForm member={publicMember} />
      </div>
    </div>
  );
}
