import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  const apiUrl = import.meta.env.VITE_API_URL
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username,
      password,
    });

    if (response.status === 200 && response.data.token) {
      // Simpan token di localStorage
      localStorage.setItem('token', response.data.token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.token,
      });
    } else {
      throw new Error('Login gagal. Token tidak ditemukan.');
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message,
    });
  }
};

export const logout = () => {
  // Hapus token dari localStorage
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT',
  };
};
