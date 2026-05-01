//Some Functionalities will be performed by the users is going to be implemented here
//zustand is a small, fast and scalable bearbones state-management solution using simplified flux principles.
//  It has a minimal API and is built on top of React's useState and useEffect hooks. The main purpose of using zustand is to manage state in a React application in a simple and efficient way.
//  It provides a way to create a global state store that can be accessed and updated from any component in the application without the need for prop drilling or complex state management libraries like Redux.

import { create } from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";


//This store will manage the user state, including authentication status, user information, and loading states. It will also provide functions for signing up, logging in, and logging out users. The store will use axios to make API calls to the backend server for authentication and user management. Additionally, it will handle error messages and display them using react-hot-toast for better user experience.
export const useUserStore = create((set , get)=>({
    user: null,
    loading: false,
    checkingAuth: true,
    signup: async ({name, email, password , confirmPassword}) => {
        set({loading: true});
        if (password !=confirmPassword) {
            set({loading:false});
            return toast.error("Password and Confirm Password do not match");    
        }
        try {
            const response = await axios.post("/auth/signup", {name , email, password});
            set({user: response.data, loading: false});
        }catch (error) {
            set({loading: false});
            toast.error(error.response?.data?.message || "An error occurred during signup");
        }
    },

    login: async ({email, password}) => {

        set({loading:true});
        if (!email || !password) {
            set({loading:false});
            return toast.error("Email and Password are required");
        }
        try {
            const response = await axios.post("/auth/login", {email, password});
            set({user:response.data, loading: false});

        }catch (error) { 
            set({loading: false});
            toast.error(error.response?.data?.message || "An error occurred during login");
        }

    },

    logout: async () => {
        try{
             set({user: null});
            await axios.post("/auth/logout");
        }catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },

    checkAuth: async () => {
      set({checkingAuth: true});
        try {
            const response = await axios.get("/auth/profile");
            set({user: response.data, checkingAuth: false});
        }catch (error) {
            set({user: null, checkingAuth: false});
        } 
    }

    //TODO: Implement the axios interceptors for refreshing access tokens and handling unauthorized errors globally in the application. This will ensure that the user remains authenticated and can seamlessly access protected routes without having to log in again when the access token expires. The interceptor will automatically attempt to refresh the token using a refresh token and retry the original request if it receives a 401 Unauthorized response from the server.


}))