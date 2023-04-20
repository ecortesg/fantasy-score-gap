import axios from "axios";

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getStatistics(season) {
  const res = await statsApi.get(`/statistics/nfl/${season}`);
  return res.data;
};
