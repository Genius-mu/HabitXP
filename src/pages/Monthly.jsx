// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   startOfMonth,
//   endOfMonth,
//   addDays,
//   format,
//   isSameDay,
//   parseISO,
// } from "date-fns";

// export default function Monthly() {
//   const { xpHistory } = useHabitsStore();

//   const today = new Date();
//   const start = startOfMonth(today);
//   const end = endOfMonth(today);

//   // Generate all days in this month
//   const days = [];
//   for (let d = start; d <= end; d = addDays(d, 1)) {
//     const entry = xpHistory.find((x) => isSameDay(parseISO(x.date), d));
//     days.push({
//       date: format(d, "d MMM"),
//       xp: entry ? entry.xp : 0,
//     });
//   }

//   const totalXP = days.reduce((sum, d) => sum + d.xp, 0);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">📆 This Month</h1>

//       <div className="bg-white rounded-xl shadow p-4 text-center">
//         <p className="text-gray-500 text-sm">Total XP This Month</p>
//         <p className="text-3xl font-bold text-green-600">{totalXP}</p>
//       </div>

//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">XP Progression</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={days}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="xp"
//               stroke="#3b82f6"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// src/pages/Monthly.jsx
import { useHabitsStore } from "../store/habitsStore";
import { Flame } from "lucide-react";
import AnimatedCheckbox from "../components/AnimatedCheckbox";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export default function Monthly() {
  const { habits, toggleHabit } = useHabitsStore();
  const today = new Date();

  // Get all dates in the current month
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const monthDates = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  }).map((d) => format(d, "yyyy-MM-dd"));

  return (
    <div className="space-y-4">
      {habits.length === 0 && (
        <p className="text-gray-500 mt-4">No habits yet. Add one!</p>
      )}

      {habits.map((habit) => (
        <div
          key={habit.id}
          className="bg-yellow-50 rounded-lg shadow p-4 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-yellow-800">{habit.name}</p>
            <div className="flex items-center gap-1 text-yellow-600 text-sm">
              <Flame size={16} />
              <span>
                {habit.streak || 0} month{habit.streak === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto mt-2">
            {monthDates.map((date) => {
              const completed = habit.history?.[date] || false;
              return (
                <div key={date} className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">
                    {format(new Date(date), "d")}
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
