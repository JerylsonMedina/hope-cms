function SalesHistoryPanel({ sales, onTransactionClick }) {

  // Total revenue across all transactions
  const totalRevenue = sales.reduce((sum, txn) =>
    sum + txn.lineItems.reduce((s, item) =>
      s + (item.quantity * item.unitPrice), 0
    ), 0
  )

  return (
    <div>

      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Sales History</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            Click any transaction to view line items.
          </p>
        </div>

        {/* Summary pills */}
        <div className="flex items-center gap-2">
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-full">
            {sales.length} Transactions
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full">
            ${totalRevenue.toFixed(2)} Total
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Trans No</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Sales Date</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Emp No</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Items</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gray-100 text-gray-300 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No sales history</p>
                      <p className="text-xs text-gray-400">Supabase connects in Sprint 2</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sales.map((txn, index) => {
                  const txnTotal = txn.lineItems.reduce(
                    (sum, item) => sum + item.quantity * item.unitPrice, 0
                  )
                  return (
                    <tr
                      key={txn.transNo}
                      className={`border-b border-gray-100 transition-colors duration-100 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                      } hover:bg-indigo-50/40 cursor-pointer`}
                      onClick={() => onTransactionClick(txn)}
                    >
                      {/* Trans No */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-semibold text-indigo-600">
                          {txn.transNo}
                        </span>
                      </td>

                      {/* Sales Date */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(txn.salesDate).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>

                      {/* Emp No */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">
                          {txn.empNo}
                        </span>
                      </td>

                      {/* Item Count */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full">
                          {txn.lineItems.length} items
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 text-sm font-bold text-emerald-600">
                        ${txnTotal.toFixed(2)}
                      </td>

                      {/* View button */}
                      <td className="px-6 py-4">
                        <button className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
                          View
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            <span className="text-gray-600 font-semibold">{sales.length}</span> transactions found
          </p>
          <span className="text-xs text-indigo-400 font-medium">● Dummy data — Supabase in Sprint 2</span>
        </div>
      </div>
    </div>
  )
}

export default SalesHistoryPanel