import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  setTimeout(() => {
    axios
      .get("/api/products/")
      .then((res) => {
        dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response.data.detail || error.message,
        });
      });
  }, 200);
};

export const listProductDetails = (id) => (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  });
  setTimeout(() => {
    axios
      .get(`/api/products/${id}/`)
      .then((res) => {
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.data.detail || error.message,
        });
      });
  }, 200);
};

export const deleteProduct = (id) => (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
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
    .delete(`/api/products/delete/${id}/`, config)
    .then((res) => {
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response ? error.response.data.detail : error.message,
      });
    });
};

export const createProduct = () => (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
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
    .post(`/api/products/create/`, {}, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: error.response ? error.response.data.detail : error.message,
      });
    });
};

export const updateProduct = (product) => (dispatch, getState) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
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
    .put(`/api/products/update/${product.id}/`, product, config)
    .then((res) => {
      const data = res.data;
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: error.response ? error.response.data.detail : error.message,
      });
    });
};
