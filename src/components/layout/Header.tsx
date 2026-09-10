import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { gradeLabel } from "@/lib/auth/constants";
import { getSession } from "@/lib/auth/session";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 bg-central-navy text-white px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-central-navy font-bold text-xs border-2 border-central-gold overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Central FC Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-extrabold text-lg tracking-wide truncate">Central FC</span>
      </Link>
      <nav className="flex items-center gap-1 shrink-0" aria-label="회원 메뉴">
        {session ? (
          <>
            <Link href="/profile" className="px-2.5 py-1.5 text-sm font-medium text-white/90 hover:text-white">
              내 정보
            </Link>
            {session.role === "master" ? (
              <Link href="/admin" className="px-2.5 py-1.5 text-sm font-medium text-central-gold">
                관리
              </Link>
            ) : (
              <span className="hidden max-w-[72px] truncate px-1 py-1.5 text-[10px] text-white/50 sm:block">
                {gradeLabel(session.role, session.managerTitle)}
              </span>
            )}
            <form action={logoutAction}>
              <button type="submit" className="px-2.5 py-1.5 text-sm font-medium text-white/90 hover:text-white">
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="px-2.5 py-1.5 text-sm font-medium text-white/90 hover:text-white">
              로그인
            </Link>
            <Link
              href="/join"
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-central-gold text-central-navy hover:bg-central-gold/90"
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
