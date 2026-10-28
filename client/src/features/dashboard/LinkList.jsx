import { motion } from "motion/react";

// Props:
//   links      = [{ id, short, original, clicks, createdAt }]
//   selectedId = id of the link whose analytics are shown
//   copiedId   = id that was just copied (show the check icon; reset it in your state after ~2s)
//   onSelect(id), onCopy(link), onDelete(id)
export const LinkList = ({
  links = [],
  selectedId = null,
  copiedId = null,
  onSelect = () => {},
  onCopy = () => {},
  onDelete = () => {},
}) => {
  if (links.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="link-list-empty">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="link-list-empty__icon">🔗</motion.div>
        <p className="link-list-empty__title">No links yet</p>
        <p className="link-list-empty__copy">Shorten your first URL above.</p>
      </motion.div>
    );
  }

  return (
    <motion.ul layout className="link-list">
      {links.map((link, i) => {
        const selected = link.id === selectedId;
        const copied = link.id === copiedId;
        return (
          <motion.li
            key={link.id}
            layout
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            onClick={() => onSelect(link.id)}
            className={`link-list__item ${selected ? "is-selected" : ""}`}
          >
            <div className="link-list__destination">
              <p className="link-list__short">{link.short}</p>
              <p className="link-list__original">{link.original}</p>
              <p className="link-list__created">{link.createdAt}</p>
            </div>

            <div className="link-list__controls">
              <div className="link-list__clicks">
                <p className="link-list__click-value">{link.clicks}</p>
                <p className="link-list__click-label">clicks</p>
              </div>

              {/* Copy button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(link);
                }}
                title="Copy"
                className={`link-list__action link-list__action--copy ${copied ? "is-copied" : ""}`}
              >
                {copied ? (
                  <motion.svg key="check" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                )}
              </button>

              {/* Delete button (appears on hover on desktop) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(link.id);
                }}
                title="Delete"
                className="link-list__action link-list__action--delete"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                </svg>
              </button>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
