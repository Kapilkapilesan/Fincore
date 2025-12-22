'use client'

import React, { useState } from 'react';
import { Home, Info, Download, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';

export function PublicWebsite() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'downloads' | 'contact'>('home');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Public Website Preview</h1>
        <p className="text-gray-600 mt-1">Preview of customer-facing website</p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          {[
            { id: 'home' as const, label: 'Home', icon: <Home className="w-4 h-4" /> },
            { id: 'about' as const, label: 'About Us', icon: <Info className="w-4 h-4" /> },
            { id: 'downloads' as const, label: 'Downloads', icon: <Download className="w-4 h-4" /> },
            { id: 'contact' as const, label: 'Contact', icon: <Mail className="w-4 h-4" /> }
          ].map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activePage === page.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page.icon}
              <span>{page.label}</span>
            </button>
          ))}
        </div>

        {/* Page Content */}
        <div className="p-6">
          {activePage === 'home' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-12 text-center text-white">
                <h1 className="text-white mb-4">Empowering Communities Through Microfinance</h1>
                <p className="text-blue-100 text-xl mb-6">
                  Supporting small businesses and entrepreneurs with accessible financial solutions
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Apply for Loan
                </button>
              </div>

              {/* Products Section */}
              <div>
                <h2 className="text-gray-900 mb-6">Our Products & Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Microfinance Loans', desc: 'Small loans for micro-entrepreneurs', rate: '12% - 15%' },
                    { title: 'Group Loans', desc: 'Loans for self-help groups', rate: '11% - 14%' },
                    { title: 'Business Loans', desc: 'Loans for small businesses', rate: '13% - 16%' }
                  ].map((product, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-gray-900 mb-3">{product.title}</h3>
                      <p className="text-gray-600 mb-4">{product.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">Interest: {product.rate}</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          Learn More <ChevronRight className="w-4 h-4 inline" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Payment Details */}
              <div>
                <h2 className="text-gray-900 mb-6">Bank Payment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { bank: 'State Bank of India', account: '1234567890', ifsc: 'SBIN0001234', branch: 'Main Branch' },
                    { bank: 'HDFC Bank', account: '9876543210', ifsc: 'HDFC0004567', branch: 'Central Branch' }
                  ].map((bank, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-gray-900 mb-3">{bank.bank}</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">Account No: <span className="text-gray-900">{bank.account}</span></p>
                        <p className="text-gray-600">IFSC Code: <span className="text-gray-900">{bank.ifsc}</span></p>
                        <p className="text-gray-600">Branch: <span className="text-gray-900">{bank.branch}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* News & Updates */}
              <div>
                <h2 className="text-gray-900 mb-6">Latest News & Updates</h2>
                <div className="space-y-4">
                  {[
                    { title: 'New Interest Rate Announced', date: '2024-12-10', desc: 'We are pleased to announce reduced interest rates for group loans' },
                    { title: 'Holiday Notice', date: '2024-12-05', desc: 'Our offices will be closed on December 25th for Christmas' },
                    { title: 'New Branch Opening', date: '2024-11-28', desc: 'We are expanding! New branch opening in Pune next month' }
                  ].map((news, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-gray-900 mb-1">{news.title}</h4>
                          <p className="text-sm text-gray-600">{news.desc}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{news.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePage === 'about' && (
            <div className="space-y-6">
              <h2 className="text-gray-900">About Our Organization</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are a leading microfinance institution dedicated to providing financial services to underserved communities. 
                  Our mission is to empower small entrepreneurs and self-help groups with accessible credit and financial solutions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With over 10 years of experience in the microfinance sector, we have successfully served thousands of customers 
                  across multiple branches, helping them grow their businesses and improve their livelihoods.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <p className="text-4xl text-blue-600 mb-2">10+</p>
                  <p className="text-gray-700">Years of Service</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <p className="text-4xl text-green-600 mb-2">5000+</p>
                  <p className="text-gray-700">Happy Customers</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <p className="text-4xl text-purple-600 mb-2">₹50Cr+</p>
                  <p className="text-gray-700">Loans Disbursed</p>
                </div>
              </div>
            </div>
          )}

          {activePage === 'downloads' && (
            <div className="space-y-6">
              <h2 className="text-gray-900 mb-6">Downloads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Loan Application Form', size: '245 KB', type: 'PDF' },
                  { name: 'Interest Rate Chart', size: '180 KB', type: 'PDF' },
                  { name: 'KYC Document Checklist', size: '156 KB', type: 'PDF' },
                  { name: 'Terms and Conditions', size: '320 KB', type: 'PDF' },
                  { name: 'Group Loan Guidelines', size: '290 KB', type: 'PDF' },
                  { name: 'Annual Report 2023', size: '1.2 MB', type: 'PDF' }
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                        <Download className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-gray-900 mb-6">Contact Us</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                  <h3 className="text-gray-900 mb-4">Send us a Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 "
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Message *</label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Your message..."
                      />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Send Message
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 mb-1">Head Office</p>
                        <p className="text-gray-600">123 Main Street, Andheri West<br />Mumbai, Maharashtra 400058</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 mb-1">Phone</p>
                        <p className="text-gray-600">+91 22 1234 5678<br />+91 22 8765 4321</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 mb-1">Email</p>
                        <p className="text-gray-600">info@lms.com<br />support@lms.com</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-900 mb-3">Follow Us</p>
                      <div className="flex gap-3">
                        <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                          <Facebook className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                          <Twitter className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
