import { writable } from "svelte/store";
import { browser } from "$app/environment";

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected";

export interface Application {
  jobId: number;
  appliedAt: number;
  status: ApplicationStatus;
}

let initial: Application[] = [];

if (browser) {
  const stored = localStorage.getItem("applications");
  initial = stored ? JSON.parse(stored) : [];
}

export const applications = writable<Application[]>(initial);

applications.subscribe((value) => {
  if (!browser) return;

  localStorage.setItem("applications", JSON.stringify(value));
});
