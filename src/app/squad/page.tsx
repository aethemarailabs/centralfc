import { Search } from "lucide-react";

export default function Squad() {
  const players = [
    { id: 1, name: "김중앙", position: "FW / ST", number: 10, height: 181, weight: 74 },
    { id: 2, name: "이강우", position: "MF / CAM", number: 7, height: 175, weight: 68 },
    { id: 3, name: "박민혁", position: "DF / CB", number: 4, height: 185, weight: 80 },
    { id: 4, name: "최태호", position: "GK", number: 1, height: 188, weight: 82 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-8">
      {/* Search & Filter */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex px-4 py-3 gap-2 overflow-x-auto hide-scrollbar">
          <button className="px-4 py-1.5 bg-central-navy text-white text-sm font-bold rounded-full whitespace-nowrap">
            전체
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            공격수
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            미드필더
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            수비수
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            골키퍼
          </button>
        </div>
        <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium flex justify-between items-center">
          <span>총 {players.length}명의 선수 등록됨</span>
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Roster Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {players.map((player) => (
          <div key={player.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative">
            <div className="h-32 bg-gradient-to-br from-central-sky/20 to-central-navy/10 relative flex justify-center items-end pb-0">
              <div className="absolute top-2 left-2 bg-white/80 text-central-navy text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                {player.position}
              </div>
              <div className="absolute top-2 right-2 text-central-gold text-2xl font-black italic opacity-90 drop-shadow-sm">
                {player.number}
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white translate-y-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.jpg" alt={player.name} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="pt-6 pb-4 px-3 flex flex-col items-center text-center">
              <h3 className="text-base font-bold text-gray-900">{player.name}</h3>
              <div className="flex gap-2 mt-2 text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                <span>{player.height}cm</span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span>{player.weight}kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
