import { useState } from 'react'

function ProductsPage() {
  const [search, setSearch] = useState('')

  // Sprint 2: replace with real Supabase data
  const products = []

  const filtered = products.filter((p) =>
    p.description?.toLowerCase().includes(search.toLowerCase()) ||
    p.prodCode?.toLowerCase().includes(search.toLowerCase()) ||
    p.unit?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Products</h1>
        <p className="text-gray-400 text-sm mt-1">
          Browse and manage the full product catalogue.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Total Products</p>
            <p className="text-2xl font-bold text-slate-800">{products.length || '—'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Avg. Price</p>
            <p className="text-2xl font-bold text-slate-800">
              {products.length
                ? `$${(products.reduce((s, p) => s + parseFloat(p.unitprice || 0), 0) / products.length).toFixed(2)}`
                : '—'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 rounded-xl p-3 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Units</p>
            <p className="text-2xl font-bold text-slate-800">
              {products.length
                ? new Set(products.map((p) => p.unit)).size
                : '—'}
            </p>
          </div>
        </div>

      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by product code, description, or unit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Product Code</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Unit</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Current Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-blue-50 text-blue-400 rounded-full p-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No products found</p>
                      <p className="text-xs text-gray-400">Live data connects in Sprint 2</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product, index) => (
                  <tr
                    key={product.prodCode}
                    className={`border-b border-gray-100 hover:bg-indigo-50/30 transition-colors duration-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-mono px-2.5 py-1 rounded-md">
                        {product.prodCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {product.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-medium px-2.5 py-1 rounded-full">
                        {product.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      ${parseFloat(product.unitprice).toFixed(2)}
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
            <span className="text-gray-600 font-semibold">{products.length}</span> products
          </p>
          <span className="text-xs text-indigo-400 font-medium">● Sprint 2: Live data</span>
        </div>
      </div>

    </div>
  )
}

export default ProductsPage