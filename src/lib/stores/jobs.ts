import { browser } from "$app/environment";
import { writable } from "svelte/store";

export interface Job {
  id: number;
  title: string;
  salary: string;
  description: string;
  companyId: string;
  branchId: string;
  ownerId: string;
}

function createJobStore() {
  let initial: Job[] = [];

  if (browser) {
    const stored = localStorage.getItem("jobs");
    initial = stored ? JSON.parse(stored) : [];
  }

  const { subscribe, set, update } = writable<Job[]>(initial);

  return {
    subscribe,
    set: (value: Job[]) => {
      if (browser) {
        localStorage.setItem("jobs", JSON.stringify(value));
      }
      set(value);
    },
    update: (callback: (value: Job[]) => Job[]) =>
      update((current) => {
        const updated = callback(current);
        if (browser) {
          localStorage.setItem("jobs", JSON.stringify(updated));
        }
        return updated;
      }),
  };
}

export const jobs = createJobStore();
