const BASE_URL = process.env.REACT_APP_BASE_URL
export const userEndpoints = {
    REGISTER_USER: BASE_URL + "/user/register",
    LOGIN_USER: BASE_URL + "/user/login",
    LOGOUT_USER: BASE_URL + "/user/logout",
    UPDATE_REFRESH_TOKEN: BASE_URL + "/user/refreshToken",
    CHANGE_PASSWORD: BASE_URL + "/user/changePassword",
    CURRENT_USER: BASE_URL + "/user/getUser",
    UPDATE_ACCOUNT: BASE_URL + "/user/updateAccountDetails",
}

export const urlEndpoints = {
    CREATE_URL: BASE_URL + "/url/create",
    REDIRECT_URL: BASE_URL + "/url/redirect",
    URL_DETAILS: BASE_URL + "/url/details",
    TOGGLE_STATUS: BASE_URL + "/url/toggle-status",
    TRACK_USER: BASE_URL + "/url/track/",
    USER_URLS: BASE_URL + "/url/user-urls",
    UPDATE_URL: BASE_URL + "/url/update",
    DELETE_URL: BASE_URL + "/url/delete",
}

export const dashboardEndpoints = {
    USER_ANALYTICS: BASE_URL + "/dashboard/userAnalytics",
}