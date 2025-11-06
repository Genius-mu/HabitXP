// import { useHabitsStore } from "../store/habitsStore";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { startOfWeek, format, addDays, isSameDay, parseISO } from "date-fns";

// export default function Weekly() {
//   const { xpHistory, habits } = useHabitsStore();

//   const today = new Date();
//   const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday start

//   // Build 7 days of data
//   const data = Array.from({ length: 7 }).map((_, i) => {
//     const day = addDays(weekStart, i);
//     const formatted = format(day, "EEE");

//     // Find XP entry for that day
//     const entry = xpHistory.find((x) => isSameDay(parseISO(x.date), day));

//     return {
//       day: formatted,
//       xp: entry ? entry.xp : 0,
//     };
//   });

//   const totalXP = data.reduce((sum, d) => sum + d.xp, 0);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">📅 This Week</h1>

//       <div className="bg-white rounded-xl shadow p-4 text-center">
//         <p className="text-gray-500 text-sm">Total XP This Week</p>
//         <p className="text-3xl font-bold text-green-600">{totalXP}</p>
//       </div>

//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">XP Earned per Day</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="xp" fill="#10b981" radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// src/pages/Weekly.jsx
import { useHabitsStore } from "../store/habitsStore";
import { Flame } from "lucide-react";
import AnimatedCheckbox from "../components/AnimatedCheckbox";
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from "date-fns";

export default function Weekly() {
  const { habits, toggleHabit } = useHabitsStore();
  const today = new Date();

  // Get the start and end of the current week (Monday to Sunday)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  // Generate array of all dates in current week
  const weekDates = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(
    (d) => format(d, "yyyy-MM-dd")
  );

  return (
    <div className="space-y-4">
      {habits.length === 0 && (
        <p className="text-gray-500 mt-4">No habits yet. Add one!</p>
      )}

      {habits.map((habit) => (
        <div
          key={habit.id}
          className="bg-indigo-50 rounded-lg shadow p-4 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-indigo-800">{habit.name}</p>
            <div className="flex items-center gap-1 text-indigo-600 text-sm">
              <Flame size={16} />
              <span>
                {habit.streak || 0} week{habit.streak === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            {weekDates.map((date) => {
              const completed = habit.history?.[date] || false;
              return (
                <div key={date} className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">
                    {format(new Date(date), "EEE")}
                  </span>
                  <AnimatedCheckbox
                    checked={completed}
                    onChange={() => toggleHabit(habit.id, date)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
