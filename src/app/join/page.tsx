import Link from "next/link";
import { redirect } from "next/navigation";
import JoinForm from "@/components/auth/JoinForm";
import { getSession } from "@/lib/auth/session";

export default async function Join() {
  const session = await getSession();
  if (session) {
    redirect(session.role === "master" ? "/admin" : "/");
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-28">
      <div className="flex flex-col items-center pt-8 pb-6 px-4 bg-white border-b border-gray-100">
        <div className="w-16 h-16 bg-central-navy rounded-full border-4 border-central-gold flex items-center justify-center text-white font-bold text-xs overflow-hidden shadow-md mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Central FC (평촌 중앙 FC)" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-extrabold text-central-navy tracking-tight">회원가입</h1>
        <p className="text-sm text-gray-500 font-medium">Central FC (평촌 중앙 FC) 선수 등록</p>
        <p className="text-xs text-gray-400 mt-2">
          이미 회원이신가요?{" "}
          <Link href="/login" className="font-bold text-central-navy underline underline-offset-2">
            로그인
          </Link>
        </p>
      </div>

      <div className="px-4 py-6">
        <JoinForm />
        <p className="text-[11px] text-gray-500 mt-4 px-1 leading-relaxed">
          가입하면 선수로 등록됩니다. 운영자가 회장, 감독, 총무, 코치로 지정할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
