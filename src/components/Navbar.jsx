"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BookOpen, User, LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/get-session', { credentials: 'include', cache: 'no-store' })
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          return res.json();
        }
        return null;
      })
      .then(data => {
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        toast.success('Logged out successfully');
        window.location.href = "/";
      } else {
        toast.error('Failed to logout');
      }
    } catch (error) {
      toast.error('An error occurred during logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="navbar bg-base-100 border-b border-base-200 px-4 md:px-12 sticky top-0 z-50">
      {/* Logo Section - Left Side */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-primary-content">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">
            Online Book <span className="text-primary">Borrowing Platform</span>
          </span>
        </Link>
      </div>

      {/* Navigation Menu - Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 font-medium text-gray-600">
          <li><Link href="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
          <li><Link href="/books" className="hover:text-primary transition-colors duration-200">All Books</Link></li>
          <li><Link href="/profile" className="hover:text-primary transition-colors duration-200">My Profile</Link></li>
        </ul>
      </div>

      {/* Auth Section - Right Side */}
      <div className="navbar-end">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        ) : !user ? (
          <Link href="/login" className="btn btn-primary btn-md normal-case font-semibold px-8 rounded-full shadow-md hover:shadow-lg transition-all">
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <User className="w-5 h-5 text-primary" />
              <span>{user.name || "User"}</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10 gap-2"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
         