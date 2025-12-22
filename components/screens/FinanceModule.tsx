'use client'

import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Download, DollarSign, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function FinanceModule() {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [entryType, setEntryType] = useState<'income' | 'expense'>('income');

  const summary = {
    totalIncome: 27250000,
    totalExpense: 11700000,
    netProfit: 15550000
  };

  const categoryData = [
    { name: 'Interest Income', value: 17500000, color: '#10B981' },
    { name: 'Processing Fees', value: 4250000, color: '#3B82F6' },
    { name: 'Other Income', value: 5500000, color: '#8B5CF6' }
  ];

  const expenseData = [
    { name: 'Salaries', value: 5850000, color: '#EF4444' },
    { name: 'Operations', value: 3900000, color: '#F59E0B' },
    { name: 'Other', value: 1950000, color: '#6B7280' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance Module</h1>
          <p className="text-sm text-gray-500 mt-1">Track income, expenses, and financial performance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <button
            onClick={() => setShowEntryModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Entry</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Income</p>
          <p className="text-2xl font-bold text-green-600">LKR {(summary.totalIncome / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-500 mt-1">+12.5% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Expense</p>
          <p className="text-2xl font-bold text-red-600">LKR {(summary.totalExpense / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-500 mt-1">+5.2% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Net Profit</p>
          <p className="text-2xl font-bold text-blue-600">LKR {(summary.netProfit / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-gray-500 mt-1">+18.3% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Income Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: LKR ${(entry.value / 1000000).toFixed(1)}M`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `LKR ${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: LKR ${(entry.value / 1000000).toFixed(1)}M`}
                labelLine={false}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `LKR ${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
        </div>

        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-2">Date</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1">Status</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {[
            { date: '2024-12-20', desc: 'Interest Payment - LN-2024-0001', category: 'Interest Income', amount: 12500, type: 'Income', status: 'Completed' },
            { date: '2024-12-19', desc: 'Staff Salary - December', category: 'Salaries', amount: 450000, type: 'Expense', status: 'Completed' },
            { date: '2024-12-18', desc: 'Processing Fee - LN-2024-0015', category: 'Processing Fees', amount: 5000, type: 'Income', status: 'Completed' }
          ].map((txn, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{txn.date}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-gray-900">{txn.desc}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-700">{txn.category}</p>
                </div>
                <div className="col-span-2">
                  <p className={`text-sm font-medium ${txn.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'Income' ? '+' : '-'}LKR {txn.amount.toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    txn.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {txn.type}
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                    {txn.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Entry Modal */}
      {showEntryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">New Financial Entry</h2>
                <button
                  onClick={() => setShowEntryModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Entry Type *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="entryType"
                      value="income"
                      checked={entryType === 'income'}
                      onChange={(e) => setEntryType(e.target.value as 'income')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Income</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="entryType"
                      value="expense"
                      checked={entryType === 'expense'}
                      onChange={(e) => setEntryType(e.target.value as 'expense')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Expense</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Category *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="">Select Category</option>
                  {entryType === 'income' ? (
                    <>
                      <option value="interest">Interest Income</option>
                      <option value="processing">Processing Fees</option>
                      <option value="other">Other Income</option>
                    </>
                  ) : (
                    <>
                      <option value="salary">Salaries</option>
                      <option value="operations">Operations</option>
                      <option value="other">Other Expenses</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amount (LKR) *</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Date *</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description *</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => setShowEntryModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
