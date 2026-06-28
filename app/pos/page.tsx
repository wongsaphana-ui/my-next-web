"use client";

import { useState } from "react";
import ProductGrid from "./components/ProductGrid";

export default function PosPage() {
  const [cart, setCart] = useState<any[]>([]);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // เพิ่มจำนวนสินค้า
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ลดจำนวนสินค้า
  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <main className="bg-slate-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        ระบบขายสินค้า (POS)
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* ฝั่งสินค้า */}
        <div className="col-span-8 bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            สินค้า
          </h2>

          <ProductGrid onAdd={addToCart} />
        </div>

        {/* ฝั่งตะกร้า */}
        <div className="col-span-4 bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">
            รายการขาย
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">
              ยังไม่มีสินค้าในตะกร้า
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b py-3"
                  >
                    <div className="flex justify-between items-center">

                      <div>
                        <p className="font-semibold">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          ฿{item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                        >
                          -
                        </button>

                        <span className="font-bold w-6 text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>

                    </div>

                    <div className="text-right mt-2 font-semibold text-blue-600">
                      ฿{(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>ยอดรวม</span>

                  <span>
                    ฿
                    {cart
                      .reduce(
                        (sum, item) => sum + item.price * item.qty,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>

                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
                  ชำระเงิน
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}