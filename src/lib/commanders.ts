export interface Commander {
  id: number;
  name: string;
  class: string;
  cost: number;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  order?: number;
  desc?: string | null;
  aka?: string;
}
export const MAX_COMMANDERS = 7;
const MAX_SAVED_TEAMS = 100;
const MIN_COMMANDER_ID = 1_000_000;
const DEFAULT_FIRST_ID = 1_100_001;
const DEFAULT_EXTRA_ID = 1_100_171;
const DEFAULT_POOL_SIZE = 26;
const DEFAULT_TEAM_SIZE = 5;
const WARNING_COST = 99;
const DANGER_COST = 145;

export function costClass(cost: number): string {
  if (cost > DANGER_COST) return "danger";
  if (cost > WARNING_COST) return "warning";
  return "success";
}
export function totalCost(commanders: Commander[]): number {
  return commanders.reduce((total, commander) => total + commander.cost, 0);
}
export function displayName(commander: Commander): string {
  if (commander.desc === undefined || commander.desc === null)
    return commander.name;
  return `${commander.name} ${commander.desc}`;
}
export function resolveCommanders(
  value: string | null,
  commanders: Commander[],
): Commander[] {
  const ids = (value ?? "").split(",").map(Number);
  return [...new Set(ids)]
    .flatMap((id) => {
      const commander = commanders.find((item) => item.id === id);
      if (commander) return [commander];
      return [];
    })
    .slice(0, MAX_COMMANDERS);
}
export function initialCommanders(
  storage: Storage,
  commanders: Commander[],
): Commander[] {
  const saved = storage.getItem("ids");
  if (saved?.split(",").every((id) => Number(id) > MIN_COMMANDER_ID))
    return resolveCommanders(saved, commanders);
  const defaults = [
    ...Array.from(
      { length: DEFAULT_POOL_SIZE },
      (_, index) => DEFAULT_FIRST_ID + index,
    ),
    DEFAULT_EXTRA_ID,
  ];
  for (let index = defaults.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [defaults[index], defaults[other]] = [defaults[other], defaults[index]];
  }
  return resolveCommanders(
    defaults.slice(0, DEFAULT_TEAM_SIZE).join(","),
    commanders,
  );
}
export function savedKeys(storage: Storage): string[] {
  return Array.from({ length: storage.length }, (_, index) =>
    storage.key(index),
  )
    .filter((key): key is string => key !== null && key.startsWith("saved_"))
    .sort((a, b) => {
      if (a < b) return 1;
      return -1;
    });
}
export function saveTeam(storage: Storage, commanders: Commander[]): void {
  if (savedKeys(storage).length >= MAX_SAVED_TEAMS)
    throw new Error("최대 100개 까지 저장 가능");
  const previous = Number.parseInt(storage.getItem("_id") ?? "0", 10);
  let id = 1;
  if (Number.isFinite(previous)) id = previous + 1;
  storage.setItem("_id", String(id));
  if (commanders.length === 0) return;
  storage.setItem(
    `saved_${id}`,
    commanders.map((commander) => commander.id).join(","),
  );
}
export function readTeams(storage: Storage, commanders: Commander[]) {
  return savedKeys(storage).map((key) => ({
    key,
    commanders: resolveCommanders(storage.getItem(key), commanders),
  }));
}
