"use client";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useId,
  useRef,
  useState,
} from "react";
import {
  costClass,
  displayName,
  MAX_COMMANDERS,
  totalCost,
} from "@/lib/commanders.ts";
import { CommanderItem } from "./commander-item.tsx";
import { SavedTeam } from "./saved-team.tsx";
import { useCostCalculator } from "./use-cost-calculator.ts";

const TEXT = {
  title: "삼국지 조조전 온라인 코스트 계산기",
  search: "장수 이름",
  save: "저장",
  empty: "선택된 장수 없음",
};

const CONTENT_CLASSES =
  "mx-auto w-full px-[15px] py-5 sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]";
const LIST_CLASSES = "m-0 flex list-none flex-col rounded p-0";
const LIST_ITEM_CLASSES =
  "relative mb-[-1px] block border border-[rgba(0,0,0,0.125)] bg-white px-5 py-3 first:rounded-t last:mb-0 last:rounded-b";
const COST_CLASSES = {
  success: "text-[#155724] bg-[#c3e6cb] hover:bg-[#b1dfbb] focus:bg-[#b1dfbb]",
  warning: "text-[#856404] bg-[#ffeeba] hover:bg-[#ffe8a1] focus:bg-[#ffe8a1]",
  danger: "text-[#721c24] bg-[#f5c6cb] hover:bg-[#f1b0b7] focus:bg-[#f1b0b7]",
} as const;

export function CostCalculator() {
  const model = useCostCalculator();
  const { commanders, selected, saved, update, save, removeSaved } = model;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeToken, setActiveToken] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const normalizedQuery = query.toLocaleLowerCase();
  const matches = commanders
    .filter((commander) => !selected.some((item) => item.id === commander.id))
    .filter((commander) =>
      [commander.name, commander.desc, commander.aka].some((value) =>
        value?.toLocaleLowerCase().includes(normalizedQuery),
      ),
    )
    .toSorted(
      (a, b) =>
        (b.order ?? Number.NEGATIVE_INFINITY) -
        (a.order ?? Number.NEGATIVE_INFINITY),
    );
  function changeQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setActiveToken(null);
  }
  function add(id: number) {
    const commander = commanders.find((item) => item.id === id);
    if (commander && selected.length < MAX_COMMANDERS) {
      update([...selected, commander]);
      setQuery("");
      setOpen(false);
    }
  }
  function remove(id: number) {
    update(selected.filter((item) => item.id !== id));
    setActiveToken(null);
  }
  function inputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (query || !["Backspace", "Delete"].includes(event.key)) {
      return;
    }
    let id = activeToken;
    if (id === null && event.key === "Backspace") {
      id = selected.at(-1)?.id ?? null;
    }
    if (id !== null) {
      event.preventDefault();
      remove(id);
      setOpen(false);
    }
  }
  const cost = totalCost(selected);
  const costStyle = COST_CLASSES[costClass(cost) as keyof typeof COST_CLASSES];
  return (
    <div className={CONTENT_CLASSES}>
      <div className="mb-[30px] text-center">
        <strong>{TEXT.title}</strong>
      </div>
      <ul className={`${LIST_CLASSES} mb-[30px] text-[0.95em]`}>
        {selected.length === 0 && (
          <li className={LIST_ITEM_CLASSES}>{TEXT.empty}</li>
        )}
        {selected.map((commander) => (
          <CommanderItem key={commander.id} commander={commander} />
        ))}
      </ul>
      <div className="mb-5">
        <div
          className={`relative mb-[-1px] block rounded border border-[rgba(0,0,0,0.125)] px-5 py-3 ${costStyle}`}
          aria-live="polite"
        >
          {`총 COST : ${cost}`}
        </div>
      </div>
      <div className="mb-5">
        <label className="mb-2 inline-block text-[0.9em]" htmlFor={searchId}>
          {TEXT.search}
        </label>
        <div className="relative flex w-full flex-wrap items-stretch">
          <div
            className="relative min-h-[38px] min-w-0 flex-1 overflow-visible rounded-l border border-[#ced4da] bg-white px-0 py-px text-[0.9em] text-[#495057]"
            aria-label="선택한 장수"
          >
            <div className="flex min-h-[34px] w-full flex-wrap items-start overflow-visible px-[9px] pt-[5px] pb-[2px] text-[#333] leading-5">
              {selected.map((commander) => (
                <button
                  className={[
                    "mr-[3px] mb-[3px] inline-flex cursor-pointer items-center whitespace-nowrap rounded-[3px] border-0 bg-[#efefef] px-[3px] py-px text-[14.4px] leading-5 text-[#333]",
                    activeToken === commander.id && "bg-[#428bca] text-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={commander.id}
                  type="button"
                  aria-pressed={activeToken === commander.id}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    inputRef.current?.focus();
                    setActiveToken(commander.id);
                    setOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" || event.key === "Delete") {
                      event.preventDefault();
                      remove(commander.id);
                      inputRef.current?.focus();
                    }
                  }}
                >
                  {displayName(commander)}
                </button>
              ))}
              <div className="static min-w-0 flex-1">
                <input
                  className="h-5 min-h-0 min-w-[80px] w-full flex-[1_1_80px] border-0 bg-transparent p-0 text-[14.4px] leading-5 text-[#333] outline-none"
                  id={searchId}
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded={open}
                  aria-controls="commander-options"
                  value={query}
                  onFocus={() => setOpen(true)}
                  onBlur={() => window.setTimeout(() => setOpen(false), 0)}
                  onChange={changeQuery}
                  onKeyDown={inputKeyDown}
                />
                {open && matches.length > 0 && (
                  <ul
                    id="commander-options"
                    className="absolute top-full right-0 left-0 z-10 mt-0.5 max-h-[202px] list-none overflow-y-auto rounded border border-[rgba(0,0,0,0.15)] bg-white p-[5px_0] leading-5 shadow-[0_6px_12px_rgba(0,0,0,0.176)]"
                  >
                    {matches.map((commander) => (
                      <li key={commander.id}>
                        <button
                          className="block w-full cursor-pointer border-0 bg-transparent px-[6px] py-[6px] text-left text-[#333] hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]"
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => add(commander.id)}
                        >
                          {displayName(commander)}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="-ml-px flex">
            <button
              className="inline-block cursor-pointer whitespace-nowrap rounded-r border border-[#6c757d] bg-transparent px-3 py-1.5 text-base font-normal leading-6 text-[#6c757d] hover:bg-[#6c757d] hover:text-white focus:bg-[#6c757d] focus:text-white"
              type="button"
              onClick={save}
            >
              {TEXT.save}
            </button>
          </div>
        </div>
      </div>
      <ul className={LIST_CLASSES}>
        {saved.map((team) => (
          <SavedTeam key={team.key} team={team} onRemove={removeSaved} />
        ))}
      </ul>
    </div>
  );
}
