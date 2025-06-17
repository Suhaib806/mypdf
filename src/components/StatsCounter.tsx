import React from "react";

const stats = [
  {
    icon: (
      <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="8" y="17" fontSize="7" fill="#ef4444" fontWeight="bold">PDF</text>
      </svg>
    ),
    value: "3 023",
    label: "Converted PDF",
    bg: "bg-red-50"
  },
  {
    icon: (
      <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="5" y="11" width="14" height="8" rx="2" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <path d="M8 11V8a4 4 0 118 0" stroke="#22c55e" strokeWidth="2" />
        <circle cx="12" cy="15" r="1.5" fill="#22c55e" />
      </svg>
    ),
    value: "449",
    label: "PDF Unlocked",
    bg: "bg-green-50"
  }
];

function getDayWithSuffix(day: number) {
  if (day > 3 && day < 21) return day + "th";
  switch (day % 10) {
    case 1: return day + "st";
    case 2: return day + "nd";
    case 3: return day + "rd";
    default: return day + "th";
  }
}

const StatsCounter = () => {
  const today = new Date();
  const month = today.toLocaleString('en-US', { month: 'short' });
  const day = getDayWithSuffix(today.getDate());
  const year = today.getFullYear();
  const dateString = `Today ${month} ${day}, ${year}*`;

  return (
    <div className="w-full flex flex-col items-center my-12">
      <div className="text-center mb-8">
        <span className="text-[18px] leading-[31px] font-semibold text-black tracking-wide">{dateString}</span>
      </div>
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 justify-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1 min-w-[180px]">
            <div className={`w-16 h-16 flex items-center justify-center rounded-xl mb-3 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
            <div className="text-gray-500 text-lg text-center">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter; 