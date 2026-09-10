import Link from "next/link";
import { Shield, Users, ImageIcon, ChevronRight, CalendarDays, Newspaper, Shirt } from "lucide-react";
import { deleteNewsAction } from "@/app/actions/content";
import { canModerateAll, canPublishClubContent } from "@/lib/auth/permissions";
import { getSession } from "@/lib/auth/session";
import { formatDate, formatDateTime, isUpcoming } from "@/lib/content/format";
import { listMatches, listNews } from "@/lib/content/store";

export default async function Home() {
  const session = await getSession();
  const [matches, news] = await Promise.all([listMatches(), listNews()]);
  const nextMatch = matches.find((match) => isUpcoming(match.kickoffAt));
  const latestNews = news.slice(0, 3);
  const canPublish = canPublishClubContent(session);
  const canDelete = canModerateAll(session);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <section className="relative w-full h-[280px] bg-central-navy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-image.jpg"
          alt="Central FC (평촌 중앙 FC)"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-central-navy/90 via-central-navy/40 to-transparent flex flex-col justify-end p-6">
          <div className="inline-block bg-central-sky text-white text-xs font-bold px-2 py-1 rounded w-max mb-2">
            2026 시즌 진행 중
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            평촌
            <br />
            <span className="text-central-sky">중앙 FC</span>
          </h1>
          <p className="text-gray-300 text-sm mt-2 font-medium">
            Central FC 공식 클럽 포털
            <br />
            열정과 유대감의 축구 커뮤니티
          </p>
        </div>
      </section>

      <section className="px-4">
        <div className="grid grid-cols-4 gap-3">
          <Link href="/about" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">클럽 소개</span>
          </Link>
          <Link href="/matches" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">친선 경기</span>
          </Link>
          <Link href="/squad" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">선수단</span>
          </Link>
          <Link href="/gallery" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">갤러리</span>
          </Link>
        </div>
      </section>

      <section className="px-4">
        <div className="bg-central-navy rounded-2xl p-5 flex justify-around items-center text-white">
          <div className="flex flex-col items-center gap-1 w-1/2 text-center">
            <span className="text-central-gold text-sm font-bold opacity-80">활동 장소</span>
            <span className="text-sm font-extrabold leading-snug">평촌 중앙공원 운동장</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex flex-col items-center gap-1 w-1/2 text-center">
            <span className="text-central-gold text-sm font-bold opacity-80">활동 시간</span>
            <span className="text-sm font-extrabold leading-snug">매일 아침</span>
          </div>
        </div>
      </section>

      <section className="px-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Shirt className="w-5 h-5 text-central-navy" />
          유니폼
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uniform.png" alt="Central FC 유니폼" className="w-full h-auto object-contain" />
        </div>
      </section>

      <section className="px-4 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-central-navy" />
            친선 경기 공지
          </h2>
          <div className="flex items-center gap-3">
            {canPublish ? (
              <Link href="/matches/new" className="text-sm font-bold text-central-navy">
                등록하기
              </Link>
            ) : null}
            <Link href="/matches" className="text-sm font-medium text-central-sky flex items-center">
              전체 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {nextMatch ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-central-sky">다음 경기</p>
            <h3 className="text-base font-extrabold text-gray-900 mt-1">Central FC vs {nextMatch.opponent}</h3>
            <p className="text-xs text-gray-500 mt-2">{formatDateTime(nextMatch.kickoffAt)}</p>
            <p className="text-xs text-gray-500 mt-0.5">{nextMatch.venue}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-sm font-bold text-gray-900">등록된 친선 경기가 없습니다</p>
            <p className="text-xs text-gray-500 mt-1">일정이 정해지면 이곳에 안내됩니다.</p>
          </div>
        )}
      </section>

      <section className="px-4 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-central-navy" />
            최근 소식
          </h2>
          {canPublish ? (
            <Link href="/news/new" className="text-sm font-bold text-central-navy">
              등록하기
            </Link>
          ) : null}
        </div>

        {latestNews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-sm font-bold text-gray-900">등록된 소식이 없습니다</p>
            <p className="text-xs text-gray-500 mt-1">새 소식이 있으면 이곳에 올라갑니다.</p>
          </div>
        ) : (
          latestNews.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="text-sm font-bold text-gray-900">{post.title}</h3>
              <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{post.body}</p>
              <p className="text-[10px] text-gray-400 mt-2">
                {post.authorName} · {formatDate(post.createdAt)}
              </p>
              {canDelete ? (
                <form action={deleteNewsAction} className="mt-2">
                  <input type="hidden" name="newsId" value={post.id} />
                  <button type="submit" className="text-[11px] font-bold text-red-500">
                    삭제
                  </button>
                </form>
              ) : null}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
