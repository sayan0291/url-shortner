export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Snip<span className="text-indigo-600">ly</span>
          </span>
        </a>

        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
          {["Dashboard", "Links", "Docs"].map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item}
            </a>
          ))}
          <button className="ml-2 rounded-lg bg-slate-900 px-4 py-2 text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0">
            Sign in
          </button>
        </nav>
      </div>
    </header>
  );
}