import React from 'react';

export const NoteFound = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8  text-black">
      <div className="text-center">
        <h1 className="font-semibold text-orange text-9xl">404</h1>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-black sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-gray sm:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => window.history.back()}
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Go back home
          </button>
        </div>
      </div>
    </main>
  );
};
