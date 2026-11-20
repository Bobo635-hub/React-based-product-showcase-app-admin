import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../api";
import useFetch from "../hooks/useFetch";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`${API_URL}/products/${id}`);
  const [imageFailed, setImageFailed] = useState(false);

  if (loading) {
    return (
      <section className="page">
        <p>Loading product...</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="page">
        <h1>Product not found</h1>
        <p>We could not find this product. It may have been deleted.</p>
        <Link className="btn" to="/products">Back to products</Link>
      </section>
    );
  }

  const showImage = product.image && !imageFailed;

  return (
    <section className="page">
      <p className="breadcrumb">
        <Link to="/products">Products</Link> / {product.name}
      </p>

      <div className="detail">
        <div className="card">
          {showImage ? (
            <img
              className="detail__image"
              src={product.image}
              alt={`${product.name}, ${product.material} ${product.category.toLowerCase()}`}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="detail__image detail__image--empty">{product.name}</div>
          )}
        </div>

        <div className="card">
          <h1 className="detail__title">{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.category} · {product.material}</p>
          <p>${product.price} · {product.stock} in stock</p>
        </div>
      </div>
    </section>
  );
}