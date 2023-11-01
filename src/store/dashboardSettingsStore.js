import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_POSITIONS } from "../data/positions_data";

export const useDashboardSettingsStore = create(
  persist(
    (set) => ({
      positions: DEFAULT_POSITIONS,
      updatePositions: (newSetting) =>
        set((state) => ({
          positions: { ...state.positions, ...newSetting },
        })),
    }),
    {
      name: "positions",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
