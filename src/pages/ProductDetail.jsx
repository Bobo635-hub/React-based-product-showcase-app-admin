import { Link, useParams } from "react-router-dom";
import { API_URL } from "../api";
import useFetch from "../hooks/useFetch";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading } = useFetch(`${API_URL}/products/${id}`);

  if (loading) {
    return (
      <section className="page">
        <p>Loading product...</p>
      </section>
    );
  }

  return (
    <section className="page">
      <p className="breadcrumb">
        <Link to="/products">Products</Link> / {product?.name}
      </p>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
    </section>
  );
}