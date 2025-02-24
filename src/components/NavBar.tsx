"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // Define the links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/sponsor", label: "Sponsor" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full  z-50 backdrop-blur-sm bg-opacity-80 bg-color2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex space-x-8 text-color1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-lg font-semibold hover:text-white hover:shadow-white transition duration-300`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-4/5 h-[1px] bg-white"></span>
                )}
              </Link>
            ))}
          </div>
          <div className="ml-auto">
            <Link
              href="/auth/register"
              className="text-lg font-semibold border text-white border-white px-4 py-1 hover:text-white hover:shadow-white hover:bg-opacity-10 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
