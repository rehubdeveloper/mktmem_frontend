import React, { useState } from 'react';
import {
  Link,
  CheckCircle,
  AlertCircle,
  Settings,
  ExternalLink,
  Zap,
  BarChart3,
  Users,
  Calendar
} from 'lucide-react';

interface SocialPlatform {
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
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
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

  const handleConnect = (platformId: string) => {
    setPlatforms(platforms.map(platform =>
      platform.id === platformId
        ? { ...platform, status: 'pending' as const }
        : platform
    ));

    // Simulate connection process
    setTimeout(() => {
      setPlatforms(platforms.map(platform =>
        platform.id === platformId
          ? {
            ...platform,
            connected: true,
            status: 'connected' as const,
            username: `@tacosofia_${platformId}`,
            followers: Math.floor(Math.random() * 2000) + 500
          }
          : platform
      ));
    }, 2000);
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.map(platform =>
      platform.id === platformId
        ? {
          ...platform,
          connected: false,
          status: 'disconnected' as const,
          username: undefined,
          followers: undefined,
          lastPost: undefined
        }
        : platform
    ));
  };

  const connectedPlatforms = platforms.filter(p => p.connected);
  const totalFollowers = connectedPlatforms.reduce((sum, p) => sum + (p.followers || 0), 0);

  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8">
      {/* Header */}
      <div className="px-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Social Media Connections</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">Connect your social accounts to schedule posts across all platforms</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-2">
        <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Link className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-2xl font-bold text-gray-900">{connectedPlatforms.length}</p>
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

      {/* Platform Connections */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Platform Connections</h2>

        <div className="space-y-4 md:space-y-6">
          {platforms.map(platform => (
            <div key={platform.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getStatusIcon(platform.status)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{platform.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0">
                      <span className={`px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(platform.status)}`}>
                        {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                      </span>
                      {platform.username && (
                        <span className="text-xs md:text-sm text-gray-600 truncate">{platform.username}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
                  {platform.connected && (
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}

                  {platform.connected ? (
                    <button
                      onClick={() => handleDisconnect(platform.id)}
                      className="px-3 md:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={platform.status === 'pending'}
                      className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${platform.status === 'pending'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                    >
                      {platform.status === 'pending' ? 'Connecting...' : 'Connect'}
                    </button>
                  )}
                </div>
              </div>

              {platform.connected && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-gray-100">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Followers</span>
                    </div>
                    <p className="text-base md:text-lg font-bold text-blue-900">{platform.followers?.toLocaleString()}</p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Last Post</span>
                    </div>
                    <p className="text-base md:text-lg font-bold text-green-900">{platform.lastPost}</p>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Features</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {platform.features.slice(0, 2).map(feature => (
                        <span key={feature} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {platform.features.length > 2 && (
                        <span className="text-xs text-purple-600">+{platform.features.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!platform.connected && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Available features:</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.features.map(feature => (
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
              <li>• Schedule posts across all platforms simultaneously</li>
              <li>• Optimize posting times for each platform automatically</li>
              <li>• Maintain consistent brand messaging everywhere</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Advanced Analytics</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Track performance across all connected platforms</li>
              <li>• Identify your best-performing content types</li>
              <li>• Get AI-powered recommendations for improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialConnections;