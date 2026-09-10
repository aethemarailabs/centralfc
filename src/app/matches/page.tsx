import Link from "next/link";
import { CalendarDays } from "lucide-react";
import MatchesBoard from "@/components/matches/MatchesBoard";
import { canModerateAll, canPublishClubContent } from "@/lib/auth/permissions";
import { getSession } from "@/lib/auth/session";
import { listMatches } from "@/lib/content/store";

export default async function Matches() {
  const session = await getSession();
  const matches = await listMatches();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-20">
      <div className="bg-central-navy px-4 py-3 flex justify-between items-center text-white sticky top-[64px] z-40">
        <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded">2026 시즌 • 친선 경기 공지</span>
        {canPublishClubContent(session) ? (
          <Link href="/matches/new" className="text-xs font-bold bg-central-gold text-central-navy px-3 py-1.5 rounded-lg">
            등록하기
          </Link>
        ) : (
          <CalendarDays className="w-4 h-4" />
        )}
      </div>

      <MatchesBoard matches={matches} canDelete={canModerateAll(session)} />
    </div>
  );
}
