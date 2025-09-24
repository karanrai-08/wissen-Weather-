import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchHolidays = async (year, country) => {
  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`
    );
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error("Unexpected API response", data);
      return {};
    }

    const map = {};
    data.forEach((h) => {
      map[h.date] = h;
    });
    return map;
  } catch (err) {
    console.error(err);
    return {};
  }
};

function formatISODate(date) {
  return date.toISOString().split("T")[0];
}

function getMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());

  const weeks = [];
  let cur = new Date(start);
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function getWeekHolidayCount(week, holidayMap) {
  return week.filter((day) => holidayMap[formatISODate(day)]).length;
}

function WeekRow({ week, monthIndex, holidayMap, today }) {
  const count = getWeekHolidayCount(week, holidayMap);
  const bg =
    count === 0
      ? "bg-transparent"
      : count === 1
        ? "bg-gradient-to-br from-green-300/40 via-emerald-400/30 to-green-500/40"
        : count >= 2
          ? "bg-green-700/70"
          : "bg-transparent";

  return (
    <div
      className={`grid grid-cols-7 p-2 mb-3 rounded-2xl border border-white/30 shadow-xl ${bg}`}
      style={{
        background: count === 1
          ? '#99fb9979'
          : count >= 2
            ? '#046204ff'
            : undefined
      }}
    >
      {week.map((day) => {
        const iso = formatISODate(day);
        const holiday = holidayMap[iso];
        const isToday = iso === formatISODate(today);
        const isOtherMonth = day.getMonth() !== monthIndex;

        return (
          <div
            key={iso}
            className={`text-center text-sm py-3 px-2 relative cursor-pointer rounded-xl
              ${isOtherMonth ? "text-white/50" : "text-white font-medium"}
              ${isToday ? "border-2 border-white/60 bg-transparent" : ""}
              hover:outline-2 hover:outline-white/40`}
            title={holiday ? holiday.localName : ""}
          >
            <span className="font-bold text-lg">{day.getDate()}</span>
            {holiday && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MonthCalendar({ year, month, holidayMap, today }) {
  const monthName = new Date(year, month, 1).toLocaleString("default", {
    month: "long",
  });
  const weeks = getMonthGrid(year, month);

  return (
    <div className="border border-white/30 rounded-3xl shadow-2xl p-4 w-full max-w-2xl mx-auto
      bg-transparent">
      <h2 className="text-center font-bold mb-4 text-xl text-white tracking-wide">
        {monthName} {year}
      </h2>
      <div className="grid grid-cols-7 text-xs font-bold text-white/90 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center py-2 px-1 bg-transparent rounded-lg mx-0.5 border border-white/20">
            {d}
          </div>
        ))}
      </div>
      {weeks.map((week, i) => (
        <WeekRow key={i} week={week} monthIndex={month} holidayMap={holidayMap} today={today} />
      ))}
    </div>
  );
}

export default function VacationCalendar({ country, year, month, view, today }) {
  const [holidayMap, setHolidayMap] = useState({});
  const [loading, setLoading] = useState(false);

  const months =
    view === "monthly"
      ? [new Date(year, month)]
      : Array.from({ length: 4 }, (_, i) => new Date(year, month + i));

  useEffect(() => {
    async function loadHolidays() {
      setLoading(true);
      const all = {};
      const yearsNeeded = Array.from(new Set(months.map((m) => m.getFullYear())));
      for (const y of yearsNeeded) {
        const data = await fetchHolidays(y, country);
        Object.assign(all, data);
      }
      setHolidayMap(all);
      setLoading(false);
    }
    loadHolidays();
  }, [country, year, month, view]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="rounded-full h-12 w-12 border-2 border-blue-500"></div>
          <span className="ml-3 text-white">Loading holidays...</span>
        </div>
      ) : (
        <div
          className={`${view === "quarterly"
            ? "grid grid-cols-2 gap-6"
            : "flex justify-center"
            }`}
        >
          {months.map((m, idx) => (
            <MonthCalendar
              key={idx}
              year={m.getFullYear()}
              month={m.getMonth()}
              holidayMap={holidayMap}
              today={today}
            />
          ))}
        </div>
      )}
    </div>
  );
}
