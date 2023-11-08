import { create } from "zustand";

const initialFilters = {
  season: new URLSearchParams(window.location.search).get("season") || "2022",
  week: new URLSearchParams(window.location.search).get("week") || "season",
};

export const useQueryFiltersStore = create((set) => ({
  queryFilters: initialFilters,
  updateQueryFilters: (newFilter) =>
    set((state) => ({
      queryFilters: { ...state.queryFilters, ...newFilter },
    })),
}));
