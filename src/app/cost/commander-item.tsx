import type { Commander } from "@/lib/commanders.ts";
export function CommanderItem({ commander }: { commander: Commander }) {
  return (
    <li className="relative mb-[-1px] block border border-[rgba(0,0,0,0.125)] bg-white px-5 py-3 first:rounded-t last:mb-0 last:rounded-b">
      <div className="mb-0.5">
        <strong>{commander.name}</strong> | {commander.class} | {commander.cost}{" "}
        cost
      </div>
      <div className="text-[0.9em]">
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
