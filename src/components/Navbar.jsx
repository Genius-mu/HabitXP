// export default function Navbar({ onAddClick }) {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <h1 className="font-bold text-lg">🔥 HabitQuest</h1>
//       <button
//         onClick={onAddClick}
//         className="bg-black text-white px-4 py-2 rounded-lg text-sm"
//         aria-label="Add habit"
//       >
//         + Add Habit
//       </button>
//     </nav>
//   );
// }

import { useState } from "react";
import Modal from "./Modal";
import AddHabitForm from "./AddHabitForm";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow">
        <h1 className="text-lg font-bold">Habit Tracker</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Habit
        </button>
      </header>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <AddHabitForm onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
