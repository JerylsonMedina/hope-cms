// ── PERMISSION GATE ──
// Change to test: 'USER' | 'ADMIN' | 'SUPERADMIN'
import { useState } from 'react'
const USER_ROLE = 'ADMIN'
const PERMISSIONS = {
  USER:       { CUST_ADD: false, CUST_EDIT: false, CUST_DEL: false },
  ADMIN:      { CUST_ADD: true,  CUST_EDIT: true,  CUST_DEL: false },
  SUPERADMIN: { CUST_ADD: true,  CUST_EDIT: true,  CUST_DEL: true  },
}
const canAdd = PERMISSIONS[USER_ROLE].CUST_ADD

function AddCustomerModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    custno: '',
    custname: '',
    address: '',
    payterm: 'COD'
  })

  // ── PERMISSION CHECK ──
  if (!canAdd) {
    return isOpen ? (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 p-8 text-center">
          <div className="bg-red-100 text-red-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V7" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Access Denied</h3>
          <p className="text-sm text-gray-400 mb-5">
            You don't have <span className="font-semibold text-red-500">CUST_ADD</span> permission.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    ) : null
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Sprint 2: connect to Supabase
    alert('Customer added! (Supabase connects in Sprint 2)')
    setFormData({ custno: '', custname: '', address: '', payterm: 'COD' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800">Add New Customer</h2>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200">
                CUST_ADD
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Customer No */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Customer No
            </label>
            <input
              type="text"
              value={formData.custno}
              onChange={(e) => setFormData({...formData, custno: e.target.value})}
              placeholder="e.g. C0009"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              required
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Customer Name
            </label>
            <input
              type="text"
              value={formData.custname}
              onChange={(e) => setFormData({...formData, custname: e.target.value})}
              placeholder="Full name or company name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Full address"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              required
            />
          </div>

          {/* Pay Term */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Pay Term
            </label>
            <select
              value={formData.payterm}
              onChange={(e) => setFormData({...formData, payterm: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              <option value="COD">COD — Cash on Delivery</option>
              <option value="30D">30D — 30 Days</option>
              <option value="45D">45D — 45 Days</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
            >
              Add Customer
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddCustomerModal