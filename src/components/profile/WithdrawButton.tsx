"use client";

import { useActionState } from "react";
import { withdrawAction } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/auth/types";

const initialState: AuthFormState = {};

export default function WithdrawButton() {
  const [state, formAction, pending] = useActionState(withdrawAction, initialState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("정말 탈퇴할까요? 선수 정보가 삭제되고 선수단에서 사라집니다.")) {
          event.preventDefault();
        }
      }}
      className="px-1"
    >
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 text-sm font-bold text-red-500 disabled:opacity-60"
      >
        {pending ? "탈퇴 처리 중..." : "회원탈퇴"}
      </button>
      {state.error ? <p className="mt-1 text-center text-xs font-bold text-red-500">{state.error}</p> : null}
    </form>
  );
}
