import { configureStore } from "@reduxjs/toolkit";
import profile from "../Slices/Profile/profile.js";

export const store = configureStore({
    reducer:
    {
        profile: profile
    }
})