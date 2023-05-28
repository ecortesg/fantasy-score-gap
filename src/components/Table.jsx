import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function Table({ data }) {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: "player",
      header: "Player",
    }),
    columnHelper.accessor((row) => row.position, {
      id: "position",
      header: "Position",
    }),
    columnHelper.accessor((row) => row.stats.gp, {
      id: "games",
      header: "Games",
    }),
    columnHelper.group({
      id: "league_1",
      header: "League 1",
      columns: [
        columnHelper.accessor("rank1", {
          header: "Rank",
        }),
        columnHelper.accessor("position_rank1", {
          header: "Pos Rank",
        }),
        columnHelper.accessor("fpts1", {
          header: "FPts",
        }),
        columnHelper.accessor("fpts_per_game1", {
          header: "FPts/Game",
        }),
      ],
    }),
    columnHelper.group({
      id: "league_2",
      header: "League 2",
      columns: [
        columnHelper.accessor("rank2", {
          header: "Rank",
        }),
        columnHelper.accessor("position_rank2", {
          header: "Pos Rank",
        }),
        columnHelper.accessor("fpts2", {
          header: "FPts",
        }),
        columnHelper.accessor("fpts_per_game2", {
          header: "FPts/Game",
        }),
      ],
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="px-5 pb-5">
      <table className="w-full table-auto">
        <thead className="border-b sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none p-1"
                          : "border-b border-black mx-1 p-1",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-y-auto">
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b hover:bg-slate-100" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="whitespace-nowrap px-2" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
