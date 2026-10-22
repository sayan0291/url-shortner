import { Icon } from "../components";


const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "paused", label: "Paused" },
  { id: "expired", label: "Expired" },
];

const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-600",
  paused: "bg-amber-50 text-amber-600",
  expired: "bg-slate-100 text-slate-500",
};

const STATUS_DOT = {
  active: "bg-emerald-500",
  paused: "bg-amber-500",
  expired: "bg-slate-400",
};

const ROW_GRID = "md:grid-cols-[minmax(0,1fr)_150px_104px_112px]";

export const LinksPage = ({
  links = [],
  counts = {},
  query = "",
  onQueryChange = () => {},
  filter = "all",
  onFilterChange = () => {},
  sort = "newest",
  onSortChange = () => {},
  copiedId = null,
  onCopy = () => {},
  onDelete = () => {},
  onViewStats = () => {},
  onNew = () => {},
}) => {
  const maxClicks = Math.max(1, ...links.map((l) => l.clicks));
  const total = counts.all ?? links.length;

  return (
    <section className="animate-fade-up">
      {/* Title + primary action */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Your links</h1>
          <p className="mt-1 text-slate-500">Search, filter and manage every short link in one place.</p>
        </div>
        <button
          onClick={onNew}
          className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0 active:scale-95"
        >
          <Icon name="plus" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
          New link
        </button>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-full overflow-x-auto rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Filter by status">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(f.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  active ? "bg-white text-indigo-600 shadow" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums ${
                    active ? "bg-indigo-50 text-indigo-600" : "bg-slate-200/70 text-slate-500"
                  }`}
                >
                  {counts[f.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex min-w-0 gap-2 lg:w-full lg:max-w-md">
          <label htmlFor="links-search" className="relative min-w-0 flex-1">
            <span className="sr-only">Search links</span>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon name="search" className="h-4 w-4" />
            </span>
            <input
              id="links-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by link or destination"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-100"
            />
          </label>
          <label htmlFor="links-sort" className="shrink-0">
            <span className="sr-only">Sort links</span>
            <select
              id="links-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-indigo-400"
            >
              <option value="newest">Newest</option>
              <option value="clicks">Most clicks</option>
              <option value="az">A to Z</option>
            </select>
          </label>
        </div>
      </div>

      {/* Column labels (desktop only) */}
      {links.length > 0 && (
        <div className={`mt-6 hidden gap-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid ${ROW_GRID}`}>
          <span>Link</span>
          <span>Clicks</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
      )}

      {/* Rows */}
      {links.length > 0 ? (
        <ul className="mt-3 space-y-3">
          {links.map((link, i) => {
            const copied = link.id === copiedId;
            const pct = Math.round((link.clicks / maxClicks) * 100);
            return (
              <li
                key={link.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`animate-slide-in group grid grid-cols-2 items-center gap-x-4 gap-y-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md ${ROW_GRID}`}
              >
                <div className="col-span-2 min-w-0 md:col-span-1">
                  <p className={`truncate font-semibold ${link.status === "active" ? "text-indigo-600" : "text-slate-500"}`}>
                    {link.short}
                  </p>
                  <p className="truncate text-sm text-slate-500">{link.original}</p>
                  <p className="mt-1 text-xs text-slate-400">Created {link.createdAt}</p>
                </div>

                <div>
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold tabular-nums text-slate-900">{link.clicks}</span>
                    <span className="text-xs text-slate-400">clicks</span>
                  </p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      style={{ width: `${pct}%`, animationDelay: `${i * 60 + 150}ms` }}
                      className="animate-grow-w h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-400"
                    />
                  </div>
                </div>

                <div className="justify-self-end md:justify-self-start">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[link.status] || STATUS_STYLES.active}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[link.status] || STATUS_DOT.active}`} />
                    {link.status}
                  </span>
                </div>

                <div className="col-span-2 flex items-center gap-2 md:col-span-1 md:justify-end">
                  <button
                    onClick={() => onViewStats(link.id)}
                    title="View analytics"
                    aria-label="View analytics"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 active:scale-90"
                  >
                    <Icon name="chart" />
                  </button>
                  <button
                    onClick={() => onCopy(link)}
                    title="Copy"
                    aria-label="Copy short link"
                    className={`grid h-9 w-9 place-items-center rounded-lg border transition-all active:scale-90 ${
                      copied
                        ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                        : "border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {copied ? (
                      <Icon key="check" name="check" className="animate-pop h-4 w-4" strokeWidth={3} />
                    ) : (
                      <Icon name="copy" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(link.id)}
                    title="Delete"
                    aria-label="Delete link"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-400 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 active:scale-90 md:opacity-0 md:focus-visible:opacity-100 md:group-hover:opacity-100"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="animate-fade-up mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <div className="animate-float mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Icon name="search" className="h-6 w-6" />
          </div>
          <p className="font-semibold text-slate-700">No links match</p>
          <p className="text-sm text-slate-500">Try a different search or switch the status filter.</p>
        </div>
      )}

      <p className="mt-4 text-center text-sm tabular-nums text-slate-400">
        Showing {links.length} of {total} links
      </p>
    </section>
  );
}