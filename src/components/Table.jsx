import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

function Table({ data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: "player",
      header: "Player",
      size: 200,
    }),
    columnHelper.accessor((row) => row.position, {
      id: "position",
      header: "Position",
      size: 80,
    }),
    columnHelper.accessor((row) => row.stats.gp, {
      id: "games",
      header: "Games",
      size: 80,
    }),
    columnHelper.group({
      id: "league_1",
      header: "League 1",
      columns: [
        columnHelper.accessor("rank1", {
          header: "Rank",
          size: 80,
        }),
        columnHelper.accessor("position_rank1", {
          header: "Pos Rank",
          size: 80,
        }),
        columnHelper.accessor("fpts1", {
          header: "FPts",
          size: 80,
        }),
        columnHelper.accessor("fpts_per_game1", {
          header: "FPts/G",
          size: 80,
        }),
      ],
    }),
    columnHelper.group({
      id: "league_2",
      header: "League 2",
      columns: [
        columnHelper.accessor("rank2", {
          header: "Rank",
          size: 80,
        }),
        columnHelper.accessor("position_rank2", {
          header: "Pos Rank",
          size: 80,
        }),
        columnHelper.accessor("fpts2", {
          header: "FPts",
          size: 80,
        }),
        columnHelper.accessor("fpts_per_game2", {
          header: "FPts/G",
          size: 80,
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
    <div className="p-4 h-full flex flex-col">
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <PlayerFilter
          column={playerColumn}
          handlePlayerChange={handlePlayerChange}
        />
        <PositionFilter handlePositionChange={handlePositionChange} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="border-b sticky top-0 bg-white whitespace-nowrap z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                      minWidth: header.minSize,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer py-1"
                            : "border-b border-black mx-1 py-1",
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
                  <td className="whitespace-nowrap" key={cell.id}>
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
  const positions = useDashboardSettingsStore((state) => state.positions);

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
      {Object.keys(positions).map((key) => {
        if (positions[key] > 0) {
          return (
            <div key={key}>
              <input
                type="radio"
                id={`filter_${key}`}
                name="position"
                value={key}
                className="mx-1"
              ></input>
              <label htmlFor={`filter_${key}`}>{key}</label>
            </div>
          );
        }
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
      id="filter_player"
      className="border rounded px-2 py-1"
      type="text"
      placeholder="Find player"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
