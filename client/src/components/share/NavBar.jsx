import { NavLink } from "react-router-dom";

const navBtn = [
  { id:1,name:"Dashboard" ,to:"/dashboard" },
  { id:2,name:"Links" ,to:"/links" },
  { id:3,name:"Docs" ,to:"/docs" }
]

export const Navbar = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-brand">
          <span className="site-brand__mark">
            <svg viewBox="0 0 24 24" className="site-brand__icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
            </svg>
          </span>
          <span className="site-brand__wordmark">
            Snip<span className="site-brand__accent">ly</span>
          </span>
        </a>

        <nav className="site-nav">
          {navBtn.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className="site-nav__link"
            >
              {item.name}
            </NavLink>
          ))}
          <button className="site-nav__sign-in">
            Sign in
          </button>
        </nav>
      </div>
    </header>
  );
}
