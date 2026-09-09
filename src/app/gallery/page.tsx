import { Camera } from "lucide-react";

export default function Gallery() {
  const photos = [
    { id: 1, title: "2024 수도군단 구장 친선경기", date: "2024.10.05", tag: "단체 사진", src: "/hero-image.jpg" },
    { id: 2, title: "2024년 중앙FC 시즌 시무식", date: "2024.03.01", tag: "행사 및 회식", src: "/logo.jpg" },
    { id: 3, title: "주말 정규전 극장골 하이라이트", date: "2024.09.28", tag: "경기 스케치", src: "/hero-image.jpg" },
    { id: 4, title: "여름 단합대회 & 바비큐 데이", date: "2024.07.20", tag: "행사 및 회식", src: "/uniform.png" },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen pb-20 relative">
      <div className="bg-central-navy px-4 py-4 sticky top-[64px] z-40">
        <h1 className="text-white font-extrabold text-lg">갤러리</h1>
      </div>

      <div className="border-b border-gray-100 bg-white sticky top-[120px] z-30">
        <div className="flex px-4 py-3 gap-2 overflow-x-auto hide-scrollbar">
          <button className="px-4 py-1.5 bg-central-sky text-white text-sm font-bold rounded-full whitespace-nowrap shadow-sm shadow-central-sky/20">
            전체
          </button>
          <button className="px-4 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            단체 사진
          </button>
          <button className="px-4 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            경기 스케치
          </button>
          <button className="px-4 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-full whitespace-nowrap">
            행사 및 회식
          </button>
        </div>
        <div className="px-4 py-2 bg-gray-50 flex justify-between items-center text-xs text-gray-500 font-medium">
          <span>총 148장의 순간들</span>
          <select className="bg-transparent outline-none font-bold text-gray-700">
            <option>최신순</option>
            <option>인기순</option>
          </select>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="aspect-square bg-gray-100 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                {photo.tag}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{photo.title}</h3>
              <p className="text-[10px] text-gray-400 mt-1">{photo.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 w-14 h-14 bg-central-sky text-white rounded-full flex items-center justify-center shadow-lg shadow-central-sky/30 z-50 active:scale-95 transition">
        <Camera className="w-6 h-6" />
      </button>
    </div>
  );
}
