import { create } from "zustand"

const initialFilters = {
  season: "2024",
  week: "regular",
}

export const useQueryFiltersStore = create((set) => ({
  queryFilters: initialFilters,
  updateQueryFilters: (newFilter) =>
    set((state) => ({
      queryFilters: { ...state.queryFilters, ...newFilter },
    })),
}))
