import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  axios
    .post("/api/users/login/", { username: email, password: password })
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response ? error.response.data.detail : error.message,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const register = (name, email, password) => (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });
  axios
    .post("/api/users/register/", {
      name: name,
      email: email,
      password: password,
    })
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const getUserDetails = (id) => (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  axios
    .get(`/api/users/${id}/`, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const updateUserProfile = (user) => (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  axios
    .put(`/api/users/profile/update/`, user, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const listUsers = () => (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  axios
    .get(`/api/users/`, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_LIST_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const deleteUser = (id) => (dispatch, getState) => {
  dispatch({
    type: USER_DELETE_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  axios
    .delete(`/api/users/delete/${id}/`, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_DELETE_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const updateUser = (user) => (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  axios
    .put(`/api/users/update/${user.id}/`, user, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: USER_UPDATE_SUCCESS,
      });
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};
