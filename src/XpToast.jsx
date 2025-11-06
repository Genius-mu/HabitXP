import { motion, AnimatePresence } from "framer-motion";
import { useHabitsStore } from "./store/habitsStore";

export default function XpToast() {
  const xpGains = useHabitsStore((s) => s.xpGains);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {xpGains.map((gain) => {
          const isPositive = gain.amount > 0;
          return (
            <motion.div
              key={gain.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`font-semibold px-4 py-2 rounded-lg shadow text-sm ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? "+" : ""}
              {gain.amount} XP
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
