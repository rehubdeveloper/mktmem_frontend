import React, { useEffect, useState } from 'react';
import {
  Link,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap,
  BarChart3,
  Users,
  Calendar,
  Landmark,
  FeatherIcon,
  Building2,
  ChevronRight
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
  provider_display: string;
  provider: string;
}

const PlatformConnectionsSkeleton = () => (
  <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
    <div className="h-6 bg-gray-200 rounded w-48 mb-4 md:mb-6 animate-pulse"></div>

    <div className="space-y-4 md:space-y-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0">
                  <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlatformConnections: React.FC<{ currentBrand: { name: string; brand_id: string } | null }> = ({ currentBrand }) => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchSocialsUsingBrand = async (brand: any) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    if (!brand || !brand.brand_id) throw new Error('Invalid brand provided for socials');

    const response = await fetch(`https://mktmem-backend.onrender.com/api/users/brands/${brand.brand_id}/social-details/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch social details: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setPlatforms(data.social_connections);
    console.log('Platforms fetched successfully!'

    );
    return data;
  };

  useEffect(() => {
    const loadPlatforms = async () => {
      if (!currentBrand) return;

      try {
        setIsLoading(true);
        setError(null);
        await fetchSocialsUsingBrand(currentBrand);
      } catch (error: any) {
        console.error("Error loading platforms:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlatforms();
  }, [currentBrand]);

  if (isLoading) {
    return <PlatformConnectionsSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Platform Connections</h2>
        <div className="text-center py-8">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load platforms</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
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
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{platform.provider_display}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0">
                    <span className={`px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(platform.status)}`}>
                      {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                    </span>
                    {platform.username && (
                      <span className="text-xs md:text-sm text-gray-600 truncate">{platform.provider}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
                {platform.status == "connected" && (
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                )}

                {platform.status == "connected" ? (
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

            {platform.status == "connected" && (
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
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



const SocialConnections: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);
  const openDialog = () => setIsOpen(true);
  const [brandName, setBrandName] = useState('');
  const [brandID, setBrandID] = useState('');
  const [openBrands, setOpenBrands] = useState(false);
  const openBrandsDialog = () => setOpenBrands(true);
  const closeBrandsDialog = () => setOpenBrands(false);

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

  const updateBrand = async (brand_id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`https://mktmem-backend.onrender.com/api/users/brands/${brand_id}/update/?newName=${brandName.trim()}`, {
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
      console.log("response:", response.status);
      console.log('Brand updated successfully!');
      setBrandName('');
      setBrandID('');
      return data;

    } catch (error) {
      console.error('Brand update error:', error);
      throw error;
    }
  };

  const [creating, setCreating] = useState(false);
  const [brands, setBrands] = useState<Array<{ name: string; brand_id: string }>>([]);
  const [currentBrand, setCurrentBrand] = useState<{ name: string; brand_id: string } | null>(null);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [brandsError, setBrandsError] = useState<string | null>(null);

  // Calculate stats based on platforms from PlatformConnections
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [totalFollowers, setTotalFollowers] = useState(0);

  const getBrands = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    try {
      const response = await fetch('https://mktmem-backend.onrender.com/api/users/brands/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Brands fetched successfully!');
      setBrands(data.brands);
      return data.brands;

    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };

  useEffect(() => {
    const storedBrand = localStorage.getItem('currentBrand');

    const init = async () => {
      try {
        setIsLoadingBrands(true);
        setBrandsError(null);

        const fetchedBrands = await getBrands();

        let brandToUse = null;

        if (storedBrand) {
          const parsedBrand = JSON.parse(storedBrand);
          brandToUse = parsedBrand;
        } else if (fetchedBrands.length > 0) {
          brandToUse = fetchedBrands[0];
        }

        if (brandToUse) {
          setCurrentBrand(brandToUse);
        }

      } catch (error: any) {
        console.error("Initialization error:", error);
        setBrandsError(error.message);
      } finally {
        setIsLoadingBrands(false);
      }
    };

    init();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    </div>
  );

  // Show loading spinner only while brands are being fetched
  if (isLoadingBrands) {
    return <LoadingSpinner />;
  }

  // Show error state if brands failed to load
  if (brandsError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{brandsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8">
      {/* Current Brand Display */}
      {currentBrand && (
        <div className="mx-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Currently Managing</p>
                <h3 className="text-lg md:text-xl font-bold text-blue-900">{currentBrand.name}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Active Brand
              </span>
              <button
                onClick={openBrandsDialog}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <span>Switch Brand</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-2 flex flex-col md:flex-row space-y-3 md:space-x-auto w-full justify-between items-center">
        <div className="">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Social Media Connections</h1>
        </div>
        <div className="flex-end items-center">
          <div className="flex justify-end items-center space-x-2 md:space-x-3">
            <button
              onClick={async (e) => {
                e.preventDefault();
                openBrandsDialog();
              }}
              className="px-3 md:px-4 flex items-center py-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white border border-gray-300 rounded-md hover:bg-blue-700 transition"
            >
              <Landmark className="w-4 md:w-5 h-4 md:h-5 mr-2 inline-block" />
              <p className='text-xs md:text-lg md:font-bold'>View Brands</p>
            </button>
            <button
              onClick={() => {
                openDialog();
              }}
              className="px-3 md:px-4 flex items-center py-2 bg-gradient-to-tr from-blue-500 to-blue-600 text-white border border-gray-300 rounded-md hover:bg-blue-700 transition"
            >
              <FeatherIcon className="w-4 md:w-5 h-4 md:h-5 mr-2 inline-block" />
              <p className='text-xs md:text-lg md:font-bold'>Create Brand</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center px-2 md:text-lg md:font-semibold">
        <h1 className="text-gray-600 mt-2 text-sm md:text-base">Connect your social accounts to schedule posts across all platforms</h1>
      </div>

      {/* Enhanced Brands Dialog */}
      {openBrands && (
        <div
          onClick={closeBrandsDialog}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg md:rounded-xl w-full max-w-md shadow-2xl border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Select Your Brand</h2>
              <p className="text-sm text-gray-600 mt-1">Choose which brand you want to manage</p>
            </div>

            <div className="max-h-96 overflow-y-auto p-6">
              {brands && brands.length > 0 ? (
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <div
                      key={brand.brand_id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${currentBrand?.brand_id === brand.brand_id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => {
                        setCurrentBrand(brand);
                        localStorage.setItem('currentBrand', JSON.stringify(brand));
                        closeBrandsDialog();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                            <p className="text-sm text-gray-500">Brand ID: {brand.brand_id}</p>
                          </div>
                        </div>
                        {currentBrand?.brand_id === brand.brand_id && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No brands available</p>
                  <button
                    onClick={() => {
                      closeBrandsDialog();
                      openDialog();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Brand
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeBrandsDialog}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              {!currentBrand && brands.length > 0 && (
                <p className="text-sm text-gray-500 py-2">Select a brand to continue</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Brand Dialog */}
      {isOpen && (
        <>
          <div
            onClick={closeDialog}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <div
            className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Create A Brand</h2>
              <p className="text-sm text-gray-500">
                Create a new brand to connect with your social media accounts.
              </p>
            </div>

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
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeDialog}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  setCreating(true);

                  try {
                    const created = await createBrand(e);
                    await updateBrand(created.brand_id);
                    closeDialog();
                  } catch (error) {
                    console.error('Brand creation or update failed:', error);
                  } finally {
                    setCreating(false);
                  }
                }}
                type="submit"
                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
              >
                {creating ? 'Creating...' : 'Create Brand'}
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
      <PlatformConnections currentBrand={currentBrand} />

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