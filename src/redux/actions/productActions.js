import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await axios.get(`${apiUrl}/products`);
    dispatch({ 
      type: 'FETCH_PRODUCTS_SUCCESS', 
      payload: response.data 
    });
  } catch (error) {
    dispatch({ 
      type: 'FETCH_PRODUCTS_FAILURE', 
      payload: error.message 
    });
  }
};

export const fetchProductDetail = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCT_DETAIL_REQUEST' });
  try {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    dispatch({ 
      type: 'FETCH_PRODUCT_DETAIL_SUCCESS', 
      payload: response.data 
    });
  } catch (error) {
    dispatch({ 
      type: 'FETCH_PRODUCT_DETAIL_FAILURE', 
      payload: error.message 
    });
  }
};

export const reduceProductStock = (checkoutItems) => ({
  type: 'REDUCE_PRODUCT_STOCK',
  payload: checkoutItems
});