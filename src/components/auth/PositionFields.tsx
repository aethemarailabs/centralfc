"use client";

import { POSITION_GROUPS } from "@/lib/auth/constants";

const PRIMARY_PLACEHOLDER = "포지션 선택";

const fieldClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-central-sky focus:ring-1 focus:ring-central-sky transition text-gray-700";

type PositionFieldsProps = {
  primaryDefault?: string;
  secondaryDefault?: string;
  secondary2Default?: string;
};

function PositionOptions() {
  return (
    <>
      {POSITION_GROUPS.map((group) => (
        <optgroup key={group.line} label={group.label}>
          {group.options.map((position) => (
            <option key={position.value} value={position.value}>
              {position.label}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );
}

export default function PositionFields({
  primaryDefault = "",
  secondaryDefault = "",
  secondary2Default = "",
}: PositionFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label htmlFor="primaryPosition" className="block text-xs font-bold text-gray-700 mb-1">
          주포지션
        </label>
        <select
          id="primaryPosition"
          name="primaryPosition"
          className={fieldClass}
          required
          defaultValue={primaryDefault}
        >
          <option value="" disabled>
            {PRIMARY_PLACEHOLDER}
          </option>
          <PositionOptions />
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="secondaryPosition" className="block text-xs font-bold text-gray-700 mb-1">
            부포지션1
          </label>
          <select
            id="secondaryPosition"
            name="secondaryPosition"
            className={fieldClass}
            defaultValue={secondaryDefault}
          >
            <option value="">없음</option>
            <PositionOptions />
          </select>
        </div>
        <div>
          <label htmlFor="secondaryPosition2" className="block text-xs font-bold text-gray-700 mb-1">
            부포지션2
          </label>
          <select
            id="secondaryPosition2"
            name="secondaryPosition2"
            className={fieldClass}
            defaultValue={secondary2Default}
          >
            <option value="">없음</option>
            <PositionOptions />
          </select>
        </div>
      </div>
    </div>
  );
}
