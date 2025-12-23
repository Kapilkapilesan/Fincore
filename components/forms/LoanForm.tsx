'use client'

import React from 'react';
import { Button } from '@/components/common/Button';

interface LoanFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export function LoanForm({ onSubmit, initialData, isLoading }: LoanFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Customer
        </label>
        <select
          name="customerId"
          defaultValue={initialData?.customerId}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">Select Customer</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Loan Amount
        </label>
        <input
          type="number"
          name="amount"
          defaultValue={initialData?.amount}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Interest Rate (%)
        </label>
        <input
          type="number"
          name="interestRate"
          step="0.01"
          defaultValue={initialData?.interestRate}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Term (months)
        </label>
        <input
          type="number"
          name="term"
          defaultValue={initialData?.term}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update' : 'Create'} Loan
        </Button>
      </div>
    </form>
  );
}










