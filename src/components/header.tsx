"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const navItems = [
    { title: "FAQ", href: "#faq" },
    { title: "Support", href: "#support" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950 text-white">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/getstac-logo.png"
              sizes="20px"
              alt="Logo"
              width={20}
              height={20}
            />
            <span className="text-xl font-bold text-white">Getstac</span>
          </Link>
          <Link
            href="/"
            className="ml-4 hidden sm:inline-block rounded bg-white px-3 py-1 text-sm font-medium text-slate-950"
          >
            POS Agents
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-gray-300 hover:text-white transition"
            >
              {item.title}
            </a>
          ))}
          <Link href="/sign-in">
            <Button className="bg-white text-slate-950 hover:bg-gray-100">
              Login
            </Button>
          </Link>
        </div>


        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => setOpen(!isOpen)}
            className="p-2 text-white hover:bg-slate-800"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-lg">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-white transition"
              >
                {item.title}
              </a>
            ))}
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              <Button className="w-full bg-white text-slate-950 hover:bg-gray-100">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
