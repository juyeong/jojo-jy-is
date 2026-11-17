import { type Commander, totalCost } from "@/lib/commanders.ts";

const DELETE_LABEL = "삭제";
export function SavedTeam({
  team,
  onRemove,
}: {
  team: { key: string; commanders: Commander[] };
  onRemove: (key: string) => void;
}) {
  function remove() {
    onRemove(team.key);
  }
  return (
    <li className="relative mb-[-1px] block border border-[rgba(0,0,0,0.125)] bg-white px-5 pt-3 pb-0 first:rounded-t last:mb-0 last:rounded-b">
      <span>{`[${totalCost(team.commanders)}] ${team.commanders.map((commander) => commander.name).join(", ")}`}</span>
      <div className="flex justify-end">
        <button
          className="inline-block cursor-pointer border-0 bg-transparent px-3 py-1.5 font-normal text-[#007bff] hover:text-[#0056b3] hover:underline"
          type="button"
          aria-label={`저장 조합 ${team.key} 삭제`}
          onClick={remove}
        >
          {DELETE_LABEL}
        </button>
      </div>
    </li>
  );
}
