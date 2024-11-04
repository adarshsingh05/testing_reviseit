import { create } from 'zustand';
import axios from 'axios';

// To send credentials with axios requests
axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        
        try {
            const response = await axios.get("https://testing-reviseit-1.onrender.com/api/auth/checkauth");
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "An error occurred",
                isCheckingAuth: false,
                isAuthenticated: false,
                user: null, // Reset user on error
            });
        }
    }
}));

export default useAuthStore;
