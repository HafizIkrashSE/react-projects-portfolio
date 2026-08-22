import { useEffect, useState } from "react";

export default function LoadMoreData() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const limit = 20;

    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );

        const data = await response.json();

        setProducts((prevProducts) => [
          ...prevProducts,
          ...data.products,
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [skip]);

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + 20);
  };

  const reachedLimit = products.length >= 100;

  return (
    <div className="load-more-container">
      <h1>Load More Products</h1>

      <div className="product-container">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
            />

            <h3>{product.title}</h3>
          </div>
        ))}
      </div>

      <div className="button-container">
        {loading ? (
          <p>Loading products...</p>
        ) : reachedLimit ? (
          <p>You have reached 100 products.</p>
        ) : (
          <button onClick={loadMore}>
            Load More Products
          </button>
        )}
      </div>
    </div>
  );
}