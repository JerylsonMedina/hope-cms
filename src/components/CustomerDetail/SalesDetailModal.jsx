function SalesDetailModal({ isOpen, onClose, transaction }) {

  if (!isOpen || !transaction) return null

  // Calculate totals
  const grandTotal = transaction.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 0
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-base font-bold text-slate-800">
                Transaction Details
              </h2>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                {transaction.transNo}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>
                📅 {new Date(transaction.salesDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              <span>•</span>
              <span>👤 {transaction.empNo}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition text-lg leading-none flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Line Items */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">

            {/* Section label */}
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-widest mb-3">
              Line Items — Latest Price History
            </p>

            {/* Items Table */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100/80">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Product Description
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.lineItems.map((item, index) => {
                    const subtotal = item.quantity * item.unitPrice
                    return (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 last:border-0 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                        }`}
                      >
                        {/* Description */}
                        <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                          {item.description}
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-3 text-center">
                          <span className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">
                            ×{item.quantity}
                          </span>
                        </td>

                        {/* Unit Price */}
                        <td className="px-4 py-3 text-right text-sm text-gray-500">
                          ${item.unitPrice.toFixed(2)}
                        </td>

                        {/* Subtotal */}
                        <td className="px-4 py-3 text-right text-sm font-bold text-slate-700">
                          ${subtotal.toFixed(2)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Footer — Grand Total + Close */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Grand Total
              </p>
              <p className="text-2xl font-black text-emerald-600">
                ${grandTotal.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Items
              </p>
              <p className="text-2xl font-black text-slate-800">
                {transaction.lineItems.length}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Close
            </button>
            <button
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SalesDetailModal