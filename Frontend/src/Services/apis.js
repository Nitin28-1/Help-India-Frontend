const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1`

export const userOperation={

    LOGIN_API: BASE_URL + "/user/login",
    REGISTER_API: BASE_URL + "/user/register",
    LOGOUT_API:BASE_URL + "/user/logout",
    GET_PROFILE:BASE_URL + "/user",
    EDIT_PROFILE:BASE_URL + "/user/profile/edit",
    SUGGEST:BASE_URL + "/user/suggested",
    SUPPORTORUNSUPPORT:BASE_URL + "/user/SupportOrUnSupport",
    Search_Users:BASE_URL + "/user/Search",
}

export const postOperation={

    CREATE_POST: BASE_URL + "/post/addpost",
    GET_ALL_POST: BASE_URL + "/post/all",
    DELETE_POST_HANDLER: BASE_URL + "/delete/:id",
    LIKE_UNLIKE_HANDLER: BASE_URL + "/post",
    COMMENT: BASE_URL + "/post",
    BOOKMARK: BASE_URL + "/post",
    GETALLPOSTANYWAY: BASE_URL + "/post"
}
export const message={

    SEND_MESSAGE: BASE_URL + "/message/send",
    GET_ALL_MESSAGE: BASE_URL + "/message/all",
    CHAT_USER: BASE_URL + "/message/suggestChatUser",

   
}