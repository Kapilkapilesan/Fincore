'use client'

import React, { useState } from 'react';
import { Calendar, Search, Filter, FileText, TrendingUp, Users, DollarSign } from 'lucide-react';

export function DueList() {
  const [selectedDate, setSelectedDate] = useState('2024-12-21');
  const [centerFilter, setCenterFilter] = useState('All');

  const duePayments = [
    { id: '1', customer: 'Nimal Perera', customerId: 'CUST001', contractNo: 'LN-2024-0001', dueAmount: 25000, center: 'Colombo Central CSU', dueDate: '2024-12-21', status: 'Pending' },
    { id: '2', customer: 'Saman Silva', customerId: 'CUST003', contractNo: 'LN-2024-0002', dueAmount: 21000, center: 'Colombo Central CSU', dueDate: '2024-12-21', status: 'Pending' },
    { id: '3', customer: 'Dilini Fernando', customerId: 'CUST005', contractNo: 'LN-2024-0007', dueAmount: 15000, center: 'Kandy CSU', dueDate: '2024-12-21', status: 'Pending' }
  ];

  const totalDue = duePayments.reduce((sum, p) => sum + p.dueAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Due List</h1>
        <p className="text-sm text-gray-500 mt-1">View scheduled payments and collections</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Today&apos;s Due</p>
          <p className="text-2xl font-bold text-gray-900">LKR {totalDue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">{duePayments.length} payments</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">1st of Month</p>
          <p className="text-2xl font-bold text-gray-900">LKR 625,000</p>
          <p className="text-xs text-gray-500">45 payments</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">8th of Month</p>
          <p className="text-2xl font-bold text-gray-900">LKR 490,000</p>
          <p className="text-xs text-gray-500">38 payments</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">15th of Month</p>
          <p className="text-2xl font-bold text-gray-900">LKR 710,000</p>
          <p className="text-xs text-gray-500">52 payments</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer or contract..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full sm:w-auto">
            <select
              value={centerFilter}
              onChange={(e) => setCenterFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Centers</option>
              <option value="Colombo Central CSU">Colombo Central CSU</option>
              <option value="Kandy CSU">Kandy CSU</option>
              <option value="Galle CSU">Galle CSU</option>
            </select>
          </div>
        </div>
      </div>

      {/* Due Payments Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-900">Payments Due on {selectedDate}</h3>
        </div>

        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-2">Customer</div>
            <div className="col-span-2">Contract No</div>
            <div className="col-span-2">Center</div>
            <div className="col-span-2">Due Amount</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Status</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {duePayments.map((payment) => (
            <div key={payment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Customer */}
                <div className="col-span-2">
                  <p className="font-medium text-gray-900">{payment.customer}</p>
                  <p className="text-xs text-gray-500">{payment.customerId}</p>
                </div>

                {/* Contract No */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{payment.contractNo}</p>
                </div>

                {/* Center */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-700">{payment.center}</p>
                </div>

                {/* Due Amount */}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-900">LKR {payment.dueAmount.toLocaleString()}</p>
                </div>

                {/* Due Date */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-700">{payment.dueDate}</p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{duePayments.length}</span> payments
            </p>
            <p className="text-sm font-semibold text-gray-900">
              Total Due: <span className="text-blue-600">LKR {totalDue.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
