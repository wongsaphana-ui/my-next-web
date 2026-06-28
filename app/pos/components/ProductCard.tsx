type Props = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  onAdd: () => void;
};

export default function ProductCard({
  name,
  price,
  stock,
  image,
  onAdd,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow border p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="text-lg font-bold mt-3">{name}</h3>

      <p className="text-blue-600 font-semibold">
        ฿{price.toFixed(2)}
      </p>

      <p className="text-sm text-gray-500">
        คงเหลือ {stock} ชิ้น
      </p>

      <button
        onClick={onAdd}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        เพิ่มสินค้า
      </button>
    </div>
  );
}