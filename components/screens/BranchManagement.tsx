'use client'

import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building2, MapPin, Phone, Mail, X, Users, TrendingUp } from 'lucide-react';

interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  manager: string;
  status: 'Active' | 'Inactive';
  customerCount?: number;
  loanCount?: number;
}

export function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      code: 'BR001',
      name: 'Head Office - Colombo',
      address: '123 Galle Road',
      city: 'Colombo',
      state: 'Western Province',
      pincode: '00300',
      phone: '+94 11 234 5678',
      email: 'headoffice@lms.lk',
      manager: 'Nimal Perera',
      status: 'Active',
      customerCount: 450,
      loanCount: 280
    },
    {
      id: '2',
      code: 'BR002',
      name: 'Kandy Branch',
      address: '456 Peradeniya Road',
      city: 'Kandy',
      state: 'Central Province',
      pincode: '20000',
      phone: '+94 81 234 5678',
      email: 'kandy@lms.lk',
      manager: 'Saman Silva',
      status: 'Active',
      customerCount: 320,
      loanCount: 195
    },
    {
      id: '3',
      code: 'BR003',
      name: 'Galle Branch',
      address: '789 Matara Road',
      city: 'Galle',
      state: 'Southern Province',
      pincode: '80000',
      phone: '+94 91 234 5678',
      email: 'galle@lms.lk',
      manager: 'Kamala Fernando',
      status: 'Active',
      customerCount: 280,
      loanCount: 165
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    manager: ''
  });

  const handleAdd = () => {
    setEditingBranch(null);
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      manager: ''
    });
    setShowModal(true);
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      pincode: branch.pincode,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingBranch) {
      setBranches(branches.map(b =>
        b.id === editingBranch.id ? { ...b, ...formData } : b
      ));
    } else {
      const newBranch: Branch = {
        id: String(branches.length + 1),
        code: `BR${String(branches.length + 1).padStart(3, '0')}`,
        ...formData,
        status: 'Active',
        customerCount: 0,
        loanCount: 0
      };
      setBranches([...branches, newBranch]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(b => b.id !== id));
    }
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.status === 'Active').length;
  const totalCustomers = branches.reduce((sum, b) => sum + (b.customerCount || 0), 0);
  const totalLoans = branches.reduce((sum, b) => sum + (b.loanCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branch Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all branch locations and details</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Branch</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Branches</p>
          <p className="text-2xl font-bold text-gray-900">{totalBranches}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((activeBranches / totalBranches) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Branches</p>
          <p className="text-2xl font-bold text-gray-900">{activeBranches}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Loans</p>
          <p className="text-2xl font-bold text-gray-900">{totalLoans}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search branches by name, code, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Branches Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-3">Branch</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Manager</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Branch Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{branch.name}</p>
                    <p className="text-xs text-gray-500">{branch.code}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="col-span-3">
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {branch.phone}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    {branch.email}
                  </p>
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {branch.city}
                  </p>
                  <p className="text-xs text-gray-500">{branch.state}</p>
                </div>

                {/* Manager */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{branch.manager}</p>
                  {branch.customerCount !== undefined && (
                    <p className="text-xs text-gray-500">{branch.customerCount} customers</p>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    branch.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {branch.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(branch.id)}
                    className="p-1.5 hover:bg-red-50 rounded text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredBranches.length}</span> of <span className="font-medium">{totalBranches}</span> branches
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingBranch ? 'Edit Branch' : 'Add New Branch'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Branch Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter branch name"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Province *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter province"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Postal Code *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter postal code"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="branch@lms.lk"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Branch Manager *</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter manager name"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                {editingBranch ? 'Update Branch' : 'Add Branch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
