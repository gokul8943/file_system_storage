import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  user: User | null;
}

const getInitialAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    };
  }

  // Client-side - safely access localStorage
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userStr = localStorage.getItem('user');
  
  return {
    isAuthenticated: !!accessToken,
    accessToken,
    refreshToken,
    user: userStr ? JSON.parse(userStr) : null,
  };
};

const initialAuthState: AuthState = getInitialAuthState();

interface AuthStore {
  authState: AuthState;
  login: (accessToken: string, user: User, refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authState: { ...initialAuthState },
  login: (accessToken: string, user: User, refreshToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set((state) => ({
      authState: {
        ...state.authState,
        isAuthenticated: true,
        accessToken,
        refreshToken,
        user,
      },
    }));
  },
  updateUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    set((state) => ({
      authState: {
        ...state.authState,
        user,
      },
    }));
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    set({
      authState: {
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      },
    });
  },
  updateAccessToken: (accessToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
    }
    set((state) => ({
      authState: {
        ...state.authState,
        accessToken,
      },
    }));
  },
}));

