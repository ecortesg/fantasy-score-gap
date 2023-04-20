function Root({ season, updateSeason }) {
  return (
    <>
      <h2 className="text-center text-lg font-bold">Settings</h2>
      <div className="flex justify-center p-4 gap-4">
        <label htmlFor="season">Season</label>
        <select
          name="season"
          id="season"
          value={season}
          onChange={(e) => updateSeason(e)}
          className="border rounded shadow"
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
      <hr />
    </>
  );
}

export default Root;
