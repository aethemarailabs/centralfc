"use client";

import { useState } from "react";
import { deleteMatchAction } from "@/app/actions/content";
import { formatDateTime, isUpcoming } from "@/lib/content/format";
import type { FriendlyMatch } from "@/lib/content/types";

export default function MatchesBoard({ matches, canDelete }: { matches: FriendlyMatch[]; canDelete: boolean }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const upcoming = matches.filter((match) => isUpcoming(match.kickoffAt));
  const past = matches.filter((match) => !isUpcoming(match.kickoffAt));
  const visible = tab === "upcoming" ? upcoming : past;

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 flex gap-6 sticky top-[108px] z-40">
        <button
          type="button"
          onClick={() => setTab("upcoming")}
          className={
            tab === "upcoming"
              ? "py-3 text-sm font-bold text-central-sky border-b-2 border-central-sky"
              : "py-3 text-sm font-medium text-gray-400"
          }
        >
          예정 공지 ({upcoming.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("past")}
          className={
            tab === "past"
              ? "py-3 text-sm font-bold text-central-sky border-b-2 border-central-sky"
              : "py-3 text-sm font-medium text-gray-400"
          }
        >
          지난 공지 ({past.length})
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-sm font-bold text-gray-900">
              {tab === "upcoming" ? "예정된 친선 경기가 없습니다" : "지난 친선 경기가 없습니다"}
            </p>
          </div>
        ) : (
          visible.map((match) => (
            <article key={match.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-bold text-central-sky">친선 경기</p>
              <h3 className="text-base font-extrabold text-gray-900 mt-1">Central FC vs {match.opponent}</h3>
              <p className="text-xs text-gray-500 mt-2">{formatDateTime(match.kickoffAt)}</p>
              <p className="text-xs text-gray-500 mt-0.5">{match.venue}</p>
              {match.note ? <p className="text-xs text-gray-600 mt-2 bg-gray-50 rounded-lg p-2">{match.note}</p> : null}
              {canDelete ? (
                <form action={deleteMatchAction} className="mt-3">
                  <input type="hidden" name="matchId" value={match.id} />
                  <button type="submit" className="text-[11px] font-bold text-red-500">
                    삭제
                  </button>
                </form>
              ) : null}
            </article>
          ))
        )}
      </div>
    </>
  );
}
