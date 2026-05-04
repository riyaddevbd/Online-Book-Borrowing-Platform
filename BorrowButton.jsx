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
    setLoading(true);
    
    try {
      // Simulate API Call - replace with your actual fetch logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Client-side check for session before proceeding with borrow logic
      if (!user) {
        toast.error("You need to be logged in to borrow a book.");
        router.push('/login');
        return;
      }
      
      // Success logic
      toast.success("Success! You have borrowed this book.", {
        duration: 4000,
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to borrow the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBorrow} // This will now handle the session check
      disabled={!isAvailable || loading || isCheckingSession || !user} // Disable if not available, loading, checking session, or no user
      className={`btn btn-primary w-full text-lg gap-2 ${loading ? "loading" : ""}`}
    >
      {loading || isCheckingSession ? <Loader2 className="animate-spin" /> : <HandHelping size={20} />}
      {isCheckingSession ? "Checking session..." : !user ? "Login to Borrow" : isAvailable ? "Borrow This Book" : "Out of Stock"}
    </button>
  );
}