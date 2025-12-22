'use client'

import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';

interface BranchCollection {
  branch: string;
  target: number;
  collected: number;
  pending: number;
  customers: number;
  achievement: number;
}

export function CollectionSummary() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const branchCollections: BranchCollection[] = [
    {
      branch: 'Colombo Central',
      target: 2500000,
      collected: 2350000,
      pending: 150000,
      customers: 245,
      achievement: 94
    },
    {
      branch: 'Kandy Branch',
      target: 1800000,
      collected: 1650000,
      pending: 150000,
      customers: 180,
      achievement: 91.7
    },
    {
      branch: 'Galle Branch',
      target: 1500000,
      collected: 1425000,
      pending: 75000,
      customers: 156,
      achievement: 95
    },
    {
      branch: 'Matara Branch',
      target: 1200000,
      collected: 1050000,
      pending: 150000,
      customers: 125,
      achievement: 87.5
    },
    {
      branch: 'Jaffna Branch',
      target: 1000000,
      collected: 980000,
      pending: 20000,
      customers: 98,
      achievement: 98
    }
  ];

  const totalTarget = branchCollections.reduce((sum, b) => sum + b.target, 0);
  const totalCollected = branchCollections.reduce((sum, b) => sum + b.collected, 0);
  const totalPending = branchCollections.reduce((sum, b) => sum + b.pending, 0);
  const totalCustomers = branchCollections.reduce((sum, b) => sum + b.customers, 0);
  const overallAchievement = ((totalCollected / totalTarget) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Collection Summary</h1>
          <p className="text-gray-600 mt-1">Overview of collection performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Overall Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Target Collection</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalTarget.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Collected</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalCollected.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">{overallAchievement}% achieved</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <p className="text-2xl text-gray-900">LKR {totalPending.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Active Customers</p>
          </div>
          <p className="text-2xl text-gray-900">{totalCustomers}</p>
        </div>
      </div>

      {/* Branch-wise Collection Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Branch-wise Collection Report</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Branch</th>
                <th className="text-right px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Target</th>
                <th className="text-right px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Collected</th>
                <th className="text-right px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Pending</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Customers</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Achievement</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {branchCollections.map((branch, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{branch.branch}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">
                    LKR {branch.target.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-green-600">
                    LKR {branch.collected.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-orange-600">
                    LKR {branch.pending.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900">{branch.customers}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900">{branch.achievement}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      branch.achievement >= 95 ? 'bg-green-100 text-green-700' :
                      branch.achievement >= 85 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {branch.achievement >= 95 ? 'Excellent' :
                       branch.achievement >= 85 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  LKR {totalTarget.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-right text-green-600">
                  LKR {totalCollected.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-right text-orange-600">
                  LKR {totalPending.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">{totalCustomers}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm text-gray-900">{overallAchievement}%</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    parseFloat(overallAchievement) >= 95 ? 'bg-green-100 text-green-700' :
                    parseFloat(overallAchievement) >= 85 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {parseFloat(overallAchievement) >= 95 ? 'Excellent' :
                     parseFloat(overallAchievement) >= 85 ? 'Good' : 'Needs Attention'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Collection Trend Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Collection Trend (Last 7 Days)</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Chart visualization would appear here</p>
        </div>
      </div>
    </div>
  );
}
