'use client'

import React, { useState } from 'react';
import { Plus, Search, Edit, Users, MapPin, User, Calendar, Building2, TrendingUp, X } from 'lucide-react';

interface Center {
  id: string;
  centerNumber: string;
  name: string;
  branch: string;
  address: string;
  locationType: 'Urban' | 'Rural' | 'Semi-Urban';
  contactPerson: string;
  contactPhone: string;
  allowedStaff: string[];
  totalGroups: number;
  totalMembers: number;
  totalLoans: number;
  createdDate: string;
  status: 'Active' | 'Inactive';
}

export function CenterManagement() {
  const [centers, setCenters] = useState<Center[]>([
    {
      id: '1',
      centerNumber: 'CSU001',
      name: 'Colombo Central CSU',
      branch: 'Head Office',
      address: 'Community Hall, Galle Road, Colombo',
      locationType: 'Urban',
      contactPerson: 'Nimal Perera',
      contactPhone: '+94 77 123 4567',
      allowedStaff: ['Staff A', 'Staff B'],
      totalGroups: 8,
      totalMembers: 45,
      totalLoans: 42,
      createdDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      centerNumber: 'CSU002',
      name: 'Kandy CSU',
      branch: 'Kandy Branch',
      address: 'Temple Road Community Center, Kandy',
      locationType: 'Urban',
      contactPerson: 'Saman Silva',
      contactPhone: '+94 71 234 5678',
      allowedStaff: ['Staff A', 'Staff C'],
      totalGroups: 6,
      totalMembers: 32,
      totalLoans: 30,
      createdDate: '2024-02-20',
      status: 'Active'
    },
    {
      id: '3',
      centerNumber: 'CSU003',
      name: 'Galle CSU',
      branch: 'Galle Branch',
      address: 'Market Area, Galle Fort',
      locationType: 'Semi-Urban',
      contactPerson: 'Kamala Fernando',
      contactPhone: '+94 76 345 6789',
      allowedStaff: ['Staff B', 'Staff D'],
      totalGroups: 5,
      totalMembers: 28,
      totalLoans: 25,
      createdDate: '2024-03-10',
      status: 'Active'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCenter, setEditingCenter] = useState<Center | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    address: '',
    locationType: 'Urban' as 'Urban' | 'Rural' | 'Semi-Urban',
    contactPerson: '',
    contactPhone: '',
    allowedStaff: [] as string[]
  });

  const branches = ['Head Office', 'Kandy Branch', 'Galle Branch', 'Negombo Branch'];
  const staffList = ['Staff A', 'Staff B', 'Staff C', 'Staff D'];

  const handleAdd = () => {
    setEditingCenter(null);
    setFormData({
      name: '',
      branch: '',
      address: '',
      locationType: 'Urban',
      contactPerson: '',
      contactPhone: '',
      allowedStaff: []
    });
    setShowModal(true);
  };

  const handleEdit = (center: Center) => {
    setEditingCenter(center);
    setFormData({
      name: center.name,
      branch: center.branch,
      address: center.address,
      locationType: center.locationType,
      contactPerson: center.contactPerson,
      contactPhone: center.contactPhone,
      allowedStaff: center.allowedStaff
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingCenter) {
      setCenters(centers.map(c =>
        c.id === editingCenter.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCenter: Center = {
        id: String(centers.length + 1),
        centerNumber: `CSU${String(centers.length + 1).padStart(3, '0')}`,
        ...formData,
        totalGroups: 0,
        totalMembers: 0,
        totalLoans: 0,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setCenters([...centers, newCenter]);
    }
    setShowModal(false);
  };

  const filteredCenters = centers.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.centerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCenters = centers.length;
  const activeCenters = centers.filter(c => c.status === 'Active').length;
  const totalGroups = centers.reduce((sum, c) => sum + c.totalGroups, 0);
  const totalMembers = centers.reduce((sum, c) => sum + c.totalMembers, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Center (CSU) Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer service units and their details</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Center</span>
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
          <p className="text-sm text-gray-600 mb-1">Total Centers</p>
          <p className="text-2xl font-bold text-gray-900">{totalCenters}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((activeCenters / totalCenters) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Centers</p>
          <p className="text-2xl font-bold text-gray-900">{activeCenters}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Groups</p>
          <p className="text-2xl font-bold text-gray-900">{totalGroups}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Members</p>
          <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search centers by name, number, or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Centers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-3">Center</div>
            <div className="col-span-2">Branch</div>
            <div className="col-span-2">Contact Person</div>
            <div className="col-span-2">Statistics</div>
            <div className="col-span-2">Location Type</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredCenters.map((center) => (
            <div key={center.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Center Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{center.name}</p>
                    <p className="text-xs text-gray-500">{center.centerNumber}</p>
                  </div>
                </div>

                {/* Branch */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{center.branch}</p>
                  <p className="text-xs text-gray-500">{center.allowedStaff.length} staff members</p>
                </div>

                {/* Contact Person */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{center.contactPerson}</p>
                  <p className="text-xs text-gray-500">{center.contactPhone}</p>
                </div>

                {/* Statistics */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{center.totalGroups} Groups</p>
                  <p className="text-xs text-gray-500">{center.totalMembers} Members</p>
                </div>

                {/* Location Type */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    center.locationType === 'Urban' ? 'bg-blue-100 text-blue-700' :
                    center.locationType === 'Rural' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {center.locationType}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <button
                    onClick={() => handleEdit(center)}
                    className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
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
              Showing <span className="font-medium">{filteredCenters.length}</span> of <span className="font-medium">{totalCenters}</span> centers
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
                  {editingCenter ? 'Edit Center' : 'Add New Center'}
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
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Center Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter center name"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Branch *</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                {/* <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Location Type *</label>
                  <select
                    value={formData.locationType}
                    onChange={(e) => setFormData({ ...formData, locationType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                    <option value="Semi-Urban">Semi-Urban</option>
                  </select>
                </div> */}

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Location Type *</label>
                  <input
                    type="text"
                    value={formData.locationType}
                    onChange={(e) => setFormData({ ...formData, locationType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter Location Type"
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
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Contact Person *</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter contact person"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Contact Phone *</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Allowed Staff</label>
                  <div className="border border-gray-300 rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                    {staffList.map(staff => (
                      <label key={staff} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.allowedStaff.includes(staff)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, allowedStaff: [...formData.allowedStaff, staff] });
                            } else {
                              setFormData({ ...formData, allowedStaff: formData.allowedStaff.filter(s => s !== staff) });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{staff}</span>
                      </label>
                    ))}
                  </div>
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
                {editingCenter ? 'Update Center' : 'Add Center'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
