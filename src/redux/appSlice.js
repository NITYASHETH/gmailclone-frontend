import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    open: false,
    user: null,
    emails: [],
    selectedEmail: null, // Correct case for the property name
    searchText:""
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload; // Set User in state
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload; // Correct case for setting selectedEmail
    },
    searchText: (state , action) => {
      state.searchText = action.payload;
    }
  },
});

export const { setOpen, setAuthUser, setEmails, setSelectedEmail , searchText } = appSlice.actions;
export default appSlice.reducer;
