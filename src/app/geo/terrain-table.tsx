"use client";
import { useState } from "react";
import {
  isTerrainTab,
  TERRAIN_TABS,
  type TerrainRow,
  type TerrainTab,
  UNIT_TYPES,
} from "@/lib/terrain.ts";
import { TerrainCell } from "./terrain-cell.tsx";
import { TerrainHeader, type TerrainSort } from "./terrain-header.tsx";
import { TerrainTabButton } from "./terrain-tab-button.tsx";
import { useTerrain } from "./use-terrain.ts";

const TEXT = { title: "삼국지 조조전 온라인 지형상성표" };
function sortRows(rows: TerrainRow[], sort: TerrainSort | null): TerrainRow[] {
  if (!sort) return rows;
  return rows.sort((a, b) => {
    let result = Number(a[sort.field] ?? 0) - Number(b[sort.field] ?? 0);
    if (sort.field === "병종") result = a.병종.localeCompare(b.병종, "ko");
    if (sort.ascending) return result;
    return -result;
  });
}
export function TerrainTable() {
  const { tab, setTab, data, error } = useTerrain();
  const [sort, setSort] = useState<TerrainSort | null>(null);
  const { groups } = TERRAIN_TABS[tab];
  const rows = sortRows(
    UNIT_TYPES.map(
      (unit) => data.find((row) => row.병종 === unit) ?? { 병종: unit },
    ),
    sort,
  );
  function select(next: TerrainTab) {
    setTab(next);
    setSort(null);
    globalThis.location.hash = next;
  }
  return (
    <div className="mx-auto w-full max-w-[900px] px-[15px] py-5">
      <div className="mb-[30px] text-center">
        <strong>{TEXT.title}</strong>
      </div>
      <div className="mx-auto my-[10px] mb-[30px] text-center">
        <div
          className="relative inline-flex align-middle"
          role="group"
          aria-label="전장 선택"
        >
          {Object.entries(TERRAIN_TABS).map(([key, value]) => {
            if (!isTerrainTab(key)) return null;
            return (
              <TerrainTabButton
                key={key}
                tab={key}
                active={key === tab}
                label={value.label}
                onSelect={select}
              />
            );
          })}
        </div>
      </div>
      <div className="block w-full overflow-x-auto text-center [-webkit-overflow-scrolling:touch]">
        <table className="mb-4 w-full border-collapse text-center text-[14px] text-[#212529] max-[36em]:text-[12px]">
          <thead>
            <tr>
              {groups.map((group, index) => (
                <td
                  className={`border-t border-[#dee2e6] px-3 py-3 align-top ${index % 2 === 1 ? "bg-[rgba(0,0,0,0.075)]" : ""}`}
                  key={group.type}
                  colSpan={group.fields.length}
                >
                  {group.type}
                </td>
              ))}
            </tr>
            <tr>
              {groups.flatMap((group, index) =>
                group.fields.map((field) => (
                  <TerrainHeader
                    key={`${group.type}-${field}`}
                    field={field}
                    active={index % 2 === 1}
                    sort={sort}
                    setSort={setSort}
                  />
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.병종}>
                {groups.flatMap((group) =>
                  group.fields.map((field) => (
                    <TerrainCell
                      key={`${group.type}-${field}`}
                      field={field}
                      row={row}
                    />
                  )),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error.length > 0 && <p role="alert">{error}</p>}
    </div>
  );
}
