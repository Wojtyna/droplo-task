import { create } from "zustand";
import { persist } from "zustand/middleware";

import { navSlice } from "@/store/modules/nav";

export const useStore = create(
  persist(navSlice, {
    name: "nav",
  })
);
