"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl">MANGO techical test</h1>
      <div className="flex space-x-4">
        <Link href="/exercise2"><button className="border-2 border-black rounded-sm px-4 py-2">go to exercise 1</button></Link>
        <Link href="/exercise1"><button className="border-2 border-black rounded-sm px-4 py-2">go to exercise 2</button></Link>
      </div>
    </div>
  );
}
