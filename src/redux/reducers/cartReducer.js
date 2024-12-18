const cartReducer = (
  state = { 
    items: [], 
    total: 0, 
    loading: false, 
    error: null 
  }, 
  action
) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItem) {
        // Jika item sudah ada di keranjang, update kuantitas
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Jika item belum ada di keranjang, tambahkan item baru
        updatedItems = [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity }
        ];
      }

      // Hitung total harga
      const newTotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
      };
    }
    

    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);

      // Hitung total harga setelah item dihapus
      const updatedTotal = filteredItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: filteredItems,
        total: updatedTotal,
      };
    }

    case 'UPDATE_CART_ITEM_QUANTITY': {
      const { productId, quantity } = action.payload;

      // Update kuantitas item
      const updatedItems = state.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );

      // Hitung total harga
      const newTotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
      };
    }

    case 'CHECKOUT_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        loading: false,
        items: state.items.filter(
          (item) => !action.payload.includes(item.id) // Tetap simpan item yang tidak di-checkout
        ),
      };
      

    case 'CHECKOUT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
