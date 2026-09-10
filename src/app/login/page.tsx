import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getSession } from "@/lib/auth/session";

export default async function Login() {
  const session = await getSession();
  if (session) {
    redirect(session.role === "master" ? "/admin" : "/");
  }

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-gray-100">
        <div className="w-16 h-16 bg-central-navy rounded-full border-4 border-central-gold flex items-center justify-center text-white font-bold text-xs overflow-hidden shadow-md mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Central FC (평촌 중앙 FC)" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-extrabold text-central-navy tracking-tight">로그인</h1>
        <p className="text-sm text-gray-500 font-medium">Central FC (평촌 중앙 FC)</p>
      </div>

      <div className="px-4 py-8">
        <LoginForm />
        <p className="text-center text-xs text-gray-500 mt-6">
          아직 회원이 아니신가요?{" "}
          <Link href="/join" className="font-bold text-central-navy underline underline-offset-2">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
