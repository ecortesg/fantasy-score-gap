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
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
        </select>
      </div>
      <hr />
    </>
  );
}

export default Root;
