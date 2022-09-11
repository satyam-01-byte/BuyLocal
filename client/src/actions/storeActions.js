import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
} from "../constants/storeConstants.js";
import axios from "axios";

/**
 * Store Action related function to establish connection with server/API
 */

export const listStores = (location) => async (dispatch) => {
  try {
    dispatch({ type: STORE_LIST_REQUEST });
    const { data } = await axios.get(`/api/stores/location/${location}`);
    dispatch({ type: STORE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
  localStorage.setItem("userLocation", JSON.stringify(location));
};
