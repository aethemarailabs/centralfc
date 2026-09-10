"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/auth/types";

const initialState: AuthFormState = {};

const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="username" className="block text-xs font-bold text-gray-700 mb-1">
          아이디
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="아이디"
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
          autoComplete="current-password"
          placeholder="비밀번호"
          className={fieldClass}
          required
        />
      </div>

      {state.error ? <p className="text-xs font-bold text-red-500">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 bg-central-navy text-white text-sm font-bold rounded-xl disabled:opacity-60"
      >
        {pending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
