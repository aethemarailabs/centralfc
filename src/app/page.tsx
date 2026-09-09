import Link from "next/link";
import { Shield, UserPlus, Users, ImageIcon, ChevronRight, CalendarDays, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Hero Section */}
      <section className="relative w-full h-[280px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-image.jpg"
          alt="Central FC Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-central-navy/90 via-central-navy/40 to-transparent flex flex-col justify-end p-6">
          <div className="inline-block bg-central-sky text-white text-xs font-bold px-2 py-1 rounded w-max mb-2">
            2024 시즌 • 매치데이 준비완료
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            하나된 팀, <br />
            <span className="text-central-sky">하나의 꿈</span>
          </h1>
          <p className="text-gray-300 text-sm mt-2 font-medium">
            센트럴 FC 공식 아마추어 클럽 포털 • 열정과 유대감의 축구 커뮤니티
          </p>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <section className="px-4">
        <div className="grid grid-cols-4 gap-3">
          <Link href="/about" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">클럽 소개</span>
          </Link>
          <Link href="/join" className="flex flex-col items-center gap-2 p-3 bg-central-sky/10 rounded-2xl shadow-sm border border-central-sky/20">
            <div className="w-10 h-10 rounded-full bg-central-sky flex items-center justify-center text-white shadow-sm">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-central-sky">가입하기</span>
          </Link>
          <Link href="/squad" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">선수단</span>
          </Link>
          <Link href="/gallery" className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-central-navy">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-700">갤러리</span>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="bg-central-navy rounded-2xl p-5 flex justify-around items-center text-white shadow-md">
          <div className="flex flex-col items-center gap-1 w-1/2">
            <span className="text-central-gold text-sm font-bold opacity-80">창단연도</span>
            <span className="text-lg font-extrabold">2025년</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex flex-col items-center gap-1 w-1/2">
            <span className="text-central-gold text-sm font-bold opacity-80">등록 회원수</span>
            <span className="text-lg font-extrabold">50명 이상</span>
          </div>
        </div>
      </section>

      {/* Match Fixture Section */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-central-navy" />
            다음 경기 일정
          </h2>
          <Link href="/matches" className="text-sm font-medium text-central-sky flex items-center">
            전체 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-central-gold/20 text-central-gold text-xs font-bold px-2 py-1 rounded">
              예정
            </span>
            <span className="text-xs font-bold text-gray-500">
              10월 19일 (토) 15:00
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-center gap-2 w-1/3">
              <div className="w-12 h-12 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.jpg" alt="Home" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-sm font-bold text-center">센트럴 FC<br/><span className="text-xs text-gray-500 font-medium">(홈)</span></span>
            </div>
            
            <div className="text-xl font-extrabold text-gray-300">VS</div>
            
            <div className="flex flex-col items-center gap-2 w-1/3">
              <div className="w-12 h-12 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-sm font-bold text-center">리버사이드<br/><span className="text-xs text-gray-500 font-medium">(원정)</span></span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3 text-center mb-4">
            <span className="text-xs text-gray-600 font-medium">장소: 센트럴 스포츠 콤플렉스 1구장</span>
          </div>
          
          <button className="w-full py-3 bg-central-navy text-white text-sm font-bold rounded-xl hover:bg-central-navy/90 transition">
            참가 여부 투표하기
          </button>
        </div>
      </section>

      {/* Club Highlights Section */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-central-navy" />
            최근 소식
          </h2>
          <Link href="/news" className="text-sm font-medium text-central-sky flex items-center">
            더보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uniform.png" alt="News" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-central-sky">선수단 소식</span>
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1">새로운 프리시즌 유니폼 공개</h3>
            <p className="text-xs text-gray-500 line-clamp-1">센트럴 FC의 상징인 스카이블루와 네이비 스트라이프 공식 유니폼이 공개되었습니다.</p>
            <span className="text-[10px] text-gray-400 mt-1">2일 전</span>
          </div>
        </div>
      </section>

    </div>
  );
}
