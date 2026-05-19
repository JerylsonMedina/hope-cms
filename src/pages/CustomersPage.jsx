import { useState } from 'react'

// ── DUMMY DATA (Supabase connects in Sprint 2) ──
const dummyCustomers = [
  { custno: 'C0001', custname: 'Globus Medical, Inc', address: '2560 Gen Armistead Ave Audubon CA 94031', payterm: 'COD', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-10' },
  { custno: 'C0002', custname: 'RF Industries, Inc', address: '7610 Miramar Rd San Diego, CA 92602', payterm: '45D', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-11' },
  { custno: 'C0003', custname: 'Trisha Macdowell', address: '7642 Clairemont Mesa Blvd San Diego CA 90321', payterm: 'COD', record_status: 'INACTIVE', stamp: 'admin@hopecms.com | 2024-01-12' },
  { custno: 'C0004', custname: 'HMS Holdings, Inc', address: '1000 So Fremont Ave Suite 225 Alhambara CA 91303', payterm: '45D', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-13' },
  { custno: 'C0005', custname: 'Christian Andersen', address: '1120 Lincoln St Suite 809 Sacramento CA 95815', payterm: 'COD', record_status: 'ACTIVE', stamp: 'superadmin@hopecms.com | 2024-01-14' },
  { custno: 'C0006', custname: 'Astronics, Inc', address: '2 Orion Aliso Viejo, CA 92656', payterm: '30D', record_status: 'INACTIVE', stamp: 'superadmin@hopecms.com | 2024-01-15' },
  { custno: 'C0007', custname: 'Morgan Alegore', address: '2 Goodyear Irvine, CA 92618', payterm: 'COD', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-16' },
  { custno: 'C0008', custname: 'Pacific Coast Labs', address: '500 Harbor Blvd Fullerton CA 92832', payterm: '30D', record_status: 'ACTIVE', stamp: 'admin@hopecms.com | 2024-01-17' },
]

// ── ROLE (change to test: 'USER' | 'ADMIN' | 'SUPERADMIN') ──
const CURRENT_ROLE = 'ADMIN'

function CustomersPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [search, setSearch] = useState('')
  const [paytermFilter, setPaytermFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [formData, setFormData] = useState({
    custno: '',
    custname: '',
    address: '',
    payterm: '30D'
  })

  // Role checks
  const isAdmin = CURRENT_ROLE === 'ADMIN' || CURRENT_ROLE === 'SUPERADMIN'
  const isUser = CURRENT_ROLE === 'USER'

  // Filter logic
  const filtered = dummyCustomers.filter((c) => {
    // Hide INACTIVE rows for USER role
    if (isUser && c.record_status === 'INACTIVE') return false

    const matchSearch =
      c.custname.toLowerCase().includes(search.toLowerCase()) ||
      c.custno.toLowerCase().includes(search.toLowerCase())

    const matchPayterm = paytermFilter ? c.payterm === paytermFilter : true
    const matchStatus = statusFilter ? c.record_status === statusFilter : true

    return matchSearch && matchPayterm && matchStatus
  })

  function handleAddClick() {
    setEditingCustomer(null)
    setFormData({ custno: '', custname: '', address: '', payterm: '30D' })
    setShowModal(true)
  }

  function handleEditClick(customer) {
    setEditingCustomer(customer)
    setFormData({
      custno: customer.custno,
      custname: customer.custname,
      address: customer.address,
      payterm: customer.payterm
    })
    setShowModal(true)
  }

  function handleDeleteClick(custno, custname) {
    if (confirm(`Are you sure you want to delete "${custname}"?`)) {
      // Sprint 2: connect to Supabase softDelete
      alert('Delete functionality connects in Sprint 2')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Sprint 2: connect to Supabase
    alert(`${editingCustomer ? 'Update' : 'Add'} functionality connects in Sprint 2`)
    setShowModal(false)
  }

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
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
        <p className="text-gray-400 text-sm mt-1">
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
              {isUser ? '—' : dummyCustomers.filter(c => c.record_status === 'INACTIVE').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters + Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search customer name or number..."
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

        {/* Add Customer button */}
        <button
          onClick={handleAddClick}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all duration-150 whitespace-nowrap"
        >
          <span className="text-lg leading-none">+</span>
          Add Customer
        </button>
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
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="px-6 py-20 text-center">
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
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600 cursor-pointer hover:text-indigo-700">
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

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(customer)}
                          className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(customer.custno, customer.custname)}
                          className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
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
            <span className="text-gray-600 font-semibold">{dummyCustomers.length}</span> customers
          </p>
          <span className="text-xs text-indigo-400 font-medium">● Using dummy data — Supabase in Sprint 2</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editingCustomer ? 'Update customer details below' : 'Fill in the details below'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Customer No</label>
                <input
                  type="text"
                  value={formData.custno}
                  disabled={!!editingCustomer}
                  onChange={(e) => setFormData({...formData, custno: e.target.value})}
                  placeholder="e.g. C001"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-gray-50 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Customer Name</label>
                <input
                  type="text"
                  value={formData.custname}
                  onChange={(e) => setFormData({...formData, custname: e.target.value})}
                  placeholder="Full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Full address"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Pay Term</label>
                <select
                  value={formData.payterm}
                  onChange={(e) => setFormData({...formData, payterm: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                >
                  <option value="COD">COD</option>
                  <option value="30D">30 Days</option>
                  <option value="45D">45 Days</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
                >
                  {editingCustomer ? 'Save Changes' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default CustomersPage