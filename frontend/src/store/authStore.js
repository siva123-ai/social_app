import create from 'zustand';

const useAuthStore = create((set) => ({
  auth: JSON.parse(localStorage.getItem('auth')) || { token: null, userId: null },
  setAuth: (token, userId) => {
    const authData = { token, userId };
    localStorage.setItem('auth', JSON.stringify(authData));
    set({ auth: authData });
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ auth: { token: null, userId: null } });
  },
}));

export default useAuthStore;
