'use client'

import React, { useState } from 'react';
import { Plus, Shield, Edit, Trash2, X, Users, UserCheck } from 'lucide-react';
import type { User as BaseUser } from '@/types/user';

type StaffStatus = 'Active' | 'Inactive';

interface StaffUser extends BaseUser {
  branch: string;
  status: StaffStatus;
}

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<StaffUser | null>(null);

  const [users, setUsers] = useState<StaffUser[]>([
    { id: '1', name: 'Admin User', email: 'admin@lms.lk', role: 'Super Admin', branch: 'Head Office', status: 'Active' },
    { id: '2', name: 'Nimal Manager', email: 'nimal.manager@lms.lk', role: 'Manager', branch: 'Kandy Branch', status: 'Active' },
    { id: '3', name: 'Saman Staff', email: 'saman.staff@lms.lk', role: 'Staff', branch: 'Galle Branch', status: 'Active' },
    { id: '4', name: 'Dilini Cashier', email: 'dilini.cashier@lms.lk', role: 'Cashier', branch: 'Head Office', status: 'Active' }
  ]);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: StaffUser['role'] | '';
    branch: string;
    password: string;
    status: StaffStatus;
  }>({
    name: '',
    email: '',
    role: '',
    branch: '',
    password: '',
    status: 'Active',
  });

  const roles: StaffUser['role'][] = ['Super Admin', 'Admin', 'Manager', 'Staff', 'Cashier'];
  const branches = ['Head Office', 'Kandy Branch', 'Galle Branch', 'Negombo Branch'];
  
  const permissions = [
    { module: 'Dashboard', view: true, create: true, edit: true, delete: false },
    { module: 'Customers', view: true, create: true, edit: true, delete: false },
    { module: 'Loans', view: true, create: true, edit: true, delete: false },
    { module: 'Collections', view: true, create: true, edit: false, delete: false },
    { module: 'Reports', view: true, create: false, edit: false, delete: false },
    { module: 'Finance', view: true, create: true, edit: true, delete: true },
    { module: 'Shareholders', view: true, create: true, edit: true, delete: true },
    { module: 'System Config', view: true, create: true, edit: true, delete: true }
  ];

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const totalRoles = roles.length;

  const openAddUserModal = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      branch: '',
      password: '',
      status: 'Active',
    });
    setShowUserModal(true);
  };

  const openEditUserModal = (user: StaffUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      branch: user.branch,
      password: '',
      status: user.status,
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.role || !formData.branch) {
      // Basic front-end validation
      alert('Please fill in all required fields.');
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(prev =>
        prev.map(u =>
          u.id === editingUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                role: formData.role as StaffUser['role'],
                branch: formData.branch,
                status: formData.status,
              }
            : u
        )
      );
    } else {
      // Create new user
      const newUser: StaffUser = {
        id: String(users.length + 1),
        name: formData.name,
        email: formData.email,
        role: formData.role as StaffUser['role'],
        branch: formData.branch,
        status: formData.status,
      };
      setUsers(prev => [...prev, newUser]);
    }

    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage users, roles, and permissions</p>
        </div>
        {activeTab === 'users' && (
          <button 
            onClick={openAddUserModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add User</span>
          </button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((activeUsers / totalUsers) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Users</p>
          <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">User Roles</p>
          <p className="text-2xl font-bold text-gray-900">{totalRoles}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 border-b-2 transition-colors text-sm font-medium ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Staff Users
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-3 border-b-2 transition-colors text-sm font-medium ${
                activeTab === 'roles'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Roles & Privileges
            </button>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
                <div className="col-span-3">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Branch</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {users.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">{user.name.charAt(0)}</span>
                      </div>
                      <p className="font-medium text-gray-900 truncate">{user.name}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-gray-700">{user.email}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {user.role}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-700">{user.branch}</p>
                    </div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center gap-2">
                      <button
                        onClick={() => openEditUserModal(user)}
                        className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
                  Showing <span className="font-medium">{users.length}</span> of <span className="font-medium">{totalUsers}</span> users
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
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Roles</h3>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-600 uppercase">
                  <div className="col-span-1">Module</div>
                  <div className="col-span-1 text-center">View</div>
                  <div className="col-span-1 text-center">Create</div>
                  <div className="col-span-1 text-center">Edit</div>
                  <div className="col-span-1 text-center">Delete</div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {permissions.map((perm, index) => (
                  <div key={index} className="px-4 py-3 hover:bg-gray-50">
                    <div className="grid grid-cols-5 gap-4 items-center">
                      <div className="col-span-1">
                        <p className="text-sm font-medium text-gray-900">{perm.module}</p>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <input
                          type="checkbox"
                          checked={perm.view}
                          readOnly
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <input
                          type="checkbox"
                          checked={perm.create}
                          readOnly
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <input
                          type="checkbox"
                          checked={perm.edit}
                          readOnly
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <input
                          type="checkbox"
                          checked={perm.delete}
                          readOnly
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Save Permissions
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="user@lms.lk"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as StaffUser['role'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
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

              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as StaffStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                {editingUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
