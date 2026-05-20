import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ── ROLE (change to test: 'ADMIN' | 'SUPERADMIN') ──
const CURRENT_ROLE = 'ADMIN'

function DeletedCustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [recoveringId, setRecoveringId] = useState(null)
  const [recoveredCount, setRecoveredCount] = useState(0)

  // Role checks
  const isAdmin = CURRENT_ROLE === 'ADMIN' || CURRENT_ROLE === 'SUPERADMIN'
  const isSuperAdmin = CURRENT_ROLE === 'SUPERADMIN'

  useEffect(() => {
    if (isAdmin) loadDeletedCustomers()
  }, [])

  async function loadDeletedCustomers() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('customer')
        .select('*')
        .eq('record_status', 'INACTIVE')
        .order('custno')

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error('Error loading deleted customers:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleRecover(customer) {
    if (!confirm(`Restore "${customer.custname}" back to ACTIVE?`)) return

    setRecoveringId(customer.custno)
    try {
      const { error } = await supabase
        .from('customer')
        .update({ record_status: 'ACTIVE' })
        .eq('custno', customer.custno)

      if (error) throw error

      setCustomers(prev => prev.filter(c => c.custno !== customer.custno))
      setRecoveredCount(prev => prev + 1)
      alert(`✅ ${customer.custname} has been restored to ACTIVE!`)
    } catch (error) {
      console.error('Error recovering customer:', error)
      alert('❌ Failed to recover. Please try again.')
    } finally {
      setRecoveringId(null)
    }
  }

  // Filter
  const filtered = customers.filter((c) =>
    c.custname?.toLowerCase().includes(search.toLowerCase()) ||
    c.custno?.toLowerCase().includes(search.toLowerCase())
  )

  // Access denied for USER role
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-10 text-center max-w-sm">
          <div className="bg-red-100 text-red-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-slate-800 mb-1">Access Denied</h2>
          <p className="text-sm text-gray-400 mb-3">This page is restricted to</p>
          <div className="flex items-center justify-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">ADMIN</span>
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200">SUPERADMIN</span>
          </div>
        </div>
      </div>
    )
  }

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400">Loading deleted customers...</p>
        </div>
      </div>
    )
  }

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-slate-800">Deleted Customers</h1>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            isSuperAdmin
              ? 'bg-purple-100 text-purple-700 border-purple-200'
              : 'bg-blue-100 text-blue-700 border-blue-200'
          }`}>
            {CURRENT_ROLE}
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          View and restore inactive customer records. Visible to ADMIN and SUPERADMIN only.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5 flex items-center gap-4">
          <div className="bg-red-100 text-red-500 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Deleted</p>
            <p className="text-2xl font-bold text-slate-800">{customers.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-5 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Recovered</p>
            <p className="text-2xl font-bold text-slate-800">{recoveredCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-5 flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Showing</p>
            <p className="text-2xl font-bold text-slate-800">{filtered.length}</p>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by customer name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Cust No</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Customer Name</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Address</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Pay Term</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    Stamp
                    <span className="bg-purple-100 text-purple-600 text-xs px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                  </div>
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-emerald-50 text-emerald-400 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No deleted customers found</p>
                      <p className="text-xs text-gray-400">
                        {search ? 'Try adjusting your search' : 'All customers are active!'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((customer, index) => (
                  <tr
                    key={customer.custno}
                    className={`border-b border-gray-100 transition-colors duration-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    } hover:bg-red-50/20`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">
                      {customer.custno}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-400 line-through">
                      {customer.custname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {customer.payterm}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                      {customer.stamp || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-500 border border-red-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        INACTIVE
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRecover(customer)}
                        disabled={recoveringId === customer.custno}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg transition"
                      >
                        {recoveringId === customer.custno ? (
                          <>
                            <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                            Recovering...
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Recover
                          </>
                        )}
                      </button>
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
            Showing <span className="text-gray-600 font-semibold">{filtered.length}</span> of{' '}
            <span className="text-gray-600 font-semibold">{customers.length}</span> deleted customers
          </p>
          <span className="text-xs text-emerald-500 font-medium">● Live data from Supabase</span>
        </div>
      </div>

    </div>
  )
}

export default DeletedCustomersPage