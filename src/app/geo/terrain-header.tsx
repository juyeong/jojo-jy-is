import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
export interface TerrainSort {
  field: string;
  ascending: boolean;
}
export function TerrainHeader({
  field,
  active,
  sort,
  setSort,
}: {
  field: string;
  active: boolean;
  sort: TerrainSort | null;
  setSort: Dispatch<SetStateAction<TerrainSort | null>>;
}) {
  let direction: "none" | "ascending" | "descending" = "none";
  if (sort?.field === field) {
    direction = "descending";
    if (sort.ascending) direction = "ascending";
  }
  function changeSort() {
    let ascending = field === "병종";
    if (sort?.field === field) ascending = !sort.ascending;
    setSort({ field, ascending });
  }
  function keyDown(event: KeyboardEvent<HTMLTableCellElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      changeSort();
    }
  }
  return (
    <th
      className={`border-t border-b-2 border-[#dee2e6] px-3 py-3 align-bottom font-bold max-[36em]:text-[12px] ${active ? "bg-[rgba(0,0,0,0.075)]" : ""} cursor-pointer`}
      scope="col"
      aria-sort={direction}
      data-sort={field}
      tabIndex={0}
      onClick={changeSort}
      onKeyDown={keyDown}
    >
      {field}
    </th>
  );
}
