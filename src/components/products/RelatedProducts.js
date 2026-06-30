import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }) {
  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold">Related Products</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
