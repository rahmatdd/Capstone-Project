import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../redux/actions/productActions';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    dispatch(fetchProductDetail(id)); 
  }, [id, dispatch, navigate]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Sedang memuat...</span>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="alert alert-danger">
        Terjadi kesalahan saat memuat detail produk: {error}
      </div>
    );
  }

  if (!product) {
    return <div className="alert alert-primary">Produk tidak ditemukan</div>;
  }

  return (
    <div className="container mt-4">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;