import React, { useState, useEffect } from "react";
import VacationCalendar from "./Calendar";

export default function App() {
  const [country, setCountry] = useState("US");
  const [view, setView] = useState("monthly");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="min-h-screen p-4 relative w-11/12 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
          Vacation Calendar
        </h1>
        <p className="text-white/90 text-xl font-medium">
          Plan your vacations around holidays worldwide
        </p>
      </div>

      <div className="bg-transparent rounded-3xl p-6 mb-8 border border-white/20 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-6 justify-center">

          <div className="relative">
            <select
              className="appearance-none bg-transparent border-2 border-white/30 rounded-2xl px-6 py-3 text-white font-semibold text-base hover:bg-white/10 focus:bg-white/10 focus:border-white/50 focus:outline-none transition-all duration-300 cursor-pointer pr-10"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ backgroundColor: 'transparent' }}
            >
              <option value="US" className="text-gray-800 bg-transparent" style={{ backgroundColor: 'transparent' }}>🇺🇸 USA</option>
              <option value="CN" className="text-gray-800 bg-transparent" style={{ backgroundColor: 'transparent' }}>🇨🇳 China</option>
              <option value="GB" className="text-gray-800 bg-transparent" style={{ backgroundColor: 'transparent' }}>🇬🇧 UK</option>
              <option value="CA" className="text-gray-800 bg-transparent" style={{ backgroundColor: 'transparent' }}>🇨🇦 Canada</option>
              <option value="AU" className="text-gray-800 bg-transparent" style={{ backgroundColor: 'transparent' }}>🇦🇺 Australia</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-transparent rounded-2xl px-6 py-3">
            <button
              className="bg-transparent border-2 border-white/30 text-white px-5 py-2 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white/50 focus:outline-none focus:ring-4 focus:ring-white/20"
              onClick={handlePrev}
            >
              ← Prev
            </button>

            <div className="text-white font-bold text-lg min-w-[180px] text-center">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>

            <button
              className="bg-transparent border-2 border-white/30 text-white px-5 py-2 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white/50 focus:outline-none focus:ring-4 focus:ring-white/20"
              onClick={handleNext}
            >
              Next →
            </button>
          </div>

          <div className="flex gap-2 bg-transparent rounded-2xl p-2">
            <button
              className={`px-5 py-2 rounded-xl font-bold text-base ${
                view === "monthly"
                  ? "bg-white/20 border-2 border-white/40 text-white"
                  : "bg-transparent border-2 border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30"
              }`}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-5 py-2 rounded-xl font-bold text-base ${
                view === "quarterly"
                  ? "bg-white/20 border-2 border-white/40 text-white"
                  : "bg-transparent border-2 border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30"
              }`}
              onClick={() => setView("quarterly")}
            >
              Quarterly
            </button>
          </div>
        </div>
      </div>

      <VacationCalendar
        country={country}
        year={currentYear}
        month={currentMonth}
        view={view}
        today={new Date()}
      />
    </div>
  );
}
