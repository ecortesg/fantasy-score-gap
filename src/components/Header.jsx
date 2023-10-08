import { useState, useEffect } from "react";
import { useQueryFiltersStore } from "../store/queryFiltersStore";
import { useDashboardSettingsStore } from "../store/dashboardSettingsStore";

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

  const [positions, updatePositions] = useDashboardSettingsStore((state) => [
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
    <div className="h-auto xl:h-14 bg-white flex flex-col xl:flex-row justify-between items-center py-2 px-6 gap-2">
      <div className="flex gap-4">
        <select
          name="season"
          id="season"
          value={queryFilters.season}
          onChange={handleChange1}
          className="border rounded bg-slate-200 font-bold px-2 py-1"
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        <select
          name="week"
          id="week"
          value={queryFilters.week}
          onChange={handleChange1}
          className="border rounded bg-slate-200 font-bold px-2 py-1"
        >
          <option value="season">Season</option>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
          <option value={5}>Week 5</option>
          <option value={6}>Week 6</option>
          <option value={7}>Week 7</option>
          <option value={8}>Week 8</option>
          <option value={9}>Week 9</option>
          <option value={10}>Week 10</option>
          <option value={11}>Week 11</option>
          <option value={12}>Week 12</option>
          <option value={13}>Week 13</option>
          <option value={14}>Week 14</option>
          <option value={15}>Week 15</option>
          <option value={16}>Week 16</option>
          <option value={17}>Week 17</option>
          <option value={18}>Week 18</option>
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
                className="border px-2 py-1 rounded w-16"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;