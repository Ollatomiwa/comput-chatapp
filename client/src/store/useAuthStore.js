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
        // try {
        //     set({isSiginingUp:true})
        //     const res = axiosInstance.post("/auth/signup", data);

        //     set({authUser:res.data})
        // } catch (error) {
        //     console.log("Error in signup:", error);
        // }finally{
        //     set({isSiginingUp:false})
        // }
    },
}));