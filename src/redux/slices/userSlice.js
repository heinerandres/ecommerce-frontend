import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    email: null,
    uid: null,
    checking: true,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user,
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        },
        logout: (state) => {
            state.user = null;
            state.email = null;
            state.uid = null;
        },
        setChecking: (state, action) => {
            state.checking = action.payload;
        }
    },
});

export const { login, logout, setChecking } = userSlice.actions;
export default userSlice.reducer;