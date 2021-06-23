import create from 'zustand';
import { setToken } from '../helpers/auth';

const useAuthStore = create(set => ({
  isLoggedIn: false,
  user: null,
  login: (user, token) =>
    set(_state => {
      setToken(token);
      return { isLoggedIn: true, user };
    }),
  updateUser: user => set(_state => ({ user })),
  logout: () =>
    set(_state => {
      setToken(null);
      return { isLoggedIn: false, user: null };
    }),
}));

export default useAuthStore;
