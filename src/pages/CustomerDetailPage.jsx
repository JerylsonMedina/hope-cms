import { useState } from 'react'
import SalesHistoryPanel from '../components/CustomerDetail/SalesHistoryPanel'
import SalesDetailModal from '../components/CustomerDetail/SalesDetailModal'

// ── DUMMY CUSTOMER DATA ──
const dummyCustomer = {
  custno: 'C0001',
  custname: 'Globus Medical, Inc',
  address: '2560 Gen Armistead Ave Audubon CA 94031',
  payterm: 'COD',
  record_status: 'ACTIVE',
  stamp: 'admin@hopecms.com | 2024-01-10'
}

// ── DUMMY SALES HISTORY ──
const dummySalesHistory = [
  {
    transNo: 'TXN-0001',
    salesDate: '2024-01-15',
    empNo: 'EMP-001',
    lineItems: [
      { description: 'Surgical Gloves (Box)', quantity: 10, unitPrice: 25.00 },
      { description: 'Face Mask N95',         quantity: 50, unitPrice: 8.50  },
      { description: 'Hand Sanitizer 500ml',  quantity: 20, unitPrice: 12.00 },
    ]
  },
  {
    transNo: 'TXN-0002',
    salesDate: '2024-02-03',
    empNo: 'EMP-002',
    lineItems: [
      { description: 'Medical Tape Roll',     quantity: 30, unitPrice: 5.00  },
      { description: 'Bandage Set Large',     quantity: 15, unitPrice: 18.00 },
    ]
  },
  {
    transNo: 'TXN-0003',
    salesDate: '2024-02-20',
    empNo: 'EMP-001',
    lineItems: [
      { description: 'Surgical Gloves (Box)', quantity: 25, unitPrice: 25.00 },
      { description: 'Disposable Gown',       quantity: 10, unitPrice: 35.00 },
      { description: 'Safety Goggles',        quantity: 8,  unitPrice: 22.00 },
      { description: 'Exam Table Paper',      quantity: 5,  unitPrice: 45.00 },
    ]
  },
  {
    transNo: 'TXN-0004',
    salesDate: '2024-03-08',
    empNo: 'EMP-003',
    lineItems: [
      { description: 'IV Drip Set',           quantity: 20, unitPrice: 15.00 },
      { description: 'Syringe 10ml',          quantity: 100, unitPrice: 2.50 },
    ]
  },
  {
    transNo: 'TXN-0005',
    salesDate: '2024-03-25',
    empNo: 'EMP-002',
    lineItems: [
      { description: 'Face Mask N95',         quantity: 100, unitPrice: 8.50 },
      { description: 'Hand Sanitizer 500ml',  quantity: 40,  unitPrice: 12.00},
      { description: 'Medical Tape Roll',     quantity: 20,  unitPrice: 5.00 },
    ]
  },
]

function CustomerDetailPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleTransactionClick(transaction) {
    setSelectedTransaction(transaction)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setSelectedTransaction(null)
  }

  return (
    <div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <span
          onClick={() => window.history.back()}
          className="hover:text-indigo-600 cursor-pointer transition"
        >
          Customers
        </span>
        <span>›</span>
        <span className="text-slate-600 font-medium">{dummyCustomer.custname}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Customer Profile</h1>
          <p className="text-gray-400 text-sm mt-1">
            View customer details and full sales history.
          </p>
        </div>
        {/* Status Badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
          dummyCustomer.record_status === 'ACTIVE'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-red-50 text-red-500 border-red-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            dummyCustomer.record_status === 'ACTIVE'
              ? 'bg-emerald-500'
              : 'bg-red-400'
          }`}></span>
          {dummyCustomer.record_status}
        </span>
      </div>

      {/* Customer Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">

        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow flex-shrink-0">
            <span className="text-white text-lg font-black">
              {dummyCustomer.custname.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {dummyCustomer.custname}
            </h2>
            <p className="text-xs text-gray-400 font-mono">{dummyCustomer.custno}</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

          <div className="px-6 py-4">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
              Customer No
            </p>
            <p className="text-sm font-mono font-semibold text-slate-700">
              {dummyCustomer.custno}
            </p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
              Address
            </p>
            <p className="text-sm text-slate-700">{dummyCustomer.address}</p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
              Pay Term
            </p>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${
              dummyCustomer.payterm === 'COD'
                ? 'bg-green-50 text-green-700 border-green-200'
                : dummyCustomer.payterm === '30D'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              {dummyCustomer.payterm}
            </span>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
              Stamp
            </p>
            <p className="text-xs text-gray-400 font-mono">{dummyCustomer.stamp}</p>
          </div>

        </div>
      </div>

      {/* Sales History Panel */}
      <SalesHistoryPanel
        sales={dummySalesHistory}
        onTransactionClick={handleTransactionClick}
      />

      {/* Sales Detail Modal */}
      <SalesDetailModal
        isOpen={showModal}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />

    </div>
  )
}

export default CustomerDetailPage