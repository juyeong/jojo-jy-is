import type { TerrainTab } from "@/lib/terrain.ts";
export function TerrainTabButton({
  tab,
  active,
  label,
  onSelect,
}: {
  tab: TerrainTab;
  active: boolean;
  label: string;
  onSelect: (tab: TerrainTab) => void;
}) {
  function select() {
    onSelect(tab);
  }
  return (
    <label
      className={`relative inline-block cursor-pointer border border-[#6c757d] px-2 py-1 text-[0.875rem] leading-[1.5] first:rounded-l-[0.2rem] last:rounded-r-[0.2rem] ${active ? "bg-[#6c757d] text-white" : "bg-transparent text-[#6c757d]"} ${active ? "" : "hover:bg-[#6c757d] hover:text-white"} [&:not(:first-child)]:-ml-px`}
    >
      <input
        className="absolute h-px w-px overflow-hidden opacity-0"
        id={`${tab}-tab`}
        type="radio"
        name="terrain-tab"
        checked={active}
        onChange={select}
        onFocus={select}
      />{" "}
      {label}
    </label>
  );
}
