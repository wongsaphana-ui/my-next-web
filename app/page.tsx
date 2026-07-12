

import Link from "next/link";
import {
  FaCashRegister,
  FaBoxOpen,
  FaChartLine,
  FaReceipt,
  FaTags,
  FaTruckLoading,
  FaShoppingCart,
  FaExclamationTriangle,
} from "react-icons/fa";

const menus = [
  {
    title: "ระบบขาย (POS)",
    icon: <FaCashRegister size={40} />,
    href: "/pos",
  },
  {
    title: "จัดการสินค้า",
    icon: <FaBoxOpen size={40} />,
    href: "/products",
  },
  {
    title: "หมวดหมู่",
    icon: <FaTags size={40} />,
    href: "/category",
  },
  {
    title: "รับสินค้าเข้า",
    icon: <FaTruckLoading size={40} />,
    href: "/addstock",
  },
  {
    title: "รายงาน",
    icon: <FaChartLine size={40} />,
    href: "/report",
  },
  {
    title: "ประวัติการขาย",
    icon: <FaReceipt size={40} />,
    href: "/history",
  },
];

export default function Dashboard() {
  return (
    <main className="bg-slate-100 min-h-screen p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Dashboard
      </h1>
{/* 
      {/* Summary */}
      {/* <div className="grid md:grid-cols-4 gap-5 mb-10">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">ยอดขายวันนี้</p>
          <h2 className="text-3xl font-bold text-green-600">
            ฿12,580
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">สินค้าทั้งหมด</p>
          <h2 className="text-3xl font-bold">
            245
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">รายการขาย</p>
          <h2 className="text-3xl font-bold">
            86
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                สินค้าใกล้หมด
              </p>

              <h2 className="text-3xl font-bold text-red-500">
                12
              </h2>
            </div>

            <FaExclamationTriangle
              className="text-red-500"
              size={35}
            />
          </div>
        </div>

      </div>  */}

      <h2 className="text-2xl font-bold mb-5">
        เมนูหลัก
      </h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        {menus.map((menu) => (
          <Link
            href={menu.href}
            key={menu.title}
            className="bg-white rounded-xl shadow hover:shadow-xl duration-300 p-8 flex flex-col items-center gap-5"
          >
            <div className="text-indigo-600">
              {menu.icon}
            </div>

            <h2 className="text-xl font-semibold">
              {menu.title}
            </h2>
          </Link>
        ))}

      </div>

    </main>
  );
}