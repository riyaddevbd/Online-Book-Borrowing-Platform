"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Star, Zap, Shield, Clock } from "lucide-react";
import BookCard from "@/components/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const res = await fetch('/api/books?limit=4');
        const data = await res.json();
        if (data.success) {
          setFeaturedBooks(data.books);
        }
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const newArrivals = [
    "The Silent Echo",
    "Digital Transformation",
    "Space Explorers",
    "The Art of Code",
    "Mystery of the Deep"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "LibraryHub has transformed how I study. Access to thousands of books at my fingertips!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The tech book collection here is impressive. I've learned so much from their resources.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Teacher",
      content: "A wonderful platform for educators and students alike. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="hero min-h-[70vh] bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your <span className="text-primary">Next Read</span>
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Discover thousands of books across Technology, Science, and Story categories. 
              Your digital library awaits.
            </p>
            <Link href="/books" className="btn btn-primary btn-lg gap-2">
              Browse Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-primary text-primary-content py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="mx-8 text-sm font-medium">
              New Arrivals: {newArrivals.join(" | ")} | Special Discount on Memberships | Free Shipping on Orders Over $50 |
            </span>
          ))}
        </div>
      </div>

      {/* Featured Books Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Books</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked selections from our most popular categories
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/books" className="btn btn-outline btn-primary">
            View All Books
          </Link>
        </div>
      </section>

      {/* Extra Section 1: Why Choose Us (Features) */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LibraryHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of digital reading with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title">Vast Collection</h3>
                <p className="text-sm text-gray-600">Over 10,000 books across multiple categories and genres</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="card-title">Instant Access</h3>
                <p className="text-sm text-gray-600">Borrow and start reading in seconds, no waiting required</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title">Secure Platform</h3>
                <p className="text-sm text-gray-600">Your data and reading history are always protected</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title">24/7 Available</h3>
                <p className="text-sm text-gray-600">Access your library anytime, anywhere, on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Section 2: Testimonials with Swiper */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Readers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied readers who have discovered their next favorite book
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-100 shadow-md h-full">
                <div className="card-body">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
