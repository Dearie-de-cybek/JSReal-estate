import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-screen flex-col justify-center py-24">
      <p className="num">404</p>
      <h1 className="display h-xl mt-4">This page isn&apos;t on <em>the register.</em></h1>
      <p className="lede mt-6">It may have been moved, sold or never existed. Let&apos;s get you back on solid ground.</p>
      <div className="mt-10 flex gap-4">
        <Link href="/" className="btn btn-solid">Home</Link>
        <Link href="/properties" className="btn btn-line">Properties</Link>
      </div>
    </main>
  );
}
