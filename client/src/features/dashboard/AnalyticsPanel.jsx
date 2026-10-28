import { motion } from "motion/react";

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

function ProgressRow({ label, value, accent = "indigo", delay }) {
  return (
    <div className="analytics-progress-row">
      <div className="analytics-progress-labels">
        <span className="analytics-progress-name">{label}</span>
        <span className="analytics-progress-value">{value}%</span>
      </div>
      <div className="analytics-progress-track">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
          className={`analytics-progress-fill ${accent === "fuchsia" ? "is-fuchsia" : ""}`}
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
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="dashboard-panel">
      {/* Header + range toggle */}
      <div className="analytics-header">
        <div>
          <p className="analytics-eyebrow">Analytics for</p>
          <h2 className="analytics-title">{title}</h2>
        </div>
        <div className="analytics-ranges">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`analytics-range ${range === r ? "is-active" : ""}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Clicks over time */}
      <div className="analytics-chart-section">
        <p className="analytics-section-title">Clicks over time</p>
        <div className="analytics-chart">
          {timeSeries.map((d, i) => (
            <div key={d.label} className="analytics-chart-column">
              {/* Tooltip */}
              <span className="analytics-tooltip">
                {d.value} clicks
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.value / max) * 100}%` }}
                transition={{ duration: 0.75, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="analytics-chart-bar"
              />
              <span className="analytics-chart-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Devices + Countries */}
      <div className="analytics-details">
        <div>
          <p className="analytics-section-title">Devices</p>
          <div className="analytics-progress-list">
            {devices.map((d, i) => (
              <ProgressRow key={d.label} {...d} delay={i * 100} />
            ))}
          </div>
        </div>
        <div>
          <p className="analytics-section-title">Top countries</p>
          <div className="analytics-progress-list">
            {countries.map((c, i) => (
              <ProgressRow key={c.label} {...c} accent="fuchsia" delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
