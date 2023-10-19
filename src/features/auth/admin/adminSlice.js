import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import routes from "../../../routes/apiroutes";
const token = localStorage.getItem("adminToken");
const initialState = {
  admin: token? token : null,
  isAdminLoggedIn: token ? true : false,
  isLoading: false,
  isError: false,
  message: "",
};
export const adminLogin = (adminCredentials) => async (dispatch) => {
  dispatch(loginPending());
  try {
    // Make API call to your Flask backend for admin login
    const response = await axios.post(routes.adminlogin, adminCredentials);
    if (response.data) {
      localStorage.setItem("adminToken", response.data.token);
    }
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed."));
  }
};



export const adminLogout  = () => async (dispatch) => {
  
  try{
    localStorage.removeItem("adminToken");
    dispatch(logout());
  }
  catch (error) {
    dispatch(logout(error.response?.data?.message || "Logout failed."));
  }
};


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.admin=null;
      state.isLoading = false;
      state.isAdminLoggedIn  = false;
      state.isError = false;
      state.message = "";
    },
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.admin=action.payload
      state.isError = false;
      state.isAdminLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isAdminLoggedIn = false;
      state.message = action.payload;
    },
    logout: (state) => {
      
      state.admin = null;
    },
  },
});

export const { loginPending, loginSuccess, loginFailure, logout, reset } = adminSlice.actions;
export default adminSlice.reducer;
