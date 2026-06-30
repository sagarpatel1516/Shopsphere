export default function OrderTimeline({ status }) {
  const steps = ["Pending", "Paid", "Processing", "Shipped", "Delivered"];

  if (status === "Cancelled") {
    return (
      <div
        className="
mt-8
rounded-xl
bg-red-100
p-5
text-red-700
font-semibold
"
      >
        Order Cancelled
      </div>
    );
  }

  const current = steps.indexOf(status);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <div
              className={`
h-8
w-8
rounded-full
flex
items-center
justify-center

${index <= current ? "bg-black text-white" : "bg-gray-200"}

`}
            >
              {index <= current ? "✓" : index + 1}
            </div>

            <p
              className={`
font-semibold

${index <= current ? "text-black" : "text-gray-400"}

`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
