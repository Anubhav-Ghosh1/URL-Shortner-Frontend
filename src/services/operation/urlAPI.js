import { apiConnector } from "../apiConnector";
import { urlEndpoints } from "../api.js";
import toast from "react-hot-toast";
import { setLoading } from "../../Slices/Profile/profile.js";

const {
  CREATE_URL,
  REDIRECT_URL,
  URL_DETAILS,
  TOGGLE_STATUS,
  TRACK_USER,
  USER_URLS,
  UPDATE_URL,
  DELETE_URL,
} = urlEndpoints;

export function createURL(data, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CREATE_URL, data, {
        Authorization: `Bearer ${token}`,
      });
      console.log(response);
      toast.success("URL created successfully");
      return response.data.data;
    } catch (e) {
      toast.error("Error while creating URL");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function redirectURL(url) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", `${REDIRECT_URL}/${url}`);
      // toast.success("URL created successfully");
      window.location.href = response.data.originalURL;
    } catch (e) {
      toast.error("Error while creating URL");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function fetchUrls(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        USER_URLS,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response);
      toast.success("URLs fetched successfully");
      return response.data.data;
    } catch (e) {
      toast.error("Error while fetching URLs");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function updateURL(data, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PATCH", UPDATE_URL, data, {
        Authorization: `Bearer ${token}`,
      });
      toast.success("URL updated successfully");
      return response.data.data;
    } catch (e) {
      toast.error("Error while updating URL");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteURL(urlId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_URL,
        { urlId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success("URL deleted successfully");
    } catch (e) {
      toast.error("Error while deleting URL");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function toggleURLStatus(urlId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PATCH",
        TOGGLE_STATUS,
        { urlId },
        { Authorization: `Bearer ${token}` }
      );
      toast.success("URL status updated successfully");
      return response.data.data;
    } catch (e) {
      toast.error("Error while updating URL status");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getURLDetails(urlId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${URL_DETAILS}/${urlId}`,
        { urlId },
        { Authorization: `Bearer ${token}` }
      );
      toast.success("URL status updated successfully");
      return response.data.data;
    } catch (e) {
      toast.error("Error while updating URL status");
    } finally {
      dispatch(setLoading(false));
    }
  };
}
