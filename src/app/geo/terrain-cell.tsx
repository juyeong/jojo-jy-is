import { isHighlighted, type TerrainRow } from "@/lib/terrain.ts";
export function TerrainCell({
  field,
  row,
}: {
  field: string;
  row: TerrainRow;
}) {
  const cellClasses =
    "border-t border-[#dee2e6] px-3 py-3 align-top max-[36em]:text-[12px]";
  if (field === "병종") {
    return (
      <th className={`${cellClasses} font-bold`} scope="row">
        {row.병종}
      </th>
    );
  }
  let className = cellClasses;
  if (isHighlighted(field, Number(row[field]))) {
    className += " bg-[#c3e6cb]";
  }
  let value = "-";
  if (row[field]) value = Number(row[field]).toFixed(0);
  return <td className={className}>{value}</td>;
}
