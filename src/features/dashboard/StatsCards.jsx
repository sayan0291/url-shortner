// Props: stats = [{ label, value, change }]   change is a number (e.g. 12.5 or -3)
export const StatsCards = ({ stats = [] }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map((s, i) => {
        const up = s.change >= 0;
        return (
          <div
            key={s.label}
            style={{ animationDelay: `${i * 100}ms` }}
            className="animate-fade-up group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
          >
            <p className="text-sm font-medium text-slate-500">{s.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                {s.value}
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                }`}
              >
                {up ? "▲" : "▼"} {Math.abs(s.change)}%
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}