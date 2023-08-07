import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SLEEPER } from "../data/presets_data";
import { DEFAULT_POSITIONS } from "../data/positions_data";

export const useLeague1Store = create(
  persist(
    (set) => ({
      settings: SLEEPER,
      positions: DEFAULT_POSITIONS,
      updateSettings: (newSetting) =>
        set((state) => ({
          settings: { ...state.settings, ...newSetting },
        })),
      updatePositions: (newSetting) =>
        set((state) => ({
          positions: { ...state.positions, ...newSetting },
        })),
    }),
    {
      name: "league1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useLeague2Store = create(
  persist(
    (set) => ({
      settings: SLEEPER,
      positions: DEFAULT_POSITIONS,
      updateSettings: (newSetting) =>
        set((state) => ({
          settings: { ...state.settings, ...newSetting },
        })),
      updatePositions: (newSetting) =>
        set((state) => ({
          positions: { ...state.positions, ...newSetting },
        })),
    }),
    {
      name: "league2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
