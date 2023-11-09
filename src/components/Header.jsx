import { useState, useEffect } from "react";
import { useQueryFiltersStore } from "../store/queryFiltersStore";
import { usePersistentSettingsStore } from "../store/dashboardSettingsStore";

function Header() {
  const [queryFilters, updateQueryFilters] = useQueryFiltersStore((state) => [
    state.queryFilters,
    state.updateQueryFilters,
  ]);

  function handleChange1(e) {
    updateQueryFilters({ [e.target.id]: e.target.value });
  }

  useEffect(() => {
    const url = new URL(window.location);
    Object.keys(queryFilters).forEach((key) => {
      url.searchParams.set(key, queryFilters[key]);
    });
    window.history.replaceState(null, "", url);
  }, [queryFilters]);

  const [positions, updatePositions] = usePersistentSettingsStore((state) => [
    state.positions,
    state.updatePositions,
  ]);

  const [positionCount, setPositionCount] = useState(positions);

  function handleChange2(e) {
    setPositionCount({ ...positionCount, [e.target.name]: e.target.value });
  }

  const handleBlur = (e) => {
    const inputValue = Number(positionCount[e.target.name]) || 0;
    updatePositions({ [e.target.name]: inputValue });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  return (
    <div className="h-auto xl:h-14 bg-white dark:bg-slate-700 flex flex-col xl:flex-row justify-between items-center xl:py-2 py-4 xl:px-6 gap-4">
      <div className="flex gap-4">
        <select
          name="season"
          id="season"
          value={queryFilters.season}
          onChange={handleChange1}
          className="border rounded bg-slate-200 dark:bg-slate-800 border-none outline-none font-bold px-2 py-1"
        >
          {Array.from({ length: 2023 - 2020 + 1 }, (_, index) => 2020 + index)
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))
            .reverse()}
        </select>
        <select
          name="week"
          id="week"
          value={queryFilters.week}
          onChange={handleChange1}
          className="border rounded bg-slate-200 dark:bg-slate-800 border-none outline-none font-bold px-2 py-1"
        >
          <option value="season">Season</option>
          {[...Array(18)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              Week {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-2 xl:gap-4">
        {Object.keys(positions).map((key) => {
          return (
            <div
              key={key}
              className="grid text-center lg:flex justify-center lg:gap-2 gap-1 place-items-center content-start"
            >
              <label htmlFor={`count-${key}`}>{key}</label>
              <input
                id={`count-${key}`}
                name={key}
                type="number"
                inputMode="numeric"
                min="0"
                max="999"
                value={positionCount[key].toString()}
                onChange={handleChange2}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="px-2 py-1 rounded w-16 bg-slate-200 dark:bg-slate-800 outline-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
