import ProductCard from "./ProductCard.jsx";

export default function FeaturedProducts({ products, loading }) {
  return (
    <section className="px-10 py-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Products</h2>

      {loading ? (
        <p className="text-gray-400">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}