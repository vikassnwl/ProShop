import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

import axios from "axios";

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
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
    .post(`/api/orders/add/`, order, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });

      localStorage.removeItem("cartItems");
    })
    .catch((error) => {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const getOrderDetails = (id) => (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
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
    .get(`/api/orders/${id}/`, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const payOrder = (id, paymentResult) => (dispatch, getState) => {
  dispatch({
    type: ORDER_PAY_REQUEST,
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
    .put(`/api/orders/${id}/pay/`, paymentResult, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const deliverOrder = (order) => (dispatch, getState) => {
  dispatch({
    type: ORDER_DELIVER_REQUEST,
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
    .put(`/api/orders/${order.id}/deliver/`, {}, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: error.response.data.detail || error.message,
      });
    });
};

export const listMyOrders = () => (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_MY_REQUEST,
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
    .get(`/api/orders/myorders/`, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: error.response ? error.response.data.detail : error.message,
      });
    });
};

export const listOrders = () => (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
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
    .get(`/api/orders/`, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: error.response ? error.response.data.detail : error.message,
      });
    });
};
