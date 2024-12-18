import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setValidationError('Username dan password wajib diisi.');
      return;
    }

    setValidationError(''); 

    try {
      await dispatch(login(username, password));
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  const demoUsers = [
    { username: 'kevinryan', password: 'kev02937@' }
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card m-5 p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>

        {validationError && <div className="alert alert-warning">{validationError}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Memuat...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="mt-3">
          <h5>Demo Users:</h5>
          {demoUsers.map((user, index) => (
            <p key={index}>
              Username: <b>{user.username}</b>, Password: <b>{user.password}</b>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
