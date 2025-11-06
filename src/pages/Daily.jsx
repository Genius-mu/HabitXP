import { useHabitsStore } from "../store/habitsStore";
import { Flame } from "lucide-react";
import StatsBar from "../components/StatsBar";
import AnimatedCheckbox from "../components/AnimatedCheckbox";

export default function Daily() {
  const { habits, toggleHabit } = useHabitsStore();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <StatsBar />

      {habits.length === 0 && (
        <p className="text-gray-500 mt-4">No habits yet. Add one!</p>
      )}

      {habits.map((habit) => (
        <div
          key={habit.id}
          className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
        >
          <div>
            <p className="font-medium">{habit.name}</p>
            <div className="flex items-center gap-1 text-orange-500 text-sm">
              <Flame size={16} />
              <span>
                {habit.streak || 0} day{habit.streak === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          <AnimatedCheckbox
            checked={habit.history?.[today] || false}
            onChange={() => toggleHabit(habit.id, today)}
          />
        </div>
      ))}
    </div>
  );
}
