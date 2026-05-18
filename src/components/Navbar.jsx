import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const navLinks = [
    { to: '/customers', label: 'Customers', icon: '👥' },
    { to: '/sales', label: 'Sales', icon: '🧾' },
    { to: '/products', label: 'Products', icon: '📦' },
    { to: '/admin', label: 'Admin', icon: '⚙️' },
    // Sprint 2: Deleted Customers visibility logic will be added here
    { to: '/deleted-customers', label: 'Deleted Customers', icon: '🗑️' },
  ]

  return (
    <nav className="bg-slate-900 border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow">
            <span className="text-white text-sm font-black">H</span>
          </div>
          <span className="text-white font-bold tracking-tight">
            Hope <span className="text-indigo-400">CMS</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{icon}</span>
                {label}
              </Link>
            )
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>

      </div>
    </nav>
  )
}

export default Navbar