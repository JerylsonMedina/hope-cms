import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function AdminPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalCustomers: null,
    totalSales: null,
    totalRevenue: null,
  })
  const [recentSales, setRecentSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)

      const [customersRes, salesRes, recentRes] = await Promise.all([
        supabase.from('customer').select('custno', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
        supabase.from('sales').select('transno', { count: 'exact', head: true }),
        supabase.from('sales').select('transno, salesdate, custno').order('salesdate', { ascending: false }).limit(5),
      ])

      // Total revenue from salesdetail
      const { data: revenueData } = await supabase
        .from('salesdetail')
        .select('totalprice')

      const totalRevenue = revenueData?.reduce((sum, row) => sum + parseFloat(row.totalprice || 0), 0) ?? 0

      setStats({
        totalCustomers: customersRes.count ?? '—',
        totalSales: salesRes.count ?? '—',
        totalRevenue,
      })

      setRecentSales(recentRes.data || [])
      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  const summaryCards = [
    {
      label: 'Total Customers',
      value: loading ? '…' : stats.totalCustomers,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200',
    },
    {
      label: 'Total Sales',
      value: loading ? '…' : stats.totalSales,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200',
    },
    {
      label: 'Total Revenue',
      value: loading ? '…' : `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200',
    },
  ]

  const quickActions = [
    {
      label: 'Manage Customers',
      description: 'View, add, edit or delete customers',
      path: '/customers',
      color: 'hover:border-purple-300 hover:bg-purple-50',
      iconBg: 'bg-purple-100 text-purple-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'View Sales',
      description: 'Check sales records and revenue',
      path: '/sales',
      color: 'hover:border-yellow-300 hover:bg-yellow-50',
      iconBg: 'bg-yellow-100 text-yellow-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Deleted Customers',
      description: 'View soft-deleted customer records',
      path: '/deleted-customers',
      color: 'hover:border-red-300 hover:bg-red-50',
      iconBg: 'bg-red-100 text-red-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      label: 'User Management',
      description: 'Manage admin and user accounts',
      path: '/user-management',
      color: 'hover:border-indigo-300 hover:bg-indigo-50',
      iconBg: 'bg-indigo-100 text-indigo-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0M19 21a7 7 0 10-14 0" />
        </svg>
      ),
    },
  ]

  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">System overview and quick access to all modules.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className={`bg-white rounded-xl shadow-sm border ${card.border} p-5 flex items-center gap-4`}>
            <div className={`${card.bg} ${card.text} rounded-xl p-3 flex-shrink-0`}>{card.icon}</div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">{card.label}</p>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-800">Recent Sales</h2>
              <p className="text-xs text-gray-400 mt-0.5">Latest transactions overview</p>
            </div>
            <button onClick={() => navigate('/sales')} className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold hover:underline transition">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Trans No</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                        <p className="text-xs text-gray-400">Loading...</p>
                      </div>
                    </td>
                  </tr>
                ) : recentSales.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <p className="text-sm font-semibold text-gray-500">No sales recorded</p>
                    </td>
                  </tr>
                ) : (
                  recentSales.map((sale, index) => (
                    <tr key={sale.transno} className={`border-b border-gray-100 hover:bg-indigo-50/30 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                      <td className="px-6 py-4 text-sm font-mono text-gray-500">{sale.transno}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{sale.custno}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{sale.salesdate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-slate-800">Quick Actions</h2>
              <p className="text-xs text-gray-400 mt-0.5">Navigate to key modules</p>
            </div>
            <div className="p-4 space-y-2">
              {quickActions.map((action) => (
                <button key={action.path} onClick={() => navigate(action.path)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 text-left transition-all duration-150 ${action.color}`}>
                  <div className={`${action.iconBg} p-2 rounded-lg flex-shrink-0`}>{action.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{action.label}</p>
                    <p className="text-xs text-gray-400">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-slate-800">System Info</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Status</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Database</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Connected
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Version</span>
                <span className="text-gray-600 font-semibold">v1.0.0</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Sprint</span>
                <span className="text-indigo-600 font-semibold">M2 — Live Data</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminPage