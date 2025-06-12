import React from 'react';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const Billing: React.FC = () => {
  const currentBill = {
    total: 247.50,
    dueDate: '2024-02-01',
    status: 'current',
    items: [
      { service: 'Presence Marketing', amount: 199.00, type: 'subscription' },
      { service: 'QR Placements - Downtown Loft A', amount: 18.50, type: 'bid' },
      { service: 'QR Placements - East Side House', amount: 20.00, type: 'bid' },
      { service: 'QR Placements - Midtown Studio', amount: 10.00, type: 'bid' }
    ]
  };

  const billingHistory = [
    { date: '2024-01-01', amount: 231.25, status: 'paid', invoice: 'INV-001' },
    { date: '2023-12-01', amount: 199.00, status: 'paid', invoice: 'INV-002' },
    { date: '2023-11-01', amount: 278.50, status: 'paid', invoice: 'INV-003' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-2">Manage your subscription and view payment history</p>
        </div>
        <button className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* Current Bill */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Current Bill</h2>
              <p className="text-gray-600">Due {new Date(currentBill.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">${currentBill.total.toFixed(2)}</p>
            <p className="text-green-600 font-medium">Current</p>
          </div>
        </div>

        <div className="space-y-4">
          {currentBill.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'subscription' ? 'bg-orange-400' : 'bg-blue-400'
                }`} />
                <span className="text-gray-900">{item.service}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.type === 'subscription' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.type === 'subscription' ? 'Monthly' : 'Usage'}
                </span>
              </div>
              <span className="font-medium text-gray-900">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-gray-600">
            <CreditCard className="w-4 h-4" />
            <span>Payment Method: •••• 4242</span>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Pay Now
          </button>
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Presence Marketing</h3>
              <p className="text-gray-600 text-sm">Monthly subscription</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">$199.00</p>
          <p className="text-green-600 text-sm">Fixed monthly cost</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">QR Placements</h3>
              <p className="text-gray-600 text-sm">Usage-based billing</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">$48.50</p>
          <p className="text-blue-600 text-sm">3 active placements</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Itinerary Inclusion</h3>
              <p className="text-gray-600 text-sm">Commission-based</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">$0.00</p>
          <p className="text-green-600 text-sm">No monthly fee</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-mono text-sm">
                    {bill.invoice}
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    ${bill.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bill.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status === 'paid' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span className="capitalize">{bill.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
              <CreditCard className="w-6 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-gray-600 text-sm">Expires 12/25</p>
            </div>
          </div>
          <button className="text-orange-600 hover:text-orange-700 font-medium">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;