import { useEffect } from "react";
import { useQueryFiltersStore } from "../store/queryFiltersStore";

function Root() {
  const [queryFilters, updateQueryFilters] = useQueryFiltersStore((state) => [
    state.queryFilters,
    state.updateQueryFilters,
  ]);

  function handleChange(e) {
    updateQueryFilters({ [e.target.id]: e.target.value });
  }

  useEffect(() => {
    const url = new URL(window.location);
    Object.keys(queryFilters).forEach((key) => {
      url.searchParams.set(key, queryFilters[key]);
    });
    window.history.replaceState(null, "", url);
  }, [queryFilters]);

  return (
    <>
      <h2 className="text-center text-lg font-bold">Settings</h2>
      <div className="flex justify-center p-4 gap-4">
        <select
          name="season"
          id="season"
          value={queryFilters.season}
          onChange={handleChange}
          className="border rounded"
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        <select
          name="week"
          id="week"
          value={queryFilters.week}
          onChange={handleChange}
          className="border rounded"
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
      <hr />
    </>
  );
}

export default Root;
