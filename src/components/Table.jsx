import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { POSITIONS } from "../data/fields_data";

function Table({ data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

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
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const playerColumn = table.getColumn("player");
  const positionColumn = table.getColumn("position");

  function handlePositionChange(value) {
    positionColumn.setFilterValue(value);
  }

  function handlePlayerChange(value) {
    playerColumn.setFilterValue(value);
  }

  return (
    <div className="p-5 h-full">
      <div className="flex md:flex-row flex-col md:gap-6 gap-4 items-center h-1/4 md:h-[10%]">
        <PlayerFilter
          column={playerColumn}
          handlePlayerChange={handlePlayerChange}
        />
        <PositionFilter handlePositionChange={handlePositionChange} />
      </div>
      <div className="overflow-x-auto h-3/4 md:h-[90%]">
        <table className="table-auto w-full">
          <thead className="border-b sticky top-0 bg-white whitespace-nowrap">
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
          <tbody className="overflow-auto">
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
    </div>
  );
}

export default Table;

function PositionFilter({ handlePositionChange }) {
  return (
    <div
      className="flex gap-2 shrink-0"
      onChange={(e) => handlePositionChange(e.target.value)}
    >
      <div key="ALL">
        <input
          type="radio"
          id="ALL"
          name="position"
          value=""
          defaultChecked={true}
          className="mx-1"
        ></input>
        <label htmlFor="ALL">ALL</label>
      </div>
      {POSITIONS.map((pos) => {
        return (
          <div key={pos.id}>
            <input
              type="radio"
              id={`filter-${pos.id}`}
              name="position"
              value={pos.id}
              className="mx-1"
            ></input>
            <label htmlFor={`filter-${pos.id}`}>{pos.label}</label>
          </div>
        );
      })}
    </div>
  );
}

function PlayerFilter({ column, handlePlayerChange, debounce = 500 }) {
  const columnFilterValue = column.getFilterValue() ?? "";
  const [value, setValue] = useState(columnFilterValue);

  useEffect(() => {
    setValue(columnFilterValue);
  }, [columnFilterValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handlePlayerChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      className="border rounded px-2 py-1 shadow"
      type="text"
      placeholder="Find player"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
