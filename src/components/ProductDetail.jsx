import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/actions/cartActions';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false); // State for description
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return Math.max(1, Math.min(newQuantity, product.quantity));
    });
  };

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  return (
    <div className="container-md mt-4" style={{ maxWidth: '960px' }}>
      <div className="row my-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{
              maxHeight: '450px',
              objectFit: 'contain',
            }}
          />
        </div>

        <div className="col-md-6">
          <h3 className="mb-3">{product.title}</h3>
          <p className="text-muted mb-3">Kategori: {product.category}</p>

          <div className="mb-3">
            <span className="badge bg-success me-2">
              Rating: {product.rating.rate || 'N/A'} / 5
            </span>
            <small className="text-muted">({product.rating.count || 0} ulasan)</small>
          </div>

          <p className="h4 text-primary mb-4">
            Rp {product.price.toLocaleString()} 
          </p>

          <p className="mb-4" style={{ fontSize: '1rem' }}>
            {showFullDescription
              ? product.description
              : `${product.description.slice(0, 100)}...`}
            {product.description.length > 100 && (
              <button 
                className="btn btn-link p-0 ms-2"
                onClick={toggleDescription}
                style={{ fontSize: '0.9rem' }}
              >
                {showFullDescription ? 'Lebih Sedikit' : 'Lihat Selengkapnya'}
              </button>
            )}
          </p>

          <div className="mb-3 text-muted">
            Stok Tersedia: {product.quantity}
          </div>

          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>

            <span className="mx-2">{quantity}</span>

            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.quantity}
            >
              +
            </button>
          </div>

          <button 
            className="btn btn-primary w-100" 
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
          >
            Masukkan Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
