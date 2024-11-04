import { apiConnector } from "../apiConnector";
import { urlEndpoints } from "../api.js";
import toast from "react-hot-toast";
import { setLoading } from "../../Slices/Profile/profile.js";

import { dashboardEndpoints } from "../api.js";

const { USER_ANALYTICS } = dashboardEndpoints;

export function getUrlAnalytics(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        USER_ANALYTICS,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response.data.data);
      toast.success("Data fetched successfully");
      return response.data.data;
    } catch (e) {
      toast.error("Error while fetching data");
    } finally {
      dispatch(setLoading(false));
    }
  };
}
