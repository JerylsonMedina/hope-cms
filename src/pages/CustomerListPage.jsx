import { useState } from 'react'

// ── DUMMY DATA (Supabase connects in Sprint 2) ──
const dummyCustomers = [
  { custno: 'C0001', custname: 'Globus Medical, Inc', address: '2560 Gen Armistead Ave Audubon CA 94031', payterm: 'COD', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-10' },
  { custno: 'C0002', custname: 'RF Industries, Inc', address: '7610 Miramar Rd San Diego, CA 92602', payterm: '45D', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-11' },
  { custno: 'C0003', custname: 'Trisha Macdowell', address: '7642 Clairemont Mesa Blvd San Diego CA 90321', payterm: 'COD', record_status: 'INACTIVE', stamp: 'admin@hopecms.com | 2024-01-12' },
  { custno: 'C0004', custname: 'HMS Holdings, Inc', address: '1000 So Fremont Ave, Suite 225 Alhambara CA 91303', payterm: '45D', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-13' },
  { custno: 'C0005', custname: 'Christian Andersen', address: '1120 Lincoln St Suite 809 Sacramento CA 95815', payterm: 'COD', record_status: 'ACTIVE', stamp: 'superadmin@hopecms.com | 2024-01-14' },
  { custno: 'C0006', custname: 'Astronics, Inc', address: '2 Orion Aliso Viejo, CA 92656', payterm: '30D', record_status: 'INACTIVE', stamp: 'superadmin@hopecms.com | 2024-01-15' },
  { custno: 'C0007', custname: 'Morgan Alegore', address: '2 Goodyear Irvine, CA 92618', payterm: 'COD', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-16' },
  { custno: 'C0008', custname: 'Pacific Coast Labs', address: '500 Harbor Blvd Fullerton CA 92832', payterm: '30D', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-17' },
]

// ── ROLE OPTIONS for testing ──
// Change this to test different roles: 'USER' | 'ADMIN' | 'SUPERADMIN'
const CURRENT_ROLE = 'ADMIN'

function CustomerListPage() {
  const [search, setSearch] = useState('')
  const [paytermFilter, setPaytermFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Role checks
  const isAdmin = CURRENT_ROLE === 'ADMIN' || CURRENT_ROLE === 'SUPERADMIN'
  const isUser = CURRENT_ROLE === 'USER'

  // Filter logic
  const filtered = dummyCustomers.filter((c) => {
    // Hide INACTIVE rows for USER role
    if (isUser && c.record_status === 'INACTIVE') return false

    // Search filter
    const matchSearch =
      c.custname.toLowerCase().includes(search.toLowerCase()) ||
      c.custno.toLowerCase().includes(search.toLowerCase())

    // Payterm filter
    const matchPayterm = paytermFilter ? c.payterm === paytermFilter : true

    // Status filter
    const matchStatus = statusFilter ? c.record_status === statusFilter : true

    return matchSearch && matchPayterm && matchStatus
  })

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-slate-800">Customer List</h1>
          {/* Role badge */}
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            CURRENT_ROLE === 'SUPERADMIN'
              ? 'bg-purple-100 text-purple-700 border-purple-200'
              : CURRENT_ROLE === 'ADMIN'
              ? 'bg-blue-100 text-blue-700 border-blue-200'
              : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}>
            {CURRENT_ROLE}
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Manage customer records, payment terms, and account status.
          {isUser && (
            <span className="ml-2 text-amber-500 font-medium">
              ⚠️ Inactive customers are hidden for your role.
            </span>
          )}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Showing</p>
            <p className="text-2xl font-bold text-slate-800">{filtered.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-5 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Active</p>
            <p className="text-2xl font-bold text-slate-800">
              {dummyCustomers.filter(c => c.record_status === 'ACTIVE').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5 flex items-center gap-4">
          <div className="bg-red-100 text-red-500 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Inactive</p>
            <p className="text-2xl font-bold text-slate-800">
              {/* USER role sees 0, ADMIN sees real count */}
              {isUser ? '—' : dummyCustomers.filter(c => c.record_status === 'INACTIVE').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by customer name or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />

        {/* Payterm Filter */}
        <select
          value={paytermFilter}
          onChange={(e) => setPaytermFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
        >
          <option value="">All Pay Terms</option>
          <option value="COD">COD</option>
          <option value="30D">30 Days</option>
          <option value="45D">45 Days</option>
        </select>

        {/* Status Filter — hidden for USER role */}
        {!isUser && (
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        )}
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
                {/* Stamp column — ADMIN/SUPERADMIN only */}
                {isAdmin && (
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      Stamp
                      <span className="bg-purple-100 text-purple-600 text-xs px-1.5 py-0.5 rounded font-bold">
                        ADMIN
                      </span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-indigo-50 text-indigo-300 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No customers found</p>
                      <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((customer, index) => (
                  <tr
                    key={customer.custno}
                    className={`border-b border-gray-100 transition-colors duration-100 ${
                      customer.record_status === 'INACTIVE'
                        ? 'bg-red-50/30 hover:bg-red-50/50'
                        : index % 2 === 0
                        ? 'bg-white hover:bg-indigo-50/30'
                        : 'bg-gray-50/40 hover:bg-indigo-50/30'
                    }`}
                  >
                    {/* Cust No */}
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                      {customer.custno}
                    </td>

                    {/* Customer Name */}
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                      {customer.custname}
                    </td>

                    {/* Address */}
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {customer.address}
                    </td>

                    {/* Pay Term */}
                    <td className="px-6 py-4">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        customer.payterm === 'COD'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : customer.payterm === '30D'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {customer.payterm}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        customer.record_status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-red-50 text-red-500 border-red-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          customer.record_status === 'ACTIVE'
                            ? 'bg-emerald-500'
                            : 'bg-red-400'
                        }`}></span>
                        {customer.record_status}
                      </span>
                    </td>

                    {/* Stamp — ADMIN/SUPERADMIN only */}
                    {isAdmin && (
                      <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                        {customer.stamp}
                      </td>
                    )}
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
            <span className="text-gray-600 font-semibold">{dummyCustomers.length}</span> customers
          </p>
          <span className="text-xs text-indigo-400 font-medium">● Using dummy data — Supabase in Sprint 2</span>
        </div>
      </div>

    </div>
  )
}

export default CustomerListPage