export default function Tabs({ tab, setTab }) {
  const tabs = [
    { id: "daily", text: "Daily" },
    { id: "weekly", text: "Weekly" },
    { id: "monthly", text: "Monthly" },
    { id: "stats", text: "Stats" },
  ];

  return (
    <div className="flex gap-3 border-b pb-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`pb-1 text-sm font-medium ${
            tab === t.id
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          }`}
        >
          {t.text}
        </button>
      ))}
    </div>
  );
}
