"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, User, Tag, Package, CheckCircle, Loader2, Info } from "lucide-react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";

function BookDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check user session
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/get-session', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          toast.error('Book not found');
          router.push('/books');
          return;
        }
        
        const data = await res.json();
        // API handles both wrapped {success, book} or direct book object
        setBook(data.book || data);
      } catch (error) {
        console.error('Error fetching book:', error);
        toast.error('Failed to load book details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id, router]);

  const handleBorrow = async () => {
    if (!user) {
      toast.error('Please login to borrow books');
      router.push('/login');
      return;
    }

    if (book.available_quantity <= 0) {
      toast.error('This book is currently out of stock');
      return;
    }

    setIsBorrowing(true);
    
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'borrow' }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Book borrowed successfully!');
        // Update local state with the new quantity from server
        const updatedBook = data.book || data;
        setBook(updatedBook);
      } else {
        toast.error(data.message || 'Failed to borrow book');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast.error('Failed to borrow book. Please try again.');
    } finally {
      setIsBorrowing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
          <p className="text-gray-500 mb-4">The book you are looking for does not exist.</p>
          <Link href="/books" className="btn btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/books" className="btn btn-ghost mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Book Cover */}
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-base-200">
            <Image
              src={book.image_url || "/placeholder-book.jpg"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Book Details - RIGHT SIDE */}
          <div className="flex flex-col justify-center">
            <div className="badge badge-primary mb-4 w-fit">{book.category}</div>
            
            <h1 className="text-4xl font-bold mb-2 text-gray-800">{book.title}</h1>
            
            <div className="flex items-center gap-2 text-gray-500 mb-6 italic">
              <User className="w-5 h-5 text-primary" />
              <span className="text-xl">by {book.author}</span>
            </div>

            <div className="divider"></div>

            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {book.description}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">
                  Available Quantity:
                </span>
                <span className={`font-bold ${
                  book.available_quantity > 0 ? 'text-success' : 'text-error'
                }`}>
                  {book.available_quantity} copies left
                </span>
              </div>
            </div>

            {/* Borrow Button */}
            <button
              onClick={handleBorrow}
              disabled={isBorrowing || book.available_quantity <= 0}
              className={`btn btn-primary btn-lg w-full md:w-auto px-12 rounded-full shadow-lg ${
                book.available_quantity > 0 
                  ? '' 
                  : 'btn-disabled'
              }`}
            >
              {isBorrowing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : book.available_quantity > 0 ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Borrow This Book
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Out of Stock
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <PrivateRoute>
      <BookDetailsContent />
    </PrivateRoute>
  );
}
