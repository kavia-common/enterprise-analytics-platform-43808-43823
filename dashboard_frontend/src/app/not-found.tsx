import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]">
      <section className="card w-full max-w-lg p-6" role="alert" aria-live="assertive">
        <header>
          <h1 className="text-2xl font-semibold">404 – Page Not Found</h1>
          <p className="text-sm text-gray-600 mt-2">
            The page you’re looking for doesn’t exist.
          </p>
        </header>

        <div className="mt-6">
          <Link className="text-blue-700 hover:underline" href="/dashboards">
            Go to dashboards
          </Link>
        </div>
      </section>
    </main>
  );
}
