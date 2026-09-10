"use client";

import { useState } from "react";
import { deleteMatchAction, voteAttendanceAction } from "@/app/actions/content";
import { formatDateTime, isUpcoming } from "@/lib/content/format";
import type { FriendlyMatch, MatchAttendance } from "@/lib/content/types";

export default function MatchesBoard({ 
  matches, 
  canDelete,
  currentMemberId,
  attendances
}: { 
  matches: FriendlyMatch[]; 
  canDelete: boolean;
  currentMemberId: number | null;
  attendances: MatchAttendance[];
}) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const upcoming = matches.filter((match) => isUpcoming(match.kickoffAt));
  const past = matches.filter((match) => !isUpcoming(match.kickoffAt));
  const visible = tab === "upcoming" ? upcoming : past;

  const [expandedMatchId, setExpandedMatchId] = useState<number | null>(null);

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
          visible.map((match) => {
            const matchAttendances = attendances.filter(a => a.matchId === match.id);
            const attending = matchAttendances.filter(a => a.status === "attending");
            const absent = matchAttendances.filter(a => a.status === "absent");
            const pending = matchAttendances.filter(a => a.status === "pending");
            
            const myAttendance = currentMemberId ? matchAttendances.find(a => a.memberId === currentMemberId)?.status : null;
            const isExpanded = expandedMatchId === match.id;

            return (
              <article key={match.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-central-sky">친선 경기</p>
                      <h3 className="text-base font-extrabold text-gray-900 mt-1">Central FC vs {match.opponent}</h3>
                      <p className="text-xs text-gray-500 mt-2">{formatDateTime(match.kickoffAt)}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{match.venue}</p>
                    </div>
                    {canDelete ? (
                      <form action={deleteMatchAction}>
                        <input type="hidden" name="matchId" value={match.id} />
                        <button type="submit" className="text-[10px] bg-red-50 text-red-500 font-bold px-2 py-1 rounded">
                          삭제
                        </button>
                      </form>
                    ) : null}
                  </div>
                  {match.note ? <p className="text-xs text-gray-600 mt-3 bg-gray-50 rounded-lg p-3">{match.note}</p> : null}
                </div>

                <div className="bg-blue-50/50 p-4 border-t border-blue-100/50">
                  <div className="flex justify-between items-center mb-3">
                    <button 
                      onClick={() => setExpandedMatchId(isExpanded ? null : match.id)}
                      className="text-xs font-bold text-central-navy flex items-center gap-1 active:scale-95 transition"
                    >
                      현재 참가 확정 인원: <span className="text-central-sky text-sm ml-1">{attending.length}명</span>
                      <span className="text-[10px] text-gray-400 ml-1 font-normal">(자세히 보기)</span>
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="mb-4 bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-central-sky mb-1">참석 ({attending.length})</p>
                        <div className="flex flex-wrap gap-1">
                          {attending.map(a => <span key={a.memberId} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{a.displayName}</span>)}
                          {attending.length === 0 && <span className="text-[10px] text-gray-400">없음</span>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-red-400 mb-1">불참 ({absent.length})</p>
                        <div className="flex flex-wrap gap-1">
                          {absent.map(a => <span key={a.memberId} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{a.displayName}</span>)}
                          {absent.length === 0 && <span className="text-[10px] text-gray-400">없음</span>}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 mb-1">미정 ({pending.length})</p>
                        <div className="flex flex-wrap gap-1">
                          {pending.map(a => <span key={a.memberId} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{a.displayName}</span>)}
                          {pending.length === 0 && <span className="text-[10px] text-gray-400">없음</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentMemberId ? (
                    <form action={voteAttendanceAction} className="flex gap-2">
                      <input type="hidden" name="matchId" value={match.id} />
                      <button 
                        name="status" 
                        value="attending"
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl active:scale-[0.98] transition ${myAttendance === 'attending' ? 'bg-central-sky text-white shadow-md shadow-central-sky/20 border border-central-sky' : 'bg-white border border-gray-200 text-gray-600'}`}
                      >
                        {myAttendance === 'attending' ? '✓ 참석으로 투표됨' : '참석'}
                      </button>
                      <button 
                        name="status" 
                        value="absent"
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl active:scale-[0.98] transition ${myAttendance === 'absent' ? 'bg-red-500 text-white shadow-md shadow-red-500/20 border border-red-500' : 'bg-white border border-gray-200 text-gray-600'}`}
                      >
                        {myAttendance === 'absent' ? '✓ 불참으로 투표됨' : '불참'}
                      </button>
                      <button 
                        name="status" 
                        value="pending"
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl active:scale-[0.98] transition ${myAttendance === 'pending' ? 'bg-gray-500 text-white shadow-md shadow-gray-500/20 border border-gray-500' : 'bg-white border border-gray-200 text-gray-600'}`}
                      >
                        {myAttendance === 'pending' ? '✓ 미정으로 투표됨' : '미정'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-2 bg-white rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500">로그인 후 참석 여부를 투표할 수 있습니다.</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}
