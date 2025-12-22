import React from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: {
    name: string;
    role: string;
    branch?: string;
  };
}

export function Dashboard({ user }: DashboardProps) {
  // Mock data
  const stats = [
    {
      title: 'Total Active Loans',
      value: 'LKR 12,450,000',
      change: '+12.5%',
      trend: 'up',
      icon: <FileText className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Collections Today',
      value: 'LKR 245,000',
      change: '+8.2%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'Total Arrears',
      value: 'LKR 89,500',
      change: '-3.1%',
      trend: 'down',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'red'
    },
    {
      title: 'Active Customers',
      value: '1,245',
      change: '+5.4%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'purple'
    }
  ];

  const upcomingCollections = [
    { date: '1st', amount: 'LKR 125,000', customers: 45 },
    { date: '8th', amount: 'LKR 98,000', customers: 38 },
    { date: '15th', amount: 'LKR 142,000', customers: 52 },
    { date: '22nd', amount: 'LKR 115,000', customers: 41 }
  ];

  const branchData = [
    { branch: 'Head Office', loans: 45, collections: 320000, arrears: 15000 },
    { branch: 'Branch A', loans: 32, collections: 245000, arrears: 8500 },
    { branch: 'Branch B', loans: 28, collections: 198000, arrears: 12000 },
    { branch: 'Branch C', loans: 38, collections: 275000, arrears: 9800 }
  ];

  const monthlyData = [
    { month: 'Jan', collections: 2100000, disbursed: 1800000 },
    { month: 'Feb', collections: 2300000, disbursed: 2000000 },
    { month: 'Mar', collections: 2500000, disbursed: 2200000 },
    { month: 'Apr', collections: 2400000, disbursed: 2100000 },
    { month: 'May', collections: 2600000, disbursed: 2300000 },
    { month: 'Jun', collections: 2800000, disbursed: 2500000 }
  ];

  const recentActivities = [
    { type: 'loan', message: 'New loan approved for Nimal Perera', amount: 'LKR 50,000', time: '10 min ago' },
    { type: 'collection', message: 'Payment received from Kamala Silva', amount: 'LKR 5,000', time: '25 min ago' },
    { type: 'alert', message: 'Reprint requested by Staff A', amount: '', time: '1 hour ago' },
    { type: 'customer', message: 'New customer registration', amount: '', time: '2 hours ago' }
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
      green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
      red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-700/30">
        <h1 className="text-white mb-2 font-semibold tracking-tight text-xl sm:text-2xl">Hello, {user.name}</h1>
        <p className="text-blue-100 dark:text-blue-200 font-normal text-sm sm:text-base">Track team progress here. You almost reach a goal!</p>
        <div className="flex items-center gap-2 mt-4 text-blue-100 dark:text-blue-200">
          <Calendar className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${getColorClass(stat.color)}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-semibold ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30' : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
            <p className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100 mb-1.5 font-semibold tracking-tight">{stat.value}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Branch Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold tracking-tight">Branch Performance</h3>
            <select className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full sm:w-auto">
              <option>Last 30 days</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[280px]">
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="branch" tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontFamily: 'Inter'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }} />
              <Bar dataKey="collections" fill="#3B82F6" name="Collections (LKR)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="arrears" fill="#EF4444" name="Arrears (LKR)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold tracking-tight">Performance</h3>
            <select className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full sm:w-auto">
              <option>01-07 May</option>
              <option>This Month</option>
              <option>This Quarter</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[280px]">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontFamily: 'Inter'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }} />
              <Line type="monotone" dataKey="collections" stroke="#10B981" strokeWidth={3} name="Collections (LKR)" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="disbursed" stroke="#F59E0B" strokeWidth={3} name="Disbursed (LKR)" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Upcoming Collections */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold tracking-tight">Current Tasks</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Done 30%</p>
            </div>
            <select className="text-xs sm:text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full sm:w-auto">
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div className="space-y-2">
            {upcomingCollections.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-medium truncate">{item.date} Collection</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-4 mt-1 font-medium">{item.customers} customers</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold ml-2">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 lg:col-span-2">
          <h3 className="text-gray-900 dark:text-gray-100 mb-5 font-semibold tracking-tight">Activity</h3>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors group">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'loan' ? 'bg-blue-50 dark:bg-blue-900/30' :
                  activity.type === 'collection' ? 'bg-green-50 dark:bg-green-900/30' :
                  activity.type === 'alert' ? 'bg-yellow-50 dark:bg-yellow-900/30' :
                  'bg-purple-50 dark:bg-purple-900/30'
                }`}>
                  {activity.type === 'loan' && <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />}
                  {activity.type === 'collection' && <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />}
                  {activity.type === 'alert' && <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400" />}
                  {activity.type === 'customer' && <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-medium leading-relaxed">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{activity.time}</p>
                </div>
                {activity.amount && (
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold">{activity.amount}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-3.5 shadow-sm">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm sm:text-base text-yellow-900 font-medium leading-relaxed">3 pending reprint requests and 1 reversal request awaiting approval</p>
          <button className="text-xs sm:text-sm text-yellow-700 hover:text-yellow-800 mt-2 flex items-center gap-1 font-semibold">
            Review now <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}