// Props: value, onChange(e), onSubmit(e), loading, error
export const ShortenForm = ({
  value = "",
  onChange = () => {},
  onSubmit = (e) => e.preventDefault(),
  loading = false,
  error = "",
}) => {
  return (
    <section className="animate-fade-up text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Shorten links.{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
          Track everything.
        </span>
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-500">
        Paste a long URL, get a short one, and see who clicks it, from where, and on what device.
      </p>

      <form
        onSubmit={onSubmit}
        className={`mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border bg-white p-2 shadow-lg shadow-indigo-100 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-indigo-400 focus-within:shadow-xl focus-within:shadow-indigo-200 sm:flex-row ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        <input
          type="url"
          value={value}
          onChange={onChange}
          placeholder="https://your-very-long-url.com/goes/here"
          className="flex-1 rounded-xl bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Shortening...
            </>
          ) : (
            <>
              Shorten
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="animate-fade-up mt-3 text-sm font-medium text-red-500">{error}</p>
      )}
    </section>
  );
}