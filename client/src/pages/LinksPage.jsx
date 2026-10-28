import { motion } from "motion/react";
import { Icon } from "../components";


const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "paused", label: "Paused" },
  { id: "expired", label: "Expired" },
];

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
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="links-page">
      {/* Title + primary action */}
      <div className="links-page__heading">
        <div>
          <h1 className="links-page__title">Your links</h1>
          <p className="links-page__intro">Search, filter and manage every short link in one place.</p>
        </div>
        <button
          onClick={onNew}
          className="links-page__new-button"
        >
          <Icon name="plus" className="links-page__new-icon" strokeWidth={2.5} />
          New link
        </button>
      </div>

      {/* Toolbar */}
      <div className="links-page__toolbar">
        <div className="links-page__filters" role="tablist" aria-label="Filter by status">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(f.id)}
                className={`links-page__filter ${active ? "is-active" : ""}`}
              >
                {f.label}
                <span
                  className={`links-page__filter-count ${active ? "is-active" : ""}`}
                >
                  {counts[f.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="links-page__search-tools">
          <label htmlFor="links-search" className="links-page__search-label">
            <span className="links-page__visually-hidden">Search links</span>
            <span className="links-page__search-icon">
              <Icon name="search" />
            </span>
            <input
              id="links-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by link or destination"
              className="links-page__search-input"
            />
          </label>
          <label htmlFor="links-sort" className="links-page__sort-label">
            <span className="links-page__visually-hidden">Sort links</span>
            <select
              id="links-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="links-page__sort"
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
        <div className="links-page__column-headings">
          <span>Link</span>
          <span>Clicks</span>
          <span>Status</span>
          <span className="links-page__actions-heading">Actions</span>
        </div>
      )}

      {/* Rows */}
      {links.length > 0 ? (
        <motion.ul layout className="links-page__rows">
          {links.map((link, i) => {
            const copied = link.id === copiedId;
            const pct = Math.round((link.clicks / maxClicks) * 100);
            const status = ["active", "paused", "expired"].includes(link.status) ? link.status : "active";
            return (
              <motion.li
                key={link.id}
                layout
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={`links-page__row ${status === "active" ? "is-active" : ""}`}
              >
                <div className="links-page__destination">
                  <p className="links-page__short">
                    {link.short}
                  </p>
                  <p className="links-page__original">{link.original}</p>
                  <p className="links-page__created">Created {link.createdAt}</p>
                </div>

                <div>
                  <p className="links-page__click-count">
                    <span className="links-page__click-value">{link.clicks}</span>
                    <span className="links-page__click-label">clicks</span>
                  </p>
                  <div className="links-page__click-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: i * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="links-page__click-progress"
                    />
                  </div>
                </div>

                <div className="links-page__status-cell">
                  <span
                    className={`links-page__status ${status}`}
                  >
                    <span className={`links-page__status-dot ${status}`} />
                    {status}
                  </span>
                </div>

                <div className="links-page__actions">
                  <button
                    onClick={() => onViewStats(link.id)}
                    title="View analytics"
                    aria-label="View analytics"
                    className="links-page__action links-page__action--stats"
                  >
                    <Icon name="chart" />
                  </button>
                  <button
                    onClick={() => onCopy(link)}
                    title="Copy"
                    aria-label="Copy short link"
                    className={`links-page__action links-page__action--copy ${copied ? "is-copied" : ""}`}
                  >
                    {copied ? (
                      <motion.span key="check" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}><Icon name="check" strokeWidth={3} /></motion.span>
                    ) : (
                      <Icon name="copy" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(link.id)}
                    title="Delete"
                    aria-label="Delete link"
                    className="links-page__action links-page__action--delete"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="links-page__empty">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="links-page__empty-icon">
            <Icon name="search" />
          </motion.div>
          <p className="links-page__empty-title">No links match</p>
          <p className="links-page__empty-copy">Try a different search or switch the status filter.</p>
        </motion.div>
      )}

      <p className="links-page__summary">
        Showing {links.length} of {total} links
      </p>
    </motion.section>
  );
}
