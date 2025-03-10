"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { label } from "framer-motion/client";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
    console.log(pathname);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    /* { href: "/sponsor", label: "Sponsor" }, */
    { href: "/team", label: "Team" },
    { href:"#Timeline", label: "Timeline"},
    { href:"#Footer", label: "Contact Us"}
  ];

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.2 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -5 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const topLineVariants = {
    closed: { d: "M 2 6 L 28 6" },
    open: { d: "M 3 3 L 27 27" },
  };

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomLineVariants = {
    closed: { d: "M 2 24 L 28 24" },
    open: { d: "M 3 27 L 27 3" },
  };

  const underlineTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${
        menuOpen
          ? "bg-black/70 backdrop-blur-lg"
          : "bg-black/5 backdrop-blur-md"
      } text-white`}
    >
      <div className="w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <motion.button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            overflow="visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              variants={topLineVariants}
              initial="closed"
              animate={menuOpen ? "open" : "closed"}
              transition={{ duration: 0.4 }}
              stroke="#F6CE87"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.path
              d="M 2 15 L 28 15"
              variants={middleLineVariants}
              initial="closed"
              animate={menuOpen ? "open" : "closed"}
              transition={{ duration: 0.4 }}
              stroke="#F6CE87"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.path
              variants={bottomLineVariants}
              initial="closed"
              animate={menuOpen ? "open" : "closed"}
              transition={{ duration: 0.4 }}
              stroke="#F6CE87"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-lg font-medium transition-colors duration-200 delay-75 hover:text-color1  ${
                currentPath == link.href ? "text-color1" : "text-white"
              }`}
            >
              {link.label}
              {currentPath == link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-color1"
                  transition={underlineTransition}
                />
              )}
            </Link>
          ))}
        </div>

        {!session?.user && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex space-x-4"
          >
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-white via-[#303030] to-white text-lg transition duration-300"
            >
              <span className="bg-black px-4 w-full h-full m-[1px]">
                Register
              </span>
            </Link>
          </motion.div>
        )}

        {session?.user && (
          <div className="flex gap-2 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex space-x-4"
            >
              <Link
                href="/my-profile"
                className="bg-gradient-to-r from-white via-[#303030] to-white text-lg transition duration-300"
              >
                <span className="bg-black px-4 w-full h-full m-[1px]">
                  My Profile
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex space-x-4"
            >
              <button      
              onClick={() => signOut()}       
                className="bg-gradient-to-r from-white via-[#303030] to-white text-lg transition duration-300"
              >
                <span className="bg-black px-4 w-full h-full m-[1px]">
                  Log Out
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden px-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.href}
                    className={`text-lg font-medium hover:text-color1 transition-colors duration-200 ${
                      currentPath == link.href ? "text-color1" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
