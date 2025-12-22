'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, AlertCircle, CheckCircle, FileText, User, DollarSign, Save } from 'lucide-react';

export function LoanCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [drafts, setDrafts] = useState<
    { id: string; name: string; savedAt: string; formData: typeof formData; currentStep: number }[]
  >([]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    center: '',
    group: '',
    customer: '',
    nic: '',
    loanAmount: '',
    requestedAmount: '',
    interestRate: '',
    rentalType: 'Weekly',
    tenure: '',
    processingFee: '',
    documentationFee: '',
    insuranceFee: '',
    remarks: '',
    status: 'draft'
  });

  const draftStorageKey = 'loanCreationDraft';
  const draftListStorageKey = 'loanCreationDraftList';

  const steps = [
    { number: 1, title: 'Select Customer', description: 'Choose center, group, and customer', icon: <User className="w-4 h-4" /> },
    { number: 2, title: 'Loan Details', description: 'Enter loan amount and terms', icon: <DollarSign className="w-4 h-4" /> },
    { number: 3, title: 'Documents', description: 'Upload required documents', icon: <Upload className="w-4 h-4" /> },
    { number: 4, title: 'Review & Submit', description: 'Review and submit for approval', icon: <FileText className="w-4 h-4" /> }
  ];

  const customerRecords = [
    {
      id: 'CUST001',
      name: 'Nimal Perera',
      displayName: 'Nimal Perera - CUST001',
      nic: '198512345V',
      center: 'Colombo Central CSU',
      group: 'Colombo Group A',
      status: 'Active member with good payment history',
      previousLoans: '2 completed successfully'
    },
    {
      id: 'CUST002',
      name: 'Saman Kumara',
      displayName: 'Saman Kumara - CUST002',
      nic: '199023456V',
      center: 'Kandy CSU',
      group: 'Kandy Group B',
      status: 'Active member',
      previousLoans: 'No previous loans'
    },
    {
      id: 'CUST003',
      name: 'Dilini Silva',
      displayName: 'Dilini Silva - CUST003',
      nic: '199234567V',
      center: 'Galle CSU',
      group: 'Galle Group C',
      status: 'Active member',
      previousLoans: '1 completed successfully'
    },
    {
      id: 'CUST004',
      name: 'Kamala Fernando',
      displayName: 'Kamala Fernando - CUST004',
      nic: '198834567V',
      center: 'Negombo CSU',
      group: 'Negombo Group D',
      status: 'Active member',
      previousLoans: 'No previous loans'
    },
    {
      id: 'CUST005',
      name: 'Rajitha Bandara',
      displayName: 'Rajitha Bandara - CUST005',
      nic: '199445678V',
      center: 'Matara CSU',
      group: 'Matara Group E',
      status: 'Active member',
      previousLoans: '1 active loan'
    }
  ];

  const centers = useMemo(
    () => Array.from(new Set(customerRecords.map((customer) => customer.center))),
    []
  );

  const groups = useMemo(() => {
    const filtered = formData.center
      ? customerRecords.filter((customer) => customer.center === formData.center)
      : customerRecords;
    return Array.from(new Set(filtered.map((customer) => customer.group)));
  }, [customerRecords, formData.center]);

  const filteredCustomers = useMemo(() => {
    return customerRecords.filter((customer) => {
      const matchesCenter = formData.center ? customer.center === formData.center : true;
      const matchesGroup = formData.group ? customer.group === formData.group : true;
      return matchesCenter && matchesGroup;
    });
  }, [customerRecords, formData.center, formData.group]);

  const selectedCustomerRecord = useMemo(
    () => customerRecords.find((customer) => customer.id === formData.customer),
    [customerRecords, formData.customer]
  );

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNicChange = (value: string) => {
    const nicValue = value.trim();
    const matchedCustomer = customerRecords.find(
      (customer) => customer.nic.toLowerCase() === nicValue.toLowerCase()
    );

    setFormData((prev) => {
      if (matchedCustomer) {
        return {
          ...prev,
          nic: nicValue,
          center: matchedCustomer.center,
          group: matchedCustomer.group,
          customer: matchedCustomer.id
        };
      }
      return { ...prev, nic: nicValue };
    });
  };

  const handleCustomerChange = (customerId: string) => {
    const matchedCustomer = customerRecords.find((customer) => customer.id === customerId);
    setFormData((prev) => ({
      ...prev,
      customer: customerId,
      nic: matchedCustomer?.nic || prev.nic,
      center: matchedCustomer?.center || prev.center,
      group: matchedCustomer?.group || prev.group
    }));
  };

  const handleSaveDraft = () => {
    const payload = {
      formData: { ...formData, status: 'draft' },
      currentStep
    };
    const name =
      selectedCustomerRecord?.displayName ||
      (formData.nic ? `NIC ${formData.nic}` : formData.customer || 'Untitled draft');
    const newDraft = {
      id: Date.now().toString(),
      name,
      savedAt: new Date().toISOString(),
      ...payload
    };
    try {
      localStorage.setItem(draftStorageKey, JSON.stringify(payload));
      const existing = localStorage.getItem(draftListStorageKey);
      const parsed: typeof drafts = existing ? JSON.parse(existing) : [];
      const updated = [newDraft, ...parsed].slice(0, 10);
      localStorage.setItem(draftListStorageKey, JSON.stringify(updated));
      setDrafts(updated);
      setFormData((prev) => ({ ...prev, status: 'draft' }));
      alert('Draft saved locally.');
    } catch (error) {
      console.error('Failed to save draft', error);
      alert('Could not save draft. Please try again.');
    }
  };

  const handleSubmit = () => {
    alert('Loan application submitted for approval');
  };

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(draftStorageKey) : null;
    const savedList =
      typeof window !== 'undefined' ? localStorage.getItem(draftListStorageKey) : null;

    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList);
        if (Array.isArray(parsedList)) setDrafts(parsedList);
      } catch (error) {
        console.error('Failed to load draft list', error);
      }
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      } catch (error) {
        console.error('Failed to load draft', error);
      }
    }
  }, []);

  const handleLoadDraft = (draftId: string) => {
    const draft = drafts.find((item) => item.id === draftId);
    if (!draft) return;
    setFormData(draft.formData);
    setCurrentStep(draft.currentStep || 1);
    setIsDraftModalOpen(false);
    alert(`Draft "${draft.name}" loaded.`);
  };

  const handleDeleteDraft = (draftId: string) => {
    const updated = drafts.filter((item) => item.id !== draftId);
    setDrafts(updated);
    localStorage.setItem(draftListStorageKey, JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Draft modal */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <p className="text-sm font-semibold text-gray-900">Saved Drafts</p>
                <p className="text-xs text-gray-500">Select a draft to continue</p>
              </div>
              <button
                onClick={() => setIsDraftModalOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
              {drafts.length === 0 && (
                <div className="p-4 text-sm text-gray-600">No drafts saved yet.</div>
              )}
              {drafts.map((draft) => (
                <div key={draft.id} className="p-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{draft.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(draft.savedAt).toLocaleString()} • Step {draft.currentStep || 1}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoadDraft(draft.id)}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="px-3 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Loan</h1>
          <p className="text-sm text-gray-500 mt-1">Complete the loan application process</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDraftModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">View Drafts</span>
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Save Draft</span>
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-all ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Search by NIC</label>
                <input
                  type="text"
                  value={formData.nic}
                  onChange={(e) => handleNicChange(e.target.value)}
                  placeholder="Enter NIC to auto-fill"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter NIC to auto-fill center, group, and customer
                </p>
              </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        {/* Step 1: Select Customer */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Customer</h2>

            <div className="grid md:grid-cols-2 gap-4">
             

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Select Center *</label>
                <select
                  value={formData.center}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      center: e.target.value,
                      group: '',
                      customer: ''
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Choose a center</option>
                  {centers.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Select Group *</label>
                <select
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value, customer: '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={!formData.center}
                >
                  <option value="">Choose a group</option>
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Select Customer *</label>
                <select
                  value={formData.customer}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={!formData.group}
                >
                  <option value="">Choose a customer</option>
                  {filteredCustomers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.displayName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedCustomerRecord && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 font-medium mb-2">Customer Profile</p>
                <div className="grid md:grid-cols-3 gap-3 text-sm text-blue-900">
                  <div>
                    <p className="text-blue-600">Customer:</p>
                    <p className="font-medium">{selectedCustomerRecord.displayName}</p>
                  </div>
                  <div>
                    <p className="text-blue-600">NIC:</p>
                    <p className="font-medium">{selectedCustomerRecord.nic}</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Center / Group:</p>
                    <p className="font-medium">
                      {selectedCustomerRecord.center} / {selectedCustomerRecord.group}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-600">Status:</p>
                    <p className="font-medium">{selectedCustomerRecord.status}</p>
                  </div>
                  <div>
                    <p className="text-blue-600">Previous Loans:</p>
                    <p className="font-medium">{selectedCustomerRecord.previousLoans}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Loan Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Requested Amount (LKR) *</label>
                <input
                  type="number"
                  value={formData.requestedAmount}
                  onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Approved Amount (LKR) *</label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter approved amount"
                />
                <p className="text-xs text-gray-500 mt-1">
                  System maximum: LKR 500,000
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Interest Rate (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="e.g., 12.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Rental Type *</label>
                <select
                  value={formData.rentalType}
                  onChange={(e) => setFormData({ ...formData, rentalType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tenure (months) *</label>
                <input
                  type="number"
                  value={formData.tenure}
                  onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter tenure"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Fees & Charges</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Processing Fee (LKR)</label>
                  <input
                    type="number"
                    value={formData.processingFee}
                    onChange={(e) => setFormData({ ...formData, processingFee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Documentation Fee (LKR)</label>
                  <input
                    type="number"
                    value={formData.documentationFee}
                    onChange={(e) => setFormData({ ...formData, documentationFee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Insurance Fee (LKR)</label>
                  <input
                    type="number"
                    value={formData.insuranceFee}
                    onChange={(e) => setFormData({ ...formData, insuranceFee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Remarks</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                placeholder="Enter any additional remarks..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h2>

            <div className="grid grid-cols-2 gap-4">
              {['Customer Photo', 'NIC Copy', 'Address Proof', 'Income Proof', 'Bank Statement', 'Application Form'].map((doc) => (
                <div key={doc} className="border border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{doc}</p>
                  <p className="text-xs text-gray-500 mt-1">Click to upload or drag and drop</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Document Guidelines</p>
                  <ul className="text-xs text-yellow-800 mt-2 space-y-1 list-disc list-inside">
                    <li>All documents must be clear and legible</li>
                    <li>Accepted formats: PDF, JPG, PNG (Max 5MB per file)</li>
                    <li>Customer photo must be recent (within 3 months)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Review & Submit</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Center:</span>
                    <span className="font-medium text-gray-900">{formData.center || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group:</span>
                    <span className="font-medium text-gray-900">{formData.group || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NIC:</span>
                    <span className="font-medium text-gray-900">{formData.nic || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium text-gray-900">
                      {selectedCustomerRecord?.displayName || 'Not selected'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Loan Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requested Amount:</span>
                    <span className="font-medium text-gray-900">LKR {formData.requestedAmount || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved Amount:</span>
                    <span className="font-medium text-gray-900">LKR {formData.loanAmount || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-medium text-gray-900">{formData.interestRate || '0'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className="font-medium text-gray-900">{formData.tenure || '0'} months</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Fees & Charges</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-medium text-gray-900">LKR {formData.processingFee || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documentation Fee:</span>
                    <span className="font-medium text-gray-900">LKR {formData.documentationFee || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance Fee:</span>
                    <span className="font-medium text-gray-900">LKR {formData.insuranceFee || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Total Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Loan Amount:</span>
                    <span className="font-medium text-blue-900">LKR {formData.loanAmount || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Fees:</span>
                    <span className="font-medium text-blue-900">
                      LKR {(Number(formData.processingFee || 0) + Number(formData.documentationFee || 0) + Number(formData.insuranceFee || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-300">
                    <span className="text-blue-700 font-semibold">Net Disbursement:</span>
                    <span className="font-bold text-blue-900">
                      LKR {(Number(formData.loanAmount || 0) - (Number(formData.processingFee || 0) + Number(formData.documentationFee || 0) + Number(formData.insuranceFee || 0))).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Ready to Submit</p>
                  <p className="text-xs text-green-800 mt-1">
                    Please review all information carefully. Once submitted, the loan application will be sent for approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Previous</span>
        </button>

        <div className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </div>

        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-sm font-medium">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Submit for Approval</span>
          </button>
        )}
      </div>
    </div>
  );
}
