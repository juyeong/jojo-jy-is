import type { Commander } from "@/lib/commanders.ts";
export function CommanderItem({ commander }: { commander: Commander }) {
  return (
    <li className="list-group-item">
      <div className="commander-name-line">
        <strong>{commander.name}</strong> | {commander.class} | {commander.cost}{" "}
        cost
      </div>
      <div className="commander-skills">
        {[
          commander.skill1,
          commander.skill2,
          commander.skill3,
          commander.skill4,
        ].join(" | ")}
      </div>
    </li>
  );
}
