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
    <label className={`btn btn-outline-secondary${active ? " active" : ""}`}>
      <input
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
