"use client";

import { useActionState } from "react";
import { signupAction } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/auth/types";
import PhotoPicker from "./PhotoPicker";
import PositionFields from "./PositionFields";

const initialState: AuthFormState = {};

const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition text-gray-700";

export default function JoinForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <form id="join-form" action={formAction} className="flex flex-col gap-5">
      <section className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">계정 정보</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-xs font-bold text-gray-700 mb-1">
              아이디
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="영문, 숫자, _ 4~20자"
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="4자 이상"
              className={fieldClass}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="block text-xs font-bold text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력"
              className={fieldClass}
              required
            />
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">선수 정보</h2>
          <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold">필수</span>
        </div>

        <div className="flex flex-col gap-4">
          <PhotoPicker />

          <div>
            <label htmlFor="displayName" className="block text-xs font-bold text-gray-700 mb-1">
              이름
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="예: 홍길동"
              className={fieldClass}
              required
            />
          </div>

          <div>
            <label htmlFor="jerseyNumber" className="block text-xs font-bold text-gray-700 mb-1">
              희망 등번호
            </label>
            <input
              id="jerseyNumber"
              name="jerseyNumber"
              type="number"
              min={1}
              max={99}
              placeholder="예: 10"
              className={fieldClass}
              required
            />
          </div>

          <PositionFields />

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
                placeholder="180"
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
                placeholder="75"
                className={fieldClass}
                required
              />
            </div>
          </div>
        </div>
      </section>

      {state.error ? <p className="text-xs font-bold text-red-500 px-1">{state.error}</p> : null}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40">
        <button
          type="submit"
          form="join-form"
          disabled={pending}
          className="w-full py-4 bg-central-navy text-white text-base font-bold rounded-xl disabled:opacity-60"
        >
          {pending ? "등록 중..." : "선수 등록하기"}
        </button>
      </div>
    </form>
  );
}
