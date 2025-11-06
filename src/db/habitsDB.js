// import Dexie from "dexie";

// export const db = new Dexie("habitsDB");

// // Define schema
// db.version(1).stores({
//   habits: "id, name, frequency, createdAt", // primary key and indexes
// });

import Dexie from "dexie";

export const db = new Dexie("habitsDB");

db.version(2).stores({
  habits: "id, name, frequency, createdAt",
  meta: "id", // for xp, level, etc.
});
