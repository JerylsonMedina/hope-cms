import { useState } from 'react'

function CustomersPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({
    custno: '',
    custname: '',
    address: '',
    payterm: '30D'
  })

  // Sprint 2: replace with real Supabase data
  const customers = []

  const filtered = customers.filter((c) =>
    c.custname?.toLowerCase().includes(search.toLowerCase()) ||
    c.custno?.toLowerCase().includes(search.toLowerCase())
  )

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

  function handleSubmit(e) {
    e.preventDefault()
    // Sprint 2: connect to Supabase
    setShowModal(false)
  }

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage customer records, payment terms, and account status.
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search customer name or customer number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />
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
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-5xl">👥</span>
                      <p className="text-sm font-semibold text-gray-500">No customers found</p>
                      <p className="text-xs text-gray-400">Live data connects in Sprint 2</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((customer, index) => (
                  <tr
                    key={customer.custno}
                    className={`border-b border-gray-100 hover:bg-indigo-50/30 transition-colors duration-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      {customer.custno}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                      {customer.custname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{customer.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{customer.payterm}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        ACTIVE
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(customer)}
                          className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition"
                        >
                          Edit
                        </button>
                        <button className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
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
            <span className="text-gray-600 font-semibold">{customers.length}</span> customers
          </p>
          <span className="text-xs text-indigo-400 font-medium">● Sprint 2: Live data</span>
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