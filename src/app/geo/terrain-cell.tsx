import { isHighlighted, type TerrainRow } from "@/lib/terrain.ts";
export function TerrainCell({
  field,
  row,
}: {
  field: string;
  row: TerrainRow;
}) {
  if (field === "병종") return <th scope="row">{row.병종}</th>;
  let className: string | undefined;
  if (isHighlighted(field, Number(row[field]))) className = "table-success";
  let value = "-";
  if (row[field]) value = Number(row[field]).toFixed(0);
  return <td className={className}>{value}</td>;
}
