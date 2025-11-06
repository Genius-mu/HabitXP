// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Tabs from "./components/Tabs";
// import Daily from "./pages/Daily";
// import Weekly from "./pages/Weekly";
// import Monthly from "./pages/Monthly";
// import AddHabitModal from "./components/AddHabitModal";
// import { useHabitsStore } from "./store/habitsStore";
// import Stats from "./pages/Stats";

// function App() {
//   const [tab, setTab] = useState("daily");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const init = useHabitsStore((s) => s.init);
//   const addHabit = useHabitsStore((s) => s.addHabit);

//   useEffect(() => {
//     (async () => {
//       console.log("Initializing habits...");
//       await init();

//       const { habits } = useHabitsStore.getState();
//       console.log("Loaded habits:", habits);

//       if (!habits || habits.length === 0) {
//         await addHabit("Workout 💪");
//         console.log("Seeded demo habit");
//       }

//       setLoading(false);
//     })();
//   }, [init, addHabit]);

//   const initialized = useHabitsStore((s) => s.initialized);

//   useEffect(() => {
//     init();
//   }, [init]);

//   if (!initialized) return <p>Loading habits...</p>;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
//         Loading habits...
//       </div>
//     );
//   }

//   const renderTab = () => {
//     switch (tab) {
//       case "daily":
//         return <Daily />;
//       case "weekly":
//         return <Weekly />;
//       case "monthly":
//         return <Monthly />;
//       case "stats":
//         return <Stats />;
//       default:
//         return <Daily />;
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen text-gray-900 flex flex-col">
//       <Navbar onAddClick={() => setIsModalOpen(true)} />
//       <div className="container mx-auto p-4">
//         <Tabs tab={tab} setTab={setTab} />
//         <div className="mt-4">{renderTab()}</div>
//       </div>

//       <AddHabitModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>

//   );
// }

// export default App;

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import Monthly from "./pages/Monthly";
import AddHabitModal from "./components/AddHabitModal";
import { useHabitsStore } from "./store/habitsStore";
import Stats from "./pages/Stats";
import XpToast from "./XpToast";

function App() {
  const [tab, setTab] = useState("daily");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const init = useHabitsStore((s) => s.init);
  const addHabit = useHabitsStore((s) => s.addHabit);

  useEffect(() => {
    (async () => {
      console.log("Initializing habits...");
      await init();

      const { habits } = useHabitsStore.getState();
      console.log("Loaded habits:", habits);

      if (!habits || habits.length === 0) {
        await addHabit("Workout 💪");
        console.log("Seeded demo habit");
      }

      setLoading(false);
    })();
  }, [init, addHabit]);

  const initialized = useHabitsStore((s) => s.initialized);

  useEffect(() => {
    init();
  }, [init]);

  if (!initialized) return <p>Loading habits...</p>;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading habits...
      </div>
    );
  }

  const renderTab = () => {
    switch (tab) {
      case "daily":
        return <Daily />;
      case "weekly":
        return <Weekly />;
      case "monthly":
        return <Monthly />;
      case "stats":
        return <Stats />;
      default:
        return <Daily />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 flex flex-col">
      <Navbar onAddClick={() => setIsModalOpen(true)} />
      <div className="container mx-auto p-4">
        <Tabs tab={tab} setTab={setTab} />
        <div className="mt-4">{renderTab()}</div>
      </div>
      <AddHabitModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <XpToast /> {/* ✨ Add this line here — right before closing div */}
    </div>
  );
}

export default App;
