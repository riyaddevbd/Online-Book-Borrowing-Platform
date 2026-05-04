"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, HandHelping } from "lucide-react";

export default function BorrowButton({ bookId, isAvailable }) {
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);
    
    try {
      // Simulate API Call - replace with your actual fetch logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
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
      onClick={handleBorrow}
      disabled={!isAvailable || loading}
      className={`btn btn-primary w-full text-lg gap-2 ${loading ? "loading" : ""}`}
    >
      {loading ? <Loader2 className="animate-spin" /> : <HandHelping size={20} />}
      {isAvailable ? "Borrow This Book" : "Out of Stock"}
    </button>
  );
}