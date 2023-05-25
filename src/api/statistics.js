import axios from "axios";

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getStatistics(dataFilters) {
  const url =
    dataFilters.week === "season"
      ? `/statistics/nfl/${dataFilters.season}`
      : `/statistics/nfl/${dataFilters.season}/${dataFilters.week}`;
  const res = await statsApi.get(url);
  return res.data;
}
