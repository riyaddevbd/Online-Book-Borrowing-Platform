import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Adjust based on your BetterAuth setup
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book";
import BorrowButton from "./BorrowButton"; // যদি একই ফোল্ডারে থাকে
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function BookDetailsPage({ params }) {
  // 1. Private Route Access Check
  const session = await auth.api.getSession({
    headers: await headers()
  });
  // Check if session exists AND if a user is present within the session
  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();
  const { id } = await params;
  // Query by custom id field instead of MongoDB _id
  const book = await Book.findOne({ id: id });

  if (!book) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold text-error">Book not found</h1>
        <Link href="/books" className="btn btn-ghost mt-4">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 lg:p-12">
      <Link href="/books" className="btn btn-ghost btn-sm mb-8 gap-2">
        <ArrowLeft size={16} /> Back to Library
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Large Book Cover */}
        <div className="flex justify-center bg-base-200 rounded-2xl p-8 shadow-inner">
          <img 
            src={book.image_url || "/placeholder-book.png"}
            alt={book.title}
            className="w-full max-w-sm rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Text/Details */}
        <div className="flex flex-col h-full">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-2">{book.title}</h1>
          <p className="text-xl text-primary font-medium mb-6">By {book.author}</p>
          
          <div className="badge badge-secondary badge-outline mb-4">{book.category}</div>
          
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-base-content/70 leading-relaxed mb-8 flex-grow">
            {book.description}
          </p>

          <div className="bg-base-100 border border-base-300 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="text-success" />
                <span className="text-lg"> 
                  Available: <span className="font-bold">{book.available_quantity} copies left</span>
                </span>
              </div>
            </div>
            
            {/* Action Button Component */}
            <BorrowButton  
              bookId={book.id} 
              isAvailable={book.available_quantity > 0} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}