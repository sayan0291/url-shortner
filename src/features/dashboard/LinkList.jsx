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
      <div className="animate-fade-up rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <div className="animate-float mx-auto mb-3 text-4xl">🔗</div>
        <p className="font-semibold text-slate-700">No links yet</p>
        <p className="text-sm text-slate-500">Shorten your first URL above.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {links.map((link, i) => {
        const selected = link.id === selectedId;
        const copied = link.id === copiedId;
        return (
          <li
            key={link.id}
            style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => onSelect(link.id)}
            className={`animate-slide-in group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              selected
                ? "border-indigo-500 ring-2 ring-indigo-100"
                : "border-slate-200 hover:border-indigo-300"
            }`}
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-indigo-600">{link.short}</p>
              <p className="truncate text-sm text-slate-500">{link.original}</p>
              <p className="mt-1 text-xs text-slate-400">{link.createdAt}</p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="text-right">
                <p className="text-xl font-bold text-slate-900">{link.clicks}</p>
                <p className="text-xs text-slate-400">clicks</p>
              </div>

              {/* Copy button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(link);
                }}
                title="Copy"
                className={`grid h-9 w-9 place-items-center rounded-lg border transition-all active:scale-90 ${
                  copied
                    ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {copied ? (
                  <svg key="check" viewBox="0 0 24 24" className="animate-pop h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-400 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 active:scale-90 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}