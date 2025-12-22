'use client'

import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

interface LoanApprovalItem {
  id: string;
  serialNo: number;
  contractNo: string;
  customerName: string;
  nic: string;
  loanAmount: number;
  staff: string;
  submittedDate: string;
  submittedTime: string;
  firstApproval: 'Pending' | 'Approved' | 'Sent Back' | null;
  firstApprovalBy?: string;
  firstApprovalDate?: string;
  secondApproval: 'Pending' | 'Approved' | 'Sent Back' | null;
  secondApprovalBy?: string;
  secondApprovalDate?: string;
  status: 'Pending 1st' | 'Pending 2nd' | 'Approved' | 'Sent Back';
  loanDetails: {
    purpose: string;
    tenure: number;
    interestRate: number;
    center: string;
    group: string;
  };
}

export function LoanApproval() {
  const [loans, setLoans] = useState<LoanApprovalItem[]>([
    {
      id: '1',
      serialNo: 1,
      contractNo: 'LN2025-001',
      customerName: 'Nimal Perera',
      nic: '198512345V',
      loanAmount: 150000,
      staff: 'Kasun Silva',
      submittedDate: '2025-12-20',
      submittedTime: '09:30 AM',
      firstApproval: 'Pending',
      secondApproval: null,
      status: 'Pending 1st',
      loanDetails: {
        purpose: 'Business Expansion',
        tenure: 12,
        interestRate: 18,
        center: 'Colombo Central CSU',
        group: 'Group A'
      }
    },
    {
      id: '2',
      serialNo: 2,
      contractNo: 'LN2025-002',
      customerName: 'Saman Kumara',
      nic: '197723456V',
      loanAmount: 250000,
      staff: 'Priya Fernando',
      submittedDate: '2025-12-20',
      submittedTime: '10:15 AM',
      firstApproval: 'Approved',
      firstApprovalBy: 'Manager',
      firstApprovalDate: '2025-12-20',
      secondApproval: 'Pending',
      status: 'Pending 2nd',
      loanDetails: {
        purpose: 'Agriculture',
        tenure: 18,
        interestRate: 16,
        center: 'Kandy CSU',
        group: 'Group B'
      }
    },
    {
      id: '3',
      serialNo: 3,
      contractNo: 'LN2025-003',
      customerName: 'Dilini Jayawardena',
      nic: '199134567V',
      loanAmount: 100000,
      staff: 'Ravi Mendis',
      submittedDate: '2025-12-19',
      submittedTime: '02:45 PM',
      firstApproval: 'Approved',
      firstApprovalBy: 'Manager',
      firstApprovalDate: '2025-12-19',
      secondApproval: null,
      status: 'Approved',
      loanDetails: {
        purpose: 'Education',
        tenure: 12,
        interestRate: 17,
        center: 'Galle CSU',
        group: 'Group C'
      }
    },
    {
      id: '4',
      serialNo: 4,
      contractNo: 'LN2025-004',
      customerName: 'Tharaka Silva',
      nic: '198845678V',
      loanAmount: 75000,
      staff: 'Anjali Perera',
      submittedDate: '2025-12-18',
      submittedTime: '11:20 AM',
      firstApproval: 'Sent Back',
      firstApprovalBy: 'Manager',
      firstApprovalDate: '2025-12-18',
      secondApproval: null,
      status: 'Sent Back',
      loanDetails: {
        purpose: 'Personal',
        tenure: 6,
        interestRate: 19,
        center: 'Matara CSU',
        group: 'Group D'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewingLoan, setViewingLoan] = useState<LoanApprovalItem | null>(null);

  const getTimeDifferenceInHours = (dateStr: string, timeStr: string): number => {
    const submittedDateTime = new Date(`${dateStr} ${timeStr}`);
    const now = new Date();
    const diffMs = now.getTime() - submittedDateTime.getTime();
    return diffMs / (1000 * 60 * 60);
  };

  const isOverdue = (dateStr: string, timeStr: string): boolean => {
    return getTimeDifferenceInHours(dateStr, timeStr) > 1;
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.nic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleFirstApproval = (loanId: string, action: 'approve' | 'sendback') => {
    setLoans(prevLoans => prevLoans.map(loan => {
      if (loan.id === loanId) {
        if (action === 'approve') {
          // If loan amount > 200,000, needs 2nd approval
          if (loan.loanAmount > 200000) {
            return {
              ...loan,
              firstApproval: 'Approved',
              firstApprovalBy: 'Manager',
              firstApprovalDate: new Date().toISOString().split('T')[0],
              secondApproval: 'Pending',
              status: 'Pending 2nd'
            };
          } else {
            // Direct approval for amounts <= 200,000
            return {
              ...loan,
              firstApproval: 'Approved',
              firstApprovalBy: 'Manager',
              firstApprovalDate: new Date().toISOString().split('T')[0],
              status: 'Approved'
            };
          }
        } else {
          return {
            ...loan,
            firstApproval: 'Sent Back',
            firstApprovalBy: 'Manager',
            firstApprovalDate: new Date().toISOString().split('T')[0],
            status: 'Sent Back'
          };
        }
      }
      return loan;
    }));
    setViewingLoan(null);
  };

  const handleSecondApproval = (loanId: string, action: 'approve' | 'sendback') => {
    setLoans(prevLoans => prevLoans.map(loan => {
      if (loan.id === loanId) {
        if (action === 'approve') {
          return {
            ...loan,
            secondApproval: 'Approved',
            secondApprovalBy: 'Senior Manager',
            secondApprovalDate: new Date().toISOString().split('T')[0],
            status: 'Approved'
          };
        } else {
          return {
            ...loan,
            secondApproval: 'Sent Back',
            secondApprovalBy: 'Senior Manager',
            secondApprovalDate: new Date().toISOString().split('T')[0],
            status: 'Sent Back'
          };
        }
      }
      return loan;
    }));
    setViewingLoan(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending 1st':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pending 1st Approval</span>;
      case 'Pending 2nd':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Pending 2nd Approval</span>;
      case 'Approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs inline-flex items-center gap-1"><CheckCircle className="w-3 h-3" />Approved</span>;
      case 'Sent Back':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs inline-flex items-center gap-1"><XCircle className="w-3 h-3" />Sent Back</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Loan Approval</h1>
          <p className="text-gray-600 mt-1">Review and approve loan applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by contract no, customer name, or NIC..."
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
            <option value="Pending 1st">Pending 1st Approval</option>
            <option value="Pending 2nd">Pending 2nd Approval</option>
            <option value="Approved">Approved</option>
            <option value="Sent Back">Sent Back</option>
          </select>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Serial</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Contract No</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Customer Name</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">NIC</th>
                <th className="text-right px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Loan Amount</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Staff</th>
                <th className="text-left px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Submitted Date</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">1st Approval</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">2nd Approval</th>
                <th className="text-center px-6 py-3 text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLoans.map((loan) => {
                const overdueWarning = isOverdue(loan.submittedDate, loan.submittedTime);
                return (
                  <tr key={loan.id} className={`hover:bg-gray-50 ${overdueWarning ? 'bg-orange-50' : ''}`}>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.serialNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{loan.contractNo}</span>
                        {overdueWarning && (
                          <AlertCircle className="w-4 h-4 text-orange-600" title="Over 1 hour pending" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{loan.nic}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">LKR {loan.loanAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{loan.staff}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{loan.submittedDate}</div>
                      <div className="text-xs text-gray-500">{loan.submittedTime}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {loan.firstApproval === 'Pending' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pending</span>
                      )}
                      {loan.firstApproval === 'Approved' && (
                        <div className="text-xs">
                          <div className="text-green-600">Approved</div>
                          <div className="text-gray-500">{loan.firstApprovalDate}</div>
                        </div>
                      )}
                      {loan.firstApproval === 'Sent Back' && (
                        <div className="text-xs">
                          <div className="text-red-600">Sent Back</div>
                          <div className="text-gray-500">{loan.firstApprovalDate}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {loan.secondApproval === null && loan.loanAmount <= 200000 ? (
                        <span className="text-xs text-gray-400">N/A</span>
                      ) : loan.secondApproval === 'Pending' ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Pending</span>
                      ) : loan.secondApproval === 'Approved' ? (
                        <div className="text-xs">
                          <div className="text-green-600">Approved</div>
                          <div className="text-gray-500">{loan.secondApprovalDate}</div>
                        </div>
                      ) : loan.secondApproval === 'Sent Back' ? (
                        <div className="text-xs">
                          <div className="text-red-600">Sent Back</div>
                          <div className="text-gray-500">{loan.secondApprovalDate}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setViewingLoan(loan)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Loan Details Modal */}
      {viewingLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900">{viewingLoan.contractNo}</h2>
                  <p className="text-sm text-gray-600 mt-1">{viewingLoan.customerName}</p>
                </div>
                {getStatusBadge(viewingLoan.status)}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Details */}
              <div>
                <h3 className="text-gray-900 mb-3">Customer Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="text-gray-900">{viewingLoan.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">NIC</p>
                    <p className="text-gray-900">{viewingLoan.nic}</p>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div>
                <h3 className="text-gray-900 mb-3">Loan Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Loan Amount</p>
                    <p className="text-gray-900 text-lg">LKR {viewingLoan.loanAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Purpose</p>
                    <p className="text-gray-900">{viewingLoan.loanDetails.purpose}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tenure</p>
                    <p className="text-gray-900">{viewingLoan.loanDetails.tenure} months</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Interest Rate</p>
                    <p className="text-gray-900">{viewingLoan.loanDetails.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Center</p>
                    <p className="text-gray-900">{viewingLoan.loanDetails.center}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Group</p>
                    <p className="text-gray-900">{viewingLoan.loanDetails.group}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Staff</p>
                    <p className="text-gray-900">{viewingLoan.staff}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Submitted</p>
                    <p className="text-gray-900">{viewingLoan.submittedDate} {viewingLoan.submittedTime}</p>
                  </div>
                </div>
              </div>

              {/* Approval Info */}
              {viewingLoan.loanAmount > 200000 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900">This loan requires 2nd level approval</p>
                      <p className="text-xs text-blue-700 mt-1">Loan amount exceeds LKR 200,000</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setViewingLoan(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              
              {viewingLoan.firstApproval === 'Pending' && (
                <>
                  <button
                    onClick={() => handleFirstApproval(viewingLoan.id, 'sendback')}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    <XCircle className="w-5 h-5" />
                    Send Back
                  </button>
                  <button
                    onClick={() => handleFirstApproval(viewingLoan.id, 'approve')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve
                  </button>
                </>
              )}

              {viewingLoan.secondApproval === 'Pending' && (
                <>
                  <button
                    onClick={() => handleSecondApproval(viewingLoan.id, 'sendback')}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    <XCircle className="w-5 h-5" />
                    Send Back
                  </button>
                  <button
                    onClick={() => handleSecondApproval(viewingLoan.id, 'approve')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve (2nd Level)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
