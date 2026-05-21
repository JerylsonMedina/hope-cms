import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function SalesPage() {
  const [search, setSearch] = useState('')
  const [monthFilter, setMonthFilter] = useState('')
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    setLoading(true)
    setError(null)

    // ✅ Fix 1 — Removed broken .eq('transNo', transNo)
    // Now correctly queries ALL rows from the view
    const { data, error } = await supabase
      .from('sales_detail_with_price')
      .select('*')
      .order('transno', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setSales(data || [])
    }

    setLoading(false)
  }

  const mapRow = (row) => ({
    saleid:     row.transno,
    custname:   row.custno ?? '—',
    product:    row.prodcode ?? '—',
    quantity:   row.quantity ?? '—',
    // ✅ Fix 2 — Now uses totalPrice from the view
    totalprice: row.totalPrice ?? row.totalprice ?? null,
    saledate:   row.salesdate ?? row.saledate ?? '—',
    empno:      row.empno ?? '—',
  })

  const mapped = sales.map(mapRow)

  const filtered = mapped.filter((s) => {
    const matchesSearch =
      s.custname?.toLowerCase().includes(search.toLowerCase()) ||
      s.saleid?.toString().toLowerCase().includes(search.toLowerCase()) ||
      s.product?.toLowerCase().includes(search.toLowerCase())

    const matchesMonth = monthFilter
      ? s.saledate?.slice(0, 7) === monthFilter
      : true

    return matchesSearch && matchesMonth
  })

  // ✅ Fix 3 — Now calculates real total revenue from data
  const totalRevenue = filtered.reduce(
    (sum, s) => sum + parseFloat(s.totalprice || 0), 0
  )

  const uniqueCustomers = new Set(filtered.map((s) => s.custname)).size
  const months = [...new Set(mapped.map((s) => s.saledate?.slice(0, 7)))]
    .filter(Boolean).sort().reverse()

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Sales</h1>
        <p className="text-gray-400 text-sm mt-1">
          View sales transactions, revenue, and customer activity.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          Failed to load sales: {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Sales</p>
            <p className="text-2xl font-bold text-slate-800">
              {loading ? '…' : (filtered.length || '—')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Revenue</p>
            {/* ✅ Fix 3 — Shows real revenue now */}
            <p className="text-2xl font-bold text-slate-800">
              {loading ? '…' : `$${totalRevenue.toFixed(2)}`}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Customers</p>
            <p className="text-2xl font-bold text-slate-800">
              {loading ? '…' : (uniqueCustomers || '—')}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by Transaction ID, customer, or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Trans No</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Customer No</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Quantity</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Total Price</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Employee</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                      <p className="text-sm text-gray-400">Loading sales...</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-blue-50 text-blue-400 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No sales records found</p>
                      <p className="text-xs text-gray-400">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((sale, index) => (
                  <tr
                    key={`${sale.saleid}-${index}`}
                    className={`border-b border-gray-100 hover:bg-indigo-50/30 transition-colors duration-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{sale.saleid}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{sale.custname}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sale.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sale.quantity}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      {/* ✅ Fix 2 — Shows real total price */}
                      {sale.totalprice != null
                        ? `$${parseFloat(sale.totalprice).toFixed(2)}`
                        : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{sale.saledate}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{sale.empno}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing <span className="text-gray-600 font-semibold">{filtered.length}</span> of{' '}
            <span className="text-gray-600 font-semibold">{sales.length}</span> records
          </p>
          <span className="text-xs text-green-500 font-medium">● Live data</span>
        </div>
      </div>

    </div>
  )
}

export default SalesPage