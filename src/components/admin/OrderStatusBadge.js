export default function OrderStatusBadge({ status }) {
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${statusStyle[status] || "bg-gray-100 text-gray-700"}
      `}
    >
      {status}
    </span>
  );
}