import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import {
  DEFAULT_POSITIONS,
  GRAPH_LEGEND_SETTINGS,
} from "../data/positions_data"

export const useSettingsStore = create((set) => ({
  series: GRAPH_LEGEND_SETTINGS.reduce((obj, { key }) => {
    obj[key] = true
    return obj
  }, {}),
  toggleSeries: (key) =>
    set((state) => ({
      series: {
        ...state.series,
        [key]: !state.series[key],
      },
    })),
  showSummaryTable: false,
  toggleSummaryTable: () =>
    set((state) => ({
      showSummaryTable: !state.showSummaryTable,
    })),
}))

export const usePersistentSettingsStore = create(
  persist(
    (set) => ({
      positions: DEFAULT_POSITIONS,
      updatePosition: (position, newSetting) =>
        set((state) => ({
          positions: {
            ...state.positions,
            [position]: { ...state.positions[position], ...newSetting },
          },
        })),
      theme: "light",
      changeTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "FSG_SETTINGS",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          return { ...persistedState, positions: DEFAULT_POSITIONS }
        }

        return persistedState
      },
    }
  )
)
