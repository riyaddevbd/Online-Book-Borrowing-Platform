"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, HandHelping } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BorrowButton({ bookId, isAvailable }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // State to hold user session
  const [isCheckingSession, setIsCheckingSession] = useState(true); // Loading state for session check
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Fetch session when component mounts
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
      .finally(() => setIsCheckingSession(false));
  }, []); // Empty dependency array means this runs once on mount

  const handleBorrow = async () => {
    // Redirect to login if not logged in
    if (!user) {
      toast.error("You need to be logged in to borrow a book.");
      router.push('/login');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'borrow' }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success("Success! You have borrowed this book.");
        router.refresh(); // রিফ্রেশ দিলে Quantity আপডেট হবে
      } else {
        toast.error(data.message || "Failed to borrow");
      }
    } catch (error) {
      toast.error("Failed to borrow the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBorrow} // This will now handle the session check
      disabled={!isAvailable || loading || isCheckingSession} // Guest user can click to redirect
      className={`btn btn-primary w-full text-lg gap-2 ${loading ? "loading" : ""}`}
    >
      {loading || isCheckingSession ? <Loader2 className="animate-spin" /> : <HandHelping size={20} />}
      {isCheckingSession ? "Checking session..." : !user ? "Login to Borrow" : isAvailable ? "Borrow This Book" : "Out of Stock"}
    </button>
  );
}