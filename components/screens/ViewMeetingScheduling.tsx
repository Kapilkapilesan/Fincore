'use client'

import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, User, Users, X, Plus } from 'lucide-react';

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
  meetingTime: string;
  meetingDay: string;
}

interface TemporaryAssignment {
  centerId: string;
  originalUser: string;
  temporaryUser: string;
  date: string;
  reason: string;
}

export function ViewMeetingScheduling() {
  const [centers, setCenters] = useState<Center[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('centers');
      return saved ? JSON.parse(saved) : [
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
          status: 'Active',
          meetingTime: '10:00 AM',
          meetingDay: 'Monday'
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
          status: 'Active',
          meetingTime: '2:00 PM',
          meetingDay: 'Wednesday'
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
          status: 'Active',
          meetingTime: '11:00 AM',
          meetingDay: 'Friday'
        }
      ];
    }
    return [];
  });

  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [temporaryAssignments, setTemporaryAssignments] = useState<TemporaryAssignment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('temporaryAssignments');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [assignmentForm, setAssignmentForm] = useState({
    temporaryUser: '',
    date: '',
    reason: ''
  });

  const branches = ['Head Office', 'Kandy Branch', 'Galle Branch', 'Negombo Branch'];
  const staffList = ['Staff A', 'Staff B', 'Staff C', 'Staff D'];

  const filteredCenters = centers.filter(center => {
    if (selectedBranch && center.branch !== selectedBranch) return false;
    if (selectedUser && !center.allowedStaff.includes(selectedUser)) return false;
    return true;
  });

  const handleCardClick = (center: Center) => {
    setSelectedCenter(center);
    setAssignmentForm({
      temporaryUser: '',
      date: new Date().toISOString().split('T')[0],
      reason: ''
    });
    setShowModal(true);
  };

  const handleSaveAssignment = () => {
    if (selectedCenter && assignmentForm.temporaryUser) {
      const newAssignment: TemporaryAssignment = {
        centerId: selectedCenter.id,
        originalUser: selectedCenter.contactPerson,
        temporaryUser: assignmentForm.temporaryUser,
        date: assignmentForm.date,
        reason: assignmentForm.reason
      };
      const updatedAssignments = [...temporaryAssignments, newAssignment];
      setTemporaryAssignments(updatedAssignments);
      localStorage.setItem('temporaryAssignments', JSON.stringify(updatedAssignments));
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">View Meeting Scheduling</h1>
        <p className="text-sm text-gray-500 mt-1">Manage temporary user assignments for center meetings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Users</option>
              {staffList.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            onClick={() => handleCardClick(center)}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                center.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {center.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
                <p className="text-sm text-gray-500">{center.centerNumber}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{center.branch}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{center.meetingDay}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{center.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{center.contactPerson}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{center.totalGroups}</p>
                    <p className="text-xs text-gray-500">Groups</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{center.totalMembers}</p>
                    <p className="text-xs text-gray-500">Members</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{center.totalLoans}</p>
                    <p className="text-xs text-gray-500">Loans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedCenter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Temporary User Assignment</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Center Name</label>
                  <p className="text-sm text-gray-900">{selectedCenter.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Center Time</label>
                  <p className="text-sm text-gray-900">{selectedCenter.meetingTime} ({selectedCenter.meetingDay})</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Center User</label>
                  <p className="text-sm text-gray-900">{selectedCenter.contactPerson}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Center Location</label>
                  <p className="text-sm text-gray-900">{selectedCenter.address}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temporary User *</label>
                  <select
                    value={assignmentForm.temporaryUser}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, temporaryUser: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select User</option>
                    {staffList.filter(staff => staff !== selectedCenter.contactPerson).map(staff => (
                      <option key={staff} value={staff}>{staff}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={assignmentForm.date}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={assignmentForm.reason}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, reason: e.target.value })}
                    rows={3}
                    placeholder="Reason for temporary assignment (e.g., original user on leave)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                onClick={handleSaveAssignment}
                disabled={!assignmentForm.temporaryUser || !assignmentForm.date}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                Assign User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Temporary Assignments Summary */}
      {temporaryAssignments.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Temporary Assignments</h3>
          <div className="space-y-3">
            {temporaryAssignments.slice(-5).map((assignment, index) => {
              const center = centers.find(c => c.id === assignment.centerId);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{center?.name}</p>
                    <p className="text-xs text-gray-500">
                      {assignment.originalUser} → {assignment.temporaryUser} on {assignment.date}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{assignment.reason}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}