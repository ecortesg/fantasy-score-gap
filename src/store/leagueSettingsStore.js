import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SLEEPER } from "../data/presets_data";

export const useLeague1Store = create(
  persist(
    (set) => ({
      settings: SLEEPER,
      updateSettings: (newSetting) =>
        set((state) => ({
          settings: { ...state.settings, ...newSetting },
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
      updateSettings: (newSetting) =>
        set((state) => ({
          settings: { ...state.settings, ...newSetting },
        })),
    }),
    {
      name: "league2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
