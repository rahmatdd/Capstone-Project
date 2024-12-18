import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="card h-100 product-card d-flex flex-column" 
      onClick={handleProductClick} 
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        boxShadow: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }} 
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img 
        src={product.image} 
        className="card-img-top p-3" 
        alt={product.title}
        style={{ 
          height: '250px', 
          objectFit: 'contain' 
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title flex-grow-1">{product.title}</h5>
        <p className="card-text text-muted">
          {product.category}
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="h4 text-primary">
                $ {product.price.toLocaleString()}
              </span>
              <div className="text-muted mt-1">
                Stok Tersedia: {product.quantity} 
              </div>
            </div>
            <button 
              className="btn btn-outline-primary"
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;