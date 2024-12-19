import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem, 
  currentQuantity, 
  isChecked,
  onCheck 
}) => {
  const navigate = useNavigate();
  const product = useSelector(state => 
    state.products.products.find(p => p.id === item.id)
  );

  const maxStock = product ? product.quantity : 20;

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleItemClick = () => {
    navigate(`/product/${item.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };

  const isStockExceeded = currentQuantity >= maxStock;

  return (
    <div className="d-flex align-items-center mb-3">

      <div className="flex-shrink-0 me-2">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onCheck(item.id, e.target.checked)} 
        />
      </div>

      <div 
        className="card flex-grow-1"
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
        <div className="card-body">
          <div className="row align-items-center">

            <div className="col-12 col-md-3 text-center">
              <img 
                onClick={handleItemClick}
                src={item.image} 
                alt={item.title} 
                onError={(e) => e.target.src = '/placeholder.png'}
                className="img-fluid" 
                style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} 
              />
            </div>

            <div className="col-12 col-md-9">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

                <div className="text-center text-md-start mb-3 mb-md-0">
                  <h5 className="mb-1" onClick={handleItemClick} >{item.title}</h5>
                  <p className="text-muted">$ {item.price.toLocaleString()}</p>
                </div>

                <div className="d-flex align-items-center">
                  <div className="btn-group me-2" role="group">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={(e) => {handleUpdateQuantity(currentQuantity - 1); handleButtonClick(e);}} 
                      disabled={currentQuantity <= 1}
                    >
                      -
                    </button>
                    <span className="btn btn-light px-3">{currentQuantity}</span>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={(e) => {handleUpdateQuantity(currentQuantity + 1); handleButtonClick(e);}}
                      disabled={currentQuantity >= maxStock}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    className="btn btn-danger ms-2"
                    onClick={(e) => {onRemoveItem(item.id); handleButtonClick(e);}}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isStockExceeded && (
          <div className="card-footer text-center text-danger">
            Stok yang tersedia: {maxStock} item
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
