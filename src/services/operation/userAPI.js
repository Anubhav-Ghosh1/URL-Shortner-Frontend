import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../api.js";
import toast from "react-hot-toast";
import { setLoading, setToken, setUser } from "../../Slices/Profile/profile.js";

const { CURRENT_USER } = userEndpoints;

export function getUserProfile(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", CURRENT_USER,{},
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                });
            // console.log("Response: ", response.data.data);
            toast.success("User registered successfully");
            return response.data.data;
        } catch (e) {
            toast.error("Error while registering user");
        }
    };
}