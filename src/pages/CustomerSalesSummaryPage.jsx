import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function CustomerSalesSummaryPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('custname')
  const [sortDir, setSortDir] = useState('asc')

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('customer_sales_summary')  // change to your actual table name
        .select('custno, custname, payterm, record_status, totaltransactions, totalspend, lastsaledate')
        .eq('record_status', 'ACTIVE')

      if (error) setError(error.message)
      else setCustomers(data || [])

      setLoading(false)
    }

    fetchCustomers()
  }, [])

  const filtered = customers.filter((c) =>
    c.custname?.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    if (aVal == null) return 1
    if (bVal == null) return -1

    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">↕</span>
    return <span className="text-indigo-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const totalRevenue = sorted.reduce((sum, c) => sum + parseFloat(c.totalspend || 0), 0)

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Customer Sales Summary</h1>
        <p className="text-gray-400 text-sm mt-1">
          Overview of transactions and total spend per customer.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          Failed to load data: {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Customers</p>
            <p className="text-2xl font-bold text-slate-800">{loading ? '…' : sorted.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Transactions</p>
            <p className="text-2xl font-bold text-slate-800">
              {loading ? '…' : sorted.reduce((sum, c) => sum + (c.totaltransactions || 0), 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-800">
              {loading ? '…' : `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th onClick={() => handleSort('custno')}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-500 transition">
                  Cust No <SortIcon field="custno" />
                </th>
                <th onClick={() => handleSort('custname')}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-500 transition">
                  Customer Name <SortIcon field="custname" />
                </th>
                <th onClick={() => handleSort('totaltransactions')}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-500 transition">
                  Transactions <SortIcon field="totaltransactions" />
                </th>
                <th onClick={() => handleSort('totalspend')}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-500 transition">
                  Total Spend <SortIcon field="totalspend" />
                </th>
                <th onClick={() => handleSort('lastsaledate')}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-500 transition">
                  Last Sale Date <SortIcon field="lastsaledate" />
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                      <p className="text-sm text-gray-400">Loading customers...</p>
                    </div>
                  </td>
                </tr>
              ) : sorted.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-purple-50 text-purple-400 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No customers found</p>
                      <p className="text-xs text-gray-400">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sorted.map((customer, index) => (
                  <tr
                    key={customer.custno}
                    className={`border-b border-gray-100 hover:bg-indigo-50/30 transition-colors duration-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{customer.custno}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{customer.custname}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {customer.totaltransactions ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      {customer.totalspend != null
                        ? `$${parseFloat(customer.totalspend).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {customer.lastsaledate ?? <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing <span className="text-gray-600 font-semibold">{sorted.length}</span> of{' '}
            <span className="text-gray-600 font-semibold">{customers.length}</span> customers
          </p>
          <span className="text-xs text-green-500 font-medium">● Live data</span>
        </div>
      </div>

    </div>
  )
}

export default CustomerSalesSummaryPage