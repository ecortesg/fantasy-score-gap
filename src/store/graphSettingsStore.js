import { create } from "zustand";
import { DEFAULT_POSITIONS } from "../data/positions_data";

const initialSettings = {
  "QB-L1": { color: "#fca5a5", lineVisible: true, position: "QB" },
  "RB-L1": { color: "#6ee7b7", lineVisible: true, position: "RB" },
  "WR-L1": { color: "#7dd3fc", lineVisible: true, position: "WR" },
  "TE-L1": { color: "#fdba74", lineVisible: true, position: "TE" },
  "DEF-L1": { color: "#fde047", lineVisible: true, position: "DEF" },
  "K-L1": { color: "#c4b5fd", lineVisible: true, position: "K" },
  "QB-L2": { color: "#ef4444", lineVisible: true, position: "QB" },
  "RB-L2": { color: "#10b981", lineVisible: true, position: "RB" },
  "WR-L2": { color: "#0ea5e9 ", lineVisible: true, position: "WR" },
  "TE-L2": { color: "#f97316", lineVisible: true, position: "TE" },
  "DEF-L2": { color: "#eab308", lineVisible: true, position: "DEF" },
  "K-L2": { color: "#8b5cf6", lineVisible: true, position: "K" },
};

export const useGraphSettingsStore = create((set) => ({
  settings: initialSettings,
  positions: DEFAULT_POSITIONS,
  toggleLineVisible: (key) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: {
          ...state.settings[key],
          lineVisible: !state.settings[key].lineVisible,
        },
      },
    })),
  updatePositions: (newSetting) =>
    set((state) => ({
      positions: { ...state.positions, ...newSetting },
    })),
}));
