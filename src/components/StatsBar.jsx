// import { useHabitsStore } from "../store/habitsStore";

// export default function StatsBar() {
//   const { xp, level } = useHabitsStore();

//   //   const progressPercent = (xp / (level * 100)) * 100;
//   const progressPercent = Math.min((xp / 100) * 100, 100);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow mt-4">
//       <div className="flex justify-between items-center mb-2">
//         <span className="font-semibold">Level {level}</span>
//         <span className="text-sm text-gray-600">{xp} XP</span>
//       </div>

//       <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//         <div
//           className="h-3 bg-green-500 transition-all duration-300"
//           style={{ width: `${progressPercent}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHabitsStore } from "../store/habitsStore";

export default function StatsBar() {
  const { xp, level } = useHabitsStore();

  const [lastXP, setLastXP] = useState(xp);
  const [delta, setDelta] = useState(0);

  // Detect XP changes
  useEffect(() => {
    const difference = xp - lastXP;
    if (difference !== 0) {
      setDelta(difference);
      setLastXP(xp);

      // Hide the popup after a short time
      const timer = setTimeout(() => setDelta(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [xp]);

  const progressPercent = Math.min((xp / 100) * 100, 100);

  return (
    <div className="relative bg-white p-4 rounded-lg shadow mt-4 overflow-hidden">
      {/* Floating XP Animation */}
      <AnimatePresence>
        {delta !== 0 && (
          <motion.div
            key={delta}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className={`absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold ${
              delta > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {delta > 0 ? `+${delta} XP` : `${delta} XP`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Level {level}</span>
        <span className="text-sm text-gray-600">{xp} XP</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-3 bg-green-500"
          style={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
