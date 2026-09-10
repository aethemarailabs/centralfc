import { Users } from "lucide-react";
import PlayerCard from "@/components/squad/PlayerCard";
import { listRoster } from "@/lib/auth/store";

export default async function Squad() {
  const players = await listRoster();

  return (
    <div className="flex min-h-screen flex-col bg-white pb-8">
      <div className="sticky top-[64px] z-40 bg-central-navy px-4 py-4">
        <h1 className="text-lg font-extrabold text-white">선수단</h1>
        <p className="mt-0.5 text-xs font-medium text-white/70">Central FC (평촌 중앙 FC) · {players.length}명</p>
      </div>

      {players.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-400">
            <Users className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold text-gray-900">등록된 선수가 없습니다</p>
          <p className="mt-1 text-xs text-gray-500">회원가입이 완료되면 선수카드가 표시됩니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}
