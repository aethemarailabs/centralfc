import { avatarPublicUrl } from "@/lib/auth/avatar";
import { gradeLabel, positionLine, positionName } from "@/lib/auth/constants";
import type { Position, PublicMember } from "@/lib/auth/types";

const LINE_STYLE: Record<string, { badge: string; glow: string }> = {
  GK: { badge: "bg-amber-300 text-black", glow: "from-amber-300/30" },
  DF: { badge: "bg-sky-400 text-black", glow: "from-sky-400/25" },
  MF: { badge: "bg-emerald-400 text-black", glow: "from-emerald-400/25" },
  FW: { badge: "bg-rose-400 text-white", glow: "from-rose-400/25" },
};

function SubChip({ position }: { position: Position }) {
  return (
    <span className="px-1.5 py-0.5 rounded bg-black/35 text-[9px] font-black tracking-wide text-white/90">
      {position}
    </span>
  );
}

export default function PlayerCard({ player }: { player: PublicMember }) {
  const line = positionLine(player.primaryPosition) ?? "MF";
  const style = LINE_STYLE[line] ?? LINE_STYLE.MF;
  const photoUrl = avatarPublicUrl(player.photoPath);
  const isManager = player.role === "manager";
  const title = gradeLabel(player.role, player.managerTitle);

  return (
    <article
      className={
        isManager
          ? "relative aspect-[5/7] rounded-[18px] p-[2px] bg-gradient-to-b from-[#F8E7A0] via-[#D3A74D] to-[#8A6A1A] shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
          : "relative aspect-[5/7] rounded-[18px] p-[2px] bg-gradient-to-b from-[#9ec9ff] via-[#87CEEB] to-[#1C2B59] shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
      }
    >
      <div
        className={
          isManager
            ? "relative h-full overflow-hidden rounded-[16px] bg-gradient-to-b from-[#3d2d0c] via-[#1C2B59] to-[#0a1024]"
            : "relative h-full overflow-hidden rounded-[16px] bg-gradient-to-b from-[#243868] via-[#1C2B59] to-[#070b18]"
        }
      >
        <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${style.glow} to-transparent`} />

        <div className="relative z-10 flex items-start justify-between px-2.5 pt-2.5">
          <div className="flex flex-col leading-none">
            <span className="text-[28px] font-black italic text-[#F8E7A0] drop-shadow-md">
              {player.jerseyNumber ?? "-"}
            </span>
            <span className={`mt-0.5 w-fit px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider ${style.badge}`}>
              {player.primaryPosition ?? "—"}
            </span>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/55">Central</p>
            <p className="text-[9px] font-black text-[#F8E7A0]">FC</p>
          </div>
        </div>

        <div className="absolute inset-x-0 top-16 bottom-20">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={player.displayName}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-end justify-center">
              <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-3xl font-black text-white/80">
                {player.displayName.slice(0, 1)}
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a1024] to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-2.5 pb-2.5 pt-8 bg-gradient-to-t from-[#070b18] via-[#070b18]/95 to-transparent">
          <h3 className="truncate text-center text-[15px] font-black tracking-tight text-white">
            {player.displayName}
          </h3>
          <p className="mt-0.5 truncate text-center text-[9px] font-bold text-white/55">
            {positionName(player.primaryPosition)}
          </p>

          <div className="mt-2 grid grid-cols-2 gap-1 text-center">
            <div className="rounded bg-white/10 py-1">
              <p className="text-[8px] font-bold text-white/45">키</p>
              <p className="text-[11px] font-black text-white">{player.heightCm ?? "-"}</p>
            </div>
            <div className="rounded bg-white/10 py-1">
              <p className="text-[8px] font-bold text-white/45">몸무게</p>
              <p className="text-[11px] font-black text-white">{player.weightKg ?? "-"}</p>
            </div>
          </div>

          <div className="mt-1.5 flex min-h-5 items-center justify-center gap-1">
            {player.secondaryPosition ? <SubChip position={player.secondaryPosition} /> : null}
            {player.secondaryPosition2 ? <SubChip position={player.secondaryPosition2} /> : null}
          </div>

          {isManager ? (
            <p className="mt-1 text-center text-[9px] font-black tracking-widest text-[#F8E7A0]">{title}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
