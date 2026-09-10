"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/app/actions/auth";
import { avatarPublicUrl } from "@/lib/auth/avatar";
import { gradeLabel } from "@/lib/auth/constants";
import type { AuthFormState, PublicMember } from "@/lib/auth/types";
import PhotoPicker from "@/components/auth/PhotoPicker";
import PositionFields from "@/components/auth/PositionFields";
import WithdrawButton from "./WithdrawButton";

const initialState: AuthFormState = {};

const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition text-gray-700";

export default function ProfileForm({ member }: { member: PublicMember }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  return (
    <div className="flex flex-col gap-5">
    <form id="profile-form" action={formAction} className="flex flex-col gap-5">
      <section className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">내 선수 정보</h2>
          <span className="text-[10px] bg-central-navy text-white px-2 py-0.5 rounded font-bold">
            {gradeLabel(member.role, member.managerTitle)}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <PhotoPicker currentUrl={avatarPublicUrl(member.photoPath)} />

          <div>
            <label htmlFor="username" className="block text-xs font-bold text-gray-700 mb-1">
              아이디
            </label>
            <input
              id="username"
              value={member.username}
              className={`${fieldClass} text-gray-400`}
              disabled
              readOnly
            />
          </div>

          <div>
            <label htmlFor="displayName" className="block text-xs font-bold text-gray-700 mb-1">
              이름
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              defaultValue={member.displayName}
              className={fieldClass}
              required
            />
          </div>

          <div>
            <label htmlFor="jerseyNumber" className="block text-xs font-bold text-gray-700 mb-1">
              등번호
            </label>
            <input
              id="jerseyNumber"
              name="jerseyNumber"
              type="number"
              min={1}
              max={99}
              defaultValue={member.jerseyNumber ?? ""}
              className={fieldClass}
              required
            />
          </div>

          <PositionFields
            primaryDefault={member.primaryPosition ?? ""}
            secondaryDefault={member.secondaryPosition ?? ""}
            secondary2Default={member.secondaryPosition2 ?? ""}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="heightCm" className="block text-xs font-bold text-gray-700 mb-1">
                키 (cm)
              </label>
              <input
                id="heightCm"
                name="heightCm"
                type="number"
                min={100}
                max={230}
                defaultValue={member.heightCm ?? ""}
                className={fieldClass}
                required
              />
            </div>
            <div>
              <label htmlFor="weightKg" className="block text-xs font-bold text-gray-700 mb-1">
                몸무게 (kg)
              </label>
              <input
                id="weightKg"
                name="weightKg"
                type="number"
                min={30}
                max={180}
                defaultValue={member.weightKg ?? ""}
                className={fieldClass}
                required
              />
            </div>
          </div>
        </div>
      </section>

      {state.error ? <p className="text-xs font-bold text-red-500 px-1">{state.error}</p> : null}
      {state.success ? <p className="text-xs font-bold text-emerald-600 px-1">{state.success}</p> : null}
    </form>

      {member.role !== "master" ? <WithdrawButton /> : null}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40">
        <button
          type="submit"
          form="profile-form"
          disabled={pending}
          className="w-full py-4 bg-central-navy text-white text-base font-bold rounded-xl disabled:opacity-60"
        >
          {pending ? "저장 중..." : "내 정보 저장"}
        </button>
      </div>
    </div>
  );
}
