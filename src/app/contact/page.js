export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="
        mx-auto
        max-w-5xl
        px-6
        py-12
        "
      >
        {/* HEADER */}

        <div className="mb-10">
          <h1
            className="
            text-4xl
            font-bold
            "
          >
            Contact Us
          </h1>

          <p
            className="
            mt-3
            text-gray-500
            "
          >
            Have questions? Our team is here to help.
          </p>
        </div>

        {/* CONTACT CARD */}

        <div
          className="
          grid
          gap-6
          md:grid-cols-3
          "
        >
          <div
            className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
            "
          >
            <h2 className="text-xl font-bold">Email</h2>

            <p className="mt-3 text-gray-600">support@shopsphere.com</p>
          </div>

          <div
            className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
            "
          >
            <h2 className="text-xl font-bold">Phone</h2>

            <p className="mt-3 text-gray-600">+91 90000 00000</p>
          </div>

          <div
            className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
            "
          >
            <h2 className="text-xl font-bold">Location</h2>

            <p className="mt-3 text-gray-600">India</p>
          </div>
        </div>

        {/* SUPPORT BOX */}

        <div
          className="
          mt-10
          rounded-3xl
          bg-black
          p-8
          text-white
          "
        >
          <h2 className="text-2xl font-bold">Need Help With Your Order?</h2>

          <p className="mt-3 text-gray-300">
            Contact our support team for order tracking, payments, returns and
            product queries.
          </p>
        </div>
      </div>
    </main>
  );
}
