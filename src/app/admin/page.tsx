import { Bell, Users, CalendarDays, Wallet, ImageIcon, UserCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-20">
      <div className="bg-central-navy px-4 py-4 sticky top-[64px] z-40 flex justify-between items-center text-white">
        <h1 className="font-extrabold text-lg flex items-center gap-2">
          관리자 대시보드
        </h1>
        <div className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 border border-red-100 shadow-sm flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-xs font-bold text-gray-500">가입 대기</span>
          <span className="text-xl font-black text-red-500">3건</span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-xs font-bold text-gray-500">총 선수단</span>
          <span className="text-xl font-black text-central-sky">48명</span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-xs font-bold text-gray-500">예정 경기</span>
          <span className="text-xl font-black text-central-navy">2건</span>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-central-sky" /> 신규 가입 승인 대기
            </h2>
            <button className="text-[10px] text-central-sky font-bold bg-central-sky/10 px-2 py-1 rounded">전체보기</button>
          </div>
          
          <div className="flex flex-col divide-y divide-gray-100">
            {/* Pending Item 1 */}
            <div className="p-3 flex justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-sm shrink-0">홍</div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">홍길동</span>
                    <span className="bg-central-navy text-white text-[9px] font-bold px-1.5 py-0.5 rounded">FW</span>
                  </div>
                  <span className="text-[10px] text-gray-500 mt-0.5">등번호 10번 신청 · 180cm / 75kg</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button className="px-3 py-1.5 bg-central-sky text-white text-[10px] font-bold rounded">승인</button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 text-[10px] font-bold rounded">반려</button>
              </div>
            </div>

            {/* Pending Item 2 */}
            <div className="p-3 flex justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-sm shrink-0">김</div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">김중앙</span>
                    <span className="bg-central-navy text-white text-[9px] font-bold px-1.5 py-0.5 rounded">DF</span>
                  </div>
                  <span className="text-[10px] text-gray-500 mt-0.5">등번호 4번 신청 · 185cm / 80kg</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button className="px-3 py-1.5 bg-central-sky text-white text-[10px] font-bold rounded">승인</button>
                <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 text-[10px] font-bold rounded">반려</button>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <button className="w-full py-2 bg-central-navy text-white text-xs font-bold rounded-lg shadow-sm">대기자 일괄 승인하기</button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3 ml-1">데이터베이스 관리</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 active:scale-95 transition">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-central-sky">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">선수 정보 수정</div>
              <div className="text-[9px] text-gray-400 mt-0.5">등록 선수 및 등번호 변경</div>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 active:scale-95 transition">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">경기 일정 등록</div>
              <div className="text-[9px] text-gray-400 mt-0.5">새 매치 및 참석 투표 생성</div>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 active:scale-95 transition">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">갤러리 및 공지</div>
              <div className="text-[9px] text-gray-400 mt-0.5">구단 소식 및 사진 업로드</div>
            </div>
          </button>
          
          <button className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 active:scale-95 transition">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">회비 납부 현황</div>
              <div className="text-[9px] text-gray-400 mt-0.5">월 회비 및 특별 기금 체크</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
