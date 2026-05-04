"use client";

import { useEffect, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import BookCard from "@/components/BookCard";
import CategorySidebar from "@/components/CategorySidebar";
import PrivateRoute from "@/components/PrivateRoute";

function BooksContent() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory]);

  const fetchBooks = async (search = "") => {
    try {
      setIsLoading(true);
      let url = `/api/books?category=${selectedCategory}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            All Books
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of books. Use the search bar or category filters to find exactly what you are looking for.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by book title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Hidden on mobile, shown on lg screens */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Mobile Category Dropdown */}
          <div className="lg:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="All">All Categories</option>
              <option value="Story">Story Books</option>
              <option value="Tech">Technology</option>
              <option value="Science">Science</option>
            </select>
          </div>

          {/* Books Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg text-primary"></div>
              </div>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No books found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <PrivateRoute>
      <BooksContent />
    </PrivateRoute>
  );
}
