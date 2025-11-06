// src/components/AddHabitModal.jsx
import { useState } from "react";
import { useHabitsStore } from "../store/habitsStore";

const WEEKDAYS = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

export default function AddHabitModal({ open, onClose }) {
  const addHabit = useHabitsStore((s) => s.addHabit);

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]); // for weekly
  const [xpPerTick, setXpPerTick] = useState(10);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");

  if (!open) return null;

  const toggleDay = (id) => {
    setSelectedDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Habit name is required.");
      return;
    }

    if (frequency === "weekly" && selectedDays.length === 0) {
      setError("Select at least one weekday for weekly habits.");
      return;
    }

    const habit = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      frequency,
      days: frequency === "weekly" ? selectedDays : undefined,
      xpPerTick: Number(xpPerTick) || 10,
      history: {}, // empty history to start
      streak: 0,
      createdAt: startDate,
    };

    addHabit(habit);
    // reset form (optional)
    setName("");
    setFrequency("daily");
    setSelectedDays([]);
    setXpPerTick(10);
    setStartDate(new Date().toISOString().split("T")[0]);

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold mb-3">Add new habit</h2>

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <label className="block mb-3">
          <div className="text-sm text-gray-700 mb-1">Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., Morning run"
            autoFocus
          />
        </label>

        <label className="block mb-3">
          <div className="text-sm text-gray-700 mb-1">Frequency</div>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        {frequency === "weekly" && (
          <div className="mb-3">
            <div className="text-sm text-gray-700 mb-1">Days</div>
            <div className="flex gap-2">
              {WEEKDAYS.map((d) => {
                const active = selectedDays.includes(d.id);
                return (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => toggleDay(d.id)}
                    className={`px-3 py-1 rounded-md border ${
                      active ? "bg-black text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <label className="block mb-3">
          <div className="text-sm text-gray-700 mb-1">XP per completion</div>
          <input
            type="number"
            value={xpPerTick}
            onChange={(e) => setXpPerTick(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            min={1}
          />
        </label>

        <label className="block mb-4">
          <div className="text-sm text-gray-700 mb-1">Start date</div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white"
          >
            Add Habit
          </button>
        </div>
      </form>
    </div>
  );
}
