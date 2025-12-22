'use client'

import React, { useState } from 'react';
import { Plus, Search, Edit, UsersRound, UserPlus, UserMinus, X, Users, TrendingUp, Building2 } from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  customerId: string;
  nic: string;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

interface Customer {
  id: string;
  name: string;
  nic: string;
  center: string;
}

interface Group {
  id: string;
  groupCode: string;
  groupName: string;
  center: string;
  branch: string;
  members: GroupMember[];
  createdDate: string;
  status: 'Active' | 'Inactive';
}

export function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      groupCode: 'GRP001',
      groupName: 'Colombo Group A',
      center: 'Colombo Central CSU',
      branch: 'Head Office',
      members: [
        { id: '1', name: 'Nimal Perera', customerId: 'CUST001', nic: '902345678V', joinedDate: '2024-01-15', status: 'Active' },
        { id: '2', name: 'Saman Silva', customerId: 'CUST002', nic: '912345679V', joinedDate: '2024-01-15', status: 'Active' },
        { id: '3', name: 'Dilini Fernando', customerId: 'CUST003', nic: '932345671V', joinedDate: '2024-01-20', status: 'Active' }
      ],
      createdDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      groupCode: 'GRP002',
      groupName: 'Kandy Group B',
      center: 'Kandy CSU',
      branch: 'Kandy Branch',
      members: [
        { id: '4', name: 'Kamala Bandara', customerId: 'CUST004', nic: '882345670V', joinedDate: '2024-02-10', status: 'Active' },
        { id: '5', name: 'Rajitha Kumara', customerId: 'CUST005', nic: '872345669V', joinedDate: '2024-02-10', status: 'Active' }
      ],
      createdDate: '2024-02-10',
      status: 'Active'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [editCustomerSearch, setEditCustomerSearch] = useState('');
  const [modalMembers, setModalMembers] = useState<GroupMember[]>([]);

  const [formData, setFormData] = useState({
    groupName: '',
    center: '',
    branch: 'N/A'
  });

  const customers: Customer[] = [
    { id: 'CUST001', name: 'Nimal Perera', nic: '902345678V', center: 'Colombo Central CSU' },
    { id: 'CUST002', name: 'Saman Silva', nic: '912345679V', center: 'Colombo Central CSU' },
    { id: 'CUST003', name: 'Dilini Fernando', nic: '932345671V', center: 'Colombo Central CSU' },
    { id: 'CUST004', name: 'Kamala Bandara', nic: '882345670V', center: 'Kandy CSU' },
    { id: 'CUST005', name: 'Rajitha Kumara', nic: '872345669V', center: 'Kandy CSU' },
    { id: 'CUST006', name: 'Ishara Jayasuriya', nic: '952345668V', center: 'Kandy CSU' },
    { id: 'CUST007', name: 'Piumi Ratnayake', nic: '942345667V', center: 'Galle CSU' },
    { id: 'CUST008', name: 'Chatura Weerakoon', nic: '922345666V', center: 'Galle CSU' }
  ];

  const centers = Array.from(new Set(customers.map((c) => c.center)));

  const handleAdd = () => {
    setSelectedGroup(null);
    setModalMembers([]);
    setFormData({
      groupName: '',
      center: '',
      branch: 'N/A'
    });
    setCustomerSearch('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.groupName || !formData.center) return;
    if (!selectedGroup && modalMembers.length !== 3) return;
    if (selectedGroup && (modalMembers.length === 0 || modalMembers.length > 3)) return;

    if (selectedGroup) {
      setGroups(groups.map(g =>
        g.id === selectedGroup.id ? { ...g, groupName: formData.groupName, members: modalMembers } : g
      ));
    } else {
      const newGroup: Group = {
        id: String(groups.length + 1),
        groupCode: `GRP${String(groups.length + 1).padStart(3, '0')}`,
        groupName: formData.groupName,
        center: formData.center,
        branch: formData.branch,
        members: modalMembers,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setGroups([...groups, newGroup]);
    }
    setShowModal(false);
  };

  const handleViewMembers = (group: Group) => {
    setSelectedGroup(group);
    setShowMemberModal(true);
  };

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.groupCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.center.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalGroups = groups.length;
  const activeGroups = groups.filter(g => g.status === 'Active').length;
  const totalMembers = groups.reduce((sum, g) => sum + g.members.length, 0);
  const avgMembersPerGroup = Math.round(totalMembers / totalGroups);

  const toggleCustomerSelection = (customer: Customer) => {
    const exists = modalMembers.find((m) => m.customerId === customer.id);
    if (exists) {
      setModalMembers(modalMembers.filter((m) => m.customerId !== customer.id));
      return;
    }
    if (modalMembers.length >= 3) return;

    const newMember: GroupMember = {
      id: `${customer.id}-${Date.now()}`,
      name: customer.name,
      customerId: customer.id,
      nic: customer.nic,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setModalMembers([...modalMembers, newMember]);
  };

  const removeMember = (customerId: string) => {
    setModalMembers(modalMembers.filter((m) => m.customerId !== customerId));
  };

  const availableCustomersForAdd = customers.filter(
    (c) =>
      c.center === formData.center &&
      (c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.nic.toLowerCase().includes(customerSearch.toLowerCase()))
  );

  const availableCustomersForEdit = selectedGroup
    ? customers.filter(
        (c) =>
          c.center === selectedGroup.center &&
          !modalMembers.some((m) => m.customerId === c.id) &&
          (c.name.toLowerCase().includes(editCustomerSearch.toLowerCase()) ||
            c.nic.toLowerCase().includes(editCustomerSearch.toLowerCase()))
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage self-help groups and their members</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Group</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UsersRound className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Groups</p>
          <p className="text-2xl font-bold text-gray-900">{totalGroups}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((activeGroups / totalGroups) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Groups</p>
          <p className="text-2xl font-bold text-gray-900">{activeGroups}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Members</p>
          <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Members/Group</p>
          <p className="text-2xl font-bold text-gray-900">{avgMembersPerGroup}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search groups by name, code, or center..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-3">Group</div>
            <div className="col-span-2">Center</div>
            <div className="col-span-2">Branch</div>
            <div className="col-span-2">Members</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredGroups.map((group) => (
            <div key={group.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Group Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UsersRound className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{group.groupName}</p>
                    <p className="text-xs text-gray-500">{group.groupCode}</p>
                  </div>
                </div>

                {/* Center */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{group.center}</p>
                </div>

                {/* Branch */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{group.branch}</p>
                </div>

                {/* Members */}
                <div className="col-span-2">
                  <button
                    onClick={() => handleViewMembers(group)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {group.members.length} Members
                  </button>
                  <p className="text-xs text-gray-500">View details</p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    group.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {group.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <button
                    onClick={() => {
                      setSelectedGroup(group);
                      setFormData({
                        groupName: group.groupName,
                        center: group.center,
                        branch: group.branch
                      });
                      setModalMembers(group.members);
                      setEditCustomerSearch('');
                      setShowModal(true);
                    }}
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
              Showing <span className="font-medium">{filteredGroups.length}</span> of <span className="font-medium">{totalGroups}</span> groups
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

      {/* Add/Edit Group Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedGroup ? 'Edit Group' : 'Add New Group'}
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
              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Group Name *</label>
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Center *</label>
                {selectedGroup ? (
                  <div className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-700">
                    {formData.center}
                  </div>
                ) : (
                  <select
                    value={formData.center}
                    onChange={(e) => {
                      setFormData({ ...formData, center: e.target.value, branch: 'N/A' });
                      setModalMembers([]);
                      setCustomerSearch('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select Center</option>
                    {centers.map(center => (
                      <option key={center} value={center}>{center}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Customer selection for add */}
              {!selectedGroup && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-900 text-sm">Select Customers (max 3)</label>
                    <span className="text-xs text-gray-600">{modalMembers.length} / 3 selected</span>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      placeholder="Search by name or NIC"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      disabled={!formData.center}
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                    {!formData.center && (
                      <p className="text-sm text-gray-500 p-3">Select a center to view customers.</p>
                    )}
                    {formData.center && availableCustomersForAdd.length === 0 && (
                      <p className="text-sm text-gray-500 p-3">No customers found for this center.</p>
                    )}
                    {formData.center && availableCustomersForAdd.map((customer) => {
                      const checked = modalMembers.some((m) => m.customerId === customer.id);
                      const disabled = !checked && modalMembers.length >= 3;
                      return (
                        <label
                          key={customer.id}
                          className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCustomerSelection(customer)}
                            disabled={disabled}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-600">{customer.nic}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Members management for edit */}
              {selectedGroup && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-900 text-sm">Group Members (max 3)</label>
                    <span className="text-xs text-gray-600">{modalMembers.length} / 3</span>
                  </div>
                  <div className="space-y-2">
                    {modalMembers.map((member) => (
                      <div key={member.customerId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.nic}</p>
                        </div>
                        <button
                          onClick={() => removeMember(member.customerId)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {modalMembers.length === 0 && (
                      <p className="text-sm text-gray-500">No members selected.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={editCustomerSearch}
                        onChange={(e) => setEditCustomerSearch(e.target.value)}
                        placeholder="Search by name or NIC"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                      {availableCustomersForEdit.length === 0 && (
                        <p className="text-sm text-gray-500 p-3">No available customers to add.</p>
                      )}
                      {availableCustomersForEdit.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-600">{customer.nic}</p>
                          </div>
                          <button
                            onClick={() => modalMembers.length < 3 && toggleCustomerSelection(customer)}
                            disabled={modalMembers.length >= 3}
                            className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
                disabled={
                  !formData.groupName ||
                  !formData.center ||
                  modalMembers.length === 0 ||
                  modalMembers.length > 3 ||
                  (!selectedGroup && modalMembers.length !== 3)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {selectedGroup ? 'Update Group' : 'Add Group'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Modal */}
      {showMemberModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedGroup.groupName}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedGroup.members.length} Members</p>
                </div>
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {selectedGroup.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.customerId} • {member.nic}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        member.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {member.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Joined {member.joinedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                <UserPlus className="w-4 h-4 inline mr-2" />
                Add Member
              </button>
              <button
                onClick={() => setShowMemberModal(false)}
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
