"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col pb-20">
      <h1>MANGO TEST</h1>
      <div className="flex flex-col space-y-3">
        <Link href="/exercise2">exercise2</Link>
        <Link href="/exercise1">exercise1</Link>
      </div>
    </div>
  );
}
