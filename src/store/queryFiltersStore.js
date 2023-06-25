import { create } from "zustand";

export const useQueryFiltersStore = create((set, get) => ({
  queryFilters: { season: "2022", week: "season" },
  updateQueryFilters: (newFilter) =>
    set((state) => ({
      queryFilters: { ...state.queryFilters, ...newFilter },
    })),
}));
