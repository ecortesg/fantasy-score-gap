import { create } from "zustand";
import {
  DEFAULT_POSITIONS,
  GRAPH_LEGEND_SETTINGS,
} from "../data/positions_data";

export const useDashboardSettingsStore = create((set) => ({
  settings: GRAPH_LEGEND_SETTINGS,
  toggleLine: (key) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: {
          ...state.settings[key],
          lineVisible: !state.settings[key].lineVisible,
        },
      },
    })),
  positions: DEFAULT_POSITIONS,
  updatePositions: (newSetting) =>
    set((state) => ({
      positions: { ...state.positions, ...newSetting },
    })),
  showSummaryTable: false,
  toggleSummaryTable: () =>
    set((state) => ({
      showSummaryTable: !state.showSummaryTable,
    })),
}));
