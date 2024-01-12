import axios from "axios";

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getStatistics(queryFilters) {
  const url =
    queryFilters.week === "season"
      ? `/statistics/nfl/${queryFilters.season}/regular`
      : `/statistics/nfl/${queryFilters.season}/regular/${queryFilters.week}`;
  const res = await statsApi.get(url);
  return res.data;
}
