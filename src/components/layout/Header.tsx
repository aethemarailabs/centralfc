import Link from "next/link";
import { Menu, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-central-navy text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        {/* Placeholder for Logo */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-central-navy font-bold text-xs border-2 border-central-gold overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Central FC Logo" className="w-full h-full object-cover" />
        </div>
        <Link href="/" className="font-extrabold text-lg tracking-wider">
          CENTRAL FC
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="text-central-gold">
          <Bell className="w-6 h-6" />
        </button>
        <button aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
