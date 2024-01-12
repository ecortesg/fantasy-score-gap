import axios from "axios";

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getStatistics(queryFilters) {
  const url =
    queryFilters.week === "season"
      ? `/statistics/nfl/regular/${queryFilters.season}`
      : `/statistics/nfl/regular/${queryFilters.season}/${queryFilters.week}`;
  const res = await statsApi.get(url);
  return res.data;
}
