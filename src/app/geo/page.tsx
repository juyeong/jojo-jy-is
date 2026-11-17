import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation.tsx";
import { TerrainTable } from "./terrain-table.tsx";

const description =
  "섬멸전/경쟁전/격전지/천리행 지형상성 - 삼국지 조조전 온라인";
export const metadata: Metadata = {
  title: "지형상성",
  description,
  openGraph: {
    title: "지형상성 - 삼국지 조조전 온라인",
    description,
    url: "/geo/",
  },
};
export default function GeoPage() {
  return (
    <>
      <SiteNavigation active="geo" />
      <main>
        <TerrainTable />
      </main>
    </>
  );
}
