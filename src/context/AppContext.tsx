import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  loggedUser: any | null;
  setLoggedUser: any;
  setUser: (user: User) => void;
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
  setUser: () => { },
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
  setLoggedUser: () => { },
  loggedUser: null
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
  const [selectedServiceType, setSelectedServiceType] = useState<string[]>([]);
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

  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setLoggedUser(parsedUser);
    }
  }, [])

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
      delay: 60, // 1 hour
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
      delay: 1440, // 24 hours
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

  const updateService = (serviceId: string, config: any) => {
    if (!user) return;

    const updatedServices = user.services.map(service =>
      service.id === serviceId ? { ...service, config, active: true } : service
    );

    setUser({ ...user, services: updatedServices });
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
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
      loggedUser,
      setLoggedUser
    }}>
      {children}
    </AppContext.Provider>
  );
};