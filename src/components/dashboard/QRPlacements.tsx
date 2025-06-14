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

// Mock data for demo purposes
const mockStrUnits = [
  {
    id: '1',
    name: 'Luxury Downtown Loft',
    neighborhood: 'Downtown',
    size: '2BR/2BA',
    guestVolume: 85,
    basePrice: 120,
    status: 'available',
    currentBid: null
  },
  {
    id: '2',
    name: 'Modern Midtown Suite',
    neighborhood: 'Midtown',
    size: '1BR/1BA',
    guestVolume: 72,
    basePrice: 95,
    status: 'won',
    currentBid: 110
  },
  {
    id: '3',
    name: 'East Side Studio',
    neighborhood: 'East Side',
    size: 'Studio',
    guestVolume: 60,
    basePrice: 75,
    status: 'bidding',
    currentBid: 85
  },
  {
    id: '4',
    name: 'Downtown Penthouse',
    neighborhood: 'Downtown',
    size: '3BR/2BA',
    guestVolume: 90,
    basePrice: 200,
    status: 'available',
    currentBid: null
  },
  {
    id: '5',
    name: 'Midtown Apartment',
    neighborhood: 'Midtown',
    size: '2BR/1BA',
    guestVolume: 68,
    basePrice: 110,
    status: 'lost',
    currentBid: 125
  },
  {
    id: '6',
    name: 'East Side Condo',
    neighborhood: 'East Side',
    size: '1BR/1BA',
    guestVolume: 55,
    basePrice: 80,
    status: 'available',
    currentBid: null
  }
];

const QRPlacements: React.FC = () => {
  const [strUnits, setStrUnits] = useState(mockStrUnits);
  const [filter, setFilter] = useState('all');
  const [bidAmount, setBidAmount] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');

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
    const matchesFilter = filter === 'all' || unit.neighborhood.toLowerCase() === filter.toLowerCase();
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: 'Active Placements', value: '5', icon: QrCode, color: 'blue' },
    { label: 'This Month Spend', value: '$247', icon: DollarSign, color: 'green' },
    { label: 'New Customers', value: '23', icon: Users, color: 'purple' },
    { label: 'Conversion Rate', value: '3.2%', icon: TrendingUp, color: 'orange' }
  ];

  const getStatColors = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8">
      {/* Header */}
      <div className="px-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">QR Code Placements</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">Bid on short-term rental placements to attract guests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getStatColors(stat.color);
          return (
            <div key={index} className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${colors.text}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-xs md:text-sm truncate">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 mx-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3 md:space-x-4">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Neighborhoods</option>
              <option value="downtown">Downtown</option>
              <option value="midtown">Midtown</option>
              <option value="east side">East Side</option>
            </select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 px-2">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{unit.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm flex items-center">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{unit.neighborhood}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getStatusColor(unit.status)}`}>
                  {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 md:space-y-3 mb-4">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{unit.size}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Guest Volume:</span>
                  <span className="font-medium">{unit.guestVolume}%</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-medium text-green-600">${unit.basePrice}/month</span>
                </div>
                {unit.currentBid && (
                  <div className="flex justify-between text-xs md:text-sm">
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
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleBid(unit.id, bidAmount[unit.id])}
                      disabled={!bidAmount[unit.id] || bidAmount[unit.id] <= unit.basePrice}
                      className="px-3 md:px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
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
                  <p className="text-green-800 text-xs md:text-sm font-medium">
                    🎉 Congratulations! Your QR code is now active in this unit.
                  </p>
                </div>
              )}

              {unit.status === 'bidding' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-xs md:text-sm font-medium">
                    ⏳ Your bid is being reviewed. Results within 24 hours.
                  </p>
                </div>
              )}

              {unit.status === 'lost' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-xs md:text-sm font-medium">
                    😔 Bid was not accepted. Try bidding higher next time.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <div className="text-center py-12 px-2">
          <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No units found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Bidding Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 mx-2">
        <h3 className="text-base md:text-lg font-semibold text-blue-900 mb-3">💡 Bidding Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
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