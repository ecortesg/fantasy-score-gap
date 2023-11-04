import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { usePersistentSettingsStore } from "../store/dashboardSettingsStore";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

function Table({ data }) {
  const positions = usePersistentSettingsStore((state) => state.positions);
  const [activePill, setActivePill] = useState("");

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: "player",
      header: "Player",
      size: 200,
    }),
    columnHelper.accessor((row) => row.team, {
      id: "team",
      header: "Team",
      size: 120,
    }),
    columnHelper.accessor((row) => row.position, {
      id: "position",
      header: "Position",
      size: 120,
    }),
    columnHelper.accessor((row) => row.stats.gp, {
      id: "games",
      header: "Games",
      size: 120,
    }),
    columnHelper.group({
      id: "league_1",
      header: "League 1",
      columns: [
        columnHelper.accessor("rank1", {
          header: "Rank",
          size: 120,
        }),
        columnHelper.accessor("position_rank1", {
          header: "Pos Rank",
          size: 120,
        }),
        columnHelper.accessor("fpts1", {
          header: "FPts",
          size: 120,
        }),
        columnHelper.accessor("fpts_per_game1", {
          header: "FPts/G",
          size: 120,
        }),
      ],
    }),
    columnHelper.group({
      id: "league_2",
      header: "League 2",
      columns: [
        columnHelper.accessor("rank2", {
          header: "Rank",
          size: 120,
        }),
        columnHelper.accessor("position_rank2", {
          header: "Pos Rank",
          size: 120,
        }),
        columnHelper.accessor("fpts2", {
          header: "FPts",
          size: 120,
        }),
        columnHelper.accessor("fpts_per_game2", {
          header: "FPts/G",
          size: 120,
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
    setActivePill(value);
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
        <div className="flex gap-2 shrink-0 flex-wrap justify-center">
          <PositionFilterPill
            key="ALL"
            label="ALL"
            position=""
            activePill={activePill}
            handlePositionChange={handlePositionChange}
          />
          {Object.keys(positions).map((position) => {
            if (positions[position] > 0) {
              return (
                <PositionFilterPill
                  key={position}
                  label={position}
                  position={position}
                  activePill={activePill}
                  handlePositionChange={handlePositionChange}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="border-b sticky top-0 bg-white dark:bg-slate-700 whitespace-nowrap z-10">
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
                            ? "cursor-pointer py-1 flex items-center justify-center"
                            : "border-b border-black dark:border-white mx-1 py-1",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{" "}
                        {header.column.getCanSort()
                          ? {
                              asc: <FaSortUp className="h-3" />,
                              desc: <FaSortDown className="h-3" />,
                            }[header.column.getIsSorted()] ?? (
                              <FaSort className="h-3" />
                            )
                          : ""}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="overflow-auto">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                className={`border-b hover:bg-slate-200 dark:hover:bg-slate-800 border-none ${
                  index % 2 === 0 ? "bg-slate-100 dark:bg-slate-600" : ""
                }`}
                key={row.id}
              >
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

function PositionFilterPill({
  activePill,
  position,
  label,
  handlePositionChange,
}) {
  return (
    <div
      className={`${
        activePill === position
          ? "bg-blue-500 dark:bg-indigo-500 text-white"
          : "hover:bg-slate-200 dark:hover:bg-slate-600"
      } rounded-full w-12 cursor-pointer text-center`}
      onClick={() => handlePositionChange(position)}
    >
      {label}
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
    <div className="relative">
      <input
        id="filter_player"
        className="border rounded pl-2 pr-8 py-1 bg-slate-200 dark:bg-slate-800 border-none outline-none"
        type="text"
        placeholder="Find player"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== "" && (
        <VscClose
          className="absolute right-1 top-[3px] h-7 w-7 rounded-full cursor-pointer"
          onClick={() => setValue("")}
        />
      )}
    </div>
  );
}
