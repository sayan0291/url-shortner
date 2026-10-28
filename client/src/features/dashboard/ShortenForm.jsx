import { motion } from "motion/react";

// Props: value, onChange(e), onSubmit(e), loading, error
export const ShortenForm = ({
  value = "",
  onChange = () => {},
  onSubmit = (e) => e.preventDefault(),
  loading = false,
  error = "",
}) => {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="shorten-hero">
      <h1 className="shorten-title">
        Shorten links.{" "}
        <span className="shorten-title-highlight">
          Track everything.
        </span>
      </h1>
      <p className="shorten-description">
        Paste a long URL, get a short one, and see who clicks it, from where, and on what device.
      </p>

      <form
        onSubmit={onSubmit}
        className={`shorten-form ${error ? "has-error" : ""}`}
      >
        <input
          type="url"
          value={value}
          onChange={onChange}
          placeholder="https://your-very-long-url.com/goes/here"
          className="shorten-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="shorten-button"
        >
          {loading ? (
            <>
              <span className="shorten-spinner" />
              Shortening...
            </>
          ) : (
            <>
              Shorten
              <svg viewBox="0 0 24 24" className="shorten-arrow" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </form>

      {error && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="shorten-error">{error}</motion.p>
      )}
    </motion.section>
  );
}
