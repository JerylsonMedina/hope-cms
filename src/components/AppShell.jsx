import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const navLinks = [
    { to: '/customers', label: 'Customers', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { to: '/customer-sales-summary', label: 'Sales Summary', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { to: '/sales', label: 'Sales', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { to: '/products', label: 'Products', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )},
    { to: '/admin', label: 'Admin', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { to: '/deleted-customers', label: 'Deleted Customers', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )},
  ]

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`
  fixed top-0 left-0 h-screen w-60 z-30 flex flex-col
  bg-slate-900
  transform transition-transform duration-200 ease-in-out
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:static lg:translate-x-0 lg:h-screen
`}>

        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700/50">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/40 flex-shrink-0">
            <span className="text-white text-sm font-black">H</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">
              Hope <span className="text-indigo-400">CMS</span>
            </p>
            <p className="text-slate-500 text-xs">Management</p>
          </div>
        </div>

        {/* ── NAV LINKS (scrollable middle) ── */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          {/* Section Label */}
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
            Main
          </p>

          {/* Fix 1: Floating pill — symmetrical mx-0 padding all sides */}
          {/* Fix 2: Inactive items use slate-400 for better readability */}
          {/* Fix 3: gap-3 for breathing room between icon and text */}
          <nav className="space-y-1">
            {navLinks.map(({ to, label, icon }) => {
              const isActive = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 ease-in-out
                    ${isActive
                      /* Fix 1: symmetrical margin (mx-0) + padding creates balanced floating pill */
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 mx-0'
                      /* Fix 2: slate-400 gives readable contrast without looking active */
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100 mx-0'
                    }
                  `}
                >
                  {/* Fix 3: icon and text perfectly vertically centered via flex items-center */}
                  <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {icon}
                  </span>
                  <span className="leading-none">{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Fix 4: User profile anchored to bottom with divider */}
        <div className="flex-shrink-0">
          {/* Subtle divider line */}
          <div className="mx-4 border-t border-slate-700/60" />

          {/* User profile row */}
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar */}
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0 shadow">
                U
              </div>
              {/* Name + role */}
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">User</p>
                <p className="text-slate-500 text-xs uppercase tracking-wide">User</p>
              </div>
            </div>

            {/* Logout icon button */}
            <button
              onClick={handleLogout}
              title="Sign out"
              className="flex-shrink-0 text-slate-500 hover:text-red-400 hover:bg-slate-800 p-1.5 rounded-lg transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── TOP HEADER ── */}
        <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Welcome message */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Welcome Back
              </p>
              <p className="text-slate-800 font-bold text-sm">Hope CMS User</p>
            </div>
          </div>

          {/* Sign out button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  )
}

export default AppShell