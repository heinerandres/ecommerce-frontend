import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./slices/userSlice";
import carritoReducer from "./slices/carritoSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        carrito: carritoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;