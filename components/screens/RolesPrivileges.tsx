'use client'

import React, { useState } from 'react';
import { Shield, Plus, Edit, Users, Trash2, X } from 'lucide-react';

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: Permission[];
}

export function RolesPrivileges() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: [
        { module: 'Dashboard', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Branches', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Centers', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Groups', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Customers', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Loans', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Collections', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Reports', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Finance', view: true, create: true, edit: true, delete: true, export: true },
        { module: 'Staff Management', view: true, create: true, edit: true, delete: true, export: true },
      ]
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Branch management and loan approval authority',
      userCount: 8,
      permissions: [
        { module: 'Dashboard', view: true, create: false, edit: false, delete: false, export: true },
        { module: 'Branches', view: true, create: false, edit: true, delete: false, export: true },
        { module: 'Centers', view: true, create: true, edit: true, delete: false, export: true },
        { module: 'Groups', view: true, create: true, edit: true, delete: false, export: true },
        { module: 'Customers', view: true, create: true, edit: true, delete: false, export: true },
        { module: 'Loans', view: true, create: true, edit: true, delete: false, export: true },
        { module: 'Collections', view: true, create: false, edit: false, delete: false, export: true },
        { module: 'Reports', view: true, create: false, edit: false, delete: false, export: true },
        { module: 'Finance', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Staff Management', view: true, create: false, edit: false, delete: false, export: false },
      ]
    },
    {
      id: '3',
      name: 'Staff',
      description: 'Field operations and customer management',
      userCount: 45,
      permissions: [
        { module: 'Dashboard', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Branches', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Centers', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Groups', view: true, create: true, edit: true, delete: false, export: false },
        { module: 'Customers', view: true, create: true, edit: true, delete: false, export: false },
        { module: 'Loans', view: true, create: true, edit: false, delete: false, export: false },
        { module: 'Collections', view: true, create: true, edit: false, delete: false, export: false },
        { module: 'Reports', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Finance', view: false, create: false, edit: false, delete: false, export: false },
        { module: 'Staff Management', view: false, create: false, edit: false, delete: false, export: false },
      ]
    },
    {
      id: '4',
      name: 'Cashier',
      description: 'Collection and payment processing',
      userCount: 15,
      permissions: [
        { module: 'Dashboard', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Branches', view: false, create: false, edit: false, delete: false, export: false },
        { module: 'Centers', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Groups', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Customers', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Loans', view: true, create: false, edit: false, delete: false, export: false },
        { module: 'Collections', view: true, create: true, edit: true, delete: false, export: true },
        { module: 'Reports', view: true, create: false, edit: false, delete: false, export: true },
        { module: 'Finance', view: false, create: false, edit: false, delete: false, export: false },
        { module: 'Staff Management', view: false, create: false, edit: false, delete: false, export: false },
      ]
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[]
  });

  const defaultPermissions: Permission[] = [
    { module: 'Dashboard', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Branches', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Centers', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Groups', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Customers', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Loans', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Collections', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Reports', view: true, create: false, edit: false, delete: false, export: false },
    { module: 'Finance', view: false, create: false, edit: false, delete: false, export: false },
    { module: 'Staff Management', view: false, create: false, edit: false, delete: false, export: false },
  ];

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: defaultPermissions
    });
    setShowModal(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowModal(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      setRoles(roles.filter(role => role.id !== roleId));
      if (selectedRole?.id === roleId) {
        setSelectedRole(null);
      }
    }
  };

  const handleSaveRole = () => {
    if (!formData.name.trim()) {
      alert('Role name is required');
      return;
    }

    if (editingRole) {
      // Update existing role
      setRoles(roles.map(role =>
        role.id === editingRole.id
          ? { ...role, name: formData.name, description: formData.description, permissions: formData.permissions }
          : role
      ));
      setSelectedRole({ ...editingRole, name: formData.name, description: formData.description, permissions: formData.permissions });
    } else {
      // Create new role
      const newRole: Role = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        userCount: 0,
        permissions: formData.permissions
      };
      setRoles([...roles, newRole]);
    }

    setShowModal(false);
  };

  const updatePermission = (moduleIndex: number, permissionType: keyof Permission, value: boolean) => {
    const updatedPermissions = [...formData.permissions];
    updatedPermissions[moduleIndex] = { ...updatedPermissions[moduleIndex], [permissionType]: value };
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Roles & Privileges</h1>
          <p className="text-gray-600 mt-1">Manage user roles and access permissions</p>
        </div>
        <button 
          onClick={handleCreateRole}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">System Roles</h3>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedRole?.id === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900">{role.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                        className="text-gray-400 hover:text-blue-600 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{role.userCount} users</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900">{selectedRole.name} Permissions</h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedRole.description}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Module</th>
                      <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">View</th>
                      <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Create</th>
                      <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Edit</th>
                      <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Delete</th>
                      <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Export</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedRole.permissions.map((permission, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{permission.module}</td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={permission.view}
                            readOnly
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={permission.create}
                            readOnly
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={permission.edit}
                            readOnly
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={permission.delete}
                            readOnly
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={permission.export}
                            readOnly
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">Select a Role</h3>
              <p className="text-gray-600">Choose a role from the left to view and manage its permissions</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col my-8">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              {/* Basic Info */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter role name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter role description"
                    />
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Permissions</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs text-gray-600 uppercase tracking-wider">Module</th>
                          <th className="text-center px-2 py-3 text-xs text-gray-600 uppercase tracking-wider">View</th>
                          <th className="text-center px-2 py-3 text-xs text-gray-600 uppercase tracking-wider">Create</th>
                          <th className="text-center px-2 py-3 text-xs text-gray-600 uppercase tracking-wider">Edit</th>
                          <th className="text-center px-2 py-3 text-xs text-gray-600 uppercase tracking-wider">Delete</th>
                          <th className="text-center px-2 py-3 text-xs text-gray-600 uppercase tracking-wider">Export</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {formData.permissions.map((permission, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{permission.module}</td>
                            <td className="px-2 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={permission.view}
                                onChange={(e) => updatePermission(index, 'view', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-2 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={permission.create}
                                onChange={(e) => updatePermission(index, 'create', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-2 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={permission.edit}
                                onChange={(e) => updatePermission(index, 'edit', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-2 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={permission.delete}
                                onChange={(e) => updatePermission(index, 'delete', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-2 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={permission.export}
                                onChange={(e) => updatePermission(index, 'export', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
