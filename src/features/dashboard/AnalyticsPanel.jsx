// Props:
//   title        = text shown at the top (e.g. the short link)
//   timeSeries   = [{ label: "Mon", value: 42 }, ...]   -> clicks over time
//   devices      = [{ label: "Mobile", value: 60 }, ...]  -> values are percentages
//   countries    = [{ label: "India", value: 55 }, ...]   -> values are percentages
//   range        = "7d" | "30d" | "90d"
//   onRangeChange(range)
//
// NOTE: the bars below are plain CSS so there is no dependency.
// When you wire real data, you can replace the "Clicks over time" block
// with a Chart.js <Line /> / <Bar /> and keep the rest.

const RANGES = ["7d", "30d", "90d"];

function ProgressRow({ label, value, color, delay }) {
  return (
    <div className="group">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          style={{ width: `${value}%`, animationDelay: `${delay}ms` }}
          className={`animate-grow-w h-full rounded-full transition-all group-hover:brightness-110 ${color}`}
        />
      </div>
    </div>
  );
}

export const AnalyticsPanel = ({
  title = "Analytics",
  timeSeries = [],
  devices = [],
  countries = [],
  range = "7d",
  onRangeChange = () => {},
}) => {
  const max = Math.max(1, ...timeSeries.map((d) => d.value));

  return (
    <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header + range toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Analytics for</p>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </div>
        <div className="flex rounded-xl bg-slate-100 p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                range === r
                  ? "bg-white text-indigo-600 shadow"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Clicks over time */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-700">Clicks over time</p>
        <div className="flex h-44 items-end gap-2 rounded-xl bg-slate-50 p-4">
          {timeSeries.map((d, i) => (
            <div key={d.label} className="group relative flex h-full flex-1 flex-col justify-end">
              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {d.value} clicks
              </span>
              <div
                style={{ height: `${(d.value / max) * 100}%`, animationDelay: `${i * 60}ms` }}
                className="animate-grow-h w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-fuchsia-400 transition-all group-hover:from-indigo-700 group-hover:to-fuchsia-500"
              />
              <span className="mt-2 text-center text-[10px] text-slate-400">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Devices + Countries */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">Devices</p>
          <div className="space-y-3">
            {devices.map((d, i) => (
              <ProgressRow key={d.label} {...d} color="bg-indigo-500" delay={i * 100} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">Top countries</p>
          <div className="space-y-3">
            {countries.map((c, i) => (
              <ProgressRow key={c.label} {...c} color="bg-fuchsia-500" delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}