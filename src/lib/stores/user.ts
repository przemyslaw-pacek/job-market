import { writable } from "svelte/store";
import { browser } from "$app/environment";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}

function createUserStore() {
  const stored = browser ? localStorage.getItem("currentUser") : null;

  const initial: User | null = stored ? JSON.parse(stored) : null;

  const { subscribe, set } = writable<User | null>(initial);

  return {
    subscribe,
    set: (user: User | null) => {
      if (browser) {
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          localStorage.removeItem("currentUser");
        }
      }
      set(user);
    },
  };
}

export const currentUser = createUserStore();
