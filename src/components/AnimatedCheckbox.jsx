import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function AnimatedCheckbox({ checked, onChange }) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="relative w-6 h-6 rounded-lg border-2 border-gray-400 cursor-pointer flex items-center justify-center"
      onClick={onChange}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-green-500 text-white w-full h-full rounded-md flex items-center justify-center"
          >
            <Check size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
