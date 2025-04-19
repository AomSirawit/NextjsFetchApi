"use client";
import { Button } from "@/components/ui/button";
import { FaToggleOn } from "react-icons/fa6";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 z-10 bg-white dark:bg-black">
      <div className="text-2xl font-bold">
        <Link href={'/'}>FeatureStore</Link>
        </div>
      <div className="flex items-center space-x-4">
        <Button
          className="w-14"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          <FaToggleOn />
        </Button>
      </div>
    </nav>
  );
}
