'use client'

import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart, TrendingUp, Users, DollarSign } from 'lucide-react';

export function ReportsScreen() {
  const [selectedReport, setSelectedReport] = useState('monthly-summary');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  const reportTypes = [
    { id: 'monthly-summary', name: 'Monthly Summary Report', icon: <FileText className="w-5 h-5" />, category: 'Financial' },
    { id: 'branch-report', name: 'Branch Performance Report', icon: <BarChart className="w-5 h-5" />, category: 'Operational' },
    { id: 'center-report', name: 'Center Activity Report', icon: <Users className="w-5 h-5" />, category: 'Operational' },
    { id: 'loan-portfolio', name: 'Loan Portfolio Report', icon: <DollarSign className="w-5 h-5" />, category: 'Financial' },
    { id: 'collection-summary', name: 'Collection Summary', icon: <TrendingUp className="w-5 h-5" />, category: 'Financial' },
    { id: 'staff-monitoring', name: 'Staff Monitoring Report', icon: <Users className="w-5 h-5" />, category: 'Admin' },
    { id: 'audit-log', name: 'Audit Log Viewer', icon: <FileText className="w-5 h-5" />, category: 'Admin' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Generate and export various system reports</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Reports</p>
          <p className="text-2xl font-bold text-gray-900">147</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Downloads This Month</p>
          <p className="text-2xl font-bold text-gray-900">28</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Scheduled Reports</p>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Last Generated</p>
          <p className="text-2xl font-bold text-gray-900">Today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Types Sidebar */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Report Types</h3>
          <div className="space-y-1">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  selectedReport === report.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className={`${selectedReport === report.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium block truncate">{report.name}</span>
                  <span className="text-xs text-gray-500">{report.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Report Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Branch</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="all">All Branches</option>
                  <option value="head">Head Office</option>
                  <option value="kandy">Kandy Branch</option>
                  <option value="galle">Galle Branch</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Generate Report
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                {reportTypes.find(r => r.id === selectedReport)?.name}
              </h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>

            <div className="p-6">
              {/* Sample Report Data */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Report Summary</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Period</p>
                      <p className="text-sm font-medium text-gray-900">{startDate} to {endDate}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">Generated On</p>
                      <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-blue-700 mb-1">Total Loans</p>
                      <p className="text-xl font-bold text-blue-900">248</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-xs text-green-700 mb-1">Collections</p>
                      <p className="text-xl font-bold text-green-900">LKR 12.5M</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-xs text-purple-700 mb-1">Outstanding</p>
                      <p className="text-xl font-bold text-purple-900">LKR 5.2M</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Detailed Breakdown</h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Branch</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Loans</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Disbursed</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Collected</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">Head Office</td>
                          <td className="px-4 py-3 text-right text-gray-900">95</td>
                          <td className="px-4 py-3 text-right text-gray-900">LKR 23.75M</td>
                          <td className="px-4 py-3 text-right text-green-600">LKR 18.5M</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">Kandy Branch</td>
                          <td className="px-4 py-3 text-right text-gray-900">78</td>
                          <td className="px-4 py-3 text-right text-gray-900">LKR 19.5M</td>
                          <td className="px-4 py-3 text-right text-green-600">LKR 15.2M</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">Galle Branch</td>
                          <td className="px-4 py-3 text-right text-gray-900">75</td>
                          <td className="px-4 py-3 text-right text-gray-900">LKR 18.75M</td>
                          <td className="px-4 py-3 text-right text-green-600">LKR 14.8M</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                        <tr>
                          <td className="px-4 py-3 font-semibold text-gray-900">Total</td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">248</td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">LKR 62M</td>
                          <td className="px-4 py-3 text-right font-semibold text-green-600">LKR 48.5M</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
