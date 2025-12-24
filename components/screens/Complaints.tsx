'use client'

import React, { useState } from 'react';
import { Plus, Search, MessageSquare, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';

interface Complaint {
  id: string;
  ticketNo: string;
  date: string;
  complainant: string;
  complainantType: 'Customer' | 'Staff' | 'Branch';
  branch: string;
  category: string;
  subject: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo?: string;
  resolution?: string;
}

export function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      ticketNo: 'COMP-2025-001',
      date: '2025-12-20',
      complainant: 'Nimal Perera',
      complainantType: 'Customer',
      branch: 'Colombo Central',
      category: 'Loan Processing',
      subject: 'Delay in loan approval',
      description: 'My loan application has been pending for over 2 weeks without any update.',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Kasun Silva'
    },
    {
      id: '2',
      ticketNo: 'COMP-2025-002',
      date: '2025-12-19',
      complainant: 'Kandy Branch',
      complainantType: 'Branch',
      branch: 'Kandy Branch',
      category: 'System Issue',
      subject: 'System downtime during peak hours',
      description: 'The system was down for 2 hours affecting customer service.',
      priority: 'High',
      status: 'Resolved',
      assignedTo: 'IT Support',
      resolution: 'Server issue fixed. Added monitoring to prevent future occurrences.'
    },
    {
      id: '3',
      ticketNo: 'COMP-2025-003',
      date: '2025-12-18',
      complainant: 'Priya Fernando',
      complainantType: 'Staff',
      branch: 'Galle Branch',
      category: 'HR Issue',
      subject: 'Leave approval delay',
      description: 'Applied for leave 10 days ago but no response yet.',
      priority: 'Medium',
      status: 'Open',
      assignedTo: 'HR Department'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [viewingComplaint, setViewingComplaint] = useState<Complaint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    complainantType: 'Customer' as 'Customer' | 'Staff' | 'Branch',
    complainant: '',
    branch: 'Colombo Central',
    category: 'Loan Processing',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    assignedTo: 'Kasun Silva',
    subject: '',
    description: ''
  });

  const handleCreateComplaint = () => {
    if (!formData.complainant.trim() || !formData.subject.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newComplaint: Complaint = {
      id: Date.now().toString(),
      ticketNo: `COMP-${new Date().getFullYear()}-${String(complaints.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      complainant: formData.complainant,
      complainantType: formData.complainantType,
      branch: formData.branch,
      category: formData.category,
      subject: formData.subject,
      description: formData.description,
      priority: formData.priority,
      status: 'Open',
      assignedTo: formData.assignedTo
    };

    setComplaints([newComplaint, ...complaints]);
    setShowModal(false);
    setFormData({
      complainantType: 'Customer',
      complainant: '',
      branch: 'Colombo Central',
      category: 'Loan Processing',
      priority: 'Medium',
      assignedTo: 'Kasun Silva',
      subject: '',
      description: ''
    });
  };

  const openNewComplaintModal = () => {
    setFormData({
      complainantType: 'Customer',
      complainant: '',
      branch: 'Colombo Central',
      category: 'Loan Processing',
      priority: 'Medium',
      assignedTo: 'Kasun Silva',
      subject: '',
      description: ''
    });
    setShowModal(true);
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.complainant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      case 'Closed': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const statusCounts = {
    open: complaints.filter(c => c.status === 'Open').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    closed: complaints.filter(c => c.status === 'Closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Complaints Management</h1>
          <p className="text-gray-600 mt-1">Track and resolve customer complaints</p>
        </div>
        <button
          onClick={openNewComplaintModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Complaint
        </button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Open</p>
          </div>
          <p className="text-2xl text-gray-900">{statusCounts.open}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <p className="text-2xl text-gray-900">{statusCounts.inProgress}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <p className="text-2xl text-gray-900">{statusCounts.resolved}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">Closed</p>
          </div>
          <p className="text-2xl text-gray-900">{statusCounts.closed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Ticket No</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Complainant</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Branch</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{complaint.ticketNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.date}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{complaint.complainant}</p>
                      <p className="text-xs text-gray-500">{complaint.complainantType}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.branch}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{complaint.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${getStatusColor(complaint.status)}`}>
                      {getStatusIcon(complaint.status)}
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setViewingComplaint(complaint)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Complaint Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">New Complaint</h2>
              <p className="text-sm text-gray-600 mt-1">Register a new complaint</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Complainant Type</label>
                  <select
                    value={formData.complainantType}
                    onChange={(e) => setFormData({ ...formData, complainantType: e.target.value as 'Customer' | 'Staff' | 'Branch' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Customer</option>
                    <option>Staff</option>
                    <option>Branch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Complainant Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={formData.complainant}
                    onChange={(e) => setFormData({ ...formData, complainant: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Branch</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Colombo Central</option>
                    <option>Kandy Branch</option>
                    <option>Galle Branch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Loan Processing</option>
                    <option>System Issue</option>
                    <option>HR Issue</option>
                    <option>Service Quality</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Assign To</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Kasun Silva</option>
                    <option>IT Support</option>
                    <option>HR Department</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief subject of complaint"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed description of the complaint"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateComplaint}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register Complaint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Complaint Modal */}
      {viewingComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">{viewingComplaint.ticketNo}</h2>
              <p className="text-sm text-gray-600 mt-1">{viewingComplaint.subject}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-gray-900">{viewingComplaint.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <select
                    value={viewingComplaint.status}
                    onChange={e => {
                      const newStatus = e.target.value as Complaint['status'];
                      setComplaints(prev => prev.map(c => c.id === viewingComplaint.id ? { ...c, status: newStatus } : c));
                      setViewingComplaint(vc => vc ? { ...vc, status: newStatus } : vc);
                    }}
                    className={`px-2 py-1 rounded text-xs border ${getStatusColor(viewingComplaint.status)} focus:outline-none`}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Complainant</p>
                  <p className="text-gray-900">{viewingComplaint.complainant} ({viewingComplaint.complainantType})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Branch</p>
                  <p className="text-gray-900">{viewingComplaint.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-gray-900">{viewingComplaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(viewingComplaint.priority)}`}>
                    {viewingComplaint.priority}
                  </span>
                </div>
                {viewingComplaint.assignedTo && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Assigned To</p>
                    <p className="text-gray-900">{viewingComplaint.assignedTo}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{viewingComplaint.description}</p>
              </div>
              {viewingComplaint.resolution && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Resolution</p>
                  <p className="text-gray-900 bg-green-50 p-3 rounded-lg border border-green-200">{viewingComplaint.resolution}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setViewingComplaint(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
