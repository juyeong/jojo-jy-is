export interface TerrainGroup {
  type: string;
  fields: string[];
}
// biome-ignore lint/style/useNamingConvention: External API uses Korean column names.
export type TerrainRow = { 병종: string } & Record<string, string | number>;
export const UNIT_TYPES = [
  "군주",
  "보병",
  "궁병",
  "노병",
  "창병",
  "경기병",
  "중기병",
  "산악기병",
  "궁기병",
  "포차",
  "무인",
  "적병",
  "책사",
  "풍수사",
  "도사",
  "무희",
  "전차",
  "수군",
  "웅술사",
  "호술사",
  "도독",
  "현자",
  "마왕",
  "검사",
  "군악대",
  "천자",
  "노전차",
  "효기병",
];
export const TERRAIN_TABS = {
  battleground: {
    label: "격전지",
    groups: [
      { type: "", fields: ["병종", "격전지"] },
      { type: "중광", fields: ["산지", "완류"] },
      { type: "북광", fields: ["설원", "숲"] },
      { type: "남광", fields: ["완류", "황무지"] },
      { type: "서광", fields: ["사막", "평지"] },
      { type: "동광", fields: ["초원", "설원"] },
    ],
  },
  gates: {
    label: "섬멸전",
    groups: [
      { type: "", fields: ["병종"] },
      { type: "난투장", fields: ["난투장"] },
      { type: "산지 (익주)", fields: ["산지", "숲"] },
      { type: "설원 (병주)", fields: ["설원", "빙판"] },
      { type: "초원 (기주)", fields: ["평지", "초원"] },
      { type: "사막 (옹주)", fields: ["황무지", "사막"] },
      { type: "도성 (사주)", fields: ["성내", "가옥"] },
      { type: "장강 (양주)", fields: ["완류", "습지"] },
    ],
  },
  annihilation: {
    label: "천리행",
    groups: [
      { type: "", fields: ["병종"] },
      { type: "초원의 관문", fields: ["평지"] },
      { type: "사막의 관문", fields: ["황무지", "사막"] },
      { type: "산지의 관문", fields: ["산지", "숲"] },
      { type: "완류의 관문", fields: ["완류"] },
      { type: "설원의 관문", fields: ["설원"] },
    ],
  },
  officer: {
    label: "무장전",
    groups: [
      { type: "", fields: ["병종"] },
      { type: "태양의 결투장", fields: ["태양"] },
      { type: "창천의 결투장", fields: ["창천"] },
      { type: "신록의 결투장", fields: ["신록"] },
      { type: "혹한의 결투장", fields: ["혹한"] },
      { type: "영웅의 결투장", fields: ["결투장"] },
    ],
  },
} satisfies Record<string, { label: string; groups: TerrainGroup[] }>;
export type TerrainTab = keyof typeof TERRAIN_TABS;
export function isTerrainTab(value: string): value is TerrainTab {
  return Object.hasOwn(TERRAIN_TABS, value);
}
const STANDARD_TERRAIN = 100;
const ARENA_TERRAIN = 200;
export function isHighlighted(field: string, stat: number): boolean {
  if (field === "평지" || field === "초원") {
    return stat > STANDARD_TERRAIN;
  }
  if (["난투장", "격전지", "결투장"].includes(field)) {
    return stat > ARENA_TERRAIN;
  }
  return stat >= STANDARD_TERRAIN;
}
