import { create } from "zustand";

export const useSalaryStore = create((set) => ({
  salaries2023: [],
  salaries2024: [],
  salaries2025: [],
  salaries2026: [],

  average2023: 0,
  average2024: 0,
  average2025: 0,

  filteredSalary2023: (data) => set({ salaries2023: data }),
  filteredSalary2024: (data) => set({ salaries2024: data }),
  filteredSalary2025: (data) => set({ salaries2025: data }),
  filteredSalary2026: (data) => set({ salaries2026: data }),

  setAverage2023: (data) => set({ average2023: data }),
  setAverage2024: (data) => set({ average2024: data }),
  setAverage2025: (data) => set({ average2025: data }),
}));