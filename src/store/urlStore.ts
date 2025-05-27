import { urlType } from "@/types/urlType";
import { create } from "zustand";

type StatsStore = {
  urls: urlType[];
  setUrls: (urls: urlType[]) => void;
  addUrlToFront: (url: urlType) => void;
  deleteUrl : (id : string ) => void;
  changeStatus : (id : string ) => number;
};

export const useUrls = create<StatsStore>((set) => ({
  urls: [],
  setUrls: (urls) => set({ urls }),
  addUrlToFront: (url) => 
    set((state) => ({
      urls : state.urls ? [url , ...state.urls] : [url]
    })),
  deleteUrl : (id) => 
    set((state) => ({
      urls : state.urls ? state.urls.filter((link) => link._id !== id): []
    })),

  changeStatus : (id) => {
    let delta = 0

    const updateUrls = (urls: urlType[]) => {
      return urls.map((link) => {
        if (link._id === id) {
          const isActive = !link.isActive;
          delta = isActive ? 1 : -1;
          return { ...link, isActive };
        }
        return link;
      });
    };

    set((state) => {
      return {
        urls : updateUrls(state.urls ?? [])
      }
    })

    return delta
  }
}))