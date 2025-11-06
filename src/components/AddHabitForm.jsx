import { useState } from "react";
import { useHabitsStore } from "../store/habitsStore";

export default function AddHabitForm({ onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const addHabit = useHabitsStore((s) => s.addHabit);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please enter a habit name");

    const newHabit = {
      id: crypto.randomUUID(),
      name,
      category,
      history: {},
      streak: 0,
    };

    addHabit(newHabit);
    onClose(); // Close modal
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Habit</h2>

      <input
        type="text"
        placeholder="Habit name (e.g. Read 20 mins)"
        className="w-full border p-2 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category (optional)"
        className="w-full border p-2 rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800"
      >
        Add Habit
      </button>
    </form>
  );
}
