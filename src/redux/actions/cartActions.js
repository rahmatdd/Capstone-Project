import { reduceProductStock } from './productActions';

export const addToCart = (product) => (dispatch, getState) => {
  const { products } = getState().products;
  const existingProduct = products.find(p => p.id === product.id);

  // Validasi stok sebelum menambahkan ke keranjang
  if (existingProduct && existingProduct.quantity > 0) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  } else {
    dispatch({
      type: 'ADD_TO_CART_FAILURE',
      payload: 'Stok produk habis',
    });
  }
};

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const updateCartItemQuantity = (productId, quantity) => (dispatch, getState) => {
  const { products } = getState().products;
  const product = products.find(p => p.id === productId);

  // Validasi stok sebelum update kuantitas
  if (product && quantity <= product.quantity) {
    dispatch({
      type: 'UPDATE_CART_ITEM_QUANTITY',
      payload: { productId, quantity },
    });
  } else {
    dispatch({
      type: 'UPDATE_CART_ITEM_QUANTITY_FAILURE',
      payload: 'Kuantitas melebihi stok yang tersedia',
    });
  }
};

export const checkout = (cartItems) => async (dispatch, getState) => {
  dispatch({ type: 'CHECKOUT_REQUEST' });

  try {
    const { products, productDetail } = getState().products;
    // Validasi stok untuk setiap item di keranjang yang dichecklist
    const isStockSufficient = cartItems.every((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      // Periksa stok pada daftar produk
      if (product) {
        return product.quantity >= cartItem.quantity;
      }
      // Periksa stok pada productDetail (jika ada)
      if (productDetail && productDetail.id === cartItem.id) {
        return productDetail.quantity >= cartItem.quantity;
      }
      return false;
    });

    if (!isStockSufficient) {
      dispatch({
        type: 'CHECKOUT_FAILURE',
        payload: 'Beberapa produk memiliki stok tidak mencukupi',
      });
      return;
    }
    dispatch(reduceProductStock(cartItems));
    // Checkout berhasil
    dispatch({
      type: 'CHECKOUT_SUCCESS',
      payload: cartItems.map((item) => item.id), // Kirim ID item yang di-checkout
    });
  } catch (error) {
    dispatch({
      type: 'CHECKOUT_FAILURE',
      payload: error.message,
    });
  }
};
