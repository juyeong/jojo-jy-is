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
  return (
    <div className="container cost-container">
      <div className="page-title">
        <strong>{TEXT.title}</strong>
      </div>
      <ul className="active-characters list-group">
        {selected.length === 0 && (
          <li className="list-group-item">{TEXT.empty}</li>
        )}
        {selected.map((commander) => (
          <CommanderItem key={commander.id} commander={commander} />
        ))}
      </ul>
      <div className="total-cost-wrapper">
        <div
          className={`list-group-item list-group-item-action list-group-item-${costClass(cost)}`}
          aria-live="polite"
        >
          {`총 COST : ${cost}`}
        </div>
      </div>
      <div className="cost-input-wrapper">
        <label htmlFor={searchId}>{TEXT.search}</label>
        <div className="input-group">
          <div
            className="form-control commander-control"
            aria-label="선택한 장수"
          >
            <div className="commander-selectize-input">
              {selected.map((commander) => (
                <button
                  className={[
                    "commander-token",
                    activeToken === commander.id && "active",
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
              <div className="commander-search">
                <input
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
                  <ul id="commander-options" className="commander-options">
                    {matches.map((commander) => (
                      <li key={commander.id}>
                        <button
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
          <div className="commander-save input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={save}
            >
              {TEXT.save}
            </button>
          </div>
        </div>
      </div>
      <ul className="saved-characters list-group">
        {saved.map((team) => (
          <SavedTeam key={team.key} team={team} onRemove={removeSaved} />
        ))}
      </ul>
    </div>
  );
}
