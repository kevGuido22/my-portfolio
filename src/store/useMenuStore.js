import { create } from "zustand";

export const useMenuStore = create((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
    closeMenu: () => set({ isOpen: false }),
}));