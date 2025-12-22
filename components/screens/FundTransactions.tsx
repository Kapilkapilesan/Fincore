'use client'

import React, { useState } from 'react';
import { Plus, Search, ArrowUpRight, ArrowDownRight, Filter, Download } from 'lucide-react';

interface FundTransaction {
  id: string;
  date: string;
  type: 'Inflow' | 'Outflow';
  category: string;
  description: string;
  amount: number;
  source: string;
  reference: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export function FundTransactions() {
  const [transactions, setTransactions] = useState<FundTransaction[]>([
    {
      id: '1',
      date: '2025-12-20',
      type: 'Inflow',
      category: 'Capital Injection',
      description: 'Shareholder capital investment',
      amount: 5000000,
      source: 'Shareholder A',
      reference: 'CAP-2025-001',
      status: 'Completed'
    },
    {
      id: '2',
      date: '2025-12-19',
      type: 'Outflow',
      category: 'Loan Disbursement',
      description: 'Bulk loan disbursement to branches',
      amount: 2500000,
      source: 'Head Office',
      reference: 'DISB-2025-045',
      status: 'Completed'
    },
    {
      id: '3',
      date: '2025-12-18',
      type: 'Inflow',
      category: 'Loan Repayment',
      description: 'Collection from branches',
      amount: 1850000,
      source: 'All Branches',
      reference: 'COLL-2025-156',
      status: 'Completed'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalInflow = transactions
    .filter(t => t.type === 'Inflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = transactions
    .filter(t => t.type === 'Outflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalInflow - totalOutflow;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Fund Transactions</h1>
          <p className="text-gray-600 mt-1">Manage organizational fund movements</p>
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
              <ArrowDownRight className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Total Inflow</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalInflow.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Total Outflow</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalOutflow.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 ${netBalance >= 0 ? 'bg-blue-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
              <ArrowUpRight className={`w-5 h-5 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
            <p className="text-sm text-gray-600">Net Balance</p>
          </div>
          <p className={`text-2xl ${netBalance >= 0 ? 'text-gray-900' : 'text-orange-600'}`}>
            LKR {netBalance.toLocaleString()}
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
              placeholder="Search by description or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Inflow">Inflow</option>
            <option value="Outflow">Outflow</option>
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
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Reference</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Source</th>
                <th className="text-right px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.reference}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      transaction.type === 'Inflow'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type === 'Inflow' ? (
                        <ArrowDownRight className="w-3 h-3" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.source}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">
                    LKR {transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-700' :
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
              <h2 className="text-gray-900">Add Fund Transaction</h2>
              <p className="text-sm text-gray-600 mt-1">Record a new fund movement</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Transaction Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Inflow">Inflow</option>
                    <option value="Outflow">Outflow</option>
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
                  <label className="block text-sm text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Capital Injection</option>
                    <option>Loan Disbursement</option>
                    <option>Loan Repayment</option>
                    <option>Operating Expenses</option>
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
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Source/Destination</label>
                  <input
                    type="text"
                    placeholder="Enter source or destination"
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
