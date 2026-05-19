// ── PERMISSION GATE ──
const USER_ROLE = 'SUPERADMIN'
const PERMISSIONS = {
  USER:       { CUST_ADD: false, CUST_EDIT: false, CUST_DEL: false },
  ADMIN:      { CUST_ADD: true,  CUST_EDIT: true,  CUST_DEL: false },
  SUPERADMIN: { CUST_ADD: true,  CUST_EDIT: true,  CUST_DEL: true  },
}
const canDelete = PERMISSIONS[USER_ROLE].CUST_DEL

function SoftDeleteConfirmDialog({ isOpen, onClose, customer }) {

  // ── PERMISSION CHECK ──
  if (!canDelete) {
    return isOpen ? (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 p-8 text-center">
          <div className="bg-red-100 text-red-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Access Denied</h3>
          <p className="text-sm text-gray-400 mb-2">
            You don't have <span className="font-semibold text-red-500">CUST_DEL</span> permission.
          </p>
          <p className="text-xs text-gray-400 mb-5">
            Only <span className="font-semibold text-purple-600">SUPERADMIN</span> can delete customers.
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

  function handleConfirm() {
    // Sprint 2: connect to Supabase softDelete
    alert(`Customer "${customer?.custname}" soft deleted! (Supabase connects in Sprint 2)`)
    onClose()
  }

  if (!isOpen || !customer) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100">

        {/* Header */}
        <div className="px-6 py-5 text-center">

          {/* Warning Icon */}
          <div className="bg-red-100 text-red-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          {/* Permission badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200">
              SUPERADMIN ONLY
            </span>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-200">
              CUST_DEL
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Delete Customer?
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-500 mb-1">
            Are you sure you want to delete
          </p>
          <p className="text-base font-bold text-slate-800 mb-2">
            "{customer.custname}"?
          </p>
          <p className="text-xs text-gray-400 mb-1">
            Customer No: <span className="font-mono font-semibold text-gray-600">{customer.custno}</span>
          </p>

          {/* Soft delete notice */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4 text-left">
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-amber-700">
              This is a <span className="font-bold">soft delete</span> — the record will be marked
              as <span className="font-bold">INACTIVE</span> and can be recovered by a SUPERADMIN.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default SoftDeleteConfirmDialog