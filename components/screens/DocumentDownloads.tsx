'use client'

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  FileSpreadsheet,
  File,
  FileImage,
  Calendar,
  User,
  Edit3,
  Printer,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Folder,
  Star,
  TrendingUp,
  Upload,
  Plus,
  Shield,
  X
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  category: string;
  type: 'static' | 'dynamic';
  fileType: 'pdf' | 'excel' | 'word' | 'image';
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  downloads: number;
  description: string;
  status: 'active' | 'draft';
  tags: string[];
  isPrintReady: boolean;
}

interface DocumentDownloadsProps {
  user: {
    id: string;
    name: string;
    role: string;
    email?: string;
  };
}

export function DocumentDownloads({ user }: DocumentDownloadsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'static' | 'dynamic'>('all');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [showDynamicForm, setShowDynamicForm] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Check if user is admin
  const isAdmin = user.role.toLowerCase() === 'admin' || user.role.toLowerCase() === 'administrator';

  // Mock data - Static documents (uploaded by admin, ready to download)
  const staticDocuments: Document[] = [
    {
      id: 'SD001',
      name: 'Loan Application Form',
      category: 'Forms',
      type: 'static',
      fileType: 'pdf',
      size: '245 KB',
      uploadedBy: 'Admin User',
      uploadedDate: '2024-12-15',
      downloads: 1245,
      description: 'Standard loan application form for all loan types. Print-ready format with all required fields.',
      status: 'active',
      tags: ['Loan', 'Application', 'Print-Ready'],
      isPrintReady: true
    },
    {
      id: 'SD002',
      name: 'KYC Document Checklist',
      category: 'Guidelines',
      type: 'static',
      fileType: 'pdf',
      size: '180 KB',
      uploadedBy: 'Admin User',
      uploadedDate: '2024-12-10',
      downloads: 856,
      description: 'Complete checklist of required KYC documents for customer onboarding.',
      status: 'active',
      tags: ['KYC', 'Guidelines', 'Onboarding'],
      isPrintReady: true
    },
    {
      id: 'SD003',
      name: 'Privacy Policy',
      category: 'Legal',
      type: 'static',
      fileType: 'pdf',
      size: '520 KB',
      uploadedBy: 'Admin User',
      uploadedDate: '2024-12-01',
      downloads: 432,
      description: 'Official privacy policy document for customer disclosure and consent.',
      status: 'active',
      tags: ['Legal', 'Privacy', 'Policy'],
      isPrintReady: true
    },
    {
      id: 'SD004',
      name: 'Interest Rate Chart',
      category: 'Reference',
      type: 'static',
      fileType: 'excel',
      size: '95 KB',
      uploadedBy: 'Finance Team',
      uploadedDate: '2024-12-18',
      downloads: 678,
      description: 'Current interest rates for all loan products and tenure options.',
      status: 'active',
      tags: ['Finance', 'Rates', 'Reference'],
      isPrintReady: true
    },
    {
      id: 'SD005',
      name: 'Branch Locations Map',
      category: 'Reference',
      type: 'static',
      fileType: 'pdf',
      size: '1.2 MB',
      uploadedBy: 'Admin User',
      uploadedDate: '2024-12-05',
      downloads: 324,
      description: 'Map showing all branch locations across Sri Lanka with contact details.',
      status: 'active',
      tags: ['Branches', 'Map', 'Contact'],
      isPrintReady: true
    },
    {
      id: 'SD006',
      name: 'Collection Schedule Template',
      category: 'Templates',
      type: 'static',
      fileType: 'excel',
      size: '78 KB',
      uploadedBy: 'Operations Team',
      uploadedDate: '2024-12-12',
      downloads: 892,
      description: 'Weekly collection schedule template for field officers.',
      status: 'active',
      tags: ['Collections', 'Template', 'Schedule'],
      isPrintReady: true
    }
  ];

  // Mock data - Dynamic documents (customizable before download)
  const dynamicDocuments: Document[] = [
    {
      id: 'DD001',
      name: 'Loan Agreement Contract',
      category: 'Contracts',
      type: 'dynamic',
      fileType: 'pdf',
      size: 'Generated',
      uploadedBy: 'System',
      uploadedDate: '2024-12-20',
      downloads: 2134,
      description: 'Generates customized loan agreement with customer details, loan amount, terms, and conditions.',
      status: 'active',
      tags: ['Contract', 'Loan', 'Customizable'],
      isPrintReady: false
    },
    {
      id: 'DD002',
      name: 'Payment Receipt',
      category: 'Receipts',
      type: 'dynamic',
      fileType: 'pdf',
      size: 'Generated',
      uploadedBy: 'System',
      uploadedDate: '2024-12-20',
      downloads: 5678,
      description: 'Generates payment receipt with transaction details, customer info, and collection officer signature.',
      status: 'active',
      tags: ['Receipt', 'Payment', 'Transaction'],
      isPrintReady: false
    },
    {
      id: 'DD003',
      name: 'Customer Passbook',
      category: 'Reports',
      type: 'dynamic',
      fileType: 'pdf',
      size: 'Generated',
      uploadedBy: 'System',
      uploadedDate: '2024-12-20',
      downloads: 1543,
      description: 'Generates customer passbook with complete loan history, payments, and outstanding balance.',
      status: 'active',
      tags: ['Passbook', 'Customer', 'History'],
      isPrintReady: false
    },
    {
      id: 'DD004',
      name: 'Due List Report',
      category: 'Reports',
      type: 'dynamic',
      fileType: 'excel',
      size: 'Generated',
      uploadedBy: 'System',
      uploadedDate: '2024-12-20',
      downloads: 2890,
      description: 'Generates due list report filtered by branch, date range, and collection status.',
      status: 'active',
      tags: ['Report', 'Due List', 'Collections'],
      isPrintReady: false
    },
    {
      id: 'DD005',
      name: 'Loan Repayment Schedule',
      category: 'Schedules',
      type: 'dynamic',
      fileType: 'pdf',
      size: 'Generated',
      uploadedBy: 'System',
      uploadedDate: '2024-12-20',
      downloads: 3421,
      description: 'Generates customized repayment schedule with EMI breakdown, dates, and interest details.',
      status: 'active',
      tags: ['Schedule', 'EMI', 'Repayment'],
      isPrintReady: false
    },
    {
      id: 'DD006',
      name: 'Branch Performance Report',
      category: 'Reports',
      type: 'dynamic',
      fileType: 'excel',
      size: 'Generated',
      uploadedBy: 'System',
      uploadedDate: '2024-12-20',
      downloads: 876,
      description: 'Generates branch performance report with custom date range, metrics, and comparisons.',
      status: 'active',
      tags: ['Performance', 'Branch', 'Analytics'],
      isPrintReady: false
    }
  ];

  const allDocuments = [...staticDocuments, ...dynamicDocuments];

  const categories = [
    { id: 'all', name: 'All Documents', count: allDocuments.length, icon: <Folder className="w-4 h-4" /> },
    { id: 'Forms', name: 'Forms', count: allDocuments.filter(d => d.category === 'Forms').length, icon: <FileText className="w-4 h-4" /> },
    { id: 'Contracts', name: 'Contracts', count: allDocuments.filter(d => d.category === 'Contracts').length, icon: <FileText className="w-4 h-4" /> },
    { id: 'Reports', name: 'Reports', count: allDocuments.filter(d => d.category === 'Reports').length, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Templates', name: 'Templates', count: allDocuments.filter(d => d.category === 'Templates').length, icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'Legal', name: 'Legal', count: allDocuments.filter(d => d.category === 'Legal').length, icon: <FileText className="w-4 h-4" /> },
    { id: 'Reference', name: 'Reference', count: allDocuments.filter(d => d.category === 'Reference').length, icon: <FileText className="w-4 h-4" /> }
  ];

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <File className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'word':
        return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const handleDownload = (doc: Document) => {
    if (doc.type === 'static') {
      // Direct download for static documents
      alert(`Downloading: ${doc.name}`);
      // In production: window.open(doc.downloadUrl, '_blank');
    } else {
      // Show form for dynamic documents
      setSelectedDoc(doc);
      setShowDynamicForm(true);
    }
  };

  const handlePreview = (doc: Document) => {
    setSelectedDoc(doc);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold tracking-tight mb-2">Document Downloads</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Access forms, templates, and generate customized documents
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl px-4 py-3 border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide mb-1">Static Docs</p>
              <p className="text-2xl text-blue-700 dark:text-blue-300 font-bold">{staticDocuments.length}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl px-4 py-3 border border-green-100 dark:border-green-800">
              <p className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wide mb-1">Dynamic Docs</p>
              <p className="text-2xl text-green-700 dark:text-green-300 font-bold">{dynamicDocuments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Search Documents</label>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, description, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Category</label>
            <div className="relative">
              <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Categories</option>
                <option value="Forms">Forms</option>
                <option value="Contracts">Contracts</option>
                <option value="Reports">Reports</option>
                <option value="Templates">Templates</option>
                <option value="Legal">Legal</option>
                <option value="Reference">Reference</option>
              </select>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Document Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('static')}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'static'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Static
              </button>
              <button
                onClick={() => setSelectedType('dynamic')}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'dynamic'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Dynamic
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
              <span className="bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredDocuments.length}</span> documents
        </p>
        {isAdmin && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        )}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map(doc => (
          <div
            key={doc.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 dark:text-gray-100 font-semibold tracking-tight mb-1 truncate">{doc.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                      doc.type === 'static'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    }`}>
                      {doc.type === 'static' ? 'Ready to Download' : 'Customizable'}
                    </span>
                    {doc.isPrintReady && (
                      <span className="text-xs px-2 py-1 rounded-lg font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center gap-1">
                        <Printer className="w-3 h-3" />
                        Print Ready
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{doc.category}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
              {doc.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {doc.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded By</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{doc.uploadedBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Upload Date</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {new Date(doc.uploadedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Downloads</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{doc.downloads.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">File Size</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{doc.size}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(doc)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  doc.type === 'static'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                }`}
              >
                {doc.type === 'static' ? (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download Now</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm">Customize & Generate</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handlePreview(doc)}
                className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-2">No Documents Found</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Dynamic Document Form Modal */}
      {showDynamicForm && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 dark:text-gray-100 font-semibold tracking-tight mb-1">
                    Generate: {selectedDoc.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fill in the required information to generate your document
                  </p>
                </div>
                <button
                  onClick={() => setShowDynamicForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Example form fields - customize based on document type */}
              {selectedDoc.id === 'DD001' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Customer Name</label>
                    <input
                      type="text"
                      placeholder="Enter customer name"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Loan Amount (LKR)</label>
                      <input
                        type="number"
                        placeholder="50000"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tenure (Months)</label>
                      <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                        <option>6 Months</option>
                        <option>12 Months</option>
                        <option>18 Months</option>
                        <option>24 Months</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="12.5"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </>
              )}

              {selectedDoc.id === 'DD002' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Receipt Number</label>
                    <input
                      type="text"
                      placeholder="RCP-2024-001"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Customer Name</label>
                      <input
                        type="text"
                        placeholder="Customer name"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Amount (LKR)</label>
                      <input
                        type="number"
                        placeholder="5000"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Default form for other documents */}
              {!['DD001', 'DD002'].includes(selectedDoc.id) && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                      />
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter Options</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                      <option>All Branches</option>
                      <option>Head Office</option>
                      <option>Branch A</option>
                      <option>Branch B</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3">
              <button
                onClick={() => setShowDynamicForm(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Generating ${selectedDoc.name}...`);
                  setShowDynamicForm(false);
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Generate & Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 dark:text-gray-100 font-semibold tracking-tight mb-1">
                    Preview: {selectedDoc.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDoc.description}</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-center">
                  {getFileIcon(selectedDoc.fileType)}
                  <p className="text-gray-600 dark:text-gray-400 mt-4">Document preview will appear here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {selectedDoc.type === 'static' ? 'Ready to download' : 'Generate to preview'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 dark:text-gray-100 font-semibold tracking-tight mb-1">
                    Upload Document
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add a new document to the library
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Document Name</label>
                <input
                  type="text"
                  placeholder="Enter document name"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                  <option>Forms</option>
                  <option>Contracts</option>
                  <option>Reports</option>
                  <option>Templates</option>
                  <option>Legal</option>
                  <option>Reference</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Type</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                  <option>Static</option>
                  <option>Dynamic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">File Type</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>Word</option>
                  <option>Image</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">File Upload</label>
                <input
                  type="file"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Enter document description"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Enter tags separated by commas"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Print Ready</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Yes</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Document uploaded successfully!');
                  setShowUploadModal(false);
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}