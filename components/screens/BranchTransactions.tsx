'use client'

import React, { useState } from 'react';
import { Plus, Search, Download, TrendingUp, TrendingDown } from 'lucide-react';

interface BranchTransaction {
  id: string;
  date: string;
  branch: string;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  amount: number;
  reference: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export function BranchTransactions() {
  const [transactions, setTransactions] = useState<BranchTransaction[]>([
    {
      id: '1',
      date: '2025-12-20',
      branch: 'Colombo Central',
      type: 'Income',
      category: 'Loan Interest',
      description: 'Interest collected from loans',
      amount: 450000,
      reference: 'INT-2025-120',
      status: 'Approved'
    },
    {
      id: '2',
      date: '2025-12-20',
      branch: 'Colombo Central',
      type: 'Expense',
      category: 'Rent',
      description: 'Monthly office rent payment',
      amount: 75000,
      reference: 'RENT-2025-12',
      status: 'Approved'
    },
    {
      id: '3',
      date: '2025-12-19',
      branch: 'Kandy Branch',
      type: 'Income',
      category: 'Processing Fee',
      description: 'Loan processing fees',
      amount: 125000,
      reference: 'FEE-2025-089',
      status: 'Approved'
    },
    {
      id: '4',
      date: '2025-12-19',
      branch: 'Kandy Branch',
      type: 'Expense',
      category: 'Utilities',
      description: 'Electricity and water bills',
      amount: 25000,
      reference: 'UTIL-2025-12',
      status: 'Pending'
    },
    {
      id: '5',
      date: '2025-12-18',
      branch: 'Galle Branch',
      type: 'Expense',
      category: 'Salaries',
      description: 'Staff salary payments',
      amount: 320000,
      reference: 'SAL-2025-12',
      status: 'Approved'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const branches = ['Colombo Central', 'Kandy Branch', 'Galle Branch', 'Matara Branch'];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === 'all' || t.branch === filterBranch;
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesBranch && matchesType;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'Income' && t.status === 'Approved')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense' && t.status === 'Approved')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Branch Transactions</h1>
          <p className="text-gray-600 mt-1">Track branch income and expenses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Total Income</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalIncome.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalExpenses.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 ${netProfit >= 0 ? 'bg-blue-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
              <TrendingUp className={`w-5 h-5 ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
            <p className="text-sm text-gray-600">Net Profit</p>
          </div>
          <p className={`text-2xl ${netProfit >= 0 ? 'text-gray-900' : 'text-orange-600'}`}>
            LKR {netProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Branches</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Branch</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Description</th>
                <th className="text-right px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.branch}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      transaction.type === 'Income'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {transaction.type === 'Income' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">
                    LKR {transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Add Branch Transaction</h2>
              <p className="text-sm text-gray-600 mt-1">Record a new income or expense</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Branch</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Loan Interest</option>
                    <option>Processing Fee</option>
                    <option>Rent</option>
                    <option>Utilities</option>
                    <option>Salaries</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Amount (LKR)</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Reference</label>
                  <input
                    type="text"
                    placeholder="e.g., INV-2025-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Enter transaction details"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
