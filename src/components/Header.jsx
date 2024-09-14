import { useState } from "react"
import { useQueryFiltersStore } from "../store/queryFiltersStore"
import { usePersistentSettingsStore } from "../store/dashboardSettingsStore"

function Header() {
  const [queryFilters, updateQueryFilters] = useQueryFiltersStore((state) => [
    state.queryFilters,
    state.updateQueryFilters,
  ])

  function handleSeasonChange(e) {
    updateQueryFilters({ [e.target.id]: e.target.value })
  }

  const [positions, updatePosition] = usePersistentSettingsStore((state) => [
    state.positions,
    state.updatePosition,
  ])

  const [positionCount, setPositionCount] = useState(positions)

  function handlePositionStartChange(e) {
    setPositionCount({
      ...positionCount,
      [e.target.name]: {
        ...positionCount[e.target.name],
        start: e.target.value,
      },
    })
  }

  function handlePositionEndChange(e) {
    setPositionCount({
      ...positionCount,
      [e.target.name]: {
        ...positionCount[e.target.name],
        end: e.target.value,
      },
    })
  }

  const handlePositionStartBlur = (e) => {
    const inputValue = Number(positionCount[e.target.name].start) || 0
    updatePosition(e.target.name, { start: inputValue })
  }

  const handlePositionEndBlur = (e) => {
    const inputValue = Number(positionCount[e.target.name].end) || 0
    updatePosition(e.target.name, { end: inputValue })
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.target.blur()
    }
  }

  return (
    <div className=" bg-white dark:bg-slate-700 flex flex-col xl:flex-row justify-between items-center xl:py-2 py-4 xl:px-6 gap-4">
      <div className="flex xl:flex-col flex-row gap-2">
        <div>
          <select
            name="season"
            id="season"
            value={queryFilters.season}
            onChange={handleSeasonChange}
            className="rounded bg-slate-200 dark:bg-slate-800 border-none outline-none font-bold px-2 py-1"
          >
            {Array.from({ length: 2024 - 2020 + 1 }, (_, index) => 2020 + index)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .reverse()}
          </select>
        </div>
        <div>
          <select
            name="week"
            id="week"
            value={queryFilters.week}
            onChange={handleSeasonChange}
            className="rounded bg-slate-200 dark:bg-slate-800 border-none outline-none font-bold px-2 py-1"
          >
            <option value="regular">Season</option>
            {[...Array(18)].map((_, index) => (
              <option
                key={`regular-${index + 1}`}
                value={`regular-${index + 1}`}
              >
                Week {index + 1}
              </option>
            ))}
            <option value="post">Playoffs</option>
            <option value="post-1">Wild Card</option>
            <option value="post-2">Divisional</option>
            <option value="post-3">Conference</option>
            <option value="post-4">Super Bowl</option>
          </select>
        </div>
      </div>
      <div className="grid grid-flow-col xl:grid-rows-2 md:grid-rows-3 grid-rows-5 gap-y-2 sm:gap-x-8 gap-x-4 justify-items-end">
        {Object.keys(positions).map((key) => {
          return (
            <div
              key={key}
              className="grid text-center lg:flex justify-center lg:gap-2 gap-1 place-items-center content-start"
            >
              <div className="flex gap-2 items-center">
                <label>{key}:</label>
                <input
                  id={`start-${key}`}
                  name={key}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="999"
                  value={positionCount[key].start.toString()}
                  onChange={handlePositionStartChange}
                  onBlur={handlePositionStartBlur}
                  onKeyDown={handleKeyDown}
                  className="px-2 py-1 rounded w-12 sm:w-16 bg-slate-200 dark:bg-slate-800 outline-none"
                />
                <p>to</p>
                <input
                  id={`end-${key}`}
                  name={key}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="999"
                  value={positionCount[key].end.toString()}
                  onChange={handlePositionEndChange}
                  onBlur={handlePositionEndBlur}
                  onKeyDown={handleKeyDown}
                  className="px-2 py-1 rounded w-12 sm:w-16 bg-slate-200 dark:bg-slate-800 outline-none"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
