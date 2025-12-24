'use client'

import React, { useState } from 'react';
import { Shield, Plus, Edit, Users, Trash2, X, Settings } from 'lucide-react';

interface Permission {
  module: string;
  permissions: { [key: string]: boolean };
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: Permission[];
}

interface Privilege {
  id: string;
  name: string;
  description: string;
}

export function RolesPrivileges() {
  const [privileges, setPrivileges] = useState<Privilege[]>([
    { id: '1', name: 'view', description: 'View access to the module' },
    { id: '2', name: 'create', description: 'Create new records' },
    { id: '3', name: 'edit', description: 'Edit existing records' },
    { id: '4', name: 'delete', description: 'Delete records' },
    { id: '5', name: 'export', description: 'Export data' },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: [
        { module: 'Dashboard', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Branches', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Centers', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Groups', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Customers', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Loans', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Collections', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Reports', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Finance', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { module: 'Staff Management', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
      ]
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Branch management and loan approval authority',
      userCount: 8,
      permissions: [
        { module: 'Dashboard', permissions: { view: true, create: false, edit: false, delete: false, export: true } },
        { module: 'Branches', permissions: { view: true, create: false, edit: true, delete: false, export: true } },
        { module: 'Centers', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { module: 'Groups', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { module: 'Customers', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { module: 'Loans', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { module: 'Collections', permissions: { view: true, create: false, edit: false, delete: false, export: true } },
        { module: 'Reports', permissions: { view: true, create: false, edit: false, delete: false, export: true } },
        { module: 'Finance', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Staff Management', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
      ]
    },
    {
      id: '3',
      name: 'Staff',
      description: 'Field operations and customer management',
      userCount: 45,
      permissions: [
        { module: 'Dashboard', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Branches', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Centers', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Groups', permissions: { view: true, create: true, edit: true, delete: false, export: false } },
        { module: 'Customers', permissions: { view: true, create: true, edit: true, delete: false, export: false } },
        { module: 'Loans', permissions: { view: true, create: true, edit: false, delete: false, export: false } },
        { module: 'Collections', permissions: { view: true, create: true, edit: false, delete: false, export: false } },
        { module: 'Reports', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Finance', permissions: { view: false, create: false, edit: false, delete: false, export: false } },
        { module: 'Staff Management', permissions: { view: false, create: false, edit: false, delete: false, export: false } },
      ]
    },
    {
      id: '4',
      name: 'Cashier',
      description: 'Collection and payment processing',
      userCount: 15,
      permissions: [
        { module: 'Dashboard', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Branches', permissions: { view: false, create: false, edit: false, delete: false, export: false } },
        { module: 'Centers', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Groups', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Customers', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Loans', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { module: 'Collections', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { module: 'Reports', permissions: { view: true, create: false, edit: false, delete: false, export: true } },
        { module: 'Finance', permissions: { view: false, create: false, edit: false, delete: false, export: false } },
        { module: 'Staff Management', permissions: { view: false, create: false, edit: false, delete: false, export: false } },
      ]
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);
  const [editingPrivilege, setEditingPrivilege] = useState<Privilege | null>(null);
  const [privilegeForm, setPrivilegeForm] = useState({
    name: '',
    description: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as Permission[]
  });

  const defaultModules = [
    'Dashboard', 'Branches', 'Centers', 'Groups', 'Customers', 'Loans', 'Collections', 'Reports', 'Finance', 'Staff Management'
  ];

  const getDefaultPermissions = (): Permission[] => {
    return defaultModules.map(module => ({
      module,
      permissions: privileges.reduce((acc, priv) => {
        acc[priv.name] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    }));
  };

  const handleCreatePrivilege = () => {
    setEditingPrivilege(null);
    setPrivilegeForm({ name: '', description: '' });
    setShowPrivilegeModal(true);
  };

  const handleEditPrivilege = (privilege: Privilege) => {
    setEditingPrivilege(privilege);
    setPrivilegeForm({ name: privilege.name, description: privilege.description });
    setShowPrivilegeModal(true);
  };

  const handleDeletePrivilege = (privilegeId: string) => {
    if (confirm('Are you sure you want to delete this privilege? This will affect all roles.')) {
      setPrivileges(privileges.filter(priv => priv.id !== privilegeId));
      // Update all roles to remove this privilege from their permissions
      setRoles(roles.map(role => ({
        ...role,
        permissions: role.permissions.map(perm => {
          const newPerms = { ...perm.permissions };
          delete newPerms[privileges.find(p => p.id === privilegeId)?.name || ''];
          return { ...perm, permissions: newPerms };
        })
      })));
    }
  };

  const handleSavePrivilege = () => {
    if (!privilegeForm.name.trim()) {
      alert('Privilege name is required');
      return;
    }

    if (editingPrivilege) {
      // Update existing privilege
      const oldName = editingPrivilege.name;
      const newName = privilegeForm.name;
      setPrivileges(privileges.map(priv =>
        priv.id === editingPrivilege.id
          ? { ...priv, name: newName, description: privilegeForm.description }
          : priv
      ));
      // Update all roles to rename the privilege
      if (oldName !== newName) {
        setRoles(roles.map(role => ({
          ...role,
          permissions: role.permissions.map(perm => {
            const newPerms = { ...perm.permissions };
            newPerms[newName] = newPerms[oldName];
            delete newPerms[oldName];
            return { ...perm, permissions: newPerms };
          })
        })));
      }
    } else {
      // Create new privilege
      const newPrivilege: Privilege = {
        id: Date.now().toString(),
        name: privilegeForm.name,
        description: privilegeForm.description
      };
      setPrivileges([...privileges, newPrivilege]);
      // Add this privilege to all roles with default false
      setRoles(roles.map(role => ({
        ...role,
        permissions: role.permissions.map(perm => ({
          ...perm,
          permissions: { ...perm.permissions, [newPrivilege.name]: false }
        }))
      })));
    }

    setShowPrivilegeModal(false);
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: getDefaultPermissions()
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

  const updatePermission = (moduleIndex: number, privilegeName: string, value: boolean) => {
    const updatedPermissions = [...formData.permissions];
    updatedPermissions[moduleIndex] = {
      ...updatedPermissions[moduleIndex],
      permissions: { ...updatedPermissions[moduleIndex].permissions, [privilegeName]: value }
    };
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
        <div className="flex gap-3">
          <button 
            onClick={handleCreatePrivilege}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Create Privilege
          </button>
          <button 
            onClick={handleCreateRole}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Privileges List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">System Privileges</h3>
            <div className="space-y-2">
              {privileges.map((privilege) => (
                <div
                  key={privilege.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{privilege.name}</p>
                    <p className="text-xs text-gray-500 truncate">{privilege.description}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button 
                      onClick={() => handleEditPrivilege(privilege)}
                      className="text-gray-400 hover:text-blue-600 p-1"
                      title="Edit privilege"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeletePrivilege(privilege.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      title="Delete privilege"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => handleEditRole(selectedRole)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="sticky left-0 z-10 bg-gray-50 text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider border-r border-gray-200 min-w-[200px]">
                          Module
                        </th>
                        {privileges.map(privilege => (
                          <th key={privilege.id} className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider min-w-[100px]">
                            {privilege.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedRole.permissions.map((permission, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm text-gray-900 font-medium border-r border-gray-200 min-w-[200px]">
                            {permission.module}
                          </td>
                          {privileges.map(privilege => (
                            <td key={privilege.id} className="px-6 py-4 text-center min-w-[100px]">
                              <input
                                type="checkbox"
                                checked={permission.permissions[privilege.name] || false}
                                readOnly
                                className="w-4 h-4 text-blue-600 rounded-full focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                  <div className="relative">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-max">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="sticky left-0 z-10 bg-gray-50 text-left px-4 py-3 text-xs text-gray-600 uppercase tracking-wider border-r border-gray-200 min-w-[180px]">
                              Module
                            </th>
                            {privileges.map(privilege => (
                              <th key={privilege.id} className="text-center px-2 py-3 text-xs text-gray-600 uppercase tracking-wider min-w-[80px]">
                                {privilege.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {formData.permissions.map((permission, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="sticky left-0 z-10 bg-white px-4 py-3 text-sm text-gray-900 font-medium border-r border-gray-200 min-w-[180px]">
                                {permission.module}
                              </td>
                              {privileges.map(privilege => (
                                <td key={privilege.id} className="px-2 py-3 text-center min-w-[80px]">
                                  <input
                                    type="checkbox"
                                    checked={permission.permissions[privilege.name] || false}
                                    onChange={(e) => updatePermission(index, privilege.name, e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded-full focus:ring-blue-500"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

      {/* Create/Edit Privilege Modal */}
      {showPrivilegeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingPrivilege ? 'Edit Privilege' : 'Create New Privilege'}
              </h2>
              <button
                onClick={() => setShowPrivilegeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Privilege Name</label>
                <input
                  type="text"
                  value={privilegeForm.name}
                  onChange={(e) => setPrivilegeForm({ ...privilegeForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter privilege name (e.g., approve, reject)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={privilegeForm.description}
                  onChange={(e) => setPrivilegeForm({ ...privilegeForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Describe what this privilege allows"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowPrivilegeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrivilege}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingPrivilege ? 'Update Privilege' : 'Create Privilege'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
