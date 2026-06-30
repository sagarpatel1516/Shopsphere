export default function Loading() {
  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      "
    >
      <div className="text-center" role="status" aria-live="polite">
        <div
          className="
          h-14
          w-14
          border-4
          border-gray-300
          border-t-black
          rounded-full
          animate-spin
          mx-auto
          "
        />

        <p
          className="
          mt-5
          text-lg
          text-gray-500
          "
        >
          Loading...
        </p>
      </div>
    </main>
  );
}
