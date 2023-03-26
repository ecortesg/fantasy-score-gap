import axios from "axios";

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getStats(season) {
  const res = await statsApi.get(`/stats/nfl/${season}`);
  return res.data;
};
