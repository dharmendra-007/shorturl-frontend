import { statsType } from '@/types/statsType'
import { create } from 'zustand'

type StatsStore = {
  stats: statsType | null;
  setStats: (stats: statsType) => void;
  increaseTotalLinks: () => void;
  increaseLinkChange: () => void;
  updateActiveLinks: (delta : number) => void;
};

export const useStats = create<StatsStore>((set) => ({
  stats : null,
  setStats : (stats) => set({stats}),
  increaseTotalLinks : () => set((state) => state.stats ? {
    stats : {
      ...state.stats,
      totalLinks : state.stats.totalLinks + 1
    }
  } : state
  ),
  increaseLinkChange : () => set((state) => state.stats ? {
    stats : {
      ...state.stats,
      linksChange : state.stats.linksChange + 1
    }
  } : state
  ),
  updateActiveLinks : (delta) => set((state) => state.stats ? {
    stats : {
      ...state.stats,
      activeLinks : state.stats.activeLinks + delta
    }
  } : state
  )
}))