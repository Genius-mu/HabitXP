// import { create } from "zustand";
// import { db } from "../db/habitsDB";

// export const useHabitsStore = create((set, get) => ({
//   habits: [],
//   initialized: false,
//   xp: 0,
//   level: 1,
//   xpHistory: [], // 🟢 Track XP over time
//   xpGains: [], // ✨ For animated "+XP" toasts

//   async init() {
//     console.log("Initializing habits...");
//     const habits = await db.habits.toArray();
//     const meta = (await db.table("meta")?.get("stats")) || {
//       xp: 0,
//       level: 1,
//       xpHistory: [],
//     };

//     if (habits.length > 0) {
//       set({
//         habits,
//         xp: meta.xp,
//         level: meta.level,
//         xpHistory: meta.xpHistory || [],
//         initialized: true,
//       });
//     } else {
//       const demoHabit = {
//         id: crypto.randomUUID(),
//         name: "Drink water",
//         frequency: "daily",
//         history: {},
//         streak: 0,
//         createdAt: new Date().toISOString(),
//       };
//       await db.habits.add(demoHabit);
//       set({
//         habits: [demoHabit],
//         xp: 0,
//         level: 1,
//         xpHistory: [],
//         initialized: true,
//       });
//     }
//   },

//   async addHabit(habit) {
//     await db.habits.add(habit);
//     set({ habits: [...get().habits, habit] });
//   },

//   async toggleHabit(id, date) {
//     const habits = get().habits.map((h) => {
//       if (h.id === id) {
//         const updated = { ...h };
//         const wasDone = !!h.history?.[date];
//         updated.history = { ...h.history, [date]: !wasDone };
//         updated.streak = Object.values(updated.history).filter(Boolean).length;
//         db.habits.put(updated);

//         // ✅ Gain or lose XP dynamically
//         if (!wasDone) {
//           get().gainXP(h.xpPerTick || 10); // add XP
//         } else {
//           get().gainXP(-(h.xpPerTick || 10)); // remove XP
//         }

//         return updated;
//       }
//       return h;
//     });
//     set({ habits });
//   },

//   gainXP(amount) {
//     const { xp, level, xpHistory, xpGains } = get();
//     let newXP = xp + amount;
//     let newLevel = level;

//     // 🧭 Clamp XP (no negative XP)
//     if (newXP < 0) newXP = 0;

//     // 🧩 Level system
//     while (newXP >= 100) {
//       newXP -= 100;
//       newLevel += 1;
//     }

//     const today = new Date().toISOString().split("T")[0];

//     // 🟢 Update XP history (replace today’s entry)
//     const updatedHistory = [
//       ...xpHistory.filter((x) => x.date !== today),
//       { date: today, xp: newXP },
//     ];

//     // ✨ Add XP gain animation event
//     const id = crypto.randomUUID();
//     const gainLabel = amount > 0 ? `+${amount} XP` : `${amount} XP`;

//     set({
//       xp: newXP,
//       level: newLevel,
//       xpHistory: updatedHistory,
//       xpGains: [...xpGains, { id, label: gainLabel }],
//     });

//     // Auto-remove XP toast after animation (1.5s)
//     setTimeout(() => {
//       set({ xpGains: get().xpGains.filter((g) => g.id !== id) });
//     }, 1500);

//     // 💾 Persist XP and level
//     db.table("meta").put({
//       id: "stats",
//       xp: newXP,
//       level: newLevel,
//       xpHistory: updatedHistory,
//     });
//   },
// }));

import { create } from "zustand";
import { db } from "../db/habitsDB";

export const useHabitsStore = create((set, get) => ({
  habits: [],
  initialized: false,
  xp: 0,
  level: 1,
  xpHistory: [],
  xpGains: [], // 🟢 store XP toast events

  async init() {
    console.log("Initializing habits...");
    const habits = await db.habits.toArray();
    const meta = (await db.table("meta")?.get("stats")) || {
      xp: 0,
      level: 1,
      xpHistory: [],
    };

    if (habits.length > 0) {
      set({
        habits,
        xp: meta.xp,
        level: meta.level,
        xpHistory: meta.xpHistory || [],
        initialized: true,
      });
    } else {
      const demoHabit = {
        id: crypto.randomUUID(),
        name: "Drink water",
        frequency: "daily",
        history: {},
        streak: 0,
        createdAt: new Date().toISOString(),
      };
      await db.habits.add(demoHabit);
      set({
        habits: [demoHabit],
        xp: 0,
        level: 1,
        xpHistory: [],
        initialized: true,
      });
    }
  },

  async addHabit(habit) {
    await db.habits.add(habit);
    set({ habits: [...get().habits, habit] });
  },

  async toggleHabit(id, date) {
    const habits = get().habits.map((h) => {
      if (h.id === id) {
        const updated = { ...h };
        const wasDone = !!h.history?.[date];
        updated.history = { ...h.history, [date]: !wasDone };
        updated.streak = Object.values(updated.history).filter(Boolean).length;
        db.habits.put(updated);

        // ✅ XP amount
        const amount = h.xpPerTick || 10;

        if (!wasDone) {
          get().gainXP(amount, h.id); // Pass habitId
        } else {
          get().gainXP(-amount, h.id);
        }

        return updated;
      }
      return h;
    });
    set({ habits });
  },

  gainXP(amount, habitId) {
    const { xp, level, xpHistory } = get();
    let newXP = xp + amount;
    let newLevel = level;

    if (newXP < 0) newXP = 0;

    while (newXP >= 100) {
      newXP -= 100;
      newLevel += 1;
    }

    const today = new Date().toISOString().split("T")[0];

    // Store XP history **with habitId**
    const updatedHistory = [
      ...xpHistory.filter((x) => !(x.date === today && x.habitId === habitId)),
      { date: today, xp: amount, habitId }, // store individual XP tick
    ];

    const gainEntry = {
      id: crypto.randomUUID(),
      amount,
    };

    set((state) => ({
      xp: newXP,
      level: newLevel,
      xpHistory: updatedHistory,
      xpGains: [...state.xpGains, gainEntry],
    }));

    // Auto-remove toast
    setTimeout(() => {
      set((state) => ({
        xpGains: state.xpGains.filter((g) => g.id !== gainEntry.id),
      }));
    }, 2000);

    // Persist
    db.table("meta").put({
      id: "stats",
      xp: newXP,
      level: newLevel,
      xpHistory: updatedHistory,
    });
  },
}));
