// store/authStore.ts
import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (token) => {
    if (typeof window !== 'undefined') {
      token ? localStorage.setItem('access_token', token) : localStorage.removeItem('access_token');
    }
    set({ accessToken: token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    set({ user: null, accessToken: null });
  },
}));
