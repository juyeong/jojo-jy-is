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
    <li className="list-group-item saved-character">
      <span>{`[${totalCost(team.commanders)}] ${team.commanders.map((commander) => commander.name).join(", ")}`}</span>
      <div className="saved-character-actions">
        <button
          className="btn btn-link"
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
