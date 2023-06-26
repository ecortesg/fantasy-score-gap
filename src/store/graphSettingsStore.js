import { create } from "zustand";

const initialSettings = {
  "QB-L1": { color: "#fca5a5", lineVisible: true },
  "RB-L1": { color: "#6ee7b7", lineVisible: true },
  "WR-L1": { color: "#7dd3fc", lineVisible: true },
  "TE-L1": { color: "#fdba74", lineVisible: true },
  "DEF-L1": { color: "#fde047", lineVisible: true },
  "K-L1": { color: "#c4b5fd", lineVisible: true },
  "QB-L2": { color: "#ef4444", lineVisible: true },
  "RB-L2": { color: "#10b981", lineVisible: true },
  "WR-L2": { color: "#0ea5e9 ", lineVisible: true },
  "TE-L2": { color: "#f97316", lineVisible: true },
  "DEF-L2": { color: "#eab308", lineVisible: true },
  "K-L2": { color: "#8b5cf6", lineVisible: true },
};

export const useGraphSettingsStore = create((set) => ({
  settings: initialSettings,
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
}));
