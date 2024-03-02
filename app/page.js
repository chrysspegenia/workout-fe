import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        WORKOUT
      </div>
      <Link href="./components/login-form">Login</Link>
      <Link href="./components/signup-form">Register</Link>
    </main>
  );
}
