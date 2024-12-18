const authReducer = (
  state = { 
    isAuthenticated: false, 
    token: null, 
    loading: false, 
    error: null 
  }, 
  action
) => {
  // Cek token di localStorage 
  const token = localStorage.getItem('token');
  if (token && !state.token) {
    return { 
      ...state, 
      isAuthenticated: true, 
      token: token
    };
  }

  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: true, 
        token: action.payload, 
        loading: false,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false,
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        token: null, 
        loading: false, 
        error: null 
      };
    default:
      return state;
  }
};

export default authReducer;
