import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "โค้ก",
    price: 20,
    stock: 50,
    image: "https://placehold.co/300x300?text=Coke",
  },
  {
    id: 2,
    name: "โอริโอ้",
    price: 25,
    stock: 35,
    image: "https://placehold.co/300x300?text=Oreo",
  },
  {
    id: 3,
    name: "นม",
    price: 30,
    stock: 18,
    image: "https://placehold.co/300x300?text=Milk",
  },
];

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

type Props = {
  onAdd: (product: Product) => void;
};

export default function ProductGrid({ onAdd }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          stock={product.stock}
          image={product.image}
          onAdd={() => onAdd(product)}
        />
      ))}
    </div>
  );
}