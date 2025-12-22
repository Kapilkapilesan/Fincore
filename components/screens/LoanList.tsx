'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Search, Eye, Filter, Download, FileText, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

interface Loan {
  id: string;
  contractNo: string;
  customer: string;
  customerId: string;
  amount: number;
  disbursedAmount: number;
  outstanding: number;
  interestRate: number;
  tenure: number;
  rentalType: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Defaulted';
  disbursedDate: string;
  dueDate: string;
}

export function LoanList() {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      contractNo: 'LN-2024-0001',
      customer: 'Nimal Perera',
      customerId: 'CUST001',
      amount: 250000,
      disbursedAmount: 250000,
      outstanding: 175000,
      interestRate: 12.5,
      tenure: 12,
      rentalType: 'Weekly',
      status: 'Active',
      disbursedDate: '2024-01-15',
      dueDate: '2025-01-15'
    },
    {
      id: '2',
      contractNo: 'LN-2024-0002',
      customer: 'Saman Silva',
      customerId: 'CUST003',
      amount: 350000,
      disbursedAmount: 350000,
      outstanding: 280000,
      interestRate: 11.5,
      tenure: 18,
      rentalType: 'Monthly',
      status: 'Active',
      disbursedDate: '2024-02-01',
      dueDate: '2025-08-01'
    },
    {
      id: '3',
      contractNo: 'LN-2024-0003',
      customer: 'Dilini Fernando',
      customerId: 'CUST005',
      amount: 150000,
      disbursedAmount: 150000,
      outstanding: 45000,
      interestRate: 13.0,
      tenure: 12,
      rentalType: 'Weekly',
      status: 'Active',
      disbursedDate: '2024-03-10',
      dueDate: '2025-03-10'
    },
    {
      id: '4',
      contractNo: 'LN-2023-0158',
      customer: 'Kamala Bandara',
      customerId: 'CUST012',
      amount: 200000,
      disbursedAmount: 200000,
      outstanding: 0,
      interestRate: 12.0,
      tenure: 12,
      rentalType: 'Monthly',
      status: 'Completed',
      disbursedDate: '2023-06-15',
      dueDate: '2024-06-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLoan(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = 
      loan.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || loan.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Defaulted':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const totalLoans = loans.length;
  const activeLoans = loans.filter(l => l.status === 'Active').length;
  const totalDisbursed = loans.reduce((sum, l) => sum + l.disbursedAmount, 0);
  const totalOutstanding = loans.reduce((sum, l) => sum + l.outstanding, 0);

  const handleExport = () => {
    const headers = [
      'id',
      'contractNo',
      'customer',
      'customerId',
      'amount',
      'disbursedAmount',
      'outstanding',
      'interestRate',
      'tenure',
      'rentalType',
      'status',
      'disbursedDate',
      'dueDate'
    ];

    const rows = loans.map((loan) =>
      headers
        .map((key) => {
          const value = loan[key as keyof Loan] as string | number;
          return typeof value === 'string' ? `"${value}"` : value;
        })
        .join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'loans.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const parseCsv = (text: string): Loan[] => {
    const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const required = [
      'id',
      'contractno',
      'customer',
      'customerid',
      'amount',
      'disbursedamount',
      'outstanding',
      'interestrate',
      'tenure',
      'rentaltype',
      'status',
      'disburseddate',
      'duedate'
    ];

    const missing = required.filter((h) => !headers.includes(h));
    if (missing.length) {
      alert(`CSV missing required columns: ${missing.join(', ')}`);
      return [];
    }

    const getVal = (cols: string[], key: string) => cols[headers.indexOf(key)]?.trim();

    return lines.slice(1).map((line, index) => {
      const cols = line.split(',').map((c) => c.trim());
      return {
        id: getVal(cols, 'id') || `csv-${Date.now()}-${index}`,
        contractNo: getVal(cols, 'contractno') || '',
        customer: getVal(cols, 'customer') || '',
        customerId: getVal(cols, 'customerid') || '',
        amount: Number(getVal(cols, 'amount')) || 0,
        disbursedAmount: Number(getVal(cols, 'disbursedamount')) || 0,
        outstanding: Number(getVal(cols, 'outstanding')) || 0,
        interestRate: Number(getVal(cols, 'interestrate')) || 0,
        tenure: Number(getVal(cols, 'tenure')) || 0,
        rentalType: getVal(cols, 'rentaltype') || '',
        status: (getVal(cols, 'status') as Loan['status']) || 'Pending',
        disbursedDate: getVal(cols, 'disburseddate') || '',
        dueDate: getVal(cols, 'duedate') || ''
      };
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const imported = parseCsv(text);
      if (imported.length) {
        setLoans((prev) => [...prev, ...imported]);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleViewLoan = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loan List</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all loans</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
          />
          <button
            onClick={handleImportClick}
            className="flex items-center gap-2 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 rotate-180" />
            <span className="text-sm font-medium">Import CSV</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Loans</p>
          <p className="text-2xl font-bold text-gray-900">{totalLoans}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {((activeLoans / totalLoans) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Loans</p>
          <p className="text-2xl font-bold text-gray-900">{activeLoans}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Disbursed</p>
          <p className="text-2xl font-bold text-gray-900">LKR {(totalDisbursed / 1000).toFixed(0)}K</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Outstanding</p>
          <p className="text-2xl font-bold text-gray-900">LKR {(totalOutstanding / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by contract no, customer, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Defaulted">Defaulted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-2">Contract No</div>
            <div className="col-span-2">Customer</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Outstanding</div>
            <div className="col-span-2">Terms</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredLoans.map((loan) => (
            <div key={loan.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Contract No */}
                <div className="col-span-2">
                  <p className="font-medium text-gray-900">{loan.contractNo}</p>
                  <p className="text-xs text-gray-500">{loan.disbursedDate}</p>
                </div>

                {/* Customer */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{loan.customer}</p>
                  <p className="text-xs text-gray-500">{loan.customerId}</p>
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-900">LKR {loan.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{loan.interestRate}% interest</p>
                </div>

                {/* Outstanding */}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-900">LKR {loan.outstanding.toLocaleString()}</p>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: loan.amount ? `${((loan.amount - loan.outstanding) / loan.amount) * 100}%` : '0%' }}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{loan.tenure} months</p>
                  <p className="text-xs text-gray-500">{loan.rentalType}</p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(loan.status)}`}>
                    {loan.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <button
                    onClick={() => handleViewLoan(loan)}
                    className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
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
              Showing <span className="font-medium">{filteredLoans.length}</span> of <span className="font-medium">{totalLoans}</span> loans
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

      {selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setSelectedLoan(null)}
          />
          <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-gray-200 mx-4">
            <div className="flex items-start justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Loan Details</h2>
                <p className="text-xs text-gray-500">Contract {selectedLoan.contractNo}</p>
              </div>
              <button
                onClick={() => setSelectedLoan(null)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 text-sm text-gray-700 max-h-[70vh] overflow-auto">
              <div>
                <p className="text-gray-500 text-xs uppercase">Customer</p>
                <p className="font-medium">{selectedLoan.customer}</p>
                <p className="text-xs text-gray-500">{selectedLoan.customerId}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Amount</p>
                <p className="font-medium">LKR {selectedLoan.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Outstanding</p>
                <p className="font-medium">LKR {selectedLoan.outstanding.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Interest</p>
                <p className="font-medium">{selectedLoan.interestRate}%</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Tenure</p>
                <p className="font-medium">{selectedLoan.tenure} months ({selectedLoan.rentalType})</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Status</p>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedLoan.status)}`}>
                  {selectedLoan.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Disbursed</p>
                <p className="font-medium">{selectedLoan.disbursedDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Due</p>
                <p className="font-medium">{selectedLoan.dueDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
