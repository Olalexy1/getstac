import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-slate-950 px-6 py-8 md:px-12">
      <div className="flex flex-col items-center justify-between gap-4 text-gray-400 sm:flex-row">
        <p className="text-sm">© Getsac · Contact · Privacy & terms</p>
        <div className="flex gap-6 text-sm">
          <Link href="#" className="hover:text-white transition">
            Contact
          </Link>
          <Link href="#" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white transition">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
