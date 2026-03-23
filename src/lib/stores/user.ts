import { writable } from "svelte/store";
import { browser } from "$app/environment";

export interface User {
  id: string;
  email: string;
}

let initial: User | null = null;

if (browser) {
  const stored = localStorage.getItem("user");
  initial = stored ? JSON.parse(stored) : null;
}

export const currentUser = writable<User | null>(initial);

currentUser.subscribe((value) => {
  if (!browser) return;

  if (value) {
    localStorage.setItem("user", JSON.stringify(value));
  } else {
    localStorage.removeItem("user");
  }
});
