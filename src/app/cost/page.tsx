import type { Metadata } from "next";
import { SiteNavigation } from "@/components/site-navigation.tsx";
import { CostCalculator } from "./cost-calculator.tsx";

const description =
  "섬멸전 코스트 계산기, 경쟁전 코스트 계산기, 장수 스킬 - 삼국지 조조전 온라인";
export const metadata: Metadata = {
  title: "코스트 계산기",
  description,
  openGraph: {
    title: "코스트 계산기 - 삼국지 조조전 온라인",
    description,
    url: "/cost/",
  },
};
export default function CostPage() {
  return (
    <>
      <SiteNavigation active="cost" />
      <main>
        <CostCalculator />
      </main>
    </>
  );
}
