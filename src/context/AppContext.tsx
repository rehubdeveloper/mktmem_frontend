import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import {
  User,
  STRUnit,
  ItineraryCategory,
  ContentPost,
  Contact,
  Campaign,
  AutomationRule,
  MessageTemplate
} from '../types';

interface AppContextType {
  user: User | null;
  userDetails: any | null;
  loggedUser: any | null;
  isLoadingUserDetails: boolean;
  userDetailsError: string | null;
  isInitialized: boolean;
  isFullyLoaded: boolean; // New flag for complete data loading
  setLoggedUser: (user: any) => void;
  setUser: (user: User) => void;
  fetchUserProfile: () => Promise<any>;
  refreshUserDetails: () => Promise<void>;
  strUnits: STRUnit[];
  setStrUnits: (units: STRUnit[]) => void;
  itineraryCategories: ItineraryCategory[];
  setItineraryCategories: (categories: ItineraryCategory[]) => void;
  contentPosts: ContentPost[];
  setContentPosts: (posts: ContentPost[]) => void;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  automationRules: AutomationRule[];
  setAutomationRules: (rules: AutomationRule[]) => void;
  messageTemplates: MessageTemplate[];
  setMessageTemplates: (templates: MessageTemplate[]) => void;
  updateService: (serviceId: string, config: any) => void;
  selectedServiceType: string[];
  setSelectedServiceType: (types: string[]) => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  userDetails: null,
  loggedUser: null,
  isLoadingUserDetails: false,
  userDetailsError: null,
  isInitialized: false,
  isFullyLoaded: false,
  setUser: () => { },
  setLoggedUser: () => { },
  fetchUserProfile: async () => ({}),
  refreshUserDetails: async () => { },
  strUnits: [],
  setStrUnits: () => { },
  itineraryCategories: [],
  setItineraryCategories: () => { },
  contentPosts: [],
  setContentPosts: () => { },
  contacts: [],
  setContacts: () => { },
  campaigns: [],
  setCampaigns: () => { },
  automationRules: [],
  setAutomationRules: () => { },
  messageTemplates: [],
  setMessageTemplates: () => { },
  updateService: () => { },
  selectedServiceType: [],
  setSelectedServiceType: () => { },
});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState<boolean>(false);
  const [userDetailsError, setUserDetailsError] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Maria Rodriguez',
    email: 'maria@tacosofia.com',
    restaurant: {
      name: 'Taco Sofia',
      type: 'Mexican Restaurant',
      location: 'Downtown Austin'
    },
    services: [],
    onboardingComplete: false
  });

  // Memoized function to fetch user profile
  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    setIsLoadingUserDetails(true);
    setUserDetailsError(null);
    setIsFullyLoaded(false);

    try {
      const response = await fetch('https://mktmem-backend.onrender.com/api/users/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoggedUser(null);
          setUserDetails(null);
          setIsFullyLoaded(false);
          throw new Error('Authentication expired. Please log in again.');
        }
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Profile fetched successfully!');
      setUserDetails(data);

      // Mark as fully loaded after successful fetch
      setIsFullyLoaded(true);
      return data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user profile';
      console.error('Profile fetch error:', errorMessage);
      setUserDetailsError(errorMessage);
      setIsFullyLoaded(false);
      throw error;
    } finally {
      setIsLoadingUserDetails(false);
    }
  }, []);

  // Function to refresh user details on demand
  const refreshUserDetails = useCallback(async () => {
    if (loggedUser) {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Error refreshing user details:', error);
      }
    }
  }, [loggedUser, fetchUserProfile]);

  // Enhanced setLoggedUser function
  const handleSetLoggedUser = useCallback(async (user: any) => {
    console.log('Setting logged user:', user);
    setLoggedUser(user);
    setIsFullyLoaded(false); // Reset loading state

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      try {
        // Fetch user profile and wait for completion
        await fetchUserProfile();
      } catch (error) {
        console.error('Error fetching user profile after login:', error);
        setIsFullyLoaded(false);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUserDetails(null);
      setUserDetailsError(null);
      setIsFullyLoaded(false);
    }
  }, [fetchUserProfile]);

  // Initialize on mount
  useEffect(() => {
    const initializeApp = async () => {
      console.log('Initializing app...');
      const currentUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (currentUser && token) {
        try {
          const parsedUser = JSON.parse(currentUser);
          console.log('Found stored user:', parsedUser);
          setLoggedUser(parsedUser);

          // Fetch fresh user profile data
          setIsLoadingUserDetails(true);
          setIsFullyLoaded(false);

          const response = await fetch('https://mktmem-backend.onrender.com/api/users/profile/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('User profile loaded during initialization');
            setUserDetails(data);
            setIsFullyLoaded(true);
          } else {
            console.error('Failed to fetch profile during initialization');
            if (response.status === 401) {
              // Invalid token, clear everything
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setLoggedUser(null);
            }
            setIsFullyLoaded(false);
          }
        } catch (error) {
          console.error('Error during initialization:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setLoggedUser(null);
          setIsFullyLoaded(false);
        } finally {
          setIsLoadingUserDetails(false);
        }
      } else {
        console.log('No stored user found');
        setIsFullyLoaded(true); // No user to load, so we're "fully loaded"
      }

      setIsInitialized(true);
      console.log('App initialization complete');
    };

    initializeApp();
  }, []);

  // Update isFullyLoaded when user logs out
  useEffect(() => {
    if (!loggedUser) {
      setIsFullyLoaded(true); // No user means no data to load
    }
  }, [loggedUser]);

  // Mock data states (keeping your existing data)
  const [strUnits, setStrUnits] = useState<STRUnit[]>([
    {
      id: '1',
      name: 'Downtown Loft A',
      neighborhood: 'Downtown',
      size: '1BR',
      basePrice: 15,
      status: 'available',
      guestVolume: 85
    },
    {
      id: '2',
      name: 'Midtown Studio',
      neighborhood: 'Midtown',
      size: 'Studio',
      basePrice: 12,
      status: 'available',
      guestVolume: 72
    },
    {
      id: '3',
      name: 'East Side House',
      neighborhood: 'East Side',
      size: '2BR',
      basePrice: 18,
      status: 'available',
      guestVolume: 95
    }
  ]);

  const [itineraryCategories, setItineraryCategories] = useState<ItineraryCategory[]>([
    {
      id: '1',
      name: 'Romantic Nights',
      description: 'Perfect for date nights and special occasions',
      participating: false,
      discount: 10
    },
    {
      id: '2',
      name: 'Live Music & Food',
      description: 'Venues with great food and live entertainment',
      participating: false,
      discount: 15
    },
    {
      id: '3',
      name: 'Brunch Favorites',
      description: 'Best brunch spots in the city',
      participating: false,
      discount: 10
    }
  ]);

  const [contentPosts, setContentPosts] = useState<ContentPost[]>([]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      tags: ['Regular', 'VIP'],
      source: 'manual',
      createdAt: '2024-01-15T10:00:00Z',
      lastEngagement: '2024-01-20T15:30:00Z',
      engagementHistory: [],
      optedOut: false
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      tags: ['New Customer'],
      source: 'memstays',
      createdAt: '2024-01-18T14:20:00Z',
      lastEngagement: '2024-01-19T09:15:00Z',
      engagementHistory: [],
      optedOut: false
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      tags: ['Regular', 'Catering'],
      source: 'csv',
      createdAt: '2024-01-10T08:45:00Z',
      lastEngagement: '2024-01-22T12:00:00Z',
      engagementHistory: [],
      optedOut: false
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Weekend Special Promotion',
      type: 'email',
      status: 'sent',
      subject: '🌮 Weekend Special: 20% Off All Tacos!',
      content: 'Join us this weekend for our special taco promotion...',
      audienceType: 'tags',
      audienceTags: ['Regular', 'VIP'],
      sentAt: '2024-01-20T10:00:00Z',
      createdAt: '2024-01-19T15:30:00Z',
      stats: {
        sent: 156,
        delivered: 154,
        opened: 89,
        clicked: 23,
        replied: 5,
        bounced: 2,
        unsubscribed: 1
      }
    },
    {
      id: '2',
      name: 'New Menu Launch',
      type: 'sms',
      status: 'scheduled',
      content: 'Hey {{first_name}}! 🎉 Our new winter menu is here! Come try our seasonal specials. Reply STOP to opt out.',
      audienceType: 'all',
      scheduledAt: '2024-01-25T12:00:00Z',
      createdAt: '2024-01-22T09:15:00Z',
      stats: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        bounced: 0,
        unsubscribed: 0
      }
    },
    {
      id: '3',
      name: 'Happy Hour Reminder',
      type: 'dm',
      status: 'draft',
      content: 'Don\'t forget about our daily happy hour from 3-6 PM! 🍹',
      audienceType: 'tags',
      audienceTags: ['Regular'],
      createdAt: '2024-01-23T11:20:00Z',
      stats: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        bounced: 0,
        unsubscribed: 0
      }
    }
  ]);

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Welcome New Customers',
      trigger: 'signup',
      triggerConditions: {},
      delay: 60,
      channel: 'email',
      template: 'welcome-email',
      active: true,
      createdAt: '2024-01-15T10:00:00Z',
      stats: {
        triggered: 45,
        sent: 43,
        opened: 32,
        clicked: 12
      }
    },
    {
      id: '2',
      name: 'Birthday Special Offer',
      trigger: 'birthday',
      triggerConditions: {},
      delay: 0,
      channel: 'sms',
      template: 'birthday-sms',
      active: true,
      createdAt: '2024-01-10T14:30:00Z',
      stats: {
        triggered: 8,
        sent: 8,
        opened: 8,
        clicked: 3
      }
    },
    {
      id: '3',
      name: 'Re-engagement Campaign',
      trigger: 'inactivity',
      triggerConditions: { days: 30 },
      delay: 1440,
      channel: 'email',
      template: 'reengagement-email',
      active: false,
      createdAt: '2024-01-12T16:45:00Z',
      stats: {
        triggered: 12,
        sent: 10,
        opened: 4,
        clicked: 1
      }
    }
  ]);

  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      type: 'email',
      subject: 'Welcome to {{restaurant_name}}!',
      content: 'Hi {{first_name}}, welcome to our family! We\'re excited to serve you...',
      variables: ['first_name', 'restaurant_name'],
      category: 'welcome',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Birthday SMS',
      type: 'sms',
      content: 'Happy Birthday {{first_name}}! 🎉 Enjoy 25% off your meal today. Show this text to redeem.',
      variables: ['first_name'],
      category: 'promotion',
      createdAt: '2024-01-10T14:30:00Z'
    }
  ]);

  const updateService = useCallback((serviceId: string, config: any) => {
    if (!user) return;

    const updatedServices = user.services.map(service =>
      service.id === serviceId ? { ...service, config, active: true } : service
    );

    setUser({ ...user, services: updatedServices });
  }, [user]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      userDetails,
      loggedUser,
      isLoadingUserDetails,
      userDetailsError,
      isInitialized,
      isFullyLoaded, // Provide the new loading state
      setLoggedUser: handleSetLoggedUser,
      fetchUserProfile,
      refreshUserDetails,
      strUnits,
      setStrUnits,
      itineraryCategories,
      setItineraryCategories,
      contentPosts,
      setContentPosts,
      contacts,
      setContacts,
      campaigns,
      setCampaigns,
      automationRules,
      setAutomationRules,
      messageTemplates,
      setMessageTemplates,
      updateService,
      selectedServiceType,
      setSelectedServiceType,
    }}>
      {children}
    </AppContext.Provider>
  );
};