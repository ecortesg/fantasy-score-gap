import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  DEFAULT_POSITIONS,
  GRAPH_LEGEND_SETTINGS,
} from "../data/positions_data";

export const useSettingsStore = create((set) => ({
  series: GRAPH_LEGEND_SETTINGS.reduce((obj, { key }) => {
    obj[key] = true;
    return obj;
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
}));

export const usePersistentSettingsStore = create(
  persist(
    (set) => ({
      positions: DEFAULT_POSITIONS,
      updatePositions: (newSetting) =>
        set((state) => ({
          positions: { ...state.positions, ...newSetting },
        })),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
