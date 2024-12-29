"use client";

import { create } from "zustand";
import { supabase } from "../../utils/supabaseClient";


interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface GridState {
  gridLayout: GridItem[];
  fetchGridLayout: () => Promise<void>;
  saveGridLayout: (layout: GridItem[]) => Promise<void>;
}

const useStore = create<GridState>((set) => ({
  gridLayout: [],

  // Fetch grid layout for the authenticated user
  fetchGridLayout: async () => {
    const { data, error } = await supabase.from("user_layouts").select("*");

    if (error) {
      console.error("Error fetching grid layout:", error.message);
      return;
    }

    console.log("Fetched grid layout:", data); // Debugging log
    set({ gridLayout: data || [] });
  },

  // Save grid layout to Supabase
  saveGridLayout: async (layout) => {
    const { error } = await supabase.from("user_layouts").upsert(layout);

    if (error) {
      console.error("Error saving grid layout:", error.message);
    } else {
      set({ gridLayout: layout });
    }
  },
}));

export default useStore;
