import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <section className="page">
      <p className="breadcrumb">
        <Link to="/products">Products</Link> / Product {id}
      </p>
      <h1>Product details</h1>
    </section>
  );
}