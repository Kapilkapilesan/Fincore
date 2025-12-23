'use client'

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Users, AlertTriangle, Search, Plus } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';

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

interface CenterCreationFormProps {
  onSubmit: (data: Omit<Center, 'id' | 'createdDate'>) => void;
  onCancel: () => void;
}

function CenterCreationForm({ onSubmit, onCancel }: CenterCreationFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      centerNumber: formData.get('centerNumber') as string,
      name: formData.get('name') as string,
      branch: formData.get('branch') as string,
      address: formData.get('address') as string,
      locationType: formData.get('locationType') as 'Urban' | 'Rural' | 'Semi-Urban',
      contactPerson: formData.get('contactPerson') as string,
      contactPhone: formData.get('contactPhone') as string,
      allowedStaff: (formData.get('allowedStaff') as string)?.split(',').map(s => s.trim()) || [],
      totalGroups: 0,
      totalMembers: 0,
      totalLoans: 0,
      status: 'Active' as const,
      meetingTime: formData.get('meetingTime') as string,
      meetingDay: formData.get('meetingDay') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Center Number *
          </label>
          <input
            type="text"
            name="centerNumber"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., CSU004"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Center Name *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Jaffna CSU"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch *
          </label>
          <input
            type="text"
            name="branch"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Jaffna Branch"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Type *
          </label>
          <select
            name="locationType"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select location type</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Semi-Urban">Semi-Urban</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <textarea
          name="address"
          required
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Full address of the center"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person *
          </label>
          <input
            type="text"
            name="contactPerson"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone *
          </label>
          <input
            type="tel"
            name="contactPhone"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+94 XX XXX XXXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Day *
          </label>
          <select
            name="meetingDay"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select meeting day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Time *
          </label>
          <input
            type="time"
            name="meetingTime"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allowed Staff (comma-separated)
        </label>
        <input
          type="text"
          name="allowedStaff"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Staff A, Staff B, Staff C"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          Create Center
        </Button>
      </div>
    </form>
  );
}

export function ViewScheduling() {
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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCenter = (centerData: Omit<Center, 'id' | 'createdDate'>) => {
    const newCenter: Center = {
      ...centerData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
    };
    const updatedCenters = [...centers, newCenter];
    setCenters(updatedCenters);
    localStorage.setItem('centers', JSON.stringify(updatedCenters));
    setIsCreateModalOpen(false);
  };

  const [temporaryAssignments] = useState<TemporaryAssignment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('temporaryAssignments');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.centerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = !selectedDay || center.meetingDay === selectedDay;
    return matchesSearch && matchesDay;
  });

  const getTemporaryAssignment = (centerId: string, date?: string) => {
    return temporaryAssignments.find(assignment =>
      assignment.centerId === centerId &&
      (!date || assignment.date === date)
    );
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Center Scheduling</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage center meeting schedules</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Center
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
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

          <div className="min-w-[200px]">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Days</option>
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Centers List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-3">Center</div>
            <div className="col-span-2">Branch</div>
            <div className="col-span-2">Meeting Schedule</div>
            <div className="col-span-2">Assigned User</div>
            <div className="col-span-2">Location Type</div>
            <div className="col-span-1">Status</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredCenters.map((center) => {
            const tempAssignment = getTemporaryAssignment(center.id, today);
            return (
              <div key={center.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Center Info */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{center.name}</p>
                      <p className="text-xs text-gray-500">{center.centerNumber}</p>
                    </div>
                  </div>

                  {/* Branch */}
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900">{center.branch}</p>
                  </div>

                  {/* Meeting Schedule */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{center.meetingDay}</p>
                        <p className="text-xs text-gray-500">{center.meetingTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Assigned User */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {tempAssignment ? tempAssignment.temporaryUser : center.contactPerson}
                        </p>
                        {tempAssignment && (
                          <p className="text-xs text-orange-600">Temp ({center.contactPerson})</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location Type */}
                  <div className="col-span-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      center.locationType === 'Urban'
                        ? 'bg-blue-100 text-blue-800'
                        : center.locationType === 'Rural'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {center.locationType}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        center.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {center.status}
                      </span>
                      {tempAssignment && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-orange-600" />
                          <span className="text-xs text-orange-600">Temp</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Temporary Assignment Details */}
                {tempAssignment && (
                  <div className="col-span-12 mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-orange-900">Temporary Assignment Active</p>
                        <p className="text-sm text-orange-800">
                          {tempAssignment.originalUser} is unavailable. {tempAssignment.temporaryUser} assigned for {tempAssignment.date}.
                        </p>
                        {tempAssignment.reason && (
                          <p className="text-xs text-orange-700 mt-1">Reason: {tempAssignment.reason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="col-span-12 mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex gap-6">
                      <span>{center.totalGroups} Groups</span>
                      <span>{center.totalMembers} Members</span>
                      <span>{center.totalLoans} Loans</span>
                    </div>
                    <div className="text-gray-500">
                      Created: {center.createdDate}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredCenters.length}</span> of <span className="font-medium">{centers.length}</span> centers
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

      {filteredCenters.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No centers found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Create Center Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Center"
        size="lg"
      >
        <CenterCreationForm onSubmit={handleCreateCenter} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>
    </div>
  );
}
