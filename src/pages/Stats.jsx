// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";

// export default function Stats() {
//   const { xpHistory, xp, level } = useHabitsStore();

//   // Daily data
//   const dailyData = xpHistory.map((item) => ({
//     date: format(parseISO(item.date), "MM/dd"),
//     xp: item.xp,
//   }));

//   // Weekly data
//   const weeklyMap = {};
//   xpHistory.forEach((item) => {
//     const weekStart = startOfWeek(parseISO(item.date), { weekStartsOn: 1 });
//     const key = format(weekStart, "MM/dd");
//     weeklyMap[key] = (weeklyMap[key] || 0) + item.xp;
//   });
//   const weeklyData = Object.entries(weeklyMap).map(([date, xp]) => ({
//     date,
//     xp,
//   }));

//   // Monthly data
//   const monthlyMap = {};
//   xpHistory.forEach((item) => {
//     const monthStart = startOfMonth(parseISO(item.date));
//     const key = format(monthStart, "MMM yyyy");
//     monthlyMap[key] = (monthlyMap[key] || 0) + item.xp;
//   });
//   const monthlyData = Object.entries(monthlyMap).map(([date, xp]) => ({
//     date,
//     xp,
//   }));

//   // Combine dates
//   const allDates = Array.from(
//     new Set([
//       ...dailyData.map((d) => d.date),
//       ...weeklyData.map((d) => d.date),
//       ...monthlyData.map((d) => d.date),
//     ])
//   ).sort((a, b) => new Date(a) - new Date(b));

//   const chartData = allDates.map((date) => ({
//     date,
//     daily: dailyData.find((d) => d.date === date)?.xp || 0,
//     weekly: weeklyData.find((d) => d.date === date)?.xp || 0,
//     monthly: monthlyData.find((d) => d.date === date)?.xp || 0,
//   }));

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📊 Your Progress</h1>

//       {/* Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Current XP</h2>
//           <p className="text-2xl font-bold">{xp}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Level</h2>
//           <p className="text-2xl font-bold">{level}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Days Logged</h2>
//           <p className="text-2xl font-bold">{xpHistory.length}</p>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-blue-500 rounded-sm" />
//           <span className="text-sm">Daily</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-green-500 rounded-sm" />
//           <span className="text-sm">Weekly</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-orange-500 rounded-sm" />
//           <span className="text-sm">Monthly</span>
//         </div>
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">XP Over Time (Line)</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="daily"
//               stroke="#3b82f6"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="weekly"
//               stroke="#10b981"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="monthly"
//               stroke="#f59e0b"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Stacked Bar Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time (Stacked Bar)
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="daily" stackId="a" fill="#3b82f6" />
//             <Bar dataKey="weekly" stackId="a" fill="#10b981" />
//             <Bar dataKey="monthly" stackId="a" fill="#f59e0b" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";

// export default function Stats() {
//   const { xpHistory, habits, xp, level } = useHabitsStore();

//   // Helper: filter XP by habit frequency
//   const getFilteredXpHistory = (frequency) => {
//     return xpHistory.filter((item) => {
//       const habit = habits.find((h) => h.id === item.habitId);
//       return habit?.frequency === frequency;
//     });
//   };

//   // --- Daily XP ---
//   const dailyData = getFilteredXpHistory("daily").map((item) => ({
//     date: format(parseISO(item.date), "MM/dd"),
//     xp: item.xp,
//   }));

//   // --- Weekly XP ---
//   const weeklyMap = {};
//   getFilteredXpHistory("weekly").forEach((item) => {
//     const weekStart = startOfWeek(parseISO(item.date), { weekStartsOn: 1 });
//     const key = format(weekStart, "MM/dd");
//     weeklyMap[key] = (weeklyMap[key] || 0) + item.xp;
//   });
//   const weeklyData = Object.entries(weeklyMap).map(([date, xp]) => ({
//     date,
//     xp,
//   }));

//   // --- Monthly XP ---
//   const monthlyMap = {};
//   getFilteredXpHistory("monthly").forEach((item) => {
//     const monthStart = startOfMonth(parseISO(item.date));
//     const key = format(monthStart, "MMM yyyy");
//     monthlyMap[key] = (monthlyMap[key] || 0) + item.xp;
//   });
//   const monthlyData = Object.entries(monthlyMap).map(([date, xp]) => ({
//     date,
//     xp,
//   }));

//   // Combine all dates
//   const allDates = Array.from(
//     new Set([
//       ...dailyData.map((d) => d.date),
//       ...weeklyData.map((d) => d.date),
//       ...monthlyData.map((d) => d.date),
//     ])
//   ).sort((a, b) => new Date(a) - new Date(b));

//   const chartData = allDates.map((date) => ({
//     date,
//     daily: dailyData.find((d) => d.date === date)?.xp || 0,
//     weekly: weeklyData.find((d) => d.date === date)?.xp || 0,
//     monthly: monthlyData.find((d) => d.date === date)?.xp || 0,
//   }));

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📊 Your Progress</h1>

//       {/* Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Current XP</h2>
//           <p className="text-2xl font-bold">{xp}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Level</h2>
//           <p className="text-2xl font-bold">{level}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Days Logged</h2>
//           <p className="text-2xl font-bold">{xpHistory.length}</p>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-blue-500 rounded-sm" />
//           <span className="text-sm">Daily</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-green-500 rounded-sm" />
//           <span className="text-sm">Weekly</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-orange-500 rounded-sm" />
//           <span className="text-sm">Monthly</span>
//         </div>
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">XP Over Time (Line)</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="daily"
//               stroke="#3b82f6"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="weekly"
//               stroke="#10b981"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="monthly"
//               stroke="#f59e0b"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Stacked Bar Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time (Stacked Bar)
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="daily" stackId="a" fill="#3b82f6" />
//             <Bar dataKey="weekly" stackId="a" fill="#10b981" />
//             <Bar dataKey="monthly" stackId="a" fill="#f59e0b" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";

// export default function Stats() {
//   const { xpHistory, habits, xp, level } = useHabitsStore();

//   // Helper: filter XP by habit frequency
//   const getFilteredXpHistory = (frequency) =>
//     xpHistory.filter((item) => {
//       const habit = habits.find((h) => h.id === item.habitId);
//       return habit?.frequency === frequency;
//     });

//   // --- Daily XP ---
//   const dailyData = getFilteredXpHistory("daily").map((item) => ({
//     date: format(parseISO(item.date), "MM/dd"),
//     xp: item.xp,
//   }));

//   // --- Weekly XP ---
//   const weeklyMap = {};
//   getFilteredXpHistory("weekly").forEach((item) => {
//     const weekStart = startOfWeek(parseISO(item.date), { weekStartsOn: 1 });
//     const key = format(weekStart, "MM/dd");
//     weeklyMap[key] = (weeklyMap[key] || 0) + item.xp;
//   });
//   const weeklyData = Object.entries(weeklyMap).map(([date, xp]) => ({
//     date,
//     xp,
//   }));

//   // --- Monthly XP ---
//   const monthlyMap = {};
//   getFilteredXpHistory("monthly").forEach((item) => {
//     const monthStart = startOfMonth(parseISO(item.date));
//     const key = format(monthStart, "MMM yyyy");
//     monthlyMap[key] = (monthlyMap[key] || 0) + item.xp;
//   });
//   const monthlyData = Object.entries(monthlyMap).map(([date, xp]) => ({
//     date,
//     xp,
//   }));

//   // Merge all dates for chart alignment
//   const allDates = Array.from(
//     new Set([
//       ...dailyData.map((d) => d.date),
//       ...weeklyData.map((d) => d.date),
//       ...monthlyData.map((d) => d.date),
//     ])
//   ).sort((a, b) => new Date(a) - new Date(b));

//   // Prepare final chart data
//   const chartData = allDates.map((date) => ({
//     date,
//     daily: dailyData.find((d) => d.date === date)?.xp || 0,
//     weekly: weeklyData.find((d) => d.date === date)?.xp || 0,
//     monthly: monthlyData.find((d) => d.date === date)?.xp || 0,
//   }));

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📊 Your Progress</h1>

//       {/* Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Current XP</h2>
//           <p className="text-2xl font-bold">{xp}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Level</h2>
//           <p className="text-2xl font-bold">{level}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Entries Logged</h2>
//           <p className="text-2xl font-bold">{xpHistory.length}</p>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-blue-500 rounded-sm" />
//           <span className="text-sm">Daily</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-green-500 rounded-sm" />
//           <span className="text-sm">Weekly</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <span className="w-4 h-4 bg-orange-500 rounded-sm" />
//           <span className="text-sm">Monthly</span>
//         </div>
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">XP Over Time (Line)</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="daily"
//               stroke="#3b82f6"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="weekly"
//               stroke="#10b981"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="monthly"
//               stroke="#f59e0b"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Bar Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">XP Over Time (Bar)</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="daily" stackId="a" fill="#3b82f6" />
//             <Bar dataKey="weekly" stackId="a" fill="#10b981" />
//             <Bar dataKey="monthly" stackId="a" fill="#f59e0b" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";

// export default function Stats() {
//   const { xpHistory, habits, xp, level } = useHabitsStore();
//   const [activeTab, setActiveTab] = useState("daily"); // daily, weekly, monthly

//   // Helper: filter XP by habit frequency
//   const getFilteredXpHistory = (frequency) => {
//     return xpHistory.filter((item) => {
//       const habit = habits.find((h) => h.id === item.habitId);
//       return habit?.frequency === frequency;
//     });
//   };

//   // --- Prepare chart data by frequency ---
//   const prepareChartData = (frequency) => {
//     const data = getFilteredXpHistory(frequency);
//     if (frequency === "daily") {
//       return data.map((item) => ({
//         date: format(parseISO(item.date), "MM/dd"),
//         xp: item.xp,
//       }));
//     } else if (frequency === "weekly") {
//       const weeklyMap = {};
//       data.forEach((item) => {
//         const weekStart = startOfWeek(parseISO(item.date), { weekStartsOn: 1 });
//         const key = format(weekStart, "MM/dd");
//         weeklyMap[key] = (weeklyMap[key] || 0) + item.xp;
//       });
//       return Object.entries(weeklyMap).map(([date, xp]) => ({ date, xp }));
//     } else if (frequency === "monthly") {
//       const monthlyMap = {};
//       data.forEach((item) => {
//         const monthStart = startOfMonth(parseISO(item.date));
//         const key = format(monthStart, "MMM yyyy");
//         monthlyMap[key] = (monthlyMap[key] || 0) + item.xp;
//       });
//       return Object.entries(monthlyMap).map(([date, xp]) => ({ date, xp }));
//     }
//     return [];
//   };

//   const chartData = prepareChartData(activeTab);

//   // Tab colors
//   const tabColors = {
//     daily: "#3b82f6",
//     weekly: "#10b981",
//     monthly: "#f59e0b",
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📊 Your Progress</h1>

//       {/* Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Current XP</h2>
//           <p className="text-2xl font-bold">{xp}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Level</h2>
//           <p className="text-2xl font-bold">{level}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Days Logged</h2>
//           <p className="text-2xl font-bold">{xpHistory.length}</p>
//         </div>
//       </div>

//       {/* Tab Selector */}
//       <div className="flex gap-4">
//         {["daily", "weekly", "monthly"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               activeTab === tab
//                 ? `bg-${tab}-500 text-white`
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             style={{ backgroundColor: activeTab === tab ? tabColors[tab] : "#E5E7EB" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time (Line) — {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="xp"
//               stroke={tabColors[activeTab]}
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Bar Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time (Bar) — {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="xp" fill={tabColors[activeTab]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";

// export default function Stats() {
//   const { xpHistory, habits, xp, level } = useHabitsStore();
//   const [activeTab, setActiveTab] = useState("daily"); // daily, weekly, monthly

//   // --- Prepare chart data by frequency ---
//   const prepareChartData = (frequency) => {
//     if (!xpHistory || xpHistory.length === 0) return [];

//     if (frequency === "daily") {
//       // Filter only daily habits
//       const data = xpHistory.filter((item) => {
//         const habit = habits.find((h) => h.id === item.habitId);
//         return habit?.frequency === "daily";
//       });
//       return data.map((item) => ({
//         date: format(parseISO(item.date), "MM/dd"),
//         xp: item.xp,
//       }));
//     } else if (frequency === "weekly") {
//       // Aggregate weekly XP
//       const weeklyMap = {};
//       xpHistory.forEach((item) => {
//         const habit = habits.find((h) => h.id === item.habitId);
//         if (!habit || habit.frequency !== "weekly") return;

//         const weekStart = startOfWeek(parseISO(item.date), { weekStartsOn: 1 });
//         const weekEnd = new Date(weekStart);
//         weekEnd.setDate(weekEnd.getDate() + 6);

//         const key = `${format(weekStart, "MM/dd")}-${format(weekEnd, "MM/dd")}`;
//         weeklyMap[key] = (weeklyMap[key] || 0) + item.xp;
//       });
//       return Object.entries(weeklyMap).map(([date, xp]) => ({ date, xp }));
//     } else if (frequency === "monthly") {
//       // Aggregate monthly XP
//       const monthlyMap = {};
//       xpHistory.forEach((item) => {
//         const habit = habits.find((h) => h.id === item.habitId);
//         if (!habit || habit.frequency !== "monthly") return;

//         const monthStart = startOfMonth(parseISO(item.date));
//         const key = format(monthStart, "MMM yyyy");
//         monthlyMap[key] = (monthlyMap[key] || 0) + item.xp;
//       });
//       return Object.entries(monthlyMap).map(([date, xp]) => ({ date, xp }));
//     }
//     return [];
//   };

//   const chartData = prepareChartData(activeTab).sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   const tabColors = {
//     daily: "#3b82f6",
//     weekly: "#10b981",
//     monthly: "#f59e0b",
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📊 Your Progress</h1>

//       {/* Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Current XP</h2>
//           <p className="text-2xl font-bold">{xp}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Level</h2>
//           <p className="text-2xl font-bold">{level}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Days Logged</h2>
//           <p className="text-2xl font-bold">{xpHistory.length}</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-4">
//         {["daily", "weekly", "monthly"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className="px-4 py-2 rounded-lg font-medium"
//             style={{
//               backgroundColor: activeTab === tab ? tabColors[tab] : "#E5E7EB",
//               color: activeTab === tab ? "white" : "#374151",
//             }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time —{" "}
//           {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="xp"
//               stroke={tabColors[activeTab]}
//               strokeWidth={2}
//               isAnimationActive={true}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Bar Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time —{" "}
//           {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar
//               dataKey="xp"
//               fill={tabColors[activeTab]}
//               isAnimationActive={true}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useHabitsStore } from "../store/habitsStore";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import {
//   parseISO,
//   format,
//   startOfWeek,
//   startOfMonth,
//   addDays,
//   addWeeks,
//   addMonths,
//   differenceInDays,
// } from "date-fns";

// export default function Stats() {
//   const { xpHistory, habits, xp, level } = useHabitsStore();
//   const [activeTab, setActiveTab] = useState("daily"); // daily, weekly, monthly

//   const tabColors = {
//     daily: "#3b82f6",
//     weekly: "#10b981",
//     monthly: "#f59e0b",
//   };

//   // --- Generate full timeline ---
//   const generateTimeline = (frequency) => {
//     if (!xpHistory || xpHistory.length === 0) return [];

//     const dates = xpHistory
//       .map((item) => parseISO(item.date))
//       .sort((a, b) => a - b);

//     const first = dates[0];
//     const last = dates[dates.length - 1];

//     const timeline = [];

//     if (frequency === "daily") {
//       for (let d = first; d <= last; d = addDays(d, 1)) {
//         timeline.push(format(d, "MM/dd"));
//       }
//     } else if (frequency === "weekly") {
//       let d = startOfWeek(first, { weekStartsOn: 1 });
//       const end = startOfWeek(last, { weekStartsOn: 1 });
//       while (d <= end) {
//         const weekEnd = addDays(d, 6);
//         timeline.push(`${format(d, "MM/dd")}-${format(weekEnd, "MM/dd")}`);
//         d = addWeeks(d, 1);
//       }
//     } else if (frequency === "monthly") {
//       let d = startOfMonth(first);
//       const end = startOfMonth(last);
//       while (d <= end) {
//         timeline.push(format(d, "MMM yyyy"));
//         d = addMonths(d, 1);
//       }
//     }

//     return timeline;
//   };

//   const prepareChartData = (frequency) => {
//     const timeline = generateTimeline(frequency);
//     const dataMap = {};

//     xpHistory.forEach((item) => {
//       const habit = habits.find((h) => h.id === item.habitId);
//       if (!habit || habit.frequency !== frequency) return;

//       let key = "";
//       const dateObj = parseISO(item.date);

//       if (frequency === "daily") {
//         key = format(dateObj, "MM/dd");
//       } else if (frequency === "weekly") {
//         const weekStart = startOfWeek(dateObj, { weekStartsOn: 1 });
//         const weekEnd = addDays(weekStart, 6);
//         key = `${format(weekStart, "MM/dd")}-${format(weekEnd, "MM/dd")}`;
//       } else if (frequency === "monthly") {
//         key = format(startOfMonth(dateObj), "MMM yyyy");
//       }

//       dataMap[key] = (dataMap[key] || 0) + item.xp;
//     });

//     return timeline.map((date) => ({
//       date,
//       xp: dataMap[date] || 0,
//     }));
//   };

//   const chartData = prepareChartData(activeTab);

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl font-bold">📊 Your Progress</h1>

//       {/* Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Current XP</h2>
//           <p className="text-2xl font-bold">{xp}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Level</h2>
//           <p className="text-2xl font-bold">{level}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4 text-center">
//           <h2 className="text-sm text-gray-500">Days Logged</h2>
//           <p className="text-2xl font-bold">{xpHistory.length}</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-4">
//         {["daily", "weekly", "monthly"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className="px-4 py-2 rounded-lg font-medium"
//             style={{
//               backgroundColor: activeTab === tab ? tabColors[tab] : "#E5E7EB",
//               color: activeTab === tab ? "white" : "#374151",
//             }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time —{" "}
//           {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="xp"
//               stroke={tabColors[activeTab]}
//               strokeWidth={2}
//               isAnimationActive={true}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Bar Chart */}
//       <div className="bg-white rounded-xl shadow p-4 h-[300px]">
//         <h2 className="text-lg font-semibold mb-2">
//           XP Over Time —{" "}
//           {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//         </h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar
//               dataKey="xp"
//               fill={tabColors[activeTab]}
//               isAnimationActive={true}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useHabitsStore } from "../store/habitsStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  parseISO,
  format,
  startOfWeek,
  startOfMonth,
  addDays,
  addWeeks,
  addMonths,
} from "date-fns";

export default function Stats() {
  const { xpHistory, habits, xp, level } = useHabitsStore();
  const [activeTab, setActiveTab] = useState("combined"); // now including combined

  const tabColors = {
    daily: "#3b82f6",
    weekly: "#10b981",
    monthly: "#f59e0b",
  };

  // --- Helper to generate timeline ---
  const generateTimeline = (frequency) => {
    if (!xpHistory || xpHistory.length === 0) return [];

    const dates = xpHistory
      .map((item) => parseISO(item.date))
      .sort((a, b) => a - b);

    const first = dates[0];
    const last = dates[dates.length - 1];

    const timeline = [];

    if (frequency === "daily") {
      for (let d = first; d <= last; d = addDays(d, 1)) {
        timeline.push(format(d, "MM/dd"));
      }
    } else if (frequency === "weekly") {
      let d = startOfWeek(first, { weekStartsOn: 1 });
      const end = startOfWeek(last, { weekStartsOn: 1 });
      while (d <= end) {
        const weekEnd = addDays(d, 6);
        timeline.push(`${format(d, "MM/dd")}-${format(weekEnd, "MM/dd")}`);
        d = addWeeks(d, 1);
      }
    } else if (frequency === "monthly") {
      let d = startOfMonth(first);
      const end = startOfMonth(last);
      while (d <= end) {
        timeline.push(format(d, "MMM yyyy"));
        d = addMonths(d, 1);
      }
    }

    return timeline;
  };

  // --- Prepare chart data for a single frequency ---
  const prepareChartDataForFrequency = (frequency) => {
    const timeline = generateTimeline(frequency);
    const dataMap = {};

    xpHistory.forEach((item) => {
      const habit = habits.find((h) => h.id === item.habitId);
      if (!habit || habit.frequency !== frequency) return;

      let key = "";
      const dateObj = parseISO(item.date);

      if (frequency === "daily") key = format(dateObj, "MM/dd");
      else if (frequency === "weekly") {
        const weekStart = startOfWeek(dateObj, { weekStartsOn: 1 });
        const weekEnd = addDays(weekStart, 6);
        key = `${format(weekStart, "MM/dd")}-${format(weekEnd, "MM/dd")}`;
      } else if (frequency === "monthly")
        key = format(startOfMonth(dateObj), "MMM yyyy");

      dataMap[key] = (dataMap[key] || 0) + item.xp;
    });

    return timeline.map((date) => ({
      date,
      xp: dataMap[date] || 0,
    }));
  };

  // --- Combine daily, weekly, and monthly into one dataset ---
  const chartData =
    activeTab === "combined"
      ? (() => {
          const daily = prepareChartDataForFrequency("daily");
          const weekly = prepareChartDataForFrequency("weekly");
          const monthly = prepareChartDataForFrequency("monthly");

          const allDates = Array.from(
            new Set([
              ...daily.map((d) => d.date),
              ...weekly.map((d) => d.date),
              ...monthly.map((d) => d.date),
            ])
          ).sort((a, b) => new Date(a) - new Date(b));

          return allDates.map((date) => ({
            date,
            daily: daily.find((d) => d.date === date)?.xp || 0,
            weekly: weekly.find((w) => w.date === date)?.xp || 0,
            monthly: monthly.find((m) => m.date === date)?.xp || 0,
          }));
        })()
      : prepareChartDataForFrequency(activeTab);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Your Progress</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="text-sm text-gray-500">Current XP</h2>
          <p className="text-2xl font-bold">{xp}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="text-sm text-gray-500">Level</h2>
          <p className="text-2xl font-bold">{level}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="text-sm text-gray-500">Days Logged</h2>
          <p className="text-2xl font-bold">{xpHistory.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        {["daily", "weekly", "monthly", "combined"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: activeTab === tab ? "#374151" : "#E5E7EB",
              color: activeTab === tab ? "white" : "#374151",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow p-4 h-[300px]">
        <h2 className="text-lg font-semibold mb-2">
          XP Over Time —{" "}
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {activeTab === "combined" ? (
              <>
                <Line
                  type="monotone"
                  dataKey="daily"
                  stroke={tabColors.daily}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="weekly"
                  stroke={tabColors.weekly}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="monthly"
                  stroke={tabColors.monthly}
                  strokeWidth={2}
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="xp"
                stroke={tabColors[activeTab]}
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      {activeTab !== "combined" && (
        <div className="bg-white rounded-xl shadow p-4 h-[300px]">
          <h2 className="text-lg font-semibold mb-2">
            XP Over Time —{" "}
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="xp"
                fill={tabColors[activeTab]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
