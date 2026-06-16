"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Hexagon, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Hexagon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Denami Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button onClick={logout} className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
                    Sign Out
                  </button>
                  <Link href="#contact" className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/80 focus-visible:outline-none">
                    Contact Us
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <UserIcon size={16} /> Login
                  </Link>
                  <Link href="#contact" className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/80 focus-visible:outline-none">
                    Contact Us
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-base font-medium text-muted-foreground hover:text-destructive transition-colors px-4 py-2 text-left">
                  Sign Out
                </button>
              ) : (
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-base font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 flex items-center gap-2">
                  <UserIcon size={18} /> Sign In
                </Link>
              )}
              <Link href="#contact" onClick={() => setIsOpen(false)} className="inline-flex h-9 w-full mt-2 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
