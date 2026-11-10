"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container-x flex min-h-screen flex-col justify-center py-24">
      <p className="num">Something went wrong</p>
      <h1 className="display h-lg mt-4">We hit an unexpected problem.</h1>
      <p className="lede mt-6">Please try again. If it keeps happening, contact us directly.</p>
      <button onClick={reset} className="btn btn-solid mt-10 self-start">Try again</button>
    </main>
  );
}
