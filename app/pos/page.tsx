"use client";

import { useState } from "react";
import Link from "next/link";
import ProductGrid from "./components/ProductGrid";

type Product = {
  id: number;
  barcode: string;
  name: string;
  price: number;
  stock: number;
  image: string | null;
};

type CartItem = Product & {
  qty: number;
};

export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "promptpay" | null
  >(null);
  const [cashReceived, setCashReceived] = useState("");

  // เพิ่มสินค้า
  const addToCart = (product: Product) => {
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

  // เพิ่มจำนวน
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ลดจำนวน
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

  async function checkout() {
  if (cart.length === 0) return;

  alert("ชำระเงินสำเร็จ");

  // TODO: บันทึกลง Database

  // ล้างตะกร้า
  setCart([]);

  // ปิด Popup
  setShowPayment(false);

  // รีเซ็ตวิธีชำระ
  setPaymentMethod(null);

  // ล้างช่องรับเงิน
  setCashReceived("");
}

// =========================
// คำนวณยอดรวม
// =========================
const total = cart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);

// คำนวณเงินทอน
const change = Number(cashReceived || 0) - total;


  return (
<main className="bg-slate-100 min-h-screen p-6">

  <div className="flex justify-between items-center mb-6">

    <h1 className="text-3xl font-bold">
      ระบบขายสินค้า (POS)
    </h1>

    <Link
      href="/products"
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
    >
      จัดการสินค้า
    </Link>

  </div>

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

        <p className="text-center text-gray-500">
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
                    (sum, item) =>
                      sum + item.price * item.qty,
                    0
                  )
                  .toFixed(2)}
              </span>

            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              💳 ชำระเงิน
            </button>

          </div>

        </>

      )}

    </div>

  </div>

                 {/* Modal ชำระเงิน */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">

            <h2 className="text-2xl font-bold mb-4">
              เลือกช่องทางชำระเงิน
            </h2>

            <p className="text-lg mb-5">
              ยอดรวม
              <span className="ml-2 font-bold text-green-600">
                ฿
                {cart
                  .reduce(
                    (sum, item) => sum + item.price * item.qty,
                    0
                  )
                  .toFixed(2)}
              </span>
            </p>

            {/* ปุ่มเลือกวิธีชำระ */}
            <div className="grid grid-cols-2 gap-4">

              <button
                onClick={() => setPaymentMethod("cash")}
                className={`py-4 rounded-lg text-white font-semibold ${
                  paymentMethod === "cash"
                    ? "bg-green-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                💵 เงินสด
              </button>

              <button
                onClick={() => setPaymentMethod("promptpay")}
                className={`py-4 rounded-lg text-white font-semibold ${
                  paymentMethod === "promptpay"
                    ? "bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                📱 พร้อมเพย์
              </button>

            </div>

            
           {/* เงินสด */}
{paymentMethod === "cash" && (
  <div className="mt-6 border-t pt-4">

    <h3 className="font-bold text-lg mb-4">
      💵 ชำระด้วยเงินสด
    </h3>

    <label className="block mb-2 font-medium">
      รับเงินจากลูกค้า
    </label>

    <input
      type="number"
      value={cashReceived}
      onChange={(e) => setCashReceived(e.target.value)}
      placeholder="0.00"
      className="w-full border rounded-lg p-3"
    />

    <div className="flex justify-between mt-4">
      <span>ยอดรวม</span>
      <span className="font-bold">
        ฿{total.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between mt-2">
      <span>รับเงิน</span>
      <span className="font-bold">
        ฿{Number(cashReceived || 0).toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between mt-2">
      <span>เงินทอน</span>
      <span
        className={`font-bold ${
          change >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        ฿{change >= 0 ? change.toFixed(2) : "0.00"}
      </span>
    </div>

    <button
      disabled={change < 0}
      onClick={checkout}
      className="w-full mt-5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg"
    >
      ยืนยันชำระเงิน
    </button>

  </div>
)}
            <button
              onClick={() => {
                setShowPayment(false);
                setPaymentMethod(null);
              }}
              className="w-full mt-6 border py-2 rounded-lg hover:bg-gray-100"
            >
              ยกเลิก
            </button>

          </div>

        </div>
      )}

    </main>
  );
}