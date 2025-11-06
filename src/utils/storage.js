import localforage from "localforage";

localforage.config({
  name: "habit-tracker",
  storeName: "userData",
  description: "Stores all habits, XP, levels, and streaks",
});

export async function saveState(state) {
  try {
    await localforage.setItem("appState", state);
  } catch (err) {
    console.error("Error saving state:", err);
  }
}

export async function loadState() {
  try {
    const data = await localforage.getItem("appState");
    return data || { habits: [], xp: 0, level: 1 };
  } catch (err) {
    console.error("Error loading state:", err);
    return { habits: [], xp: 0, level: 1 };
  }
}
