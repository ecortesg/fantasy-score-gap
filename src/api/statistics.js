import axios from "axios";

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getStatistics(queryFilters) {
  const { season, week } = queryFilters;
  const weekParams = week.split("-");

  const url = weekParams[1]
    ? `/statistics/nfl/${season}/${weekParams[0]}/${weekParams[1]}`
    : `/statistics/nfl/${season}/${weekParams[0]}`;
  const res = await statsApi.get(url);
  return res.data;
}
