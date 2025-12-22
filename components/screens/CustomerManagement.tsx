'use client'

import React, { useRef, useState } from 'react';
import { Plus, Search, User, FileText, Upload, AlertCircle, Edit, Shield, CheckCircle, X, Filter, Download, UserCheck, Users, TrendingUp, Activity, Mail, Phone, MapPin, Calendar, Eye, MoreVertical, Building2, CreditCard, Briefcase } from 'lucide-react';
import { CustomerRegistrationForm } from '@/components/CustomerRegistrationForm';

interface Customer {
  id: string;
  customerId: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  nic: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  group: string;
  center: string;
  branch: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
  hasActiveLoans: boolean;
  loanCount: number;
}

interface EditRequest {
  id: string;
  customerId: string;
  customerName: string;
  requestedBy: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      customerId: 'CUST001',
      name: 'Nimal Perera',
      gender: 'Male',
      nic: '198512345V',
      dob: '1985-05-15',
      phone: '+94 77 123 4567',
      email: 'nimal@example.com',
      address: '123 Galle Road, Colombo 03',
      group: 'Colombo Group A',
      center: 'Colombo Central CSU',
      branch: 'Colombo Branch',
      status: 'Active',
      joinedDate: '2024-01-15',
      hasActiveLoans: true,
      loanCount: 2
    },
    {
      id: '2',
      customerId: 'CUST002',
      name: 'Saman Kumara',
      gender: 'Male',
      nic: '199023456V',
      dob: '1990-08-20',
      phone: '+94 71 234 5678',
      email: 'saman@example.com',
      address: '456 Kandy Road, Kandy',
      group: 'Kandy Group B',
      center: 'Kandy CSU',
      branch: 'Kandy Branch',
      status: 'Active',
      joinedDate: '2024-03-10',
      hasActiveLoans: false,
      loanCount: 0
    },
    {
      id: '3',
      customerId: 'CUST003',
      name: 'Dilini Silva',
      gender: 'Female',
      nic: '199234567V',
      dob: '1992-03-12',
      phone: '+94 76 345 6789',
      email: 'dilini@example.com',
      address: '789 Main Street, Galle',
      group: 'Galle Group C',
      center: 'Galle CSU',
      branch: 'Galle Branch',
      status: 'Active',
      joinedDate: '2024-02-20',
      hasActiveLoans: true,
      loanCount: 1
    },
    {
      id: '4',
      customerId: 'CUST004',
      name: 'Kamala Fernando',
      gender: 'Female',
      nic: '198834567V',
      dob: '1988-11-30',
      phone: '+94 75 456 7890',
      email: 'kamala@example.com',
      address: '321 Temple Road, Negombo',
      group: 'Negombo Group D',
      center: 'Negombo CSU',
      branch: 'Negombo Branch',
      status: 'Active',
      joinedDate: '2024-01-25',
      hasActiveLoans: false,
      loanCount: 0
    },
    {
      id: '5',
      customerId: 'CUST005',
      name: 'Rajitha Bandara',
      gender: 'Male',
      nic: '199445678V',
      dob: '1994-07-18',
      phone: '+94 72 567 8901',
      email: 'rajitha@example.com',
      address: '654 Station Road, Matara',
      group: 'Matara Group E',
      center: 'Matara CSU',
      branch: 'Matara Branch',
      status: 'Active',
      joinedDate: '2024-04-05',
      hasActiveLoans: true,
      loanCount: 1
    }
  ]);

  const [editRequests, setEditRequests] = useState<EditRequest[]>([
    {
      id: '1',
      customerId: 'CUST001',
      customerName: 'Nimal Perera',
      requestedBy: 'Staff User',
      requestDate: '2025-12-20',
      status: 'Pending',
      reason: 'Update phone number and address'
    },
    {
      id: '2',
      customerId: 'CUST003',
      customerName: 'Dilini Silva',
      requestedBy: 'Branch Manager',
      requestDate: '2025-12-19',
      status: 'Pending',
      reason: 'Correct email address typo'
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'bank' | 'loans' | 'documents'>('profile');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editReason, setEditReason] = useState('');
  const [showRequestsPanel, setShowRequestsPanel] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [editForm, setEditForm] = useState<Customer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'business' as const, label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'bank' as const, label: 'Banking', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'loans' as const, label: 'Loans', icon: <FileText className="w-4 h-4" /> },
    { id: 'documents' as const, label: 'Documents', icon: <Upload className="w-4 h-4" /> }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.nic.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEditClick = () => {
    if (!selectedCustomer) return;

    if (selectedCustomer.hasActiveLoans) {
      setShowEditRequestModal(true);
    } else {
      setEditForm({ ...selectedCustomer });
      setShowEditModal(true);
    }
  };

  const handleSubmitEditRequest = () => {
    if (!selectedCustomer || !editReason.trim()) return;

    const newRequest: EditRequest = {
      id: String(editRequests.length + 1),
      customerId: selectedCustomer.customerId,
      customerName: selectedCustomer.name,
      requestedBy: 'Current User',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      reason: editReason
    };

    setEditRequests([...editRequests, newRequest]);
    setShowEditRequestModal(false);
    setEditReason('');
    alert('Edit request submitted successfully! Admin will review your request.');
  };

  const handleEditFieldChange = (field: keyof Customer, value: string | number | boolean) => {
    setEditForm(prev => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSaveEdit = () => {
    if (!editForm) return;

    const nextCustomer: Customer = {
      ...editForm,
      loanCount: Number(editForm.loanCount) || 0,
      hasActiveLoans: editForm.hasActiveLoans || Number(editForm.loanCount) > 0
    };

    setCustomers(prev => prev.map(c => (c.id === nextCustomer.id ? nextCustomer : c)));
    setSelectedCustomer(prev => (prev && prev.id === nextCustomer.id ? nextCustomer : prev));
    setShowEditModal(false);
    alert('Customer profile updated successfully!');
  };

  const downloadCsv = () => {
    if (!customers.length) {
      alert('No customers to export.');
      return;
    }

    const headers = [
      'id',
      'customerId',
      'name',
      'gender',
      'nic',
      'dob',
      'phone',
      'email',
      'address',
      'group',
      'center',
      'branch',
      'status',
      'joinedDate',
      'hasActiveLoans',
      'loanCount'
    ];

    const escapeCsv = (val: string | number | boolean) =>
      `"${String(val ?? '')
        .replace(/"/g, '""')
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')}"`;

    const rows = customers.map(c =>
      [
        c.id,
        c.customerId,
        c.name,
        c.gender,
        c.nic,
        c.dob,
        c.phone,
        c.email,
        c.address,
        c.group,
        c.center,
        c.branch,
        c.status,
        c.joinedDate,
        c.hasActiveLoans,
        c.loanCount
      ]
        .map(escapeCsv)
        .join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customers.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? '');
        const lines = text.trim().split(/\r?\n/);

        if (lines.length < 2) {
          throw new Error('CSV has no data rows.');
        }

        const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
        const required = [
          'customerId',
          'name',
          'gender',
          'nic',
          'dob',
          'phone',
          'email',
          'address',
          'group',
          'center',
          'branch',
          'status',
          'joinedDate',
          'hasActiveLoans',
          'loanCount'
        ];

        const missing = required.filter(h => !headers.includes(h));
        if (missing.length) {
          throw new Error(`Missing columns: ${missing.join(', ')}`);
        }

        const headerIndex = (key: string) => headers.indexOf(key);
        const parsed: Customer[] = lines
          .slice(1)
          .filter(Boolean)
          .map(line => {
            const values =
              line.match(/(".*?"|[^,]+)(?=,|$)/g)?.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"')) ?? [];
            const getVal = (key: string) => values[headerIndex(key)] ?? '';
            const loanCount = Number(getVal('loanCount')) || 0;

            return {
              id: getVal('id') || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
              customerId: getVal('customerId'),
              name: getVal('name'),
              gender: (getVal('gender') as Customer['gender']) || 'Male',
              nic: getVal('nic'),
              dob: getVal('dob'),
              phone: getVal('phone'),
              email: getVal('email'),
              address: getVal('address'),
              group: getVal('group'),
              center: getVal('center'),
              branch: getVal('branch'),
              status: (getVal('status') as Customer['status']) || 'Active',
              joinedDate: getVal('joinedDate') || new Date().toISOString().split('T')[0],
              hasActiveLoans: getVal('hasActiveLoans').toLowerCase() === 'true' || loanCount > 0,
              loanCount
            };
          });

        setCustomers(prev => [...prev, ...parsed]);
        setShowDetailsModal(false);
        alert(`Imported ${parsed.length} customers successfully.`);
      } catch (err) {
        console.error(err);
        alert(`Import failed: ${(err as Error).message}`);
      } finally {
        e.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  const handleApproveRequest = (requestId: string) => {
    setEditRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'Approved' as const } : req
    ));
  };

  const handleRejectRequest = (requestId: string) => {
    setEditRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'Rejected' as const } : req
    ));
  };

  const pendingRequests = editRequests.filter(r => r.status === 'Pending');
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const customersWithLoans = customers.filter(c => c.hasActiveLoans).length;
  const newThisMonth = 3;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all customer information</p>
        </div>
        <div className="flex items-center gap-3">
          {pendingRequests.length > 0 && (
            <button
              onClick={() => setShowRequestsPanel(!showRequestsPanel)}
              className="relative flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Edit Requests</span>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                {pendingRequests.length}
              </span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={downloadCsv}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Import CSV</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={handleImport}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Customer</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +{newThisMonth} this month
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((activeCustomers / totalCustomers) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Customers</p>
          <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((customersWithLoans / totalCustomers) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">With Active Loans</p>
          <p className="text-2xl font-bold text-gray-900">{customersWithLoans}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-yellow-600" />
            </div>
            {pendingRequests.length > 0 && (
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                Action needed
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
          <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
        </div>
      </div>

      {/* Edit Requests Panel */}
      {showRequestsPanel && (
        <div className="bg-white rounded-lg border border-orange-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Pending Edit Requests</h3>
                <p className="text-sm text-gray-600">Review and approve customer profile changes</p>
              </div>
            </div>
            <button
              onClick={() => setShowRequestsPanel(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="space-y-3">
            {pendingRequests.map(request => (
              <div key={request.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">{request.customerName.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{request.customerName}</p>
                        <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-600">
                          {request.customerId}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </p>
                      <p className="text-xs text-gray-500">
                        Requested by {request.requestedBy} • {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveRequest(request.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customers by name, ID, or NIC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 bg-white">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Inactive')}
                className="border-none bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer py-2"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
                <div className="col-span-4">Customer</div>
                <div className="col-span-3">Contact</div>
                <div className="col-span-2">Group</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Customer Info */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">{customer.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                          {customer.hasActiveLoans && (
                            <Shield className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{customer.customerId}</p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="col-span-3">
                      <p className="text-sm text-gray-900">{customer.phone}</p>
                      <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                    </div>

                    {/* Group */}
                    <div className="col-span-2">
                      <p className="text-sm text-gray-900 truncate">{customer.group}</p>
                      <p className="text-xs text-gray-500 truncate">{customer.center}</p>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {customer.status}
                      </span>
                      {customer.hasActiveLoans && (
                        <p className="text-xs text-orange-600 mt-1">{customer.loanCount} loan(s)</p>
                      )}
                    </div>

                    {/* Action */}
                    <div className="col-span-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(customer);
                          handleEditClick();
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {customer.hasActiveLoans ? 'Request' : 'Edit'}
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
                  Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{totalCustomers}</span> customers
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
        </div>

        {/* Customer Detail Panel */}
        <div className="lg:col-span-1">
          {selectedCustomer ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-6">
              {/* Header */}
              <div className="bg-blue-600 p-5 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold">{selectedCustomer.name.charAt(0)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-1">{selectedCustomer.name}</h3>
                <p className="text-blue-100 text-sm mb-3">{selectedCustomer.customerId}</p>
                {selectedCustomer.hasActiveLoans && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500 rounded-lg text-sm font-medium">
                    <Shield className="w-3.5 h-3.5" />
                    {selectedCustomer.loanCount} Active Loan{selectedCustomer.loanCount !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="p-5 space-y-4 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Center</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCustomer.center}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Branch</p>
                    <p className="text-sm font-medium text-gray-900">{selectedCustomer.branch}</p>
                  </div>
                </div>
              </div>

              {/* Edit Warning */}
              {selectedCustomer.hasActiveLoans && (
                <div className="mx-5 my-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orange-900 mb-0.5">Edit Protection Active</p>
                      <p className="text-xs text-orange-700">
                        Admin approval required for profile edits
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-5 space-y-2">
                <button
                  onClick={handleEditClick}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    selectedCustomer.hasActiveLoans
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {selectedCustomer.hasActiveLoans ? (
                    <>
                      <Shield className="w-4 h-4" />
                      Request Edit Approval
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowDetailsModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Full Details
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">No Customer Selected</h3>
              <p className="text-sm text-gray-500">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Request Modal */}
      {showEditRequestModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Request Edit Approval</h2>
                  <p className="text-sm text-gray-600">Customer has {selectedCustomer.loanCount} active loan(s)</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Customer</p>
                <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                <p className="text-sm text-gray-600">{selectedCustomer.customerId}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-900 mb-2 text-sm">Reason for Edit Request *</label>
                <textarea
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  rows={4}
                  placeholder="Explain why you need to edit this customer's profile..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Your request will be reviewed by admin. You can edit once approved.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => {
                  setShowEditRequestModal(false);
                  setEditReason('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEditRequest}
                disabled={!editReason.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Edit Modal */}
      {showEditModal && selectedCustomer && editForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Edit Customer Profile</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedCustomer.name} ({selectedCustomer.customerId})</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Customer ID</label>
                  <input
                    type="text"
                    value={editForm.customerId}
                    onChange={(e) => handleEditFieldChange('customerId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleEditFieldChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => handleEditFieldChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">NIC</label>
                  <input
                    type="text"
                    value={editForm.nic}
                    onChange={(e) => handleEditFieldChange('nic', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Date of Birth</label>
                  <input
                    type="date"
                    value={editForm.dob}
                    onChange={(e) => handleEditFieldChange('dob', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleEditFieldChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleEditFieldChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Address</label>
                  <textarea
                    rows={3}
                    value={editForm.address}
                    onChange={(e) => handleEditFieldChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Group</label>
                  <input
                    type="text"
                    value={editForm.group}
                    onChange={(e) => handleEditFieldChange('group', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Center</label>
                  <input
                    type="text"
                    value={editForm.center}
                    onChange={(e) => handleEditFieldChange('center', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Branch</label>
                  <input
                    type="text"
                    value={editForm.branch}
                    onChange={(e) => handleEditFieldChange('branch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => handleEditFieldChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Joined Date</label>
                  <input
                    type="date"
                    value={editForm.joinedDate}
                    onChange={(e) => handleEditFieldChange('joinedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-900 mb-2 text-sm">Loan Count</label>
                  <input
                    type="number"
                    min={0}
                    value={editForm.loanCount}
                    onChange={(e) => handleEditFieldChange('loanCount', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="hasActiveLoans"
                    type="checkbox"
                    checked={editForm.hasActiveLoans}
                    onChange={(e) => handleEditFieldChange('hasActiveLoans', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="hasActiveLoans" className="text-sm text-gray-700">Has Active Loans</label>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-200 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedCustomer.name} ({selectedCustomer.customerId})</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-1">Profile</p>
                  <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-600">{selectedCustomer.gender}</p>
                  <p className="text-sm text-gray-600">{selectedCustomer.nic}</p>
                  <p className="text-sm text-gray-600">DOB: {selectedCustomer.dob}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-1">Contact</p>
                  <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                  <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                  <p className="text-sm text-gray-600 mt-2">{selectedCustomer.address}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-1">Organization</p>
                  <p className="text-sm text-gray-900">Group: {selectedCustomer.group}</p>
                  <p className="text-sm text-gray-900">Center: {selectedCustomer.center}</p>
                  <p className="text-sm text-gray-900">Branch: {selectedCustomer.branch}</p>
                  <p className="text-sm text-gray-900">Joined: {selectedCustomer.joinedDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-1">Status & Loans</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedCustomer.status}</p>
                  <p className="text-sm text-gray-900">Loans: {selectedCustomer.loanCount}</p>
                  <p className="text-sm text-gray-900">
                    Active loans: {selectedCustomer.hasActiveLoans ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditClick();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <CustomerRegistrationForm
          onClose={() => setShowAddModal(false)}
          onSubmit={() => {
            alert('Customer registered successfully!');
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
