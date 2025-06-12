import React, { useState } from 'react';
import { 
  QrCode, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Filter,
  Search,
  Users,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const QRPlacements: React.FC = () => {
  const { strUnits, setStrUnits } = useApp();
  const [filter, setFilter] = useState('all');
  const [bidAmount, setBidAmount] = useState<Record<string, number>>({});

  const handleBid = (unitId: string, amount: number) => {
    setStrUnits(strUnits.map(unit => 
      unit.id === unitId 
        ? { ...unit, currentBid: amount, status: 'bidding' }
        : unit
    ));
    setBidAmount({ ...bidAmount, [unitId]: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800';
      case 'bidding': return 'bg-yellow-100 text-yellow-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUnits = strUnits.filter(unit => {
    if (filter === 'all') return true;
    return unit.neighborhood.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Code Placements</h1>
          <p className="text-gray-600 mt-2">Bid on short-term rental placements to attract guests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Placements', value: '5', icon: QrCode, color: 'text-blue-600' },
          { label: 'This Month Spend', value: '$247', icon: DollarSign, color: 'text-green-600' },
          { label: 'New Customers', value: '23', icon: Users, color: 'text-purple-600' },
          { label: 'Conversion Rate', value: '3.2%', icon: TrendingUp, color: 'text-orange-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === 'text-blue-600' ? 'bg-blue-100' :
                  stat.color === 'text-green-600' ? 'bg-green-100' :
                  stat.color === 'text-purple-600' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Neighborhoods</option>
            <option value="downtown">Downtown</option>
            <option value="midtown">Midtown</option>
            <option value="east side">East Side</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search units..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                    <p className="text-gray-600 text-sm flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {unit.neighborhood}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                  {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{unit.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guest Volume:</span>
                  <span className="font-medium">{unit.guestVolume}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-medium text-green-600">${unit.basePrice}/month</span>
                </div>
                {unit.currentBid && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Bid:</span>
                    <span className="font-medium text-blue-600">${unit.currentBid}/month</span>
                  </div>
                )}
              </div>

              {unit.status === 'available' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder={`Min $${unit.basePrice + 1}`}
                      value={bidAmount[unit.id] || ''}
                      onChange={(e) => setBidAmount({ ...bidAmount, [unit.id]: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleBid(unit.id, bidAmount[unit.id])}
                      disabled={!bidAmount[unit.id] || bidAmount[unit.id] <= unit.basePrice}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Bid
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Suggested bid: ${unit.basePrice + Math.ceil(unit.basePrice * 0.1)} 
                    (10% above base price)
                  </p>
                </div>
              )}

              {unit.status === 'won' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm font-medium">
                    🎉 Congratulations! Your QR code is now active in this unit.
                  </p>
                </div>
              )}

              {unit.status === 'bidding' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm font-medium">
                    ⏳ Your bid is being reviewed. Results within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bidding Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Bidding Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Optimize Your Bids</h4>
            <ul className="text-sm space-y-1">
              <li>• Bid 10-15% above base price for better chances</li>
              <li>• Higher guest volume units = more exposure</li>
              <li>• Downtown locations typically perform better</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Budget Management</h4>
            <ul className="text-sm space-y-1">
              <li>• Set a monthly budget limit</li>
              <li>• Start with 3-5 strategic placements</li>
              <li>• Monitor performance and adjust accordingly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRPlacements;