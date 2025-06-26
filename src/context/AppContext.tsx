import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { User } from '../types';

interface AppContextType {
  userDetails: any | null;
  loggedUser: User | null;
  isLoadingUserDetails: boolean;
  userDetailsError: string | null;
  setLoggedUser: (user: User | null) => void;
  fetchUserProfile: () => Promise<any>;
  refreshUserDetails: () => Promise<void>;
  selectedServiceType: string[];
  setSelectedServiceType: (types: string[]) => void;
  isInitializing: boolean;
}

export const AppContext = createContext<AppContextType>({
  userDetails: null,
  loggedUser: null,
  isLoadingUserDetails: false,
  userDetailsError: null,
  setLoggedUser: () => { },
  fetchUserProfile: async () => ({}),
  refreshUserDetails: async () => { },
  selectedServiceType: [],
  setSelectedServiceType: () => { },
  isInitializing: true,
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
  const [isInitializing, setIsInitializing] = useState(true);

  // Memoized function to fetch user profile
  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    setIsLoadingUserDetails(true);
    setUserDetailsError(null);

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
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoggedUser(null);
          setUserDetails(null);
          throw new Error('Authentication expired. Please log in again.');
        }
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUserDetails(data);
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user profile';
      console.error('Profile fetch error:', errorMessage);
      setUserDetailsError(errorMessage);
      throw error;
    } finally {
      setIsLoadingUserDetails(false);
    }
  }, []);

  // Function to refresh user details manually
  const refreshUserDetails = useCallback(async () => {
    if (loggedUser) {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error('Error refreshing user details:', error);
      }
    }
  }, [loggedUser, fetchUserProfile]);

  // Load user from localStorage on first mount
  useEffect(() => {
    const init = () => {
      const currentUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (currentUser && token) {
        try {
          const parsedUser = JSON.parse(currentUser);
          setLoggedUser(parsedUser);
        } catch (error) {
          console.error('Invalid stored user JSON:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }

      setIsInitializing(false);
    };

    init();
  }, []);

  // Refetch user profile only after init completes and user is present
  useEffect(() => {
    if (!isInitializing && loggedUser) {
      fetchUserProfile().catch(error =>
        console.error('Error fetching user profile on login:', error)
      );
    } else if (!loggedUser) {
      setUserDetails(null);
      setUserDetailsError(null);
    }
  }, [isInitializing, loggedUser, fetchUserProfile]);

  // Handle user state update
  const handleSetLoggedUser = useCallback((user: User | null) => {
    setLoggedUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUserDetails(null);
      setUserDetailsError(null);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        userDetails,
        loggedUser,
        isLoadingUserDetails,
        userDetailsError,
        setLoggedUser: handleSetLoggedUser,
        fetchUserProfile,
        refreshUserDetails,
        selectedServiceType,
        setSelectedServiceType,
        isInitializing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
