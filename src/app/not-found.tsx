import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-base-content">Page Not Found</h2>
        <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>

        <Link href="/" className="btn btn-primary mt-6 rounded-2xl text-white">
          Go Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
