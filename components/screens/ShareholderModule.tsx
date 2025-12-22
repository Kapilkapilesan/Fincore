'use client'

import React, { useState } from 'react';
import { Plus, TrendingUp, DollarSign, Users, X, PieChart } from 'lucide-react';

type Shareholder = {
  id: string;
  name: string;
  shares: number;
  percentage: number;
  totalInvestment: number;
  nic?: string;
  contact?: string;
  address?: string;
};

export function ShareholderModule() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedShareholder, setSelectedShareholder] = useState<Shareholder | null>(null);

  const [shareholders, setShareholders] = useState<Shareholder[]>([
    { id: '1', name: 'Nimal Perera', shares: 100, percentage: 25, totalInvestment: 2500000 },
    { id: '2', name: 'Saman Silva', shares: 80, percentage: 20, totalInvestment: 2000000 },
    { id: '3', name: 'Kamala Bandara', shares: 120, percentage: 30, totalInvestment: 3000000 },
    { id: '4', name: 'Dilini Fernando', shares: 100, percentage: 25, totalInvestment: 2500000 }
  ]);

  const [newShareholder, setNewShareholder] = useState({
    name: '',
    shares: '',
    totalInvestment: '',
    percentage: '',
    nic: '',
    contact: '',
    address: ''
  });

  const handleAddShareholder = () => {
    if (
      !newShareholder.name ||
      !newShareholder.shares ||
      !newShareholder.totalInvestment ||
      !newShareholder.percentage
    ) {
      return;
    }

    const sharesNumber = Number(newShareholder.shares);
    const investmentNumber = Number(newShareholder.totalInvestment);
    const percentageNumber = Number(newShareholder.percentage);

    if (Number.isNaN(sharesNumber) || Number.isNaN(investmentNumber) || Number.isNaN(percentageNumber)) {
      return;
    }

    const created: Shareholder = {
      id: Date.now().toString(),
      name: newShareholder.name,
      shares: sharesNumber,
      totalInvestment: investmentNumber,
      percentage: percentageNumber,
      nic: newShareholder.nic || undefined,
      contact: newShareholder.contact || undefined,
      address: newShareholder.address || undefined
    };

    setShareholders((prev) => [...prev, created]);
    setNewShareholder({
      name: '',
      shares: '',
      totalInvestment: '',
      percentage: '',
      nic: '',
      contact: '',
      address: ''
    });
    setShowAddModal(false);
  };

  const totalInvestment = shareholders.reduce((sum, s) => sum + s.totalInvestment, 0);
  const totalShares = shareholders.reduce((sum, s) => sum + s.shares, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shareholder Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage shareholders and profit distribution</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Shareholder</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Shareholders</p>
          <p className="text-2xl font-bold text-gray-900">{shareholders.length}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Investment</p>
          <p className="text-2xl font-bold text-gray-900">LKR {(totalInvestment / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Available Profit</p>
          <p className="text-2xl font-bold text-green-600">LKR 2.75M</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Distributed YTD</p>
          <p className="text-2xl font-bold text-blue-600">LKR 6.0M</p>
        </div>
      </div>

      {/* Shareholder List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">Shareholder List</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Calculate Profit Distribution
          </button>
        </div>

        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-3">Shareholder Name</div>
            <div className="col-span-2">Shares</div>
            <div className="col-span-2">Percentage</div>
            <div className="col-span-3">Total Investment</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {shareholders.map((shareholder) => (
            <div key={shareholder.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">{shareholder.name.charAt(0)}</span>
                  </div>
                  <p className="font-medium text-gray-900">{shareholder.name}</p>
                </div>

                {/* Shares */}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-900">{shareholder.shares}</p>
                  <p className="text-xs text-gray-500">shares</p>
                </div>

                {/* Percentage */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{shareholder.percentage}%</p>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${shareholder.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Investment */}
                <div className="col-span-3">
                  <p className="text-sm font-medium text-gray-900">LKR {shareholder.totalInvestment.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total investment</p>
                </div>

                {/* Actions */}
                <div className="col-span-2">
                  <button
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    onClick={() => {
                      setSelectedShareholder(shareholder);
                      setShowDetailsModal(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3">
              <p className="text-sm font-semibold text-gray-900">Total</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-bold text-gray-900">{totalShares} shares</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-bold text-gray-900">100%</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm font-bold text-gray-900">LKR {totalInvestment.toLocaleString()}</p>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>

      {/* Profit Distribution Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Profit Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Available Profit (LKR)</label>
            <input
              type="number"
              defaultValue="2750000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Distribution Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Distribute Profit
            </button>
          </div>
        </div>
      </div>

      {/* Add Shareholder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Add New Shareholder</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Shareholder Name *</label>
                <input
                  type="text"
                  value={newShareholder.name}
                  onChange={(e) =>
                    setNewShareholder((prev) => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Number of Shares *</label>
                  <input
                    type="number"
                    value={newShareholder.shares}
                    onChange={(e) =>
                      setNewShareholder((prev) => ({
                        ...prev,
                        shares: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter shares"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Investment (LKR) *</label>
                  <input
                    type="number"
                    value={newShareholder.totalInvestment}
                    onChange={(e) =>
                      setNewShareholder((prev) => ({
                        ...prev,
                        totalInvestment: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Share Percentage (%) *</label>
                <input
                  type="number"
                  value={newShareholder.percentage}
                  onChange={(e) =>
                    setNewShareholder((prev) => ({
                      ...prev,
                      percentage: e.target.value
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter percentage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">NIC Number *</label>
                <input
                  type="text"
                  value={newShareholder.nic}
                  onChange={(e) =>
                    setNewShareholder((prev) => ({
                      ...prev,
                      nic: e.target.value
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter NIC number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={newShareholder.contact}
                  onChange={(e) =>
                    setNewShareholder((prev) => ({
                      ...prev,
                      contact: e.target.value
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="+94 XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Address</label>
                <textarea
                  rows={2}
                  value={newShareholder.address}
                  onChange={(e) =>
                    setNewShareholder((prev) => ({
                      ...prev,
                      address: e.target.value
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  placeholder="Enter address"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                onClick={handleAddShareholder}
              >
                Add Shareholder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shareholder Details Modal */}
      {showDetailsModal && selectedShareholder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Shareholder Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">
                    {selectedShareholder.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedShareholder.name}</p>
                  {selectedShareholder.nic && (
                    <p className="text-gray-500 text-xs">NIC: {selectedShareholder.nic}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Shares</p>
                  <p className="font-medium text-gray-900">
                    {selectedShareholder.shares.toLocaleString()} shares
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Percentage</p>
                  <p className="font-medium text-gray-900">{selectedShareholder.percentage}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Investment</p>
                  <p className="font-medium text-gray-900">
                    LKR {selectedShareholder.totalInvestment.toLocaleString()}
                  </p>
                </div>
                {selectedShareholder.contact && (
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="font-medium text-gray-900">{selectedShareholder.contact}</p>
                  </div>
                )}
              </div>

              {selectedShareholder.address && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900">{selectedShareholder.address}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end bg-gray-50">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
