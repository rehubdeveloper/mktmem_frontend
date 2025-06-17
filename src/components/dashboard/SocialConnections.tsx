import React, { useContext, useState } from 'react';
import {
  Link,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap,
  BarChart3,
  Users,
  Calendar,
  Landmark
} from 'lucide-react';
import { AppContext } from '../../context/AppContext';


interface SocialPlatdiv {
  id: string;
  name: string;
  connected: boolean;
  username?: string;
  followers?: number;
  lastPost?: string;
  status: 'connected' | 'error' | 'pending' | 'disconnected';
  features: string[];
}

const SocialConnections: React.FC = () => {
  const [platdivs, setPlatdivs] = useState<SocialPlatdiv[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      connected: true,
      username: '@tacosofia',
      followers: 1240,
      lastPost: '2 hours ago',
      status: 'connected',
      features: ['Posts', 'Stories', 'Events', 'Reviews']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      connected: true,
      username: '@tacosofia_atx',
      followers: 2850,
      lastPost: '4 hours ago',
      status: 'connected',
      features: ['Posts', 'Stories', 'Reels', 'IGTV']
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      connected: false,
      status: 'disconnected',
      features: ['Tweets', 'Threads', 'Spaces']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      connected: false,
      status: 'disconnected',
      features: ['Posts', 'Articles', 'Company Updates']
    },
    {
      id: 'google',
      name: 'Google Business Profile',
      connected: true,
      username: 'Taco Sofia',
      followers: 450,
      lastPost: '1 day ago',
      status: 'connected',
      features: ['Posts', 'Updates', 'Reviews', 'Q&A']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      connected: false,
      status: 'disconnected',
      features: ['Videos', 'Live', 'Stories']
    },
    {
      id: 'youtube',
      name: 'YouTube Shorts',
      connected: false,
      status: 'disconnected',
      features: ['Shorts', 'Videos', 'Community']
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Zap className="w-5 h-5 text-yellow-600" />;
      default:
        return <Link className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConnect = (platdivId: string) => {
    setPlatdivs(platdivs.map(platdiv =>
      platdiv.id === platdivId
        ? { ...platdiv, status: 'pending' as const }
        : platdiv
    ));

    // Simulate connection process
    setTimeout(() => {
      setPlatdivs(platdivs.map(platdiv =>
        platdiv.id === platdivId
          ? {
            ...platdiv,
            connected: true,
            status: 'connected' as const,
            username: `@tacosofia_${platdivId}`,
            followers: Math.floor(Math.random() * 2000) + 500
          }
          : platdiv
      ));
    }, 2000);
  };

  const handleDisconnect = (platdivId: string) => {
    setPlatdivs(platdivs.map(platdiv =>
      platdiv.id === platdivId
        ? {
          ...platdiv,
          connected: false,
          status: 'disconnected' as const,
          username: undefined,
          followers: undefined,
          lastPost: undefined
        }
        : platdiv
    ));
  };

  const connectedPlatdivs = platdivs.filter(p => p.connected);
  const totalFollowers = connectedPlatdivs.reduce((sum, p) => sum + (p.followers || 0), 0);

  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);
  const openDialog = () => setIsOpen(true);
  const [brandName, setBrandName] = useState('');
  const [brandID, setBrandID] = useState('');

  const createBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch('https://mktmem-backend.onrender.com/api/users/brands/create/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to create brand: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setBrandID(data.brand_id);
      console.log('Brand created successfully!');
      return data;

    } catch (error) {
      console.error('Brand creation error:', error);
      throw error;
    }
  }

  const updateBrand = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`https://mktmem-backend.onrender.com/api/users/brands/${brandID}/update/?newName=${brandName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to update brand: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("response:", response);

    } catch (error) {
      console.error('Brand update error:', error);
      throw error;
    }
  };

  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8">
      {/* Header */}
      <div className="px-2 flex w-full justify-between items-center">
        <div className="">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Social Media Connections</h1>

        </div>
        <div className="flex-end items-center">
          <div className="flex justify-end items-center">
            <button
              onClick={(e) => {
                openDialog();
                createBrand(e);
              }}
              className="px-3 md:px-4 flex items-center py-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white border border-gray-300 rounded-md hover:bg-blue-700 transition"
            >
              <Landmark className="w-4 md:w-5 h-4 md:h-5 mr-2 inline-block" />
              <p className='text-xs md:text-lg md:font-bold'>Create Brand</p>
            </button>
          </div>
        </div>

      </div>
      <div className="flex justify-center items-center px-2 md:text-lg md:font-semibold">
        <h1 className="text-gray-600 mt-2 text-sm md:text-base">Connect your social accounts to schedule posts across all platforms</h1>
      </div>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeDialog}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Dialog Content */}
          <div

            className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Create A Brand</h2>
              <p className="text-sm text-gray-500">
                Create a new brand to connect with your social media accounts.
              </p>
            </div>

            {/* form Fields */}
            <div className="grid gap-4">
              <div>
                <label htmlFor="brand-name" className="block text-sm font-medium mb-1">
                  Brand Name
                </label>
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  id="brand-name"
                  placeholder="Enter brand name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>

              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeDialog}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateBrand();
                  closeDialog();
                }}

                type="submit"
                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
              >
                Create Brand
              </button>
            </div>
          </div>
        </>
      )}



      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-2">
        <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Link className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-2xl font-bold text-gray-900">{connectedPlatdivs.length}</p>
              <p className="text-gray-600 text-xs md:text-sm truncate">Connected Accounts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-2xl font-bold text-gray-900">{totalFollowers.toLocaleString()}</p>
              <p className="text-gray-600 text-xs md:text-sm truncate">Total Followers</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-2xl font-bold text-gray-900">24</p>
              <p className="text-gray-600 text-xs md:text-sm truncate">Scheduled Posts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-2xl font-bold text-gray-900">4.2%</p>
              <p className="text-gray-600 text-xs md:text-sm truncate">Avg Engagement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platdiv Connections */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Platdiv Connections</h2>

        <div className="space-y-4 md:space-y-6">
          {platdivs.map(platdiv => (
            <div key={platdiv.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getStatusIcon(platdiv.status)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{platdiv.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0">
                      <span className={`px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(platdiv.status)}`}>
                        {platdiv.status.charAt(0).toUpperCase() + platdiv.status.slice(1)}
                      </span>
                      {platdiv.username && (
                        <span className="text-xs md:text-sm text-gray-600 truncate">{platdiv.username}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
                  {platdiv.connected && (
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}

                  {platdiv.connected ? (
                    <button
                      onClick={() => handleDisconnect(platdiv.id)}
                      className="px-3 md:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(platdiv.id)}
                      disabled={platdiv.status === 'pending'}
                      className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${platdiv.status === 'pending'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                    >
                      {platdiv.status === 'pending' ? 'Connecting...' : 'Connect'}
                    </button>
                  )}
                </div>
              </div>

              {platdiv.connected && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-gray-100">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Followers</span>
                    </div>
                    <p className="text-base md:text-lg font-bold text-blue-900">{platdiv.followers?.toLocaleString()}</p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Last Post</span>
                    </div>
                    <p className="text-base md:text-lg font-bold text-green-900">{platdiv.lastPost}</p>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Features</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {platdiv.features.slice(0, 2).map(feature => (
                        <span key={feature} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {platdiv.features.length > 2 && (
                        <span className="text-xs text-purple-600">+{platdiv.features.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!platdiv.connected && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Available features:</p>
                  <div className="flex flex-wrap gap-2">
                    {platdiv.features.map(feature => (
                      <span key={feature} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Integration Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-200 mx-2">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">🚀 Why Connect Your Social Accounts?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Unified Scheduling</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Schedule posts across all platdivs simultaneously</li>
              <li>• Optimize posting times for each platdiv automatically</li>
              <li>• Maintain consistent brand messaging everywhere</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Advanced Analytics</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Track perdivance across all connected platdivs</li>
              <li>• Identify your best-perdiving content types</li>
              <li>• Get AI-powered recommendations for improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialConnections;