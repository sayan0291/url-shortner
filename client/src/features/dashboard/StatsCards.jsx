import { motion } from "motion/react";

// Props: stats = [{ label, value, change }]   change is a number (e.g. 12.5 or -3)
export const StatsCards = ({ stats = [] }) => {
  return (
    <section className="stats-grid">
      {stats.map((s, i) => {
        const up = s.change >= 0;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="stat-card"
          >
            <p className="stat-label">{s.label}</p>
            <div className="stat-values">
              <p className="stat-value">
                {s.value}
              </p>
              <span
                className={`stat-change ${up ? "is-positive" : "is-negative"}`}
              >
                {up ? "▲" : "▼"} {Math.abs(s.change)}%
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
