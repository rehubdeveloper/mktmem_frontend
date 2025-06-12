import React, { useState } from 'react';
import { 
  MapPin, 
  Percent, 
  Users, 
  TrendingUp,
  Settings,
  Eye,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ItineraryInclusion: React.FC = () => {
  const { itineraryCategories, setItineraryCategories } = useApp();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const toggleParticipation = (categoryId: string) => {
    setItineraryCategories(categories =>
      categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, participating: !cat.participating }
          : cat
      )
    );
  };

  const updateDiscount = (categoryId: string, discount: number) => {
    setItineraryCategories(categories =>
      categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, discount }
          : cat
      )
    );
  };

  const updateRedemptionCap = (categoryId: string, cap: number) => {
    setItineraryCategories(categories =>
      categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, redemptionCap: cap }
          : cat
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Itinerary Inclusion</h1>
          <p className="text-gray-600 mt-2">Get featured in curated guest experience packages</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Categories', value: '2', icon: MapPin, color: 'text-green-600' },
          { label: 'Bookings This Month', value: '18', icon: Calendar, color: 'text-blue-600' },
          { label: 'Revenue Generated', value: '$1,240', icon: TrendingUp, color: 'text-purple-600' },
          { label: 'Avg Discount', value: '12.5%', icon: Percent, color: 'text-orange-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === 'text-green-600' ? 'bg-green-100' :
                  stat.color === 'text-blue-600' ? 'bg-blue-100' :
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

      {/* Itinerary Categories */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Experience Categories</h2>
        
        <div className="grid gap-6">
          {itineraryCategories.map(category => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    category.participating ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <MapPin className={`w-6 h-6 ${
                      category.participating ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleParticipation(category.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      category.participating ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        category.participating ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {category.participating && (
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Percent className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Current Discount</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{category.discount}%</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">This Month</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      {Math.floor(Math.random() * 10) + 3} bookings
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">
                      ${Math.floor(Math.random() * 500) + 200}
                    </p>
                  </div>
                </div>
              )}

              {editingCategory === category.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Category Settings</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Percentage
                      </label>
                      <select
                        value={category.discount}
                        onChange={(e) => updateDiscount(category.id, parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(value => (
                          <option key={value} value={value}>{value}%</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weekly Redemption Limit
                      </label>
                      <input
                        type="number"
                        value={category.redemptionCap || ''}
                        onChange={(e) => updateRedemptionCap(category.id, parseInt(e.target.value) || 0)}
                        placeholder="No limit"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Guest Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Guest View Preview</h3>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="max-w-md">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">T</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Taco Sofia</h4>
                  <p className="text-gray-600 text-sm">Mexican Restaurant</p>
                </div>
              </div>
              <div className="space-y-2">
                {itineraryCategories.filter(cat => cat.participating).map(cat => (
                  <div key={cat.id} className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm text-gray-700">{cat.name}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {cat.discount}% off
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Show your MemStays booking confirmation to redeem
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryInclusion;