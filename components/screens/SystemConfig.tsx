'use client'

import React, { useState } from 'react';
import { Clock, DollarSign, Package, Building, FileText, Settings, Save } from 'lucide-react';

export function SystemConfig() {
  const [activeTab, setActiveTab] = useState('login-time');

  const tabs = [
    { id: 'login-time', label: 'Login Time Restriction', icon: <Clock className="w-4 h-4" /> },
    { id: 'charge-types', label: 'Charge Types', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'product-types', label: 'Product Types', icon: <Package className="w-4 h-4" /> },
    { id: 'bank-confirm', label: 'Bank Confirmation', icon: <Building className="w-4 h-4" /> },
    { id: 'reprint-log', label: 'Reprint Log', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">Configure system settings and parameters</p>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'login-time' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Login Time Restrictions</h3>
                <p className="text-sm text-gray-600 mb-4">Configure allowed login hours for different user roles</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Start Time</label>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">End Time</label>
                  <input
                    type="time"
                    defaultValue="20:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="weekend" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="weekend" className="text-sm text-gray-700">Allow login on weekends</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="holidays" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="holidays" className="text-sm text-gray-700">Allow login on public holidays</label>
              </div>
            </div>
          )}

          {activeTab === 'charge-types' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Manage Charge Types</h3>
                <p className="text-sm text-gray-600 mb-4">Add and configure different types of charges and fees</p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Charge Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount/Rate</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">Processing Fee</td>
                      <td className="px-4 py-3 text-gray-700">Fixed</td>
                      <td className="px-4 py-3 text-right text-gray-900">LKR 5,000</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">Documentation Fee</td>
                      <td className="px-4 py-3 text-gray-700">Fixed</td>
                      <td className="px-4 py-3 text-right text-gray-900">LKR 2,500</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">Late Payment Penalty</td>
                      <td className="px-4 py-3 text-gray-700">Percentage</td>
                      <td className="px-4 py-3 text-right text-gray-900">2%</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Add New Charge Type
              </button>
            </div>
          )}

          {activeTab === 'product-types' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Loan Product Types</h3>
                <p className="text-sm text-gray-600 mb-4">Configure different loan products and their parameters</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Microfinance Loan', minAmount: 50000, maxAmount: 500000, minTenure: 6, maxTenure: 24, interestRate: 12.5 },
                  { name: 'Business Loan', minAmount: 100000, maxAmount: 1000000, minTenure: 12, maxTenure: 36, interestRate: 11.0 },
                  { name: 'Emergency Loan', minAmount: 25000, maxAmount: 250000, minTenure: 3, maxTenure: 12, interestRate: 14.0 }
                ].map((product, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Active</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs">Min Amount</p>
                        <p className="text-gray-900 font-medium">LKR {product.minAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Max Amount</p>
                        <p className="text-gray-900 font-medium">LKR {product.maxAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Tenure Range</p>
                        <p className="text-gray-900 font-medium">{product.minTenure}-{product.maxTenure} months</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Interest Rate</p>
                        <p className="text-gray-900 font-medium">{product.interestRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Add Product Type
              </button>
            </div>
          )}

          {activeTab === 'bank-confirm' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Bank Confirmation Settings</h3>
                <p className="text-sm text-gray-600 mb-4">Configure bank accounts for disbursement and collections</p>
              </div>

              <div className="space-y-4">
                {[
                  { bank: 'Bank of Ceylon', accountNo: '********1234', branch: 'Colombo Main', type: 'Primary' },
                  { bank: 'Commercial Bank', accountNo: '********5678', branch: 'Kandy', type: 'Secondary' },
                  { bank: 'Peoples Bank', accountNo: '********9012', branch: 'Galle', type: 'Secondary' }
                ].map((account, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{account.bank}</h4>
                        <p className="text-sm text-gray-600">Account: {account.accountNo}</p>
                        <p className="text-sm text-gray-600">Branch: {account.branch}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          account.type === 'Primary' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {account.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Add Bank Account
              </button>
            </div>
          )}

          {activeTab === 'reprint-log' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Receipt Reprint Log</h3>
                <p className="text-sm text-gray-600 mb-4">Track all receipt reprint requests and approvals</p>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Receipt No</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Requested By</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reason</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">2024-12-20</td>
                      <td className="px-4 py-3 text-gray-900">RCT-2024-00125</td>
                      <td className="px-4 py-3 text-gray-700">Staff A</td>
                      <td className="px-4 py-3 text-gray-700">Customer lost original</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Approved</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">2024-12-19</td>
                      <td className="px-4 py-3 text-gray-900">RCT-2024-00118</td>
                      <td className="px-4 py-3 text-gray-700">Staff B</td>
                      <td className="px-4 py-3 text-gray-700">Printer error</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Pending</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
