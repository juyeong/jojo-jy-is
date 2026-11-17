import { useEffect, useState } from "react";
import characters from "@/data/characters.json" with { type: "json" };
import {
  type Commander,
  initialCommanders,
  readTeams,
  saveTeam,
} from "@/lib/commanders.ts";

export function useCostCalculator() {
  const [commanders, setCommanders] = useState<Commander[]>([]);
  const [selected, setSelected] = useState<Commander[]>([]);
  const [saved, setSaved] = useState<ReturnType<typeof readTeams>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const data = characters as Commander[];
    setCommanders(data);
    try {
      setSelected(initialCommanders(localStorage, data));
      setSaved(readTeams(localStorage, data));
    } catch {
      setError("브라우저 저장소를 사용할 수 없습니다.");
    }
    setLoading(false);
  }, []);
  function update(next: Commander[]) {
    setSelected(next);
    try {
      localStorage.setItem(
        "ids",
        next.map((commander) => commander.id).join(","),
      );
    } catch {
      setError("선택한 장수를 저장하지 못했습니다.");
    }
  }
  function save() {
    try {
      saveTeam(localStorage, selected);
      setSaved(readTeams(localStorage, commanders));
    } catch (cause) {
      if (
        cause instanceof Error &&
        cause.message === "최대 100개 까지 저장 가능"
      )
        window.alert(cause.message);
      else if (cause instanceof Error) setError(cause.message);
      else setError("저장하지 못했습니다.");
    }
  }
  function removeSaved(key: string) {
    try {
      localStorage.removeItem(key);
      setSaved(readTeams(localStorage, commanders));
    } catch {
      setError("저장한 조합을 삭제하지 못했습니다.");
    }
  }
  return {
    commanders,
    selected,
    saved,
    loading,
    error,
    update,
    save,
    removeSaved,
  };
}
