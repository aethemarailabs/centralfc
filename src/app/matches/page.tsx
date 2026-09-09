import { CalendarDays, MapPin } from "lucide-react";

export default function Matches() {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-20">
      <div className="bg-central-navy px-4 py-3 flex justify-between items-center text-white sticky top-[64px] z-40">
        <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded">2024 시즌 • 하반기 정규 리그</span>
        <CalendarDays className="w-4 h-4" />
      </div>

      <div className="bg-white border-b border-gray-200 px-4 py-0 flex gap-6 overflow-x-auto hide-scrollbar sticky top-[108px] z-40">
        <button className="py-3 text-sm font-bold text-central-sky border-b-2 border-central-sky whitespace-nowrap">
          예정된 경기
        </button>
        <button className="py-3 text-sm font-medium text-gray-400 hover:text-gray-600 whitespace-nowrap">
          지난 경기 결과
        </button>
      </div>

      <div className="px-4 py-3 flex gap-2">
        <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">전체 (2)</button>
        <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full">홈 경기 (1)</button>
        <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full">원정 경기 (1)</button>
      </div>

      <div className="px-4 flex flex-col gap-4 mt-2">
        {/* Match Card 1 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-600">리그 12라운드</span>
            <span className="bg-central-gold text-white text-[10px] font-black px-2 py-0.5 rounded">D-3</span>
          </div>
          
          <div className="p-4">
            <div className="text-center mb-4">
              <h3 className="text-sm font-black text-gray-900">2024년 10월 19일 (토) 14:00</h3>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                <MapPin className="w-3 h-3" />
                센트럴 구장 (홈) - 제1경기장
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-14 h-14 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.jpg" alt="Central FC" className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="text-sm font-bold text-center text-gray-900">센트럴 FC</span>
              </div>
              
              <div className="flex flex-col items-center justify-center w-1/3">
                <span className="text-2xl font-black text-gray-200 italic">VS</span>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded mt-1">14:00</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-14 h-14 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                  <span className="font-bold text-gray-400 text-xs">RIVER</span>
                </div>
                <span className="text-sm font-bold text-center text-gray-900">리버사이드</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 border-t border-blue-100/50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-central-navy">현재 참가 확정 인원: <span className="text-central-sky">18명</span></span>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                ))}
                <div className="w-6 h-6 rounded-full bg-central-sky border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">+14</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-central-sky text-white text-sm font-bold rounded-xl shadow-md shadow-central-sky/20 active:scale-[0.98] transition">
                참가 여부 투표하기
              </button>
              <button className="px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl active:scale-[0.98] transition">
                위치 안내
              </button>
            </div>
          </div>
        </div>

        {/* Match Card 2 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-80">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-600">리그 13라운드</span>
            <span className="bg-gray-400 text-white text-[10px] font-black px-2 py-0.5 rounded">D-10</span>
          </div>
          
          <div className="p-4">
            <div className="text-center mb-4">
              <h3 className="text-sm font-black text-gray-900">2024년 10월 26일 (토) 15:00</h3>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                <MapPin className="w-3 h-3" />
                부산 남구 백운포 체육공원 (원정)
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                  <span className="font-bold text-gray-400 text-[10px]">SDFC</span>
                </div>
                <span className="text-sm font-bold text-center text-gray-900">성동 FC</span>
              </div>
              
              <div className="flex flex-col items-center justify-center w-1/3">
                <span className="text-xl font-black text-gray-200 italic">VS</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.jpg" alt="Central FC" className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="text-sm font-bold text-center text-gray-900">센트럴 FC</span>
              </div>
            </div>
            
            <button className="w-full py-2.5 bg-white border border-central-navy text-central-navy text-sm font-bold rounded-xl active:scale-[0.98] transition mt-2">
              참가 여부 투표하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
