"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "@/app/lib/supabase";

type Product = {
  id: number;
  barcode: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
};

type Props = {
  onAdd: (product: Product) => void;
};

export default function ProductGrid({ onAdd }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          barcode={product.barcode}
          name={product.name}
          price={product.price}
          stock={product.stock}
          image={product.image}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}