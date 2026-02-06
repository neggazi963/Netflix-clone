import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLogginOut: false,
  signup: async (credentials) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async () => {},
  logout: async () => {
    set({ isLogginOut: true });

    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLogginOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
