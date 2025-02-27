import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSiginingUp: false,
    isLoggingIng:false,
    isUpdatingProfile:false,


    isCheckingAuth:true,

    checkAuth: async () => {
        try {
            const res = axiosInstance.get("/auth/check");

            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth:", error);
            
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        set ({ isSiginingUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser:res.data})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSiginingUp:false})
        }
    },
}));