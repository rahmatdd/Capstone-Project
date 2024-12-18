import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const [activeCategory, setActiveCategory] = useState('all');

  // Daftar kategori produk
  const categories = [
    { key: 'all', label: 'Semua Kategori' },
    { key: "men's clothing", label: "Pakaian Pria" },
    { key: "women's clothing", label: "Pakaian Wanita" },
    { key: 'jewelery', label: 'Perhiasan' },
    { key: 'electronics', label: 'Elektronik' }
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Sedang memuat...</span>
      </div>
    </div>
  );
  

  // Filter produk berdasarkan kategori yang aktif
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="container">
      <h1 className='my-3'>Produk Tersedia</h1>
      
      <div className="mb-4">
        {categories.map((category) => (
          <button
            key={category.key}
            className={`btn me-2 mb-2 ${activeCategory === category.key ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleCategoryFilter(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;