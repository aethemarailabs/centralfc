import PlayerCard from "@/components/squad/PlayerCard";
import { MANAGER_TITLES } from "@/lib/auth/constants";
import { listRoster } from "@/lib/auth/store";
import type { ManagerTitle, PublicMember } from "@/lib/auth/types";

function staffByTitle(players: PublicMember[], title: ManagerTitle) {
  return players.filter((player) => player.role === "manager" && player.managerTitle === title);
}

function VacantCard({ title }: { title: ManagerTitle }) {
  return (
    <article className="relative aspect-[5/7] rounded-[18px] p-[2px] bg-gradient-to-b from-[#F8E7A0] via-[#D3A74D] to-[#8A6A1A] shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] bg-gradient-to-b from-[#3d2d0c] via-[#1C2B59] to-[#0a1024] px-3 text-center">
        <p className="text-[10px] font-black tracking-[0.2em] text-[#F8E7A0]">{title}</p>
        <p className="mt-2 text-sm font-bold text-white/70">미정</p>
        <p className="mt-1 text-[10px] text-white/40">운영자가 지정하면 카드가 표시됩니다</p>
      </div>
    </article>
  );
}

export default async function About() {
  const players = await listRoster();
  const staffCards = MANAGER_TITLES.flatMap((title) => {
    const members = staffByTitle(players, title);
    if (members.length === 0) {
      return [<VacantCard key={`${title}-empty`} title={title} />];
    }
    return members.map((member) => <PlayerCard key={member.id} player={member} />);
  });

  return (
    <div className="flex min-h-screen flex-col bg-white pb-8">
      <div className="sticky top-[64px] z-40 bg-central-navy px-4 py-4">
        <h1 className="text-lg font-extrabold text-white">클럽 소개</h1>
        <p className="mt-0.5 text-xs font-medium text-white/70">Central FC (평촌 중앙 FC)</p>
      </div>

      <section className="px-4 pt-5">
        <h2 className="mb-3 text-sm font-bold text-gray-900">스태프</h2>
        <div className="grid grid-cols-2 gap-3">{staffCards}</div>
      </section>

      <section className="px-4 py-16 text-center">
        <p className="text-base font-bold tracking-widest text-gray-400">작성중</p>
      </section>
    </div>
  );
}
