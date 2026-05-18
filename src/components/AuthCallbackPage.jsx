  import { useState } from 'react'

function DeletedCustomersPage() {
  const [search, setSearch] = useState('')

  // Sprint 2: replace with real Supabase data
  const deletedCustomers = []

  const filtered = deletedCustomers.filter((c) =>
    c.custname?.toLowerCase().includes(search.toLowerCase()) ||
    c.custno?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Deleted Customers</h1>
        <p className="text-gray-400 text-sm mt-1">
          View all soft-deleted customer records.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5 flex items-center gap-4">
          <div className="bg-red-100 text-red-500 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
              Total Deleted
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {deletedCustomers.length || '—'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-5 flex items-center gap-4">
          <div className="bg-orange-100 text-orange-500 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
              Visibility
            </p>
            <p className="text-sm font-bold text-orange-500">Sprint 2 Feature</p>
          </div>
        </div>

      </div>

      {/* Sprint 2 Notice Banner */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-5">
        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-amber-700">Sprint 2 Feature</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Visibility logic for this page (admin-only access) will be implemented in Sprint 2
            when role-based access control is added.
          </p>
        </div>
      </div>

      {/* Search Bar */}
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
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-red-50 text-red-300 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">
                        No deleted customers found
                      </p>
                      <p className="text-xs text-gray-400">
                        Live data connects in Sprint 2
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((customer, index) => (
                  <tr
                    key={customer.custno}
                    className={`border-b border-gray-100 hover:bg-red-50/20 transition-colors duration-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">
                      {customer.custno}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-400 line-through">
                      {customer.custname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {customer.payterm}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-500 border border-red-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        DELETED
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing <span className="text-gray-600 font-semibold">{filtered.length}</span> of{' '}
            <span className="text-gray-600 font-semibold">{deletedCustomers.length}</span> deleted customers
          </p>
          <span className="text-xs text-indigo-400 font-medium">● Sprint 2: Live data</span>
        </div>
      </div>

    </div>
  )
}

export default DeletedCustomersPage