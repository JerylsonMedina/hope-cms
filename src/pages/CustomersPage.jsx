import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

import AddCustomerModal from '../components/modals/AddCustomerModal'
import EditCustomerModal from '../components/modals/EditCustomerModal'
import SoftDeleteConfirmDialog from '../components/modals/SoftDeleteConfirmDialog'

// ── ROLE ──
const CURRENT_ROLE = 'ADMIN'

function CustomersPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [search, setSearch] = useState('')
  const [paytermFilter, setPaytermFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  // Role checks
  const isAdmin =
    CURRENT_ROLE === 'ADMIN' || CURRENT_ROLE === 'SUPERADMIN'

  const isUser = CURRENT_ROLE === 'USER'

  // ── FETCH CUSTOMERS FROM SUPABASE ──
  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    setLoading(true)

    let query = supabase
      .from('customer')
      .select('*')

    // USER cannot see inactive
    if (isUser) {
      query = query.eq('record_status', 'ACTIVE')
    }

    const { data, error } = await query.order('custno')

    if (error) {
      console.error('Error fetching customers:', error.message)
    } else {
      setCustomers(data || [])
    }

    setLoading(false)
  }

  // ── FILTER LOGIC ──
  const filtered = customers.filter((c) => {
    const matchSearch =
      c.custname?.toLowerCase().includes(search.toLowerCase()) ||
      c.custno?.toLowerCase().includes(search.toLowerCase())

    const matchPayterm = paytermFilter
      ? c.payterm === paytermFilter
      : true

    const matchStatus = statusFilter
      ? c.record_status === statusFilter
      : true

    return matchSearch && matchPayterm && matchStatus
  })

  function handleAddClick() {
    setShowAddModal(true)
  }

  function handleEditClick(customer) {
    setSelectedCustomer(customer)
    setShowEditModal(true)
  }

  function handleDeleteClick(customer) {
    setSelectedCustomer(customer)
    setShowDeleteDialog(true)
  }

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              CURRENT_ROLE === 'SUPERADMIN'
                ? 'bg-purple-100 text-purple-700 border-purple-200'
                : CURRENT_ROLE === 'ADMIN'
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}
          >
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

        {/* Showing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-xs text-gray-400 uppercase font-semibold">
            Showing
          </p>

          <p className="text-2xl font-bold text-slate-800">
            {filtered.length}
          </p>
        </div>

        {/* Active */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-5">
          <p className="text-xs text-gray-400 uppercase font-semibold">
            Active
          </p>

          <p className="text-2xl font-bold text-slate-800">
            {
              customers.filter(
                (c) => c.record_status === 'ACTIVE'
              ).length
            }
          </p>
        </div>

        {/* Inactive */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
          <p className="text-xs text-gray-400 uppercase font-semibold">
            Inactive
          </p>

          <p className="text-2xl font-bold text-slate-800">
            {
              isUser
                ? '—'
                : customers.filter(
                    (c) => c.record_status === 'INACTIVE'
                  ).length
            }
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
        />

        {/* Payterm Filter */}
        <select
          value={paytermFilter}
          onChange={(e) => setPaytermFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
        >
          <option value="">All Pay Terms</option>
          <option value="COD">COD</option>
          <option value="30D">30 Days</option>
          <option value="45D">45 Days</option>
        </select>

        {/* Status Filter */}
        {!isUser && (
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        )}

        <button
          onClick={handleAddClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          + Add Customer
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Cust No
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Customer Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Address
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Pay Term
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Status
                </th>

                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                    Stamp
                  </th>
                )}

                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 7 : 6}
                    className="px-6 py-20 text-center text-gray-400"
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (

                <tr>
                  <td
                    colSpan={isAdmin ? 7 : 6}
                    className="px-6 py-20 text-center text-gray-400"
                  >
                    No customers found
                  </td>
                </tr>

              ) : (

                filtered.map((customer, index) => (

                  <tr
                    key={customer.custno}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0
                        ? 'bg-white'
                        : 'bg-gray-50/40'
                    }`}
                  >

                    <td className="px-6 py-4 text-sm font-mono">
                      {customer.custno}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                      {customer.custname}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {customer.address}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {customer.payterm}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          customer.record_status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {customer.record_status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {customer.stamp}
                      </td>
                    )}

                    <td className="px-6 py-4">
                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEditClick(customer)
                          }
                          className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteClick(customer)
                          }
                          className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg"
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
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/60">
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {customers.length} customers
          </p>
        </div>
      </div>

      {/* MODALS */}
      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          fetchCustomers()
        }}
      />

      <EditCustomerModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          fetchCustomers()
        }}
        customer={selectedCustomer}
      />

      <SoftDeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          fetchCustomers()
        }}
        customer={selectedCustomer}
      />

    </div>
  )
}

export default CustomersPage