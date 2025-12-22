'use client'

import React, { useState } from 'react';
import { DollarSign, Printer, Calendar, User, FileText, X, Check, TrendingUp, AlertCircle } from 'lucide-react';

export function CollectionScreen() {
  const [selectedCenter, setSelectedCenter] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');

  const centers = ['Colombo Central CSU', 'Kandy CSU', 'Galle CSU'];
  const scheduledPayments = [
    { id: '1', customer: 'Nimal Perera', customerId: 'CUST001', contractNo: 'LN-2024-0001', dueAmount: 25000, arrears: 0, group: 'Colombo Group A' },
    { id: '2', customer: 'Saman Silva', customerId: 'CUST002', contractNo: 'LN-2024-0003', dueAmount: 18000, arrears: 7500, group: 'Colombo Group A' },
    { id: '3', customer: 'Dilini Fernando', customerId: 'CUST005', contractNo: 'LN-2024-0007', dueAmount: 15000, arrears: 0, group: 'Colombo Group B' }
  ];

  const handleCollectPayment = (customer: any) => {
    setSelectedCustomer(customer);
    setPaymentAmount(String(customer.dueAmount + customer.arrears));
    setShowPaymentModal(true);
  };

  const handleProcessPayment = () => {
    setShowPaymentModal(false);
    setShowReceiptPreview(true);
  };

  const handlePrintReceipt = () => {
    window.print();
    setShowReceiptPreview(false);
  };

  const totalDue = scheduledPayments.reduce((sum, p) => sum + p.dueAmount, 0);
  const totalArrears = scheduledPayments.reduce((sum, p) => sum + p.arrears, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Collection Screen</h1>
        <p className="text-sm text-gray-500 mt-1">Collect payments and generate receipts</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Select Center *</label>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Choose a center</option>
              {centers.map((center) => (
                <option key={center} value={center}>{center}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Collection Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Time Window</label>
            <input
              type="time"
              defaultValue="10:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {selectedCenter && (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Due</p>
              <p className="text-2xl font-bold text-gray-900">LKR {totalDue.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Collected</p>
              <p className="text-2xl font-bold text-green-600">LKR 0</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Arrears</p>
              <p className="text-2xl font-bold text-red-600">LKR {totalArrears.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Suspense</p>
              <p className="text-2xl font-bold text-yellow-600">LKR 0</p>
            </div>
          </div>

          {/* Scheduled Payments Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <h3 className="text-sm font-semibold text-gray-900">Scheduled Payments - {selectedCenter}</h3>
            </div>

            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Contract No</div>
                <div className="col-span-2">Group</div>
                <div className="col-span-2">Due Amount</div>
                <div className="col-span-2">Arrears</div>
                <div className="col-span-2">Action</div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {scheduledPayments.map((payment) => (
                <div key={payment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Customer */}
                    <div className="col-span-2">
                      <p className="font-medium text-gray-900">{payment.customer}</p>
                      <p className="text-xs text-gray-500">{payment.customerId}</p>
                    </div>

                    {/* Contract No */}
                    <div className="col-span-2">
                      <p className="text-sm text-gray-900">{payment.contractNo}</p>
                    </div>

                    {/* Group */}
                    <div className="col-span-2">
                      <p className="text-sm text-gray-700">{payment.group}</p>
                    </div>

                    {/* Due Amount */}
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-900">LKR {payment.dueAmount.toLocaleString()}</p>
                    </div>

                    {/* Arrears */}
                    <div className="col-span-2">
                      {payment.arrears > 0 ? (
                        <p className="text-sm font-medium text-red-600">LKR {payment.arrears.toLocaleString()}</p>
                      ) : (
                        <p className="text-sm text-gray-500">-</p>
                      )}
                    </div>

                    {/* Action */}
                    <div className="col-span-2">
                      <button
                        onClick={() => handleCollectPayment(payment)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Collect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Collect Payment</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium text-gray-900">{selectedCustomer.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract No:</span>
                    <span className="font-medium text-gray-900">{selectedCustomer.contractNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Amount:</span>
                    <span className="font-medium text-gray-900">LKR {selectedCustomer.dueAmount.toLocaleString()}</span>
                  </div>
                  {selectedCustomer.arrears > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrears:</span>
                      <span className="font-medium text-red-600">LKR {selectedCustomer.arrears.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-900 font-semibold">Total Payable:</span>
                    <span className="font-bold text-gray-900">LKR {(selectedCustomer.dueAmount + selectedCustomer.arrears).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Payment Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentType"
                      value="full"
                      checked={paymentType === 'full'}
                      onChange={(e) => setPaymentType(e.target.value as 'full')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Full Payment</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentType"
                      value="partial"
                      checked={paymentType === 'partial'}
                      onChange={(e) => setPaymentType(e.target.value as 'partial')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Partial Payment</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Payment Amount (LKR) *</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Payment Method *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Remarks</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  placeholder="Enter any remarks..."
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {showReceiptPreview && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Payment Receipt</h2>
                <button
                  onClick={() => setShowReceiptPreview(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center border-b border-gray-200 pb-4">
                <h3 className="text-lg font-bold text-gray-900">Microfinance LMS</h3>
                <p className="text-sm text-gray-600 mt-1">Official Payment Receipt</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt No:</span>
                  <span className="font-medium text-gray-900">RCT-{new Date().getTime()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium text-gray-900">{selectedCustomer.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contract No:</span>
                  <span className="font-medium text-gray-900">{selectedCustomer.contractNo}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">Amount Paid:</span>
                  <span className="font-bold text-gray-900">LKR {paymentAmount}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">Payment Successful</p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
              <button
                onClick={() => setShowReceiptPreview(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium text-sm"
              >
                Close
              </button>
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
