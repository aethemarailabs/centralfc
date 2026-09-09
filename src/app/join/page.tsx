import Link from "next/link";
import { Info, Camera } from "lucide-react";

export default function Join() {
  return (
    <div className="flex flex-col bg-white min-h-screen pb-16">
      <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-gray-100">
        <div className="w-16 h-16 bg-central-navy rounded-full border-4 border-central-gold flex items-center justify-center text-white font-bold text-xs overflow-hidden shadow-md mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-extrabold text-central-navy tracking-tight">CENTRAL FC</h1>
        <p className="text-sm text-gray-500 font-medium">센트럴 FC 공식 멤버십</p>
      </div>

      <div className="px-4 py-6 flex flex-col gap-3">
        <button className="w-full bg-[#03C75A] text-white font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2">
          <span className="font-black text-lg">N</span> 네이버로 시작하기
        </button>
        <button className="w-full bg-[#FEE500] text-[#391B1B] font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2">
          카카오로 시작하기
        </button>
        <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2">
          구글로 시작하기
        </button>
        
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium">또는 간편 선수 등록</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Player Form */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">선수 정보 입력</h2>
            <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold">필수 정보</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-central-sky flex items-center justify-center bg-gray-50 text-gray-400">
                <Camera className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                <div className="w-6 h-6 bg-central-navy text-white rounded-full flex items-center justify-center">
                  <span className="text-sm leading-none">+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">이름</label>
              <input type="text" placeholder="예: 홍길동" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">희망 등번호</label>
                <input type="number" placeholder="예: 10" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">주 포지션</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition text-gray-600 appearance-none">
                  <option>공격수 (FW)</option>
                  <option>미드필더 (MF)</option>
                  <option>수비수 (DF)</option>
                  <option>골키퍼 (GK)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">키 (cm)</label>
                <input type="number" placeholder="180" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">몸무게 (kg)</label>
                <input type="number" placeholder="75" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition" />
              </div>
            </div>
          </div>
          
          {/* Info Alert */}
          <div className="mt-6 bg-[#EBF7FC] border border-central-sky/30 rounded-xl p-3 flex gap-3">
            <Info className="w-5 h-5 text-central-sky shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-central-navy">
                가입 신청 후 관리자의 승인이 완료되어야 선수단에 정식 등록됩니다.
              </p>
              <p className="text-[10px] text-gray-500">
                승인 결과는 카카오톡 알림톡 또는 문자로 안내드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-[64px] left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40">
        <button className="w-full py-4 bg-central-navy text-white text-base font-bold rounded-xl shadow-lg shadow-central-navy/20 hover:bg-central-navy/90 transition active:scale-[0.98]">
          가입 신청 완료
        </button>
      </div>
    </div>
  );
}
