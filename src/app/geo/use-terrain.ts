import { useEffect, useState } from "react";
import geoData from "@/data/geo.json" with { type: "json" };
import {
  isTerrainTab,
  type TerrainRow,
  type TerrainTab,
} from "@/lib/terrain.ts";
export function useTerrain() {
  const [tab, setTab] = useState<TerrainTab>("battleground");
  const [data, setData] = useState<TerrainRow[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    function readHash() {
      const hash = globalThis.location.hash.slice(1);
      const next = isTerrainTab(hash) ? hash : "battleground";
      setTab(next);
      if (globalThis.location.hash !== `#${next}`) globalThis.location.hash = next;
    }
    readHash();
    globalThis.addEventListener("hashchange", readHash);
    const controller = new AbortController();
    async function load() {
      if (controller.signal.aborted) return;
      setData(geoData as TerrainRow[]);
    }
    load().catch(() => {
      // biome-ignore lint/security/noSecrets: Korean user-facing error message.
      if (!controller.signal.aborted)
        setError("지형 정보를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.");
    });
    return () => {
      controller.abort();
      globalThis.removeEventListener("hashchange", readHash);
    };
  }, []);
  return { tab, setTab, data, error };
}
