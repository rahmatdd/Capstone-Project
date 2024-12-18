const initialState = {
  products: [], 
  product: null, // state detail produk
  loading: false, 
  error: null, 
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
      case 'FETCH_PRODUCTS_SUCCESS':
        const productsWithQuantity = action.payload.map(product => {
          const existingProduct = state.products.find(p => p.id === product.id);
          return {
            ...product,
            quantity: existingProduct ? existingProduct.quantity : 20 // Ambil quantity yang ada atau set ke 20
          };
        });

      return {
        ...state,
        loading: false,
        products: productsWithQuantity,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'FETCH_PRODUCT_DETAIL_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_PRODUCT_DETAIL_SUCCESS':
      // Ambil quantity dari produk yang sudah ada di state
      const productDetailWithQuantity = {
        ...action.payload,
        quantity: state.products.find(product => product.id === action.payload.id).quantity || 0 // Ambil quantity dari produk yang sesuai
      };

      return {
        ...state,
        loading: false,
        product: productDetailWithQuantity, 
      };
    case 'FETCH_PRODUCT_DETAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'REDUCE_PRODUCT_STOCK':
      const updatedProducts = state.products.map(product => {
        const checkoutItem = action.payload.find(item => item.id === product.id);
        if (checkoutItem) {
          const newQuantity = product.quantity - checkoutItem.quantity;
          return {
            ...product,
            quantity: Math.max(newQuantity, 0)
          };
        }
        return product;
      });

      return {
        ...state,
        products: updatedProducts,
      };

    default:
      return state;
  }
};

export default productReducer;